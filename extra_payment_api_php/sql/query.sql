-- Account table (only 1 row)
CREATE TABLE account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    balance DECIMAL(15,2) NOT NULL
);

-- Insert initial balance
INSERT INTO account (balance) VALUES (1000.00);

-- Transactions table
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(15,2) NOT NULL,
    recipientName VARCHAR(255) NOT NULL,
    note TEXT,
    date DATETIME NOT NULL
);
