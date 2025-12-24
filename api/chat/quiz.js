export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const mockQuiz = {
    quiz: `Question: What is machine learning?
A) A type of computer hardware
B) A method of teaching computers to learn from data
C) A programming language
D) A database system
Answer: B`
  };
  
  res.status(200).json(mockQuiz);
}