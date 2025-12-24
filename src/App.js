import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentFeed from './components/ContentFeed';
import ChatBox from './components/ChatBox';
import MicroBreakPopup from './components/MicroBreakPopup';
import ProgressDashboard from './components/ProgressDashboard';
import { getContent, getProgress } from './services/api';
import './App.css';

function App() {
  const [selectedDomain, setSelectedDomain] = useState('ai');
  const [content, setContent] = useState([]);
  const [showMicroBreak, setShowMicroBreak] = useState(false);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent(selectedDomain);
    loadProgress();
    
    // Show micro-break every 2 minutes for demo
    const interval = setInterval(() => {
      setShowMicroBreak(true);
    }, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [selectedDomain]);

  const loadContent = async (domain) => {
    try {
      setLoading(true);
      const data = await getContent(domain);
      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async () => {
    try {
      const data = await getProgress();
      setProgress(data);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  return (
    <div className="app">
      <Sidebar 
        selectedDomain={selectedDomain}
        onDomainChange={(domain) => {
          setSelectedDomain(domain);
          loadContent(domain);
        }}
      />
      
      <main className="main-content">
        <div className="content-section">
          <h1>Smart Knowledge Companion</h1>
          <p className="subtitle">Learn while you work - AI-powered knowledge at your fingertips</p>
          
          {loading ? (
            <div className="loading">Loading content...</div>
          ) : (
            <ContentFeed 
              domain={selectedDomain}
              content={content}
              onContentUpdate={loadContent}
              onProgressUpdate={loadProgress}
            />
          )}
        </div>
        
        <div className="sidebar-right">
          <ChatBox onProgressUpdate={loadProgress} />
          
          {progress && (
            <ProgressDashboard progress={progress} />
          )}
        </div>
      </main>
      
      {showMicroBreak && (
        <MicroBreakPopup 
          onClose={() => setShowMicroBreak(false)}
          onComplete={loadProgress}
        />
      )}
    </div>
  );
}

export default App;