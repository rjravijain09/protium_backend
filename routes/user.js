const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

// Add a new user  WKG
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});
//get users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

module.exports = router;
