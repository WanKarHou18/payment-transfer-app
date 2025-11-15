// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// =============================
// In-memory data (no database)
// =============================
let account = {
  balance: 1000,
};

let transactions = [];

// =============================
// Helper function to send response
// =============================
function sendResponse(res, status, data) {
  res.json({ status, data });
}

// =============================
// Endpoints
// =============================

// Fetch / Update account balance
app.get("/balance", (req, res) => {
  sendResponse(res, 1, { balance: account.balance });
});

app.post("/balance", (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== "number")
    return sendResponse(res, 0, "Amount must be a number");
  account.balance = amount;
  sendResponse(res, 1, { newBalance: account.balance });
});

// Fetch transactions
app.get("/transactions", (req, res) => {
  sendResponse(res, 1, transactions);
});

// Create a new transaction
app.post("/transactions", (req, res) => {
  const { amount, recipientName, note = "", date } = req.body;

  if (!amount || !recipientName || !date) {
    return sendResponse(res, 0, "Missing required fields");
  }

  if (account.balance < amount) {
    return sendResponse(res, 0, "Insufficient balance");
  }

  // Deduct balance
  account.balance -= amount;

  // Add transaction
  const transaction = { amount, recipientName, note, date };
  transactions.push(transaction);

  sendResponse(res, 1, { newBalance: account.balance, transaction });
});

// =============================
// Start server
// =============================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
