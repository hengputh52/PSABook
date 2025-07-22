import { Transaction } from "../models/index.js";

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const { book_id, buyer_id, seller_id, amount, payment_method, status } = req.body;
    const transaction = await Transaction.create({
      book_id,
      buyer_id,
      seller_id,
      amount,
      payment_method,
      status,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all transactions for a user (as buyer or seller)
export const getUserTransactions = async (req, res) => {
  try {
    const { user_id } = req.params;
    const transactions = await Transaction.findAll({
      where: {
        [Transaction.sequelize.Op.or]: [
          { buyer_id: user_id },
          { seller_id: user_id }
        ]
      }
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const transaction = await Transaction.findByPk(transaction_id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update transaction status
export const updateTransactionStatus = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const { status } = req.body;
    const transaction = await Transaction.findByPk(transaction_id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    transaction.status = status;
    await transaction.save();
    res.json({ message: "Transaction status updated", transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};