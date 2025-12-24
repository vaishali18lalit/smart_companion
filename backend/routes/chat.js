const express = require('express');
const Content = require('../models/Content');
const aiService = require('../services/aiService');

const router = express.Router();

// Chat endpoint for questions
router.post('/ask', async (req, res) => {
  try {
    const { question, domain } = req.body;
    
    // Find relevant content for context
    let context = '';
    if (domain) {
      const relevantContent = await Content.findOne({ 
        domain,
        $or: [
          { title: { $regex: question, $options: 'i' } },
          { content: { $regex: question, $options: 'i' } }
        ]
      });
      
      if (relevantContent) {
        context = relevantContent.content;
      }
    }
    
    const answer = await aiService.answerQuestion(question, context);
    res.json({ answer, context: !!context });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate quiz
router.post('/quiz', async (req, res) => {
  try {
    const { topic } = req.body;
    const quiz = await aiService.generateQuiz(topic);
    res.json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;