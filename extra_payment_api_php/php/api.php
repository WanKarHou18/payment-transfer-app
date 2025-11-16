<?php
header("Content-Type: application/json");
include "config.php";

// Helper function to send response
function sendResponse($status, $data) {
    echo json_encode(["status" => $status, "data" => $data]);
    exit;
}

// Get request method
$method = $_SERVER['REQUEST_METHOD'];
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

switch($endpoint) {

    // =============================
    // Fetch Account Balance
    // =============================
    case "balance":
        if($method == "GET") {
            $result = $conn->query("SELECT balance FROM account LIMIT 1");
            if($result && $row = $result->fetch_assoc()){
                sendResponse(1, ["balance" => floatval($row['balance'])]);
            } else {
                http_response_code(500);
                sendResponse(0, "Could not fetch balance");
            }
        } elseif($method == "POST") {
            $data = json_decode(file_get_contents("php://input"), true);
            if(!isset($data['amount']) || !is_numeric($data['amount'])) {
                http_response_code(400);
                sendResponse(0, "Amount must be provided and numeric");
            }
            $amount = floatval($data['amount']);
            if($conn->query("UPDATE account SET balance = $amount WHERE id = 1")){
                sendResponse(1, ["newBalance" => $amount]);
            } else {
                http_response_code(500);
                sendResponse(0, "Could not update balance");
            }
        }
        break;

    // =============================
    // Fetch / Create Transactions
    // =============================
    case "transactions":
        if($method == "GET") {
            $result = $conn->query("SELECT * FROM transactions ORDER BY date DESC");
            if(!$result){
                http_response_code(500);
                sendResponse(0, "Could not fetch transactions");
            }
            $transactions = [];
            while($row = $result->fetch_assoc()){
                $transactions[] = $row;
            }
            sendResponse(1, $transactions);
        } elseif($method == "POST") {
            $data = json_decode(file_get_contents("php://input"), true);
            $required = ['amount', 'recipientName', 'date'];
            foreach($required as $field){
                if(!isset($data[$field])){
                    http_response_code(400);
                    sendResponse(0, "$field is required");
                }
            }

            $amount = floatval($data['amount']);
            $recipientName = $conn->real_escape_string($data['recipientName']);
            $note = isset($data['note']) ? $conn->real_escape_string($data['note']) : '';
            $date = $conn->real_escape_string($data['date']);

            // Check balance
            $balanceResult = $conn->query("SELECT balance FROM account WHERE id=1");
            if(!$balanceResult){
                http_response_code(500);
                sendResponse(0, "Could not fetch balance");
            }
            $balance = floatval($balanceResult->fetch_assoc()['balance']);
            if($balance < $amount){
                http_response_code(400);
                sendResponse(0, "Insufficient balance");
            }

            // Deduct balance
            $newBalance = $balance - $amount;
            if(!$conn->query("UPDATE account SET balance=$newBalance WHERE id=1")){
                http_response_code(500);
                sendResponse(0, "Could not update balance");
            }

            // Insert transaction
            if(!$conn->query("INSERT INTO transactions (amount, recipientName, note, date) VALUES ($amount, '$recipientName', '$note', '$date')")){
                http_response_code(500);
                sendResponse(0, "Could not create transaction");
            }

            sendResponse(1, [
                "newBalance" => $newBalance,
                "transaction" => [
                    "amount" => $amount,
                    "recipientName" => $recipientName,
                    "note" => $note,
                    "date" => $date
                ]
            ]);
        }
        break;

    default:
        http_response_code(404);
        sendResponse(0, "Endpoint not found");
        break;
}
?>
