const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    category: { type: String, default: 'General' },
    maxPoints: { type: Number, default: 5 },
    date: { type: Date, default: Date.now, index: true }, 
});

module.exports = mongoose.model('Task', TaskSchema);