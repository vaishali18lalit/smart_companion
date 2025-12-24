const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const contentRoutes = require('./routes/content');
const chatRoutes = require('./routes/chat');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-knowledge-companion')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/progress', progressRoutes);

// Start content fetching service
require('./services/contentFetcher');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});