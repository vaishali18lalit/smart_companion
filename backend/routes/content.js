const express = require('express');
const Content = require('../models/Content');
const aiService = require('../services/aiService');

const router = express.Router();

// Get content by domain
router.get('/:domain', async (req, res) => {
  try {
    const { domain } = req.params;
    const { limit = 10 } = req.query;
    
    const content = await Content.find({ domain })
      .sort({ fetchedAt: -1 })
      .limit(parseInt(limit));
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get content with AI summary
router.get('/:domain/:id/summary', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ error: 'Content not found' });

    if (!content.summary) {
      content.summary = await aiService.summarizeContent(content.content);
      await content.save();
    }

    res.json({ ...content.toObject(), summary: content.summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get detailed explanation
router.get('/:domain/:id/explain', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ error: 'Content not found' });

    const explanation = await aiService.summarizeContent(content.content, 'detailed');
    res.json({ explanation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get random content for micro-breaks
router.get('/random/microbreak', async (req, res) => {
  try {
    const count = await Content.countDocuments();
    const random = Math.floor(Math.random() * count);
    const content = await Content.findOne().skip(random);
    
    if (content && !content.summary) {
      content.summary = await aiService.summarizeContent(content.content);
      await content.save();
    }
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;