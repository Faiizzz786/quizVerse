import React from 'react';

function GameBoard({ 
  status, 
  scrambledWord, 
  userGuess, 
  setUserGuess, 
  message, 
  checkAnswer, 
  startGame,
  skipWord
}) {
  return (
    <div className="game-board p-4 mb-4 rounded">
      {status === 'waiting' && (
        <div className="text-center">
          <h3 className="mb-4">Ready to play?</h3>
          <button 
            className="btn btn-lg btn-primary"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}
      
      {status === 'playing' && (
        <div className="text-center">
          <div className="scrambled-word mb-4">
            {scrambledWord.split('').map((letter, index) => (
              <span key={index} className="letter">{letter}</span>
            ))}
          </div>
          
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Type your answer..."
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            />
            <button 
              className="btn btn-primary" 
              onClick={checkAnswer}
            >
              Check
            </button>
          </div>
          
          {message && (
            <div className="alert alert-info">{message}</div>
          )}
          
          <button 
            className="btn btn-warning"
            onClick={skipWord}
          >
            Skip Word
          </button>
        </div>
      )}
      
      {(status === 'success' || status === 'failure') && (
        <div className="text-center">
          <div className={`alert ${status === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}>
            {message}
          </div>
          <button 
            className="btn btn-lg btn-primary"
            onClick={startGame}
          >
            Next Word
          </button>
        </div>
      )}
    </div>
  );
}

export default GameBoard;