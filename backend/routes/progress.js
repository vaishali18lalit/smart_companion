const express = require('express');
const Progress = require('../models/Progress');

const router = express.Router();

// Get user progress
router.get('/', async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: 'default' });
    if (!progress) {
      progress = new Progress();
      await progress.save();
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update progress
router.post('/update', async (req, res) => {
  try {
    const { topic, quizScore } = req.body;
    
    let progress = await Progress.findOne({ userId: 'default' });
    if (!progress) progress = new Progress();
    
    if (topic && !progress.topicsCovered.includes(topic)) {
      progress.topicsCovered.push(topic);
    }
    
    if (quizScore !== undefined) {
      progress.quizScores.push({ topic, score: quizScore });
    }
    
    progress.lastActivity = new Date();
    await progress.save();
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;