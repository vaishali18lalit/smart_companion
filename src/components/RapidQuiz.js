import React, { useState, useEffect } from 'react';
import { generateQuiz, updateProgress, checkQuizAnswer } from '../services/api';

function RapidQuiz({ domain, onClose, onScoreUpdate }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const loadNextQuestion = async () => {
    try {
      const topics = {
        ai: ['machine learning', 'neural networks', 'deep learning', 'computer vision'],
        news: ['technology trends', 'startups', 'innovation', 'digital transformation'],
        general: ['science', 'history', 'geography', 'literature']
      };
      
      const randomTopic = topics[domain][Math.floor(Math.random() * topics[domain].length)];
      const response = await generateQuiz(randomTopic);
      setCurrentQuestion({ ...response, topic: randomTopic });
      setTimeLeft(15);
      setSelectedAnswer('');
      setShowResult(false);
      setAnswerFeedback(null);
      setShowNextButton(false);
    } catch (error) {
      console.error('Error loading question:', error);
    }
  };

  const handleTimeout = () => {
    setShowResult(true);
    setAnswerFeedback({
      correct: false,
      explanation: 'Time\'s up! The correct answer will be explained in the next question.'
    });
    setStreak(0);
    setTimeout(() => {
      setQuestionCount(questionCount + 1);
      if (questionCount + 1 >= 10) {
        endGame();
      }
    }, 2000);
  };

  const endGame = async () => {
    setGameActive(false);
    await updateProgress(`Rapid Quiz - ${domain}`, score);
    onScoreUpdate();
  };

  const handleNext = () => {
    setQuestionCount(questionCount + 1);
    if (questionCount + 1 >= 10) {
      endGame();
    }
  };

  const handleAnswer = async (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    setShowNextButton(true);
    
    // Extract correct answer from quiz
    const correctAnswer = currentQuestion.quiz.split('\n').find(line => line.startsWith('Answer:'))?.replace('Answer: ', '') || 'B';
    const questionText = currentQuestion.quiz.split('\n')[0].replace('Question: ', '');
    
    try {
      const feedback = await checkQuizAnswer(questionText, answer, correctAnswer, currentQuestion.topic);
      setAnswerFeedback(feedback);
      
      if (feedback.correct) {
        const points = Math.max(1, Math.floor(timeLeft / 3));
        setScore(score + points);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }
    } catch (error) {
      console.error('Error checking answer:', error);
      const isCorrect = answer === correctAnswer;
      setAnswerFeedback({
        correct: isCorrect,
        explanation: isCorrect ? 'Correct! Well done!' : `Wrong! The correct answer was ${correctAnswer}.`
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (gameActive && questionCount < 10) {
      loadNextQuestion();
    }
  }, [questionCount, gameActive]);

  const getScoreColor = () => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getStreakEmoji = () => {
    if (streak >= 5) return '🔥';
    if (streak >= 3) return '⚡';
    if (streak >= 1) return '✨';
    return '';
  };

  if (!gameActive) {
    return (
      <div className="rapid-quiz-container">
        <div className="quiz-results">
          <h2>🎯 Quiz Complete!</h2>
          <div className="final-score" style={{ color: getScoreColor() }}>
            Score: {score} points
          </div>
          <div className="quiz-stats">
            <div>Questions: {questionCount}/10</div>
            <div>Best Streak: {streak} {getStreakEmoji()}</div>
            <div>Domain: {domain.toUpperCase()}</div>
          </div>
          <div className="quiz-actions">
            <button className="btn" onClick={() => window.location.reload()}>
              Play Again
            </button>
            <button className="btn secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="rapid-quiz-container">
        <div className="loading">Loading question...</div>
      </div>
    );
  }

  return (
    <div className="rapid-quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          <span>Question {questionCount + 1}/10</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((questionCount + 1) / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="quiz-stats-top">
          <div className="score">Score: {score}</div>
          <div className="streak">Streak: {streak} {getStreakEmoji()}</div>
        </div>
      </div>

      <div className="quiz-content">
        <h3>{currentQuestion.topic}</h3>
        <div className="question-text">
          {currentQuestion.quiz.split('\n')[0].replace('Question: ', '')}
        </div>
        
        <div className="quiz-options">
          {['A', 'B', 'C', 'D'].map(option => {
            const optionText = currentQuestion.quiz
              .split('\n')
              .find(line => line.startsWith(`${option})`))
              ?.replace(`${option}) `, '');
            
            if (!optionText) return null;
            
            return (
              <button
                key={option}
                className={`quiz-option ${
                  selectedAnswer === option ? 'selected' : ''
                } ${showResult ? 'disabled' : ''}`}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
              >
                <span className="option-letter">{option}</span>
                <span className="option-text">{optionText}</span>
              </button>
            );
          })}
        </div>

        {showResult && answerFeedback && (
          <div className="answer-feedback">
            <div className={`feedback-${answerFeedback.correct ? 'correct' : 'wrong'}`}>
              {answerFeedback.correct ? '✅ Correct!' : '❌ Wrong!'}
              {answerFeedback.correct && ` +${Math.max(1, Math.floor(timeLeft / 3))} points`}
            </div>
            <div className="feedback-explanation">
              {answerFeedback.explanation}
            </div>
            {showNextButton && (
              <button className="btn next-btn" onClick={handleNext}>
                {questionCount + 1 >= 10 ? 'Finish Quiz' : 'Next Question'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RapidQuiz;