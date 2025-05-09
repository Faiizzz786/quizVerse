// src/components/NavBar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';
import WebSocketStatus from './WebSocketStatus';

const NavBar = () => {
  const { user, setUser } = useContext(GameContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setUser({ email: '' });
    localStorage.removeItem('userEmail');
    navigate('/');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Quiz Game</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user.email ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    <WebSocketStatus />
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link">
                    Logged in as: {user.email}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-sm btn-outline-light mt-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;