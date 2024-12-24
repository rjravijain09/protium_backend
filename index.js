const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');

const portfolioRoutes = require('./routes/portfolio');
const stockRoutes = require('./routes/stock');
const transactionRoutes = require('./routes/transaction');
const userRoutes = require('./routes/user');

const app = express();
const PORT = 5000;
const cache = new NodeCache({ stdTTL: 300 }); 
const { createLogger, transports, format } = require('winston');
const path = require('path');


// Middleware
app.use(bodyParser.json());

// Logger Configuration
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: [
        new transports.File({ filename: path.join(__dirname, 'logs/api.log') })
    ]
});

// app.use(bodyParser.json());
// Logging Middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});




// Database Connection
mongoose.connect('mongodb://localhost:27017/stock_tracker', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Database connection error:', err);
});

// Routes

app.use('/api/users', userRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/transactions', transactionRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
