import React from 'react';

export default function QuestionCard({ question, onSelect, selectedAnswer, disabled }) {
  if (!question) return null;

  const renderQuestionTitle = () => {
    if (question.type === 'object_addition') {
      return (
        <div className="object-question">
          <div className="object-group">
            {Array.from({length: question.a}).map((_, i) => <span key={`a-${i}`} role="img" aria-label="object">{question.emoji}</span>)}
          </div>
          <div className="operator">+</div>
          <div className="object-group">
            {Array.from({length: question.b}).map((_, i) => <span key={`b-${i}`} role="img" aria-label="object">{question.emoji}</span>)}
          </div>
          <div className="operator">= ?</div>
        </div>
      );
    }
    return <div className="question-text">{question.text}</div>;
  };

  return (
    <div>
      {renderQuestionTitle()}
      <div className="options-grid">
        {question.options.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => onSelect(opt)}
            className={selectedAnswer === opt ? 'selected' : ''}
            disabled={disabled}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
