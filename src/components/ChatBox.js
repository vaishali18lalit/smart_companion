import React, { useState } from 'react';
import { askQuestion } from '../services/api';

function ChatBox({ onProgressUpdate }) {
  const [messages, setMessages] = useState([
    { type: 'ai', content: 'Hi! I\'m your AI learning companion. Ask me anything about technology, AI, or general knowledge!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await askQuestion(input);
      const aiMessage = { type: 'ai', content: response.answer };
      setMessages(prev => [...prev, aiMessage]);
      onProgressUpdate();
    } catch (error) {
      const errorMessage = { 
        type: 'ai', 
        content: 'Sorry, I encountered an error. Please try again or rephrase your question.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setInput('');
    setLoading(false);
  };

  const quickQuestions = [
    'What is machine learning?',
    'Explain quantum computing',
    'Latest AI trends',
    'How does blockchain work?'
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <div className="chat-box">
      <h3>🤖 AI Assistant</h3>
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.content}
          </div>
        ))}
        {loading && (
          <div className="message ai">
            <span className="typing-indicator">🤔 Thinking...</span>
          </div>
        )}
      </div>
      
      {messages.length === 1 && (
        <div className="quick-questions">
          <p><strong>Try asking:</strong></p>
          {quickQuestions.map((question, index) => (
            <button 
              key={index}
              className="quick-question-btn"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about AI, technology, or any topic..."
          disabled={loading}
        />
        <button type="submit" className="btn" disabled={loading || !input.trim()}>
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default ChatBox;