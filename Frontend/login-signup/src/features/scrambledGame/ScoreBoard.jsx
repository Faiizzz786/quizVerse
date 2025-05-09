import React from 'react';

function ScoreBoard({ score, streak, timeLeft }) {
  return (
    <div className="score-board p-3 rounded">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h5>Score</h5>
            <span className="badge bg-primary fs-4">{score}</span>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <h5>Streak</h5>
            <span className="badge bg-success fs-4">{streak}</span>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <h5>Time</h5>
            <span className={`badge fs-4 ${timeLeft <= 10 ? 'bg-danger' : 'bg-info'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;