const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// In-memory database
const accounts = {};
const transactions = {};

// Middleware
app.use(bodyParser.json());

// ✅ Serve static files (like index.html) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/api/accounts', (req, res) => {
    const { accountId, initialBalance } = req.body;
    if (accounts[accountId]) {
        return res.status(400).json({ message: 'Account already exists' });
    }
    accounts[accountId] = {
        balance: parseFloat(initialBalance),
        id: accountId
    };
    transactions[accountId] = [];
    res.status(201).json({ message: 'Account created', account: accounts[accountId] });
});

app.post('/api/transactions', (req, res) => {
    const { accountId, amount, type } = req.body;
    if (!accounts[accountId]) {
        return res.status(404).json({ message: 'Account not found' });
    }

    const amt = parseFloat(amount);
    if (type === 'credit') {
        accounts[accountId].balance += amt;
    } else if (type === 'debit') {
        if (accounts[accountId].balance < amt) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        accounts[accountId].balance -= amt;
    } else {
        return res.status(400).json({ message: 'Invalid transaction type' });
    }

    const txn = { amount: amt, type, date: new Date() };
    transactions[accountId].push(txn);
    res.status(201).json({ message: 'Transaction recorded', transaction: txn });
});

app.get('/api/accounts/:accountId/balance', (req, res) => {
    const { accountId } = req.params;
    if (!accounts[accountId]) {
        return res.status(404).json({ message: 'Account not found' });
    }
    res.json({ balance: accounts[accountId].balance });
});

app.get('/api/accounts/:accountId/transactions', (req, res) => {
    const { accountId } = req.params;
    if (!transactions[accountId]) {
        return res.status(404).json({ message: 'Account not found or no transactions' });
    }
    res.json({ transactions: transactions[accountId] });
});

// Start server
app.listen(PORT, () => {
    console.log(`Bank Transaction API running at http://localhost:${PORT}`);
});