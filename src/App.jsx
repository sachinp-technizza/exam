import React, { useState } from 'react';
import './index.css';
import MathExam from './components/MathExam';
import SpellingExam from './components/SpellingExam';
import ChessExam from './components/ChessExam';

function App() {
  const [activeTab, setActiveTab] = useState('math'); // 'math', 'spelling', or 'chess'

  return (
    <div className="app-container">
      <h1 style={{textAlign: 'center', marginBottom: '1rem', marginTop: '1rem'}}>
        Learning Adventure
      </h1>
      
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'math' ? 'active' : ''}`}
          onClick={() => setActiveTab('math')}
        >
          🧮 Math Exam
        </button>
        <button 
          className={`tab-btn ${activeTab === 'spelling' ? 'active' : ''}`}
          onClick={() => setActiveTab('spelling')}
        >
          📝 Spelling Exam
        </button>
        <button 
          className={`tab-btn ${activeTab === 'chess' ? 'active' : ''}`}
          onClick={() => setActiveTab('chess')}
        >
          ♟️ Chess Game
        </button>
      </div>

      <div className="tab-content">
        <div style={{ display: activeTab === 'math' ? 'block' : 'none' }}>
          <MathExam />
        </div>
        <div style={{ display: activeTab === 'spelling' ? 'block' : 'none' }}>
          <SpellingExam />
        </div>
        <div style={{ display: activeTab === 'chess' ? 'block' : 'none' }}>
          <ChessExam />
        </div>
      </div>
    </div>
  );
}

export default App;
