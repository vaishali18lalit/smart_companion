import React from 'react';

function ProgressDashboard({ progress }) {
  // Add null checks for all progress properties
  if (!progress) {
    return (
      <div className="progress-dashboard">
        <h3>📊 Your Progress</h3>
        <div className="progress-stat">
          Loading progress...
        </div>
      </div>
    );
  }

  const quizScores = progress.quizScores || [];
  const topicsCovered = progress.topicsCovered || [];
  
  const averageScore = quizScores.length > 0 
    ? (quizScores.reduce((sum, quiz) => sum + quiz.score, 0) / quizScores.length * 100).toFixed(1)
    : 0;

  return (
    <div className="progress-dashboard">
      <h3>📊 Your Progress</h3>
      
      <div className="progress-stat">
        <strong>Learning Streak:</strong> {progress.streak || 0} days
      </div>
      
      <div className="progress-stat">
        <strong>Topics Covered:</strong> {topicsCovered.length}
      </div>
      
      <div className="progress-stat">
        <strong>Quiz Average:</strong> {averageScore}%
      </div>
      
      <div className="progress-stat">
        <strong>Last Activity:</strong> {progress.lastActivity ? new Date(progress.lastActivity).toLocaleDateString() : 'Never'}
      </div>
      
      {quizScores.length > 0 && (
        <div className="recent-quizzes">
          <h4>Recent Quiz Scores</h4>
          {quizScores.slice(-3).map((quiz, index) => (
            <div key={index} className="quiz-score">
              {quiz.topic}: {quiz.score * 100}%
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProgressDashboard;