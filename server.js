const express = require('express');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(helmet());
app.use(express.json());

const accounts = new Map();
const transactions = [];

const apiKey = 'secure-bank-api-key-123';
const authenticate = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (!key || key !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
  next();
};

app.post('/api/accounts', authenticate, (req, res) => {
  const { accountId, initialBalance = 0 } = req.body;
  if (!accountId) {
    return res.status(400).json({ error: 'Account ID is required' });
  }
  if (accounts.has(accountId)) {
    return res.status(409).json({ error: 'Account already exists' });
  }
  if (initialBalance < 0) {
    return res.status(400).json({ error: 'Initial balance cannot be negative' });
  }
  accounts.set(accountId, { balance: initialBalance });
  res.status(201).json({ accountId, balance: initialBalance });
});

app.post('/api/transactions', authenticate, (req, res) => {
  const { accountId, amount, type } = req.body;
  if (!accountId || !amount || !type) {
    return res.status(400).json({ error: 'Account ID, amount, and type are required' });
  }
  if (!accounts.has(accountId)) {
    return res.status(404).json({ error: 'Account not found' });
  }
  if (type !== 'deposit' && type !== 'withdrawal') {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }
  if (amount <= 0) {
    return res.status(400).json({ error: 'Amount must be positive' });
  }

  const account = accounts.get(accountId);
  if (type === 'withdrawal' && account.balance < amount) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }

  const transaction = {
    id: uuidv4(),
    accountId,
    amount,
    type,
    timestamp: new Date().toISOString(),
  };

  if (type === 'deposit') {
    account.balance += amount;
  } else {
    account.balance -= amount;
  }
  accounts.set(accountId, account);
  transactions.push(transaction);

  res.status(201).json({ transactionId: transaction.id, accountId, balance: account.balance });
});

app.get('/api/accounts/:accountId/balance', authenticate, (req, res) => {
  const { accountId } = req.params;
  if (!accounts.has(accountId)) {
    return res.status(404).json({ error: 'Account not found' });
  }
  const account = accounts.get(accountId);
  res.json({ accountId, balance: account.balance });
});

app.get('/api/accounts/:accountId/transactions', authenticate, (req, res) => {
  const { accountId } = req.params;
  if (!accounts.has(accountId)) {
    return res.status(404).json({ error: 'Account not found' });
  }
  const accountTransactions = transactions.filter(t => t.accountId === accountId);
  res.json(accountTransactions);
});

app.listen(port, () => {
  console.log(`Bank Transaction API running at http://localhost:${port}`);
});
