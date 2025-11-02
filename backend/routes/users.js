const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register (simple)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password });
    await user.save();
    res.json({ userId: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (simple, no hashing for prototype)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ userId: user._id, name: user.name, email: user.email, points: user.points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
