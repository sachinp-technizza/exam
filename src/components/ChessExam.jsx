import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { getBestMove } from '../chessEngine';

export default function ChessExam() {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [difficulty, setDifficulty] = useState('basic');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStatus, setGameStatus] = useState('active'); // active, mate, draw
  
  const isComputerThinking = useRef(false);

  useEffect(() => {
    if (gameStatus !== 'active') return;
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStatus]);

  const makeComputerMove = () => {
    if (chess.isGameOver() || isComputerThinking.current) return;
    isComputerThinking.current = true;
    
    // Slight artificial delay so it feels like the computer is 'thinking'
    setTimeout(() => {
      const bestMove = getBestMove(chess.fen(), difficulty);
      if (bestMove) {
        chess.move(bestMove);
        setFen(chess.fen());
        updateStatus();
      }
      isComputerThinking.current = false;
    }, 400); 
  };

  const updateStatus = () => {
    if (chess.isCheckmate()) {
      setGameStatus('mate');
    } else if (chess.isDraw() || chess.isStalemate() || chess.isThreefoldRepetition() || chess.isInsufficientMaterial()) {
      setGameStatus('draw');
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {
    if (gameStatus !== 'active' || isComputerThinking.current) return false;

    try {
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // auto-promote to queen
      });

      if (move === null) return false;

      setFen(chess.fen());
      updateStatus();

      // Trigger computer response
      if (!chess.isGameOver()) {
        makeComputerMove();
      }

      return true;
    } catch (e) {
      return false;
    }
  };

  const restartGame = () => {
    chess.reset();
    setFen(chess.fen());
    setGameStatus('active');
    setTimeElapsed(0);
    isComputerThinking.current = false;
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="exam-container">
      <h2>Chess Masters!</h2>
      <div className="stats" style={{ display: 'flex', justifyContent: 'space-between', margin: '0 1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <span>
          Level: 
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={timeElapsed > 0 && gameStatus === 'active'}
            style={{ marginLeft: '10px', fontSize: '1.2rem', padding: '0.2rem', borderRadius: '8px', border: '2px solid #ccc' }}
          >
            <option value="basic">Basic (Random)</option>
            <option value="moderate">Moderate (Depth 2)</option>
            <option value="high">High (Depth 3)</option>
          </select>
        </span>
        <span>Timer: {formatTime(timeElapsed)}</span>
        <span>Status: {gameStatus === 'active' ? 'Playing' : gameStatus.toUpperCase()}</span>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '500px', margin: '1rem 0', padding: '10px', background: '#fff', borderRadius: '8px', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.1)' }}>
          <Chessboard 
            position={fen} 
            onPieceDrop={onDrop}
            boardOrientation="white"
            customDarkSquareStyle={{ backgroundColor: '#779556' }}
            customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
          />
        </div>

        {gameStatus !== 'active' && (
          <div className="results-screen" style={{ marginTop: 0, padding: '2rem', width: '100%' }}>
            <h3>{gameStatus === 'mate' ? "Checkmate!" : "Draw!"}</h3>
            <p>Time Taken: {formatTime(timeElapsed)}</p>
            <button onClick={restartGame} style={{marginTop: '1rem'}}>
              Play Again
            </button>
          </div>
        )}
        
        {gameStatus === 'active' && (
           <button onClick={restartGame} style={{marginTop: '1rem', fontSize: '1rem', padding: '0.5rem 1rem'}}>
             Restart Game
           </button>
        )}
      </div>
    </div>
  );
}
