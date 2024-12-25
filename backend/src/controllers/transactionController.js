const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { validateTransaction, processTransactionOnBlockchain } = require('../services/blockchainService');
const mongoose = require('mongoose');

/**
 * Create a new transaction and process it on the blockchain.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createTransaction = async (req, res) => {
    const { userId, amount } = req.body;

    // Validate input
    if (!userId || !amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid input: userId and amount are required' });
    }

    try {
        // Verify the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a pending transaction
        const transaction = new Transaction({
            userId,
            amount,
            status: 'pending',
        });
        await transaction.save();

        // Process transaction on blockchain
        const transactionHash = await processTransactionOnBlockchain(userId, amount);

        // Update transaction with blockchain hash and status
        transaction.transactionHash = transactionHash;
        transaction.status = 'completed';
        await transaction.save();

        return res.status(201).json({ message: 'Transaction completed successfully', transaction });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Get all transactions for a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUserTransactions = async (req, res) => {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
        return res.status(400).json({ error: 'UserId is required' });
    }

    try {
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

        if (!transactions.length) {
            return res.status(404).json({ error: 'No transactions found for this user' });
        }

        return res.status(200).json({ transactions });
    } catch (error) {
        console.error('Error fetching user transactions:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Validate a transaction's status on the blockchain.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const validateTransactionStatus = async (req, res) => {
    const { transactionId } = req.params;

    // Validate input
    if (!transactionId) {
        return res.status(400).json({ error: 'Transaction ID is required' });
    }

    try {
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        // Validate on blockchain
        const isValid = await validateTransaction(transaction.transactionHash);

        return res.status(200).json({
            transaction,
            blockchainValidation: isValid ? 'Valid' : 'Invalid',
        });
    } catch (error) {
        console.error('Error validating transaction:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Cancel a pending transaction.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const cancelTransaction = async (req, res) => {
    const { transactionId } = req.params;

    // Validate input
    if (!transactionId) {
        return res.status(400).json({ error: 'Transaction ID is required' });
    }

    try {
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        if (transaction.status !== 'pending') {
            return res.status(400).json({ error: 'Only pending transactions can be canceled' });
        }

        // Mark transaction as canceled
        transaction.status = 'canceled';
        await transaction.save();

        return res.status(200).json({ message: 'Transaction canceled successfully', transaction });
    } catch (error) {
        console.error('Error canceling transaction:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createTransaction,
    getUserTransactions,
    validateTransactionStatus,
    cancelTransaction,
};
