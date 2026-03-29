import React, { useState, useEffect, useMemo, useRef } from 'react';
import { getSpellingWords } from '../spellingQuestions';
import Feedback from './Feedback';

function SpellingExam() {
  const [sessionKey, setSessionKey] = useState(0); 
  const spellingWords = useMemo(() => getSpellingWords(), [sessionKey]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null); 
  const [answers, setAnswers] = useState({});
  const [firstAttempts, setFirstAttempts] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const inputRef = useRef(null);
  const currentWord = spellingWords[currentIndex];

  useEffect(() => {
    if (quizFinished) return;
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [quizFinished, sessionKey]);

  useEffect(() => {
    if (currentWord && !quizFinished) {
      speakWord(currentWord);
      setInputValue(''); 
    }
  }, [currentIndex, quizFinished, sessionKey]);

  useEffect(() => {
    const handleGlobalKeydown = (e) => {
      // If user isn't already focused on the input
      if (document.activeElement !== inputRef.current) {
        // Only react to standard single printable characters 
        if (e.key.length === 1 && /[a-zA-Z]/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
          inputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeydown);
    return () => window.removeEventListener('keydown', handleGlobalKeydown);
  }, []);

  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8; 
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported in this browser");
    }
  };

  const handleRepeat = () => {
    speakWord(currentWord);
    inputRef.current?.focus(); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback || !inputValue.trim()) return;

    const normalizedInput = inputValue.trim().toLowerCase();
    const isCorrect = normalizedInput === currentWord.toLowerCase();

    setAnswers(prev => ({ ...prev, [currentIndex]: normalizedInput }));
    
    if (firstAttempts[currentIndex] === undefined) {
      setFirstAttempts(prev => ({ ...prev, [currentIndex]: isCorrect }));
    }

    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null);
        if (currentIndex < spellingWords.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setQuizFinished(true);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setFeedback(null);
        setInputValue(''); 
        inputRef.current?.focus();
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFeedback(null);
    }
  };

  const handleNext = () => {
    if (currentIndex < spellingWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFeedback(null);
    } else {
      setQuizFinished(true);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    let score = 0;
    Object.keys(firstAttempts).forEach(key => {
      if (firstAttempts[key] === true) {
        score++;
      }
    });
    return score;
  };

  if (quizFinished) {
    const score = calculateScore();
    return (
      <div className="exam-container">
        <h2>Spelling Master!</h2>
        <div className="results-screen">
          <div className="star-icon">🏆</div>
          <h3>Wonderful Job!</h3>
          <p>You scored {score} out of {spellingWords.length}</p>
          <p>Time Taken: {formatTime(timeElapsed)}</p>
          <button onClick={() => {
            setSessionKey(prev => prev + 1);
            setCurrentIndex(0);
            setAnswers({});
            setFirstAttempts({});
            setQuizFinished(false);
            setTimeElapsed(0);
          }} style={{marginTop: '2rem'}}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-container">
      <h2>Spelling Adventure</h2>
      <div className="stats" style={{ display: 'flex', justifyContent: 'space-between', margin: '0 1rem' }}>
        <span>Word {currentIndex + 1} of {spellingWords.length}</span>
        <span>Timer: {formatTime(timeElapsed)}</span>
        <span>Score: {calculateScore()}</span>
      </div>

      <div className="card">
        {feedback && <Feedback type={feedback} />}
        
        <div className="spelling-controls" style={{ marginBottom: '2rem' }}>
          <button className="listen-btn" type="button" onClick={handleRepeat} aria-label="Listen to word again" style={{ fontSize: '3rem', cursor: 'pointer', padding: '1rem' }}>
            🔊
          </button>
          <p style={{marginTop: '0.5rem', opacity: 0.8}}>Click to hear the word</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input 
            ref={inputRef}
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!!feedback}
            placeholder="Type the word here..."
            className="spelling-input"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <button type="submit" disabled={!inputValue.trim() || !!feedback} style={{ marginTop: '1rem', width: '100%' }}>
            Check Word
          </button>
        </form>

        <div className="nav-buttons" style={{ marginTop: '2rem' }}>
          <button onClick={handleBack} disabled={currentIndex === 0 || !!feedback}>
            ← Back
          </button>
          <button onClick={handleNext} disabled={!!feedback}>
            Skip →
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpellingExam;
