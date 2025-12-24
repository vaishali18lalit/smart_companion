const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());

// Sample data
const content = [
  {
    _id: '1',
    title: 'Introduction to Machine Learning',
    content: 'Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.',
    domain: 'ai',
    source: 'Sample',
    publishedAt: new Date(),
    fetchedAt: new Date()
  },
  {
    _id: '2',
    title: 'Latest Tech Trends 2024',
    content: 'Artificial intelligence, quantum computing, and sustainable technology are leading the innovation landscape in 2024.',
    domain: 'news',
    source: 'Sample',
    publishedAt: new Date(),
    fetchedAt: new Date()
  },
  {
    _id: '3',
    title: 'The History of Computing',
    content: 'From mechanical calculators to modern supercomputers, the evolution of computing has transformed how we process information.',
    domain: 'general',
    source: 'Sample',
    publishedAt: new Date(),
    fetchedAt: new Date()
  }
];

let progress = {
  userId: 'default',
  topicsCovered: [],
  streak: 0,
  lastActivity: new Date(),
  quizScores: [],
  preferences: {
    domains: ['ai', 'news', 'general'],
    difficulty: 'intermediate'
  }
};

// Routes
app.get('/api/content/:domain', (req, res) => {
  const filtered = content.filter(item => item.domain === req.params.domain);
  res.json(filtered);
});

app.get('/api/content/:domain/:id/summary', (req, res) => {
  const item = content.find(c => c._id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Content not found' });
  
  const summary = `Summary: ${item.content.substring(0, 100)}...`;
  res.json({ ...item, summary });
});

app.get('/api/content/:domain/:id/explain', (req, res) => {
  const item = content.find(c => c._id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Content not found' });
  
  const explanation = `Detailed explanation: ${item.content} This concept is important because it demonstrates fundamental principles in the field.`;
  res.json({ explanation });
});

app.get('/api/content/random/microbreak', (req, res) => {
  const randomItem = content[Math.floor(Math.random() * content.length)];
  const summary = `Summary: ${randomItem.content.substring(0, 100)}...`;
  res.json({ ...randomItem, summary });
});

app.post('/api/chat/ask', (req, res) => {
  const { question } = req.body;
  const answer = `Based on available knowledge, ${question.toLowerCase()} relates to current technological developments and research findings.`;
  res.json({ answer, context: false });
});

app.post('/api/chat/quiz', (req, res) => {
  const { topic } = req.body;
  const quiz = `Question: What is the main concept behind ${topic}?\nA) Option A\nB) Option B\nC) Option C\nD) Option D\nAnswer: B`;
  res.json({ quiz });
});

app.get('/api/progress', (req, res) => {
  res.json(progress);
});

app.post('/api/progress/update', (req, res) => {
  const { topic, quizScore } = req.body;
  
  if (topic && !progress.topicsCovered.includes(topic)) {
    progress.topicsCovered.push(topic);
  }
  
  if (quizScore !== undefined) {
    progress.quizScores.push({ topic, score: quizScore, date: new Date() });
  }
  
  progress.lastActivity = new Date();
  res.json(progress);
});

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Demo mode - using in-memory storage`);
  console.log(`🌐 Backend API: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});