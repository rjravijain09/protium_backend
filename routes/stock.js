const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Get current stock price  WKG
router.get('/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const stock = await Stock.findOne({ symbol });
        if (!stock) return res.status(404).json({ error: 'Stock not found' });
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve stock price' });
    }
});

// Update stock price  WKG
router.put('/update', async (req, res) => {
    const { symbol, currentPrice, dailyChange } = req.body;
    try {
        const stock = await Stock.findOneAndUpdate(
            { symbol },
            { currentPrice, dailyChange },
            { new: true, upsert: true }
        );
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update stock price' });
    }
});

module.exports = router;