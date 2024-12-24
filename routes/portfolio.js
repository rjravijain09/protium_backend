const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// Add stock to portfolio  WKG
router.post('/add', async (req, res) => {
    const { userId, symbol, quantity, averagePrice } = req.body;

    try {
        let validUserId;
        if (mongoose.Types.ObjectId.isValid(userId)) {
            validUserId = mongoose.Types.ObjectId(userId);  // Convert to ObjectId if valid
        } else {
            validUserId = userId;  // Treat as string if not a valid ObjectId
        }

        // Find the user's portfolio
        let portfolio = await Portfolio.findOne({ userId: validUserId });

        if (!portfolio) {
            // Create a new portfolio if none exists
            const newPortfolio = new Portfolio({ 
                userId: validUserId, 
                holdings: [{ symbol, quantity, averagePrice }] 
            });
            await newPortfolio.save();
            return res.status(201).json(newPortfolio);
        }

        // Check if the stock already exists in the portfolio
        const holding = portfolio.holdings.find(h => h.symbol === symbol);

        if (holding) {
            // Update the existing quantity and averagePrice
            holding.quantity += quantity;
            holding.averagePrice = ((holding.averagePrice * holding.quantity) + (averagePrice * quantity)) / (holding.quantity + quantity);
        } else {
            // Add the new stock to holdings if not already present
            portfolio.holdings.push({ symbol, quantity, averagePrice });
        }

        // Save the updated portfolio
        await portfolio.save();
        res.status(200).json(portfolio);

    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Failed to add stock to portfolio' });
    }
});


// Remove stock   WKG
router.delete('/remove', async (req, res) => {
    const { userId, symbol } = req.body;

    try {
        // Check if userId is a valid string
        if (!userId || typeof userId !== 'string' || userId.trim() === '') {
            return res.status(400).json({ error: 'Invalid userId format' });
        }

        // Find the portfolio by userId (directly comparing userId as a string)
        let portfolio = await Portfolio.findOne({ userId: userId });

        if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });

        // Remove the stock from holdings
        portfolio.holdings = portfolio.holdings.filter(h => h.symbol !== symbol);

        // Save the updated portfolio
        await portfolio.save();
        res.status(200).json(portfolio);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove stock from portfolio' });
    }
});

module.exports = router;

