import React, { useState, useEffect } from 'react';
import { getMicroBreakContent, generateQuiz, updateProgress } from '../services/api';

function MicroBreakPopup({ onClose, onComplete }) {
  const [content, setContent] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    loadMicroBreakContent();
  }, []);

  const loadMicroBreakContent = async () => {
    try {
      const data = await getMicroBreakContent();
      setContent(data);
    } catch (error) {
      console.error('Error loading micro-break content:', error);
    }
  };

  const handleStartQuiz = async () => {
    try {
      const quizData = await generateQuiz(content.title);
      setQuiz(quizData.quiz);
      setShowQuiz(true);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  const handleQuizSubmit = async () => {
    // Simple scoring - in real app, would parse quiz format properly
    const score = Math.random() > 0.5 ? 1 : 0; // Placeholder scoring
    await updateProgress(content.title, score);
    onComplete();
    onClose();
  };

  if (!content) return null;

  return (
    <>
      <div className="popup-overlay" onClick={onClose} />
      <div className="micro-break-popup">
        <h3>🧠 Micro Learning Break</h3>
        
        {!showQuiz ? (
          <>
            <h4>{content.title}</h4>
            <p>{content.summary || content.content}</p>
            <div className="content-meta">
              Source: {content.source} • {content.domain}
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <button className="btn" onClick={handleStartQuiz}>
                Take Quick Quiz
              </button>
              <button className="btn" onClick={onClose} style={{ marginLeft: '10px' }}>
                Skip for Now
              </button>
            </div>
          </>
        ) : (
          <>
            <h4>Quick Quiz</h4>
            <div style={{ whiteSpace: 'pre-line', marginBottom: '15px' }}>
              {quiz}
            </div>
            
            <div>
              <input
                type="text"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                placeholder="Enter your answer (A, B, C, or D)"
                maxLength="1"
                style={{ width: '50px', textAlign: 'center' }}
              />
            </div>
            
            <div style={{ marginTop: '15px' }}>
              <button className="btn" onClick={handleQuizSubmit}>
                Submit Answer
              </button>
              <button className="btn" onClick={onClose} style={{ marginLeft: '10px' }}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MicroBreakPopup;