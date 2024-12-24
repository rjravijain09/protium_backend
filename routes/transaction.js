const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Record stock purchase
router.post('/buy', async (req, res) => {
    const { userId, symbol, quantity, price } = req.body;
    try {
        const transaction = new Transaction({ userId, symbol, type: 'BUY', quantity, price });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: 'Failed to record stock purchase' });
        console.log(err);
        
    }
});

// Record stock sale
router.post('/sell', async (req, res) => {
    const { userId, symbol, quantity, price } = req.body;
    try {
        const transaction = new Transaction({ userId, symbol, type: 'SELL', quantity, price });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: 'Failed to record stock sale' });
    }
});

// Retrieve transaction history
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const transactions = await Transaction.find({ userId });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve transaction history' });
        console.log(err);
    }
});

module.exports = router;
