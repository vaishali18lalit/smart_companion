import React, { useState } from 'react';
import { getContentSummary, getContentExplanation, updateProgress } from '../services/api';
import RapidQuiz from './RapidQuiz';

function ContentFeed({ domain, content, onContentUpdate, onProgressUpdate }) {
  const [expandedContent, setExpandedContent] = useState({});
  const [loading, setLoading] = useState({});
  const [showRapidQuiz, setShowRapidQuiz] = useState(false);

  const handleSummary = async (item) => {
    setLoading(prev => ({ ...prev, [item._id]: 'summary' }));
    try {
      const data = await getContentSummary(domain, item._id);
      setExpandedContent(prev => ({
        ...prev,
        [item._id]: { ...data, type: 'summary' }
      }));
      await updateProgress(item.title);
      onProgressUpdate();
    } catch (error) {
      console.error('Error getting summary:', error);
    } finally {
      setLoading(prev => ({ ...prev, [item._id]: null }));
    }
  };

  const handleExplanation = async (item) => {
    setLoading(prev => ({ ...prev, [item._id]: 'explanation' }));
    try {
      const data = await getContentExplanation(domain, item._id);
      setExpandedContent(prev => ({
        ...prev,
        [item._id]: { ...data, type: 'explanation' }
      }));
      await updateProgress(item.title);
      onProgressUpdate();
    } catch (error) {
      console.error('Error getting explanation:', error);
    } finally {
      setLoading(prev => ({ ...prev, [item._id]: null }));
    }
  };

  const getDomainTitle = (domain) => {
    const titles = {
      ai: '🤖 AI Research & Insights',
      news: '📰 Latest Tech News',
      general: '📚 General Knowledge'
    };
    return titles[domain] || 'Content';
  };

  const getDomainAction = (domain) => {
    const actions = {
      ai: { text: '🧠 AI Challenge', desc: 'Test your AI knowledge' },
      news: { text: '⚡ Tech Quiz', desc: 'Quick tech news quiz' },
      general: { text: '🎯 Rapid Fire', desc: '10 questions, 15 seconds each' }
    };
    return actions[domain] || { text: 'Quiz', desc: 'Test your knowledge' };
  };

  if (showRapidQuiz) {
    return (
      <RapidQuiz 
        domain={domain}
        onClose={() => setShowRapidQuiz(false)}
        onScoreUpdate={onProgressUpdate}
      />
    );
  }

  if (!content || !Array.isArray(content) || content.length === 0) {
    return (
      <div className="content-feed">
        <h2>{getDomainTitle(domain)}</h2>
        <div className="no-content">
          <p>No content available for this domain yet.</p>
          <button className="btn" onClick={() => onContentUpdate(domain)}>
            Refresh Content
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-feed">
      <div className="domain-header">
        <h2>{getDomainTitle(domain)}</h2>
        <button 
          className="btn quiz-challenge-btn"
          onClick={() => setShowRapidQuiz(true)}
        >
          {getDomainAction(domain).text}
          <small>{getDomainAction(domain).desc}</small>
        </button>
      </div>
      
      {Array.isArray(content) && content.map(item => (
        <div key={item._id} className="content-item">
          <h3>{item.title}</h3>
          <div className="content-meta">
            <span>📍 {item.source}</span>
            <span>📅 {new Date(item.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="content-text">{item.content}</div>
          
          {expandedContent[item._id] && (
            <div className="expanded-content">
              <h4>
                {expandedContent[item._id].type === 'summary' ? '📝 Summary' : '🔍 Detailed Explanation'}
              </h4>
              <p>{expandedContent[item._id].summary || expandedContent[item._id].explanation}</p>
            </div>
          )}
          
          <div className="content-actions">
            <button 
              className="btn" 
              onClick={() => handleSummary(item)}
              disabled={loading[item._id] === 'summary'}
            >
              {loading[item._id] === 'summary' ? 'Loading...' : '📝 Quick Summary'}
            </button>
            <button 
              className="btn" 
              onClick={() => handleExplanation(item)}
              disabled={loading[item._id] === 'explanation'}
            >
              {loading[item._id] === 'explanation' ? 'Loading...' : '🔍 Detailed Explanation'}
            </button>
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn secondary">
                🔗 Read Full Article
              </a>
            )}
          </div>
        </div>
        ))}
    </div>
  );
}

export default ContentFeed;