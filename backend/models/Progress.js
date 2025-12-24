const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: String, default: 'default' },
  topicsCovered: [String],
  streak: { type: Number, default: 0 },
  lastActivity: { type: Date, default: Date.now },
  quizScores: [{
    topic: String,
    score: Number,
    date: { type: Date, default: Date.now }
  }],
  preferences: {
    domains: [{ type: String, enum: ['ai', 'news', 'general'] }],
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' }
  }
});

module.exports = mongoose.model('Progress', progressSchema);