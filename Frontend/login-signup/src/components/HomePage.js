// src/components/HomePage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [action, setAction] = useState('create'); // 'create' or 'join'
  const [quizId, setQuizId] = useState('');
  const [gameSessionId, setGameSessionId] = useState('');
  const [error, setError] = useState('');
  
  const { setUser, startGameSession, joinGameSession, loading, setQuizId: setContextQuizId } = useContext(GameContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    try {
      setUser({ email });
      localStorage.setItem('userEmail', email);
      
      if (action === 'create') {
        if (!quizId.trim()) {
          setError('Quiz ID is required');
          return;
        }
        
        // Set quizId in context BEFORE starting the session
        setContextQuizId(quizId);
        console.log("Creating game with quizId:", quizId);
        
        const session = await startGameSession(quizId, email);
        // Pass the quizId in the navigation state
        navigate(`/lobby/${session.id}`, { state: { quizId } });
      } else {
        if (!gameSessionId.trim()) {
          setError('Game Session ID is required');
          return;
        }
        
        await joinGameSession(gameSessionId, email);
        navigate(`/lobby/${gameSessionId}`);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Welcome to Quiz Game</h3>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-3">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="create"
                    name="action"
                    value="create"
                    checked={action === 'create'}
                    onChange={() => setAction('create')}
                  />
                  <label className="form-check-label" htmlFor="create">Create New Game</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="join"
                    name="action"
                    value="join"
                    checked={action === 'join'}
                    onChange={() => setAction('join')}
                  />
                  <label className="form-check-label" htmlFor="join">Join Existing Game</label>
                </div>
              </div>
              
              {action === 'create' ? (
                <div className="mb-3">
                  <label htmlFor="quizId" className="form-label">Quiz ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="quizId"
                    value={quizId}
                    onChange={(e) => setQuizId(e.target.value)}
                    required
                  />
                  <small className="form-text text-muted">Enter the ID of the quiz you want to use</small>
                </div>
              ) : (
                <div className="mb-3">
                  <label htmlFor="gameSessionId" className="form-label">Game Session ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gameSessionId"
                    value={gameSessionId}
                    onChange={(e) => setGameSessionId(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Loading...' : action === 'create' ? 'Create Game' : 'Join Game'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;