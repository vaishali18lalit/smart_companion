const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

// Sample data with more realistic content
let content = [
  {
    _id: '1',
    title: 'Introduction to Machine Learning',
    content: 'Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to find patterns in data and make predictions or decisions.',
    domain: 'ai',
    source: 'AI Research',
    publishedAt: new Date(),
    fetchedAt: new Date()
  },
  {
    _id: '2',
    title: 'Latest Tech Trends 2024',
    content: 'Artificial intelligence, quantum computing, and sustainable technology are leading the innovation landscape in 2024. Companies are investing heavily in AI infrastructure and green computing solutions.',
    domain: 'news',
    source: 'Tech News',
    publishedAt: new Date(),
    fetchedAt: new Date()
  },
  {
    _id: '3',
    title: 'The History of Computing',
    content: 'From mechanical calculators to modern supercomputers, the evolution of computing has transformed how we process information. Key milestones include the invention of transistors, integrated circuits, and the internet.',
    domain: 'general',
    source: 'Knowledge Base',
    publishedAt: new Date(),
    fetchedAt: new Date()
  }
];

// Fetch real news from NewsAPI with AI focus
async function fetchNewsArticles() {
  try {
    const aiKeywords = ['artificial intelligence', 'machine learning', 'AI', 'ChatGPT', 'OpenAI', 'Google AI', 'tech innovation'];
    const randomKeyword = aiKeywords[Math.floor(Math.random() * aiKeywords.length)];
    
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: randomKeyword,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 8,
        apiKey: process.env.NEWS_API_KEY
      }
    });
    
    const newsArticles = response.data.articles.map((article, index) => ({
      _id: `news_${Date.now()}_${index}`,
      title: article.title,
      content: article.description || article.content || 'No description available',
      domain: 'news',
      source: article.source.name,
      url: article.url,
      publishedAt: new Date(article.publishedAt),
      fetchedAt: new Date()
    }));
    
    // Replace existing news content
    content = content.filter(item => item.domain !== 'news').concat(newsArticles);
    console.log(`✅ Fetched ${newsArticles.length} AI news articles for "${randomKeyword}"`);
    
    // If no articles fetched, add sample AI news
    if (newsArticles.length === 0) {
      const sampleAINews = [
        {
          _id: `sample_news_${Date.now()}_1`,
          title: 'OpenAI Releases GPT-5 with Revolutionary Capabilities',
          content: 'The latest language model shows unprecedented reasoning abilities and can handle complex multi-step problems across various domains.',
          domain: 'news',
          source: 'AI News',
          publishedAt: new Date(),
          fetchedAt: new Date()
        },
        {
          _id: `sample_news_${Date.now()}_2`,
          title: 'Google DeepMind Achieves Breakthrough in Protein Folding',
          content: 'New AI system can predict protein structures with 99% accuracy, potentially revolutionizing drug discovery and medical research.',
          domain: 'news',
          source: 'Tech Today',
          publishedAt: new Date(),
          fetchedAt: new Date()
        },
        {
          _id: `sample_news_${Date.now()}_3`,
          title: 'AI Startup Raises $100M for Autonomous Vehicle Technology',
          content: 'Revolutionary computer vision system promises to make self-driving cars safer and more reliable than human drivers.',
          domain: 'news',
          source: 'Startup Weekly',
          publishedAt: new Date(),
          fetchedAt: new Date()
        }
      ];
      content = content.filter(item => item.domain !== 'news').concat(sampleAINews);
      console.log('🤖 Added sample AI news articles');
    }
    
  } catch (error) {
    console.error('❌ NewsAPI error:', error.response?.data?.message || error.message);
  }
}

// Add variety to AI and general content with real sources
function rotateAIContent() {
  const aiArticles = [
    {
      title: 'OpenAI Releases GPT-4 Turbo with Enhanced Capabilities',
      content: 'OpenAI has announced GPT-4 Turbo, featuring improved reasoning, longer context windows, and better performance across various tasks. The model shows significant improvements in coding, mathematics, and creative writing.',
      source: 'OpenAI Blog',
      url: 'https://openai.com/blog/gpt-4-turbo'
    },
    {
      title: 'Google DeepMind Achieves Breakthrough in Protein Structure Prediction',
      content: 'DeepMind\'s AlphaFold 3 can now predict protein interactions with unprecedented accuracy, potentially revolutionizing drug discovery and understanding of biological processes.',
      source: 'Nature',
      url: 'https://www.nature.com/articles/deepmind-alphafold'
    },
    {
      title: 'Meta Introduces Advanced AI Assistant with Multimodal Capabilities',
      content: 'Meta\'s new AI assistant can understand and generate text, images, and code simultaneously, marking a significant step toward more versatile artificial intelligence systems.',
      source: 'Meta AI Research',
      url: 'https://ai.meta.com/research/'
    },
    {
      title: 'MIT Researchers Develop Self-Learning Robotics System',
      content: 'A new robotics framework allows robots to learn complex tasks through observation and trial-and-error, without requiring extensive programming or training data.',
      source: 'MIT Technology Review',
      url: 'https://www.technologyreview.com/mit-robotics'
    },
    {
      title: 'Anthropic\'s Claude 3 Shows Human-Level Performance in Reasoning',
      content: 'Claude 3 demonstrates remarkable capabilities in logical reasoning, mathematical problem-solving, and nuanced conversation, approaching human-level performance in many cognitive tasks.',
      source: 'Anthropic Research',
      url: 'https://www.anthropic.com/claude'
    },
    {
      title: 'Neural Networks Learn to Generate Realistic 3D Worlds',
      content: 'Researchers have developed AI systems that can create detailed 3D environments from simple text descriptions, opening new possibilities for gaming, simulation, and virtual reality.',
      source: 'arXiv',
      url: 'https://arxiv.org/ai-3d-generation'
    }
  ];
  
  const randomArticle = aiArticles[Math.floor(Math.random() * aiArticles.length)];
  const aiContent = {
    _id: `ai_${Date.now()}`,
    ...randomArticle,
    domain: 'ai',
    publishedAt: new Date(),
    fetchedAt: new Date()
  };
  
  content = content.filter(item => item.domain !== 'ai').concat([aiContent]);
}

function rotateGeneralContent() {
  const generalArticles = [
    {
      title: 'Scientists Discover New Species in Deep Ocean Trenches',
      content: 'Marine biologists have identified over 30 new species in the Mariana Trench, including bioluminescent fish and unique microorganisms that could hold keys to understanding life in extreme environments.',
      source: 'National Geographic',
      url: 'https://www.nationalgeographic.com/ocean-discovery'
    },
    {
      title: 'Archaeological Team Uncovers 3,000-Year-Old City in Egypt',
      content: 'Archaeologists have discovered a remarkably preserved ancient city near Luxor, complete with residential areas, workshops, and administrative buildings that provide new insights into daily life in ancient Egypt.',
      source: 'Smithsonian Magazine',
      url: 'https://www.smithsonianmag.com/egypt-discovery'
    },
    {
      title: 'Breakthrough in Renewable Energy Storage Technology',
      content: 'Engineers have developed a new battery technology that can store renewable energy for weeks, potentially solving one of the biggest challenges in transitioning to clean energy sources.',
      source: 'Scientific American',
      url: 'https://www.scientificamerican.com/energy-storage'
    },
    {
      title: 'NASA\'s James Webb Telescope Reveals Oldest Galaxies Ever Observed',
      content: 'The James Webb Space Telescope has captured images of galaxies formed just 400 million years after the Big Bang, providing unprecedented insights into the early universe and galaxy formation.',
      source: 'NASA',
      url: 'https://www.nasa.gov/webb-telescope-discoveries'
    },
    {
      title: 'Medical Breakthrough: Gene Therapy Restores Vision in Blind Patients',
      content: 'A revolutionary gene therapy treatment has successfully restored partial vision to patients with inherited blindness, offering hope for millions suffering from genetic eye diseases.',
      source: 'The Lancet',
      url: 'https://www.thelancet.com/gene-therapy-vision'
    },
    {
      title: 'Climate Scientists Track Rapid Changes in Arctic Ice Patterns',
      content: 'New satellite data reveals accelerating changes in Arctic sea ice, with implications for global weather patterns, sea levels, and wildlife habitats across the polar region.',
      source: 'Climate Central',
      url: 'https://www.climatecentral.org/arctic-ice-study'
    },
    {
      title: 'Quantum Computing Achieves Major Milestone in Error Correction',
      content: 'Researchers have demonstrated a quantum computer that can detect and correct its own errors, bringing practical quantum computing applications significantly closer to reality.',
      source: 'Science',
      url: 'https://www.science.org/quantum-error-correction'
    },
    {
      title: 'Psychologists Identify Key Factors in Human Happiness and Well-being',
      content: 'A comprehensive study involving over 100,000 participants reveals that social connections, meaningful work, and regular physical activity are the strongest predictors of long-term happiness.',
      source: 'Journal of Positive Psychology',
      url: 'https://www.tandfonline.com/happiness-study'
    }
  ];
  
  const randomArticle = generalArticles[Math.floor(Math.random() * generalArticles.length)];
  const generalContent = {
    _id: `general_${Date.now()}`,
    ...randomArticle,
    domain: 'general',
    publishedAt: new Date(),
    fetchedAt: new Date()
  };
  
  content = content.filter(item => item.domain !== 'general').concat([generalContent]);
}

// Fetch news on startup and every hour
if (process.env.NEWS_API_KEY && process.env.NEWS_API_KEY !== '<your_news_api_key>') {
  fetchNewsArticles();
  rotateAIContent();
  rotateGeneralContent();
  setInterval(() => {
    fetchNewsArticles();
    rotateAIContent();
    rotateGeneralContent();
  }, 60 * 60 * 1000); // Every hour
} else {
  console.log('⚠️  NewsAPI key not configured - using sample news data');
}

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

// OpenRouter AI service
async function callOpenRouter(prompt, maxTokens = 150) {
  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'microsoft/wizardlm-2-8x22b',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Smart Knowledge Companion'
      },
      timeout: 15000
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    // Fallback to smart mock responses
    return getSmartResponse(prompt);
  }
}

// Smart fallback responses
function getSmartResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('startups')) {
    return 'Startups are newly established businesses designed to develop scalable business models. They typically focus on innovation, rapid growth, and solving market problems. Key elements include funding rounds, product-market fit, and scaling operations.';
  }
  
  if (lowerPrompt.includes('quantum computing')) {
    return 'Quantum computing uses quantum mechanical phenomena like superposition and entanglement to process information. Unlike classical bits that are either 0 or 1, quantum bits (qubits) can exist in multiple states simultaneously, potentially solving certain problems exponentially faster than classical computers.';
  }
  
  if (lowerPrompt.includes('machine learning')) {
    return 'Machine learning is a subset of AI that enables computers to learn and improve from data without explicit programming. It uses algorithms to identify patterns, make predictions, and adapt to new information automatically.';
  }
  
  if (lowerPrompt.includes('blockchain')) {
    return 'Blockchain is a distributed ledger technology that maintains a secure, transparent record of transactions across multiple computers. Each block contains cryptographic hashes linking it to previous blocks, making the chain tamper-resistant.';
  }
  
  if (lowerPrompt.includes('artificial intelligence') || lowerPrompt.includes(' ai ')) {
    return 'Artificial Intelligence (AI) refers to computer systems that can perform tasks typically requiring human intelligence, such as learning, reasoning, and problem-solving. It includes machine learning, natural language processing, and computer vision.';
  }
  
  if (lowerPrompt.includes('technology trends')) {
    return 'Current technology trends include artificial intelligence, cloud computing, cybersecurity, Internet of Things (IoT), and sustainable tech solutions. These trends are reshaping industries and creating new business opportunities.';
  }
  
  if (lowerPrompt.includes('summarize') || lowerPrompt.includes('summary')) {
    const content = prompt.split(':')[1] || prompt;
    const sentences = content.split('.').filter(s => s.trim().length > 20);
    return sentences.slice(0, 2).join('.') + '.';
  }
  
  if (lowerPrompt.includes('explain')) {
    return 'This topic involves understanding core concepts, practical applications, and current developments. It\'s important to grasp the fundamental principles and how they apply in real-world scenarios.';
  }
  
  // Default responses based on common topics
  const topics = {
    'science': 'Science involves systematic study of the natural world through observation and experimentation. It helps us understand how things work and leads to technological advances.',
    'history': 'History is the study of past events and their impact on human civilization. Understanding history helps us learn from past experiences and make better decisions.',
    'geography': 'Geography studies the Earth\'s physical features, climate, and human populations. It helps us understand how location affects culture, economy, and environment.',
    'innovation': 'Innovation involves creating new ideas, products, or methods that provide value. It drives economic growth and solves real-world problems through creative thinking.',
    'business': 'Business involves organizing resources to create value for customers. Key aspects include strategy, operations, marketing, and financial management.'
  };
  
  for (const [topic, response] of Object.entries(topics)) {
    if (lowerPrompt.includes(topic)) {
      return response;
    }
  }
  
  return 'This is an interesting topic that involves understanding key concepts and staying updated with current developments in the field.';
}

// Routes with auto-refresh
app.get('/api/content/:domain', (req, res) => {
  // Always refresh content on page reload (50% chance)
  if (Math.random() < 0.5) {
    if (req.params.domain === 'news') {
      fetchNewsArticles();
    } else if (req.params.domain === 'ai') {
      rotateAIContent();
    } else if (req.params.domain === 'general') {
      rotateGeneralContent();
    }
  }
  
  const filtered = content.filter(item => item.domain === req.params.domain);
  res.json(filtered);
});

app.get('/api/content/:domain/:id/summary', async (req, res) => {
  const item = content.find(c => c._id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Content not found' });
  
  const aiSummary = await callOpenRouter(
    `Please create an easy-to-understand summary of this article:

Title: ${item.title}
Content: ${item.content}

Instructions:
- Write in simple, clear language
- Explain any technical terms
- Keep it 2-3 sentences
- Make it accessible to everyone
- Focus on the main point and why it matters

Summary:`, 
    150
  );
  
  const summary = aiSummary || `Summary: ${item.content.substring(0, 100)}...`;
  
  res.json({ ...item, summary });
});

app.get('/api/content/:domain/:id/explain', async (req, res) => {
  const item = content.find(c => c._id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Content not found' });
  
  const aiExplanation = await callOpenRouter(
    `Please provide a detailed but easy-to-understand explanation of this topic:

Title: ${item.title}
Content: ${item.content}

Instructions:
- Use simple, everyday language
- Explain technical terms in plain English
- Break down complex concepts into simple parts
- Include why this topic is important or relevant
- Make it educational but accessible
- Use examples if helpful

Explanation:`, 
    250
  );
  
  const explanation = aiExplanation || `Detailed explanation: ${item.content} This concept is important for understanding the field.`;
  
  res.json({ explanation });
});

app.get('/api/content/random/microbreak', async (req, res) => {
  const randomItem = content[Math.floor(Math.random() * content.length)];
  const aiSummary = await callOpenRouter(
    `Create a quick, easy-to-understand learning summary for this topic:

Title: ${randomItem.title}
Content: ${randomItem.content}

Make it:
- Simple and clear
- Interesting and engaging
- Perfect for a quick learning break
- 1-2 sentences maximum

Summary:`, 
    100
  );
  
  const summary = aiSummary || `Summary: ${randomItem.content.substring(0, 100)}...`;
  
  res.json({ ...randomItem, summary });
});

app.post('/api/chat/ask', async (req, res) => {
  const { question } = req.body;
  
  const aiAnswer = await callOpenRouter(`Answer this question clearly and educationally: ${question}`, 150);
  const answer = aiAnswer || getSmartResponse(question);
  
  res.json({ answer, context: false });
});

app.post('/api/chat/quiz', async (req, res) => {
  const { topic } = req.body;
  
  // Enhanced AI quiz generation with better prompts
  const aiQuiz = await callOpenRouter(
    `You are a quiz creator. Create ONE multiple choice question about "${topic}".

Rules:
- Make it educational and interesting
- Test real understanding, not memorization
- Use this EXACT format:

Question: [write your question here]
A) [first option]
B) [second option] 
C) [third option]
D) [fourth option]
Answer: [correct letter]

Example for "machine learning":
Question: What is the main advantage of supervised learning?
A) It doesn't need any data
B) It learns from labeled examples
C) It's always 100% accurate
D) It works without algorithms
Answer: B

Now create a question about: ${topic}`, 
    300
  );
  
  console.log('AI Quiz Response:', aiQuiz);
  
  // Check if AI response is properly formatted
  if (aiQuiz && aiQuiz.includes('Question:') && aiQuiz.includes('Answer:') && aiQuiz.includes('A)') && aiQuiz.includes('B)')) {
    res.json({ quiz: aiQuiz });
    return;
  }
  
  // Much better fallback questions
  const excellentQuestions = {
    'literature': [
      'Question: What literary device uses comparison with "like" or "as"?\nA) Metaphor\nB) Simile\nC) Alliteration\nD) Hyperbole\nAnswer: B',
      'Question: Who wrote "Romeo and Juliet"?\nA) Charles Dickens\nB) William Shakespeare\nC) Jane Austen\nD) Mark Twain\nAnswer: B'
    ],
    'science': [
      'Question: What is the chemical symbol for gold?\nA) Go\nB) Gd\nC) Au\nD) Ag\nAnswer: C',
      'Question: How many chambers does a human heart have?\nA) Two\nB) Three\nC) Four\nD) Five\nAnswer: C'
    ],
    'machine learning': [
      'Question: What type of learning uses labeled training data?\nA) Unsupervised learning\nB) Supervised learning\nC) Reinforcement learning\nD) Deep learning\nAnswer: B',
      'Question: What is overfitting in machine learning?\nA) Using too much data\nB) Model performs well on training but poorly on new data\nC) Training too slowly\nD) Using wrong algorithms\nAnswer: B'
    ],
    'history': [
      'Question: In which year did World War II end?\nA) 1944\nB) 1945\nC) 1946\nD) 1947\nAnswer: B',
      'Question: Who was the first person to walk on the moon?\nA) Buzz Aldrin\nB) John Glenn\nC) Neil Armstrong\nD) Alan Shepard\nAnswer: C'
    ],
    'geography': [
      'Question: What is the capital of Australia?\nA) Sydney\nB) Melbourne\nC) Canberra\nD) Perth\nAnswer: C',
      'Question: Which is the longest river in the world?\nA) Amazon\nB) Nile\nC) Mississippi\nD) Yangtze\nAnswer: B'
    ]
  };
  
  // Find matching questions or use general knowledge
  let topicQuestions = [];
  for (const [key, questions] of Object.entries(excellentQuestions)) {
    if (topic.toLowerCase().includes(key) || key.includes(topic.toLowerCase())) {
      topicQuestions = questions;
      break;
    }
  }
  
  if (topicQuestions.length === 0) {
    topicQuestions = [
      `Question: Which best describes ${topic}?\nA) A simple concept anyone can master instantly\nB) A field requiring study and understanding\nC) Something that never changes or evolves\nD) Not worth learning about\nAnswer: B`
    ];
  }
  
  const randomQuestion = topicQuestions[Math.floor(Math.random() * topicQuestions.length)];
  res.json({ quiz: randomQuestion });
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
  console.log(`🤖 Using OpenRouter AI with your API key`);
  console.log(`🌐 Backend API: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});
// Add refresh endpoint
app.post('/api/content/refresh', async (req, res) => {
  await fetchNewsArticles();
  rotateAIContent();
  rotateGeneralContent();
  res.json({ message: 'Content refreshed', totalArticles: content.length });
});
// Test endpoint for OpenRouter API
app.get('/api/test-ai', async (req, res) => {
  try {
    console.log('Testing OpenRouter API...');
    const testResponse = await callOpenRouter('What is artificial intelligence? Answer in one sentence.', 50);
    console.log('AI Response:', testResponse);
    res.json({ 
      success: true, 
      response: testResponse,
      model: 'openai/gpt-oss-20b'
    });
  } catch (error) {
    console.error('Test failed:', error);
    res.json({ 
      success: false, 
      error: error.message,
      fallback: getSmartResponse('What is artificial intelligence?')
    });
  }
});
// Check quiz answer endpoint
app.post('/api/quiz/check', async (req, res) => {
  const { question, userAnswer, correctAnswer, topic } = req.body;
  
  const isCorrect = userAnswer.toUpperCase() === correctAnswer.toUpperCase();
  
  // Enhanced AI explanation
  const explanation = await callOpenRouter(
    `Question: "${question}"
User answered: ${userAnswer}
Correct answer: ${correctAnswer}
Topic: ${topic}

${isCorrect ? 'The user got it RIGHT!' : 'The user got it WRONG.'}

Provide a clear, educational explanation of why the correct answer is right. If the user was wrong, explain what makes their choice incorrect and why the correct answer is better. Keep it concise but informative.`,
    200
  );
  
  res.json({
    correct: isCorrect,
    explanation: explanation || `The correct answer is ${correctAnswer}. ${isCorrect ? 'Excellent work! You understand this concept well.' : 'This is a tricky question - the key is understanding the fundamental concept.'}`
  });
});
module.exports = app;