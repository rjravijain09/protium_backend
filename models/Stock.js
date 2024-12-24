const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    dailyChange: { type: Number, required: true }
},
{ collection: 'stocks' }
);

module.exports = mongoose.model('Stock', stockSchema);

