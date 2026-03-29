import React, { useState, useEffect, useMemo } from 'react';
import { getQuestions } from '../questions';
import QuestionCard from './QuestionCard';
import Feedback from './Feedback';

function MathExam() {
  const questions = useMemo(() => getQuestions(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [firstAttempts, setFirstAttempts] = useState({});
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect' | null
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (quizFinished) return;
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [quizFinished]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (ans) => {
    if (feedback) return;

    const isCorrect = ans === currentQuestion.answer;
    
    setAnswers(prev => ({ ...prev, [currentIndex]: ans }));
    setFirstAttempts(prev => prev[currentIndex] === undefined ? { ...prev, [currentIndex]: ans } : prev);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null);
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setQuizFinished(true);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    Object.keys(firstAttempts).forEach(key => {
      if (firstAttempts[key] === questions[key].answer) {
        score++;
      }
    });
    return score;
  };

  if (quizFinished) {
    const score = calculateScore();
    return (
      <div className="exam-container">
        <h2>Math Master!</h2>
        <div className="results-screen">
          <div className="star-icon">🌟</div>
          <h3>Great Job!</h3>
          <p>You scored {score} out of {questions.length}</p>
          <p>Time Taken: {formatTime(timeElapsed)}</p>
          <button onClick={() => window.location.reload()} style={{marginTop: '2rem'}}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-container">
      <h2>Math Adventure</h2>
      <div className="stats" style={{ display: 'flex', justifyContent: 'space-between', margin: '0 1rem' }}>
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span>Timer: {formatTime(timeElapsed)}</span>
        <span>Score: {calculateScore()}</span>
      </div>
      
      <div className="card">
        {feedback && <Feedback type={feedback} />}
        
        <QuestionCard 
          question={currentQuestion} 
          onSelect={handleSelectAnswer} 
          selectedAnswer={answers[currentIndex]}
          disabled={!!feedback}
        />

        <div className="nav-buttons">
          <button onClick={handleBack} disabled={currentIndex === 0 || !!feedback}>
            ← Back
          </button>
          
          <button 
            onClick={handleNext} 
            disabled={!answers[currentIndex] || !!feedback}
            style={{visibility: answers[currentIndex] === currentQuestion.answer ? 'visible' : 'hidden'}}
          >
            {currentIndex === questions.length - 1 ? 'Finish 🏁' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MathExam;
