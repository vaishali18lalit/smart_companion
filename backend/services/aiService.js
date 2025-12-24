const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AIService {
  async summarizeContent(content, type = 'summary') {
    try {
      const prompt = type === 'detailed' 
        ? `Provide a detailed explanation of this content in simple terms: ${content}`
        : `Summarize this content in 2-3 sentences: ${content}`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: type === 'detailed' ? 300 : 100
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI summarization error:', error.message);
      return 'Summary unavailable';
    }
  }

  async answerQuestion(question, context = '') {
    try {
      const prompt = context 
        ? `Based on this context: ${context}\n\nAnswer this question: ${question}`
        : `Answer this question about general knowledge, AI, or current events: ${question}`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI question answering error:', error.message);
      return 'Sorry, I cannot answer that right now.';
    }
  }

  async generateQuiz(topic) {
    try {
      const prompt = `Generate a simple multiple choice question about ${topic}. Format: Question: [question]\nA) [option]\nB) [option]\nC) [option]\nD) [option]\nAnswer: [letter]`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Quiz generation error:', error.message);
      return null;
    }
  }
}

module.exports = new AIService();