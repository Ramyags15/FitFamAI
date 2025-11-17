const mongoose = require('mongoose');

const ProofSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    photoUrl: { type: String, required: true }, 
    pointsAwarded: { type: Number, default: 0 }, 
    status: { type: String, enum: ['Pending', 'Complete', 'Rejected'], default: 'Complete' }, 
    submissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proof', ProofSchema);