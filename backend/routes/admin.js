// routes/admin.js

const express = require('express');
const router = express.Router();

// Login Route
router.post('/login', (req, res) => {
    // Check username and password
    // If correct, generate token and send it back
});

// Logout Route
router.post('/logout', (req, res) => {
    // Destroy token
});

module.exports = router;