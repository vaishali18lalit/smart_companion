const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: String,
  domain: { type: String, enum: ['ai', 'news', 'general'], required: true },
  source: String,
  url: String,
  publishedAt: Date,
  fetchedAt: { type: Date, default: Date.now },
  tags: [String]
});

module.exports = mongoose.model('Content', contentSchema);