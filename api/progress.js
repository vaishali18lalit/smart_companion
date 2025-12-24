export default function handler(req, res) {
  const mockProgress = {
    streak: 5,
    topicsCovered: ['AI', 'Machine Learning'],
    quizScores: [
      { topic: 'AI', score: 0.8 },
      { topic: 'ML', score: 0.9 }
    ],
    lastActivity: new Date().toISOString()
  };
  
  res.status(200).json(mockProgress);
}