const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, default: 'Other' }, 
  durationMin: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
