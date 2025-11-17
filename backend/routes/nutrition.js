const express = require('express');
const router = express.Router();
const Nutrition = require('../models/Nutrition');
const User = require('../models/User');


router.post('/', async (req, res) => {
  try {
    const n = new Nutrition(req.body);
    await n.save();
    const points = Math.floor((n.calories || 0) / 100);
    if (points > 0) await User.findByIdAndUpdate(n.userId, { $inc: { points } });
    res.json(n);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/user/:userId', async (req, res) => {
  try {
    const list = await Nutrition.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
