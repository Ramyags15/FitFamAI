const mongoose = require('mongoose');

const ProofSchema = new mongoose.Schema({
    // Link to User model
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Link to Task model
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    // Simple mock URL for the photo proof (we won't handle actual file uploads for prototype speed)
    photoUrl: { type: String, required: true }, 
    // Score awarded to the user (based on maxPoints in Task)
    pointsAwarded: { type: Number, default: 0 }, 
    // Status: Pending Review, Complete, Rejected (Simple flow for prototype)
    status: { type: String, enum: ['Pending', 'Complete', 'Rejected'], default: 'Complete' }, // Set to Complete for instant gratification/prototype speed
    // Date of submission
    submissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proof', ProofSchema);