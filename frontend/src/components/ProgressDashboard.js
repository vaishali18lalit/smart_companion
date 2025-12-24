import React from 'react';

function ProgressDashboard({ progress }) {
  const averageScore = progress.quizScores.length > 0 
    ? (progress.quizScores.reduce((sum, quiz) => sum + quiz.score, 0) / progress.quizScores.length * 100).toFixed(1)
    : 0;

  return (
    <div className="progress-dashboard">
      <h3>📊 Your Progress</h3>
      
      <div className="progress-stat">
        <strong>Learning Streak:</strong> {progress.streak} days
      </div>
      
      <div className="progress-stat">
        <strong>Topics Covered:</strong> {progress.topicsCovered.length}
      </div>
      
      <div className="progress-stat">
        <strong>Quiz Average:</strong> {averageScore}%
      </div>
      
      <div className="progress-stat">
        <strong>Last Activity:</strong> {new Date(progress.lastActivity).toLocaleDateString()}
      </div>
      
      {progress.quizScores.length > 0 && (
        <div className="recent-quizzes">
          <h4>Recent Quiz Scores</h4>
          {progress.quizScores.slice(-3).map((quiz, index) => (
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