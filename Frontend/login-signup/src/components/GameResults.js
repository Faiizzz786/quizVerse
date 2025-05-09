// src/components/GameResults.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';

const GameResults = () => {
  const { players, gameSession } = useContext(GameContext);
  const navigate = useNavigate();

  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">Game Results</h3>
            </div>
            <div className="card-body">
              <h4 className="text-center mb-4">Final Scores</h4>
              
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPlayers.map((player, index) => (
                    <tr key={index} className={index === 0 ? 'table-warning' : ''}>
                      <td>{index + 1}</td>
                      <td>
                        {player.email}
                        {player.isHost && <span className="badge bg-primary ms-2">Host</span>}
                      </td>
                      <td>{player.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="text-center mt-4">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResults;