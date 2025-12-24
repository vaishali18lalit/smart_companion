export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  res.status(200).json({
    response: "This is a mock response. The AI service is not connected yet."
  });
}