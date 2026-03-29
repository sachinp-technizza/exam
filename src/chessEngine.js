import { Chess } from 'chess.js';

// Standard piece weights
const pieceValues = {
  p: 10,
  n: 30,
  b: 30,
  r: 50,
  q: 90,
  k: 900
};

// Evaluate the board relative to Black (the AI character)
const evaluateBoard = (chess) => {
  let totalEvaluation = 0;
  const board = chess.board();
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        // Position weights could be added here, but simple piece sum works robustly for kids
        const val = pieceValues[piece.type];
        // Black wants a positive score, so if piece is black, add value
        totalEvaluation += piece.color === 'b' ? val : -val; 
      }
    }
  }
  return totalEvaluation;
};

const minimax = (chess, depth, alpha, beta, isMaximizingPlayer) => {
  if (depth === 0 || chess.isGameOver()) {
    return evaluateBoard(chess);
  }

  const moves = chess.moves();

  if (isMaximizingPlayer) {
    let bestVal = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      chess.move(moves[i]);
      bestVal = Math.max(bestVal, minimax(chess, depth - 1, alpha, beta, !isMaximizingPlayer));
      chess.undo();
      alpha = Math.max(alpha, bestVal);
      if (beta <= alpha) break;
    }
    return bestVal;
  } else {
    let bestVal = Infinity;
    for (let i = 0; i < moves.length; i++) {
      chess.move(moves[i]);
      bestVal = Math.min(bestVal, minimax(chess, depth - 1, alpha, beta, !isMaximizingPlayer));
      chess.undo();
      beta = Math.min(beta, bestVal);
      if (beta <= alpha) break;
    }
    return bestVal;
  }
};

export const getBestMove = (gameFen, difficulty) => {
  const chess = new Chess(gameFen);
  const moves = chess.moves();
  
  if (moves.length === 0) return null;

  if (difficulty === 'basic') {
    // Random move
    return moves[Math.floor(Math.random() * moves.length)];
  }

  // moderate: depth 2, high: depth 3
  const depth = difficulty === 'moderate' ? 2 : 3;

  let bestMove = null;
  let bestValue = -Infinity;

  // Pre-sort moves randomly so the AI plays different openings
  // in otherwise equal evaluations
  moves.sort(() => Math.random() - 0.5);

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    chess.move(move);
    
    // Now it's white's turn, so minimizing player
    const boardValue = minimax(chess, depth - 1, -Infinity, Infinity, false);
    chess.undo();

    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMove = move;
    }
  }
  
  return bestMove || moves[0];
};
