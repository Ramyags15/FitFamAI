const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Proof = require('../models/Proof');
const User = require('../models/User'); 



const getTodayStart = () => {
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    return start;
};

router.get('/today', async (req, res) => {
    try {
        const todayStart = getTodayStart();

        
        let todayTask = await Task.findOne({
            date: { $gte: todayStart } 
        }).sort({ date: 1 }); 

       
        if (!todayTask) {
            console.log("No task for today found. Creating new mock task...");
            
          
            const taskPool = [
                { description: "Complete a 30-minute cardio session (run/walk/bike).", category: "Cardio", maxPoints: 15 },
                { description: "Drink 2 liters of water before 5 PM.", category: "Hydration", maxPoints: 8 },
                { description: "Do 50 bodyweight squats throughout the day.", category: "Strength", maxPoints: 12 },
                { description: "Practice 10 minutes of mindfulness or meditation.", category: "Recovery", maxPoints: 5 },
                { description: "Prepare a meal consisting primarily of lean protein and vegetables.", category: "Nutrition", maxPoints: 10 },
            ];
            
            
            const randomTask = taskPool[Math.floor(Math.random() * taskPool.length)];

            todayTask = new Task({
                description: randomTask.description,
                category: randomTask.category,
                maxPoints: randomTask.maxPoints,
                date: new Date() 
            });
            await todayTask.save();
        }

        res.json(todayTask);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching or creating task.');
    }
});

router.post('/submit', async (req, res) => {
   
    const { userId, taskId, photoUrl } = req.body; 

    try {
       
        const existingProof = await Proof.findOne({ userId, taskId });
        if (existingProof) {
            return res.status(400).json({ msg: 'You have already submitted proof for this task.' });
        }

        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        const newProof = new Proof({
            userId,
            taskId,
            photoUrl,
            pointsAwarded: task.maxPoints, 
            status: 'Complete' 
        });
        await newProof.save();

        await User.findByIdAndUpdate(userId, { 
            $inc: { points: task.maxPoints } 
        });

        res.json({ msg: `Proof submitted successfully! Awarded ${task.maxPoints} points.`, proof: newProof });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error submitting proof.');
    }
});


router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find({})
            .select('name points') 
            .sort({ points: -1 }) 
            .limit(10);           
        
        res.json(leaderboard);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching leaderboard.');
    }
});


module.exports = router;