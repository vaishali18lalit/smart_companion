import React from 'react';

const domains = [
  { id: 'ai', name: 'AI Research', icon: '🤖' },
  { id: 'news', name: 'Tech News', icon: '📰' },
  { id: 'general', name: 'General Knowledge', icon: '📚' }
];

function Sidebar({ selectedDomain, onDomainChange }) {
  return (
    <div className="sidebar">
      <h2>Smart Knowledge Companion</h2>
      
      <ul className="domain-list">
        {domains.map(domain => (
          <li 
            key={domain.id}
            className={`domain-item ${selectedDomain === domain.id ? 'active' : ''}`}
            onClick={() => onDomainChange(domain.id)}
          >
            <span className="domain-icon">{domain.icon}</span>
            <span className="domain-name">{domain.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;