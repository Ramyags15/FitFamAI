const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

       
        user = new User({
            name,
            email,
            password 
        });

        await user.save();

        
        const userResponse = user.toObject();
        delete userResponse.password;

        
        res.json({ msg: 'Signup successful', user: userResponse });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
       
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        
        if (user.password !== password) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        
        
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.json({ msg: 'Login successful', user: userResponse });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;