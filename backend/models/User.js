const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }, // plain text OK for prototype; mention in README
  points: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
