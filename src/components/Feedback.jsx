import React from 'react';

export default function Feedback({ type }) {
  if (type === 'correct') {
    return (
      <div className="feedback-overlay correct">
        <h2>🎉 Correct! 🎉</h2>
        <div style={{fontSize: '5rem', marginTop: '1rem'}}>⭐️</div>
      </div>
    );
  }

  return (
    <div className="feedback-overlay incorrect">
      <h2>Oops, try again!</h2>
      <div style={{fontSize: '5rem', marginTop: '1rem'}}>🤔</div>
    </div>
  );
}
