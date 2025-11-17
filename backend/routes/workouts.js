const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const User = require('../models/User');


router.post('/', async (req, res) => {
  try {
    const w = new Workout(req.body);
    await w.save();
    await User.findByIdAndUpdate(w.userId, { $inc: { points: 10 } });
    res.json(w);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/user/:userId', async (req, res) => {
  try {
    const list = await Workout.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
