const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    holdings: [{
        symbol: { type: String, required: true },         // Stock symbol
        quantity: { type: Number, required: true },       // Number of shares held
        averagePrice: { type: Number, required: true }    // Average buying price
    }]
});

module.exports = mongoose.model('Portfolio', portfolioSchema);