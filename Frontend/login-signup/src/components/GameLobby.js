// // src/components/GameLobby.js
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import GameContext from '../context/GameContext';

// const GameLobby = () => {
//   const { gameSessionId } = useParams();
//   const navigate = useNavigate();
//   const { 
//     user, 
//     gameSession, 
//     players, 
//     startGame, 
//     loading, 
//     error,
//     gameStatus
//   } = useContext(GameContext);
  
//   const [copied, setCopied] = useState(false);
  
//   const isHost = players.find(p => p.email === user.email)?.isHost;
  
//   useEffect(() => {
//     // If the game status changes to inProgress, navigate to the game screen
//     if (gameStatus === 'inProgress') {
//       navigate(`/game/${gameSessionId}`);
//     }
//   }, [gameStatus, gameSessionId, navigate]);
  
//   const handleStartGame = async () => {
//     try {
//       await startGame(gameSessionId);
//     } catch (err) {
//       console.error('Error starting game:', err);
//     }
//   };
  
//   const copySessionId = () => {
//     navigator.clipboard.writeText(gameSessionId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };
  
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="alert alert-danger">
//         Error: {error}
//       </div>
//     );
//   }
  
//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h3 className="mb-0">Game Lobby</h3>
//             </div>
//             <div className="card-body">
//               <div className="mb-4">
//                 <h4>Game Session ID:</h4>
//                 <div className="input-group">
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     value={gameSessionId} 
//                     readOnly 
//                   />
//                   <button 
//                     className="btn btn-outline-secondary" 
//                     type="button"
//                     onClick={copySessionId}
//                   >
//                     {copied ? 'Copied!' : 'Copy'}
//                   </button>
//                 </div>
//                 <small className="text-muted">Share this ID with others to join the game</small>
//               </div>
              
//               <div className="mb-4">
//                 <h4>Players:</h4>
//                 <ul className="list-group">
//                   {players.map((player, index) => (
//                     <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                       {player.email}
//                       {player.isHost && <span className="badge bg-primary">Host</span>}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               {isHost && (
//                 <div className="d-grid">
//                   <button 
//                     className="btn btn-success"
//                     onClick={handleStartGame}
//                     disabled={loading || players.length < 1}
//                   >
//                     {loading ? 'Starting...' : 'Start Game'}
//                   </button>
//                 </div>
//               )}
              
//               {!isHost && (
//                 <div className="alert alert-info">
//                   Waiting for the host to start the game...
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameLobby;


// src/components/GameLobby.js
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import GameContext from '../context/GameContext';

// const GameLobby = () => {
//   const { gameSessionId } = useParams();
//   const navigate = useNavigate();
//   const { 
//     user, 
//     gameSession, 
//     players = [], // Default to an empty array if players is undefined
//     startGame, 
//     loading, 
//     error,
//     gameStatus
//   } = useContext(GameContext);
  
//   const [copied, setCopied] = useState(false);
  
//   // Safe check for isHost
//   const isHost = players.find(p => p.email === user.email)?.isHost;
  
//   useEffect(() => {
//     // If the game status changes to inProgress, navigate to the game screen
//     if (gameStatus === 'inProgress') {
//       navigate(`/game/${gameSessionId}`);
//     }
//   }, [gameStatus, gameSessionId, navigate]);
  
//   const handleStartGame = async () => {
//     try {
//       await startGame(gameSessionId);
//     } catch (err) {
//       console.error('Error starting game:', err);
//     }
//   };
  
//   const copySessionId = () => {
//     navigator.clipboard.writeText(gameSessionId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };
  
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="alert alert-danger">
//         Error: {error}
//       </div>
//     );
//   }
  
//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h3 className="mb-0">Game Lobby</h3>
//             </div>
//             <div className="card-body">
//               <div className="mb-4">
//                 <h4>Game Session ID:</h4>
//                 <div className="input-group">
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     value={gameSessionId} 
//                     readOnly 
//                   />
//                   <button 
//                     className="btn btn-outline-secondary" 
//                     type="button"
//                     onClick={copySessionId}
//                   >
//                     {copied ? 'Copied!' : 'Copy'}
//                   </button>
//                 </div>
//                 <small className="text-muted">Share this ID with others to join the game</small>
//               </div>
              
//               <div className="mb-4">
//                 <h4>Players:</h4>
//                 <ul className="list-group">
//                   {players.map((player, index) => (
//                     <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                       {player.email}
//                       {player.isHost && <span className="badge bg-primary">Host</span>}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               {isHost && (
//                 <div className="d-grid">
//                   <button 
//                     className="btn btn-success"
//                     onClick={handleStartGame}
//                     disabled={loading || players.length < 1}
//                   >
//                     {loading ? 'Starting...' : 'Start Game'}
//                   </button>
//                 </div>
//               )}
              
//               {!isHost && (
//                 <div className="alert alert-info">
//                   Waiting for the host to start the game...
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameLobby;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import GameContext from '../context/GameContext';

// src/pages/GameLobby.js
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import GameContext from '../context/GameContext';
// import WebSocketStatus from '../components/WebSocketStatus';

// const GameLobby = () => {
//   const { gameSessionId } = useParams();
//   const navigate = useNavigate();
//   const {
//     user,
//     players,
//     gameStatus,
//     fetchGameSessionData,
//     startGameSession,
//     error,
//     loading
//   } = useContext(GameContext);

//   const [copied, setCopied] = useState(false);

//   const isHost = players.find(p => p.email === user.email)?.isHost;

//   useEffect(() => {
//     if (gameSessionId && user.email) {
//       fetchGameSessionData(gameSessionId, user.email).catch(console.error);
//     }
//   }, [gameSessionId, user.email]);

//   useEffect(() => {
//     if (gameStatus === 'inProgress') {
//       navigate(`/game/${gameSessionId}`);
//     }
//   }, [gameStatus]);

//   const handleStartGame = async () => {
//     try {
//       await startGameSession(gameSessionId, user.email);
//     } catch (err) {
//       console.error('Error starting game:', err);
//     }
//   };

//   const copySessionId = () => {
//     navigator.clipboard.writeText(gameSessionId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="container py-4">
//       <WebSocketStatus />
//       {loading && <p>Loading...</p>}
//       {error && <div className="alert alert-danger">{error}</div>}
//       {!loading && (
//         <div className="card">
//           <div className="card-header">
//             <h3>Game Lobby</h3>
//           </div>
//           <div className="card-body">
//             <h5>Game Session ID:</h5>
//             <div className="input-group mb-3">
//               <input type="text" value={gameSessionId} className="form-control" readOnly />
//               <button onClick={copySessionId} className="btn btn-outline-secondary">
//                 {copied ? 'Copied!' : 'Copy'}
//               </button>
//             </div>
//             <h5>Players:</h5>
//             <ul className="list-group mb-3">
//               {players.map((p, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   {p.email}
//                   {p.isHost && <span className="badge bg-primary">Host</span>}
//                 </li>
//               ))}
//             </ul>
//             {isHost ? (
//               <button className="btn btn-success" onClick={handleStartGame} disabled={players.length < 1}>
//                 Start Game
//               </button>
//             ) : (
//               <div className="alert alert-info">Waiting for host to start the game...</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GameLobby;


//  src/pages/GameLobby.js


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import GameContext from '../context/GameContext';
// import WebSocketStatus from '../components/WebSocketStatus';

// const GameLobby = () => {
//   const { gameSessionId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     user,
//     players,
//     gameStatus,
//     fetchGameSessionData,
//     startGameSession,
//     error,
//     loading,
//     quizId,
//     setQuizId
//   } = useContext(GameContext);

//   const [copied, setCopied] = useState(false);

//   const isHost = players.find(p => p.email === user.email)?.isHost;

//   useEffect(() => {
//     if (gameSessionId && user.email) {
//       fetchGameSessionData(gameSessionId, user.email).catch(console.error);
//     }

//     // ✅ Set quizId from location.state if available
//     if (location.state?.quizId) {
//       setQuizId(location.state.quizId);
//     }
//   }, [gameSessionId, user.email]);

//   useEffect(() => {
//     if (gameStatus === 'inProgress') {
//       navigate(`/game/${gameSessionId}`);
//     }
//   }, [gameStatus]);

//   const handleStartGame = async () => {
//     try {
//       if (!quizId) {
//         console.error('Quiz ID is not available!');
//         return;
//       }

//       await startGameSession(quizId, user.email); // ✅ Send actual quiz ID
//     } catch (err) {
//       console.error('Error starting game:', err);
//     }
//   };

//   const copySessionId = () => {
//     navigator.clipboard.writeText(gameSessionId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="container py-4">
//       <WebSocketStatus />
//       {loading && <p>Loading...</p>}
//       {error && <div className="alert alert-danger">{error}</div>}
//       {!loading && (
//         <div className="card">
//           <div className="card-header">
//             <h3>Game Lobby</h3>
//           </div>
//           <div className="card-body">
//             <h5>Game Session ID:</h5>
//             <div className="input-group mb-3">
//               <input type="text" value={gameSessionId} className="form-control" readOnly />
//               <button onClick={copySessionId} className="btn btn-outline-secondary">
//                 {copied ? 'Copied!' : 'Copy'}
//               </button>
//             </div>
//             <h5>Players:</h5>
//             <ul className="list-group mb-3">
//               {players.map((p, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   {p.email}
//                   {p.isHost && <span className="badge bg-primary">Host</span>}
//                 </li>
//               ))}
//             </ul>
//             {isHost ? (
//               <button className="btn btn-success" onClick={handleStartGame} disabled={players.length < 1}>
//                 Start Game
//               </button>
//             ) : (
//               <div className="alert alert-info">Waiting for host to start the game...</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GameLobby;



// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import GameContext from '../context/GameContext';
// import WebSocketStatus from '../components/WebSocketStatus';

// const GameLobby = () => {
//   const { gameSessionId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     user,
//     players,
//     gameStatus,
//     fetchGameSessionData,
//     startGameSession,
//     error,
//     loading,
//     quizId,
//     setQuizId
//   } = useContext(GameContext);

//   const [copied, setCopied] = useState(false);
//   const [localError, setLocalError] = useState('');

//   const isHost = players.find(p => p.email === user.email)?.isHost;

//   useEffect(() => {
//     console.log("GameLobby mounted, current quizId:", quizId);
//     console.log("Location state:", location.state);
    
//     // Set quizId from location state if available
//     if (location.state?.quizId) {
//       console.log("Setting quizId from location state:", location.state.quizId);
//       setQuizId(location.state.quizId);
//     }
    
//     // Always attempt to fetch game session data if we have the necessary parameters
//     if (gameSessionId && user.email) {
//       fetchGameSessionData(gameSessionId, user.email).catch(err => {
//         console.error("Error fetching game session data:", err);
//         setLocalError(`Failed to get game data: ${err.message}`);
//       });
//     } else {
//       console.log("Missing required parameters for fetchGameSessionData:", { 
//         gameSessionId, 
//         userEmail: user.email 
//       });
//     }
//   }, [gameSessionId, user.email]);

//   // Separate effect to handle navigation when game status changes
//   useEffect(() => {
//     if (gameStatus === 'inProgress') {
//       navigate(`/game/${gameSessionId}`);
//     }
//   }, [gameStatus, gameSessionId, navigate]);

//   const handleStartGame = async () => {
//     try {
//       console.log("Starting game with quizId:", quizId);
//       setLocalError('');
      
//       if (!quizId) {
//         const errorMsg = 'Quiz ID is not available!';
//         console.error(errorMsg);
//         setLocalError(errorMsg);
//         return;
//       }

//       if (!user.email) {
//         const errorMsg = 'User email is required to start the game';
//         console.error(errorMsg);
//         setLocalError(errorMsg);
//         return;
//       }

//       await startGameSession(quizId, user.email);
//     } catch (err) {
//       console.error('Error starting game:', err);
//       setLocalError(`Failed to start game: ${err.message}`);
//     }
//   };

//   const copySessionId = () => {
//     navigator.clipboard.writeText(gameSessionId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="container py-4">
//       <WebSocketStatus />
//       {loading && <p>Loading...</p>}
//       {error && <div className="alert alert-danger">{error}</div>}
//       {localError && <div className="alert alert-danger">{localError}</div>}
//       {!loading && (
//         <div className="card">
//           <div className="card-header">
//             <h3>Game Lobby</h3>
//           </div>
//           <div className="card-body">
//             <h5>Game Session ID:</h5>
//             <div className="input-group mb-3">
//               <input type="text" value={gameSessionId} className="form-control" readOnly />
//               <button onClick={copySessionId} className="btn btn-outline-secondary">
//                 {copied ? 'Copied!' : 'Copy'}
//               </button>
//             </div>
            
//             {quizId && (
//               <div className="mb-3">
//                 <h5>Quiz ID:</h5>
//                 <div className="input-group">
//                   <input type="text" value={quizId} className="form-control" readOnly />
//                 </div>
//               </div>
//             )}
            
//             <h5>Players:</h5>
//             <ul className="list-group mb-3">
//               {players.map((p, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   {p.email}
//                   {p.isHost && <span className="badge bg-primary">Host</span>}
//                 </li>
//               ))}
//             </ul>
            
//             {isHost ? (
//               <button 
//                 className="btn btn-success" 
//                 onClick={handleStartGame} 
//                 disabled={players.length < 1 || !quizId}
//               >
//                 Start Game
//               </button>
//             ) : (
//               <div className="alert alert-info">Waiting for host to start the game...</div>
//             )}
            
//             {isHost && !quizId && (
//               <div className="alert alert-warning mt-3">
//                 Quiz ID is missing. Make sure you've selected a quiz before starting the game.
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GameLobby;




// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import GameContext from '../context/GameContext';
// import WebSocketStatus from '../components/WebSocketStatus';

// const GameLobby = () => {
//   const { gameSessionId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     user,
//     players,
//     gameStatus,
//     fetchGameSessionData,
//     startGameSession,
//     error,
//     loading,
//     quizId,
//     setQuizId,
//     gameSession
//   } = useContext(GameContext);

//   const [copied, setCopied] = useState(false);
//   const [localError, setLocalError] = useState('');
//   const [debugInfo, setDebugInfo] = useState({});

//   const isHost = players.find(p => p.email === user.email)?.isHost;

//   // Set up debug info for easier troubleshooting
//   useEffect(() => {
//     setDebugInfo({
//       quizId,
//       gameSessionId,
//       locationState: location.state,
//       localStorageQuizId: localStorage.getItem('currentQuizId'),
//       isHost,
//       gameSession: gameSession ? 'Available' : 'Not Available',
//       players: players.length
//     });
//   }, [quizId, gameSessionId, location.state, isHost, gameSession, players]);

//   useEffect(() => {
//     console.log("GameLobby mounted, current quizId:", quizId);
//     console.log("Location state:", location.state);
    
//     // Set quizId from location state if available
//     if (location.state?.quizId) {
//       console.log("Setting quizId from location state:", location.state.quizId);
//       setQuizId(location.state.quizId);
//     }
    
//     // Always attempt to fetch game session data if we have the necessary parameters
//     if (gameSessionId && user.email) {
//       fetchGameSessionData(gameSessionId, user.email).catch(err => {
//         console.error("Error fetching game session data:", err);
//         setLocalError(`Failed to get game data: ${err.message}`);
//       });
//     } else {
//       console.log("Missing required parameters for fetchGameSessionData:", { 
//         gameSessionId, 
//         userEmail: user.email 
//       });
//     }
//   }, []);  // Only run once on component mount

//   // Separate effect to handle navigation when game status changes
//   useEffect(() => {
//     if (gameStatus === 'inProgress') {
//       navigate(`/game/${gameSessionId}`, {
//         state: { email: user.email, quizId: quizId }
//       });
//     }
//   }, [gameStatus, gameSessionId, navigate]);
  

//   const handleStartGame = async () => {
//     try {
//       console.log("Starting game with quizId:", quizId);
//       setLocalError('');
      
//       if (!quizId) {
//         const errorMsg = 'Quiz ID is not available!';
//         console.error(errorMsg);
//         setLocalError(errorMsg);
//         return;
//       }

//       if (!user.email) {
//         const errorMsg = 'User email is required to start the game';
//         console.error(errorMsg);
//         setLocalError(errorMsg);
//         return;
//       }

//       // await startGameSession(quizId, user.email);
//       const session = await startGameSession(quizId, user.email);
    
//       // Add manual navigation here as a fallback - this is the key change
//       console.log("Game started, navigating to game page");
//       navigate(`/game/${session.id || gameSessionId}`, {
//         state: { email: user.email, quizId: quizId }  // Pass both email and quizId just in case
//       });
      
//     } catch (err) {
//       console.error('Error starting game:', err);
//       setLocalError(`Failed to start game: ${err.message}`);
//     }
//   };

//   const copySessionId = () => {
//     navigator.clipboard.writeText(gameSessionId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="container py-4">
//       <WebSocketStatus />
//       {loading && <p>Loading...</p>}
//       {error && <div className="alert alert-danger">{error}</div>}
//       {localError && <div className="alert alert-danger">{localError}</div>}
      
//       {!loading && (
//         <div className="card">
//           <div className="card-header">
//             <h3>Game Lobby</h3>
//           </div>
//           <div className="card-body">
//             <h5>Game Session ID:</h5>
//             <div className="input-group mb-3">
//               <input type="text" value={gameSessionId} className="form-control" readOnly />
//               <button onClick={copySessionId} className="btn btn-outline-secondary">
//                 {copied ? 'Copied!' : 'Copy'}
//               </button>
//             </div>
            
//             {isHost && (
//               <div className="mb-3">
//                 <h5>Quiz ID:</h5>
//                 <div className="input-group">
//                   <input 
//                     type="text" 
//                     value={quizId || ''} 
//                     className="form-control"
//                     onChange={(e) => setQuizId(e.target.value)}
//                     placeholder="Enter or verify quiz ID"
//                   />
//                 </div>
//                 <small className="text-muted">
//                   {quizId ? 'Quiz ID is set' : 'Please enter a Quiz ID'}
//                 </small>
//               </div>
//             )}
            
//             {!isHost && quizId && (
//               <div className="mb-3">
//                 <h5>Quiz ID: {quizId}</h5>
//               </div>
//             )}
            
//             <h5>Players ({players.length}):</h5>
//             <ul className="list-group mb-3">
//               {players.map((p, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   {p.email}
//                   {p.isHost && <span className="badge bg-primary">Host</span>}
//                 </li>
//               ))}
//             </ul>
            
//             {isHost ? (
//               <button 
//                 className="btn btn-success" 
//                 onClick={handleStartGame} 
//                 disabled={players.length < 1 || !quizId}
//               >
//                 Start Game
//               </button>
//             ) : (
//               <div className="alert alert-info">Waiting for host to start the game...</div>
//             )}
            
//             {isHost && !quizId && (
//               <div className="alert alert-warning mt-3">
//                 Quiz ID is missing. Make sure you've selected a quiz before starting the game.
//               </div>
//             )}
            
//             {/* Debug section - can be removed in production */}
//             <div className="mt-4 p-3 bg-light rounded">
//               <h6>Debug Info:</h6>
//               <pre className="mb-0" style={{fontSize: '0.8rem'}}>
//                 {JSON.stringify(debugInfo, null, 2)}
//               </pre>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GameLobby;


import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import GameContext from '../context/GameContext';
import WebSocketStatus from '../components/WebSocketStatus';

const GameLobby = () => {
  const { gameSessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    user,
    players,
    gameStatus,
    fetchGameSessionData,
    startGameSession,
    error,
    loading,
    quizId,
    setQuizId,
    gameSession
  } = useContext(GameContext);

  const [copied, setCopied] = useState(false);
  const [localError, setLocalError] = useState('');
  const [debugInfo, setDebugInfo] = useState({});

  const isHost = players.find(p => p.email === user.email)?.isHost;

  // Set up debug info for easier troubleshooting
  useEffect(() => {
    setDebugInfo({
      quizId,
      gameSessionId,
      locationState: location.state,
      localStorageQuizId: localStorage.getItem('currentQuizId'),
      isHost,
      gameSession: gameSession ? 'Available' : 'Not Available',
      players: players.length,
      gameStatus
    });
  }, [quizId, gameSessionId, location.state, isHost, gameSession, players, gameStatus]);

  useEffect(() => {
    console.log("GameLobby mounted, current quizId:", quizId);
    console.log("Location state:", location.state);
    
    // Set quizId from location state if available
    if (location.state?.quizId) {
      console.log("Setting quizId from location state:", location.state.quizId);
      setQuizId(location.state.quizId);
    }
    
    // Always attempt to fetch game session data if we have the necessary parameters
    if (gameSessionId && user.email) {
      fetchGameSessionData(gameSessionId, user.email).catch(err => {
        console.error("Error fetching game session data:", err);
        setLocalError(`Failed to get game data: ${err.message}`);
      });
    } else {
      console.log("Missing required parameters for fetchGameSessionData:", { 
        gameSessionId, 
        userEmail: user.email 
      });
    }
  }, []);  // Only run once on component mount

  // Separate effect to handle navigation when game status changes
  useEffect(() => {
    console.log("GameLobby - gameStatus changed:", gameStatus);
    if (gameStatus === 'inProgress') {
      console.log("Game in progress - navigating to game page");
      navigate(`/game/${gameSessionId}`, {
        state: { email: user.email, quizId: quizId }
      });
    }
  }, [gameStatus, gameSessionId, navigate, user.email, quizId]);

  const handleStartGame = async () => {
    try {
      console.log("Starting game with quizId:", quizId);
      setLocalError('');
      
      if (!quizId) {
        const errorMsg = 'Quiz ID is not available!';
        console.error(errorMsg);
        setLocalError(errorMsg);
        return;
      }

      if (!user.email) {
        const errorMsg = 'User email is required to start the game';
        console.error(errorMsg);
        setLocalError(errorMsg);
        return;
      }

      // Start the game session
      const session = await startGameSession(quizId, user.email);
      
      // Keep the manual navigation for the host as a fallback
      // This ensures the host can start the game even if WebSocket has issues
      console.log("Game started, navigating to game page");
      navigate(`/game/${session.id || gameSessionId}`, {
        state: { email: user.email, quizId: quizId }
      });
      
    } catch (err) {
      console.error('Error starting game:', err);
      setLocalError(`Failed to start game: ${err.message}`);
    }
  };

  const copySessionId = () => {
    navigator.clipboard.writeText(gameSessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container py-4">
      <WebSocketStatus />
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {localError && <div className="alert alert-danger">{localError}</div>}
      
      {!loading && (
        <div className="card">
          <div className="card-header">
            <h3>Game Lobby</h3>
          </div>
          <div className="card-body">
            <h5>Game Session ID:</h5>
            <div className="input-group mb-3">
              <input type="text" value={gameSessionId} className="form-control" readOnly />
              <button onClick={copySessionId} className="btn btn-outline-secondary">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            {isHost && (
              <div className="mb-3">
                <h5>Quiz ID:</h5>
                <div className="input-group">
                  <input 
                    type="text" 
                    value={quizId || ''} 
                    className="form-control"
                    onChange={(e) => setQuizId(e.target.value)}
                    placeholder="Enter or verify quiz ID"
                  />
                </div>
                <small className="text-muted">
                  {quizId ? 'Quiz ID is set' : 'Please enter a Quiz ID'}
                </small>
              </div>
            )}
            
            {!isHost && quizId && (
              <div className="mb-3">
                <h5>Quiz ID: {quizId}</h5>
              </div>
            )}
            
            <h5>Players ({players.length}):</h5>
            <ul className="list-group mb-3">
              {players.map((p, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                  {p.email}
                  {p.isHost && <span className="badge bg-primary">Host</span>}
                </li>
              ))}
            </ul>
            
            {isHost ? (
              <button 
                className="btn btn-success" 
                onClick={handleStartGame} 
                disabled={players.length < 1 || !quizId}
              >
                Start Game
              </button>
            ) : (
              <div className="alert alert-info">Waiting for host to start the game...</div>
            )}
            
            {isHost && !quizId && (
              <div className="alert alert-warning mt-3">
                Quiz ID is missing. Make sure you've selected a quiz before starting the game.
              </div>
            )}
            
            {/* Game Status */}
            <div className="alert alert-secondary mt-3">
              Game Status: <span className="badge bg-info">{gameStatus}</span>
            </div>
            
            {/* Debug section */}
            <div className="mt-4 p-3 bg-light rounded">
              <h6>Debug Info:</h6>
              <pre className="mb-0" style={{fontSize: '0.8rem'}}>
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameLobby;



