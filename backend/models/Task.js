const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    // The description of the fitness challenge/task for the day
    description: { type: String, required: true },
    // A simple category (e.g., Hydration, Cardio, Strength, Recovery)
    category: { type: String, default: 'General' },
    // Points users get for completing this task
    maxPoints: { type: Number, default: 5 },
    // Date the task is assigned/active
    date: { type: Date, default: Date.now, index: true }, 
});

module.exports = mongoose.model('Task', TaskSchema);