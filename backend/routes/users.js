const express = require('express');
const router = express.Router();
const User = require('../models/User');

// --- SIGN UP ---
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // 2. Create new user (No password hashing for speed, as per plan)
        user = new User({
            name,
            email,
            password // WARNING: Not secure! Add bcrypt later if time allows.
        });

        await user.save();

        // 3. Simple response: return the user object (excluding password)
        const userResponse = user.toObject();
        delete userResponse.password;

        // In a real app, you would send a JWT here. For the prototype, we just return the user ID.
        res.json({ msg: 'Signup successful', user: userResponse });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// --- LOG IN ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 2. Check password (Simple text comparison as we didn't hash)
        if (user.password !== password) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        
        // 3. Simple successful response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.json({ msg: 'Login successful', user: userResponse });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;