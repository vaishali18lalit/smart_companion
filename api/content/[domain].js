export default function handler(req, res) {
  const { domain } = req.query;
  
  const mockContent = [
    {
      _id: '1',
      title: 'AI Breakthrough in 2024',
      content: 'Latest developments in artificial intelligence...',
      source: 'Tech News',
      publishedAt: new Date().toISOString(),
      url: 'https://example.com'
    },
    {
      _id: '2', 
      title: 'Machine Learning Trends',
      content: 'Current trends in machine learning and deep learning...',
      source: 'AI Weekly',
      publishedAt: new Date().toISOString(),
      url: 'https://example.com'
    }
  ];
  
  res.status(200).json(mockContent);
}