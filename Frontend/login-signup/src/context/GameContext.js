// // src/context/GameContext.js
// import React, { createContext, useState, useEffect, useRef } from 'react';

// const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const [user, setUser] = useState({ email: localStorage.getItem('userEmail') || '' });
  
//   const [gameSession, setGameSession] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const [websocket, setWebsocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [gameStatus, setGameStatus] = useState('waiting');

//   const websocketRef = useRef(null); // track current websocket

//   const API_BASE_URL = 'http://localhost:9099/api/game';

//   const connectWebSocket = (sessionId) => {
//     // Close existing websocket if any
//     if (websocketRef.current) {
//       websocketRef.current.close();
//     }

//     const ws = new WebSocket(`ws://localhost:9099/ws/game/${sessionId}`);
//     websocketRef.current = ws;

//     ws.onopen = () => {
//       console.log('WebSocket connected');
//       setError(null);
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('WebSocket message:', data);

//       switch (data.type) {
//         case 'PLAYER_JOINED':
//           setPlayers((prev) => {
//             if (!prev.some(p => p.email === data.player.email)) {
//               return [...prev, { email: data.player.email, score: data.player.score || 0 }];
//             }
//             return prev;
//           });
//           setMessages(prev => [...prev, { type: 'system', content: `${data.player.email} joined the game!` }]);
//           break;
//         case 'GAME_STARTED':
//           setGameStatus('inProgress');
//           setCurrentQuestion(data.currentQuestion);
//           break;
//         case 'PLAYER_ANSWERED':
//           updatePlayerScore(data.playerEmail, data.score);
//           setMessages(prev => [...prev, { type: 'system', content: `${data.playerEmail} answered!` }]);
//           break;
//         case 'GAME_ENDED':
//           setGameStatus('completed');
//           setGameSession(data.gameSession);
//           break;
//         default:
//           break;
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//       setError('WebSocket connection error');
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     setWebsocket(ws);
//   };

//   const updatePlayerScore = (playerEmail, newScore) => {
//     setPlayers(prev =>
//       prev.map(player =>
//         player.email === playerEmail ? { ...player, score: newScore } : player
//       )
//     );
//   };

//   const startGameSession = async (quizId, email) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/start/${quizId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) throw new Error('Failed to start game session');

//       const data = await response.json();
//       setGameSession(data);
//       setPlayers([{ email, score: 0, isHost: true }]);
//       connectWebSocket(data.id);
//       setLoading(false);
//       return data;
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   const joinGameSession = async (gameSessionId, email) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/join/${gameSessionId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) throw new Error('Failed to join game session');

//       const data = await response.json();
//       setGameSession(data);

//       const playersArray = [];

//       if (data.host?.email) {
//         playersArray.push({ email: data.host.email, score: 0, isHost: true });
//       }

//       if (Array.isArray(data.players)) {
//         data.players.forEach(player => {
//           if (player.email && !playersArray.some(p => p.email === player.email)) {
//             playersArray.push({ email: player.email, score: player.score || 0, isHost: false });
//           }
//         });
//       }

//       console.log('Setting players to:', playersArray);
//       setPlayers(playersArray);

//       connectWebSocket(gameSessionId);
//       setLoading(false);
//       return data;
//     } catch (error) {
//       console.error('Error joining game session:', error);
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   const fetchGameSessionData = async (sessionId, email) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`${API_BASE_URL}/join/${sessionId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to fetch game session');
//       }

//       const data = await response.json();
//       setGameSession(data);
//       await joinGameSession(sessionId, email); // ensure connection established
//       setLoading(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   return (
//     <GameContext.Provider value={{
//       user,
//       setUser,
//       gameSession,
//       currentQuestion,
//       players,
//       messages,
//       error,
//       loading,
//       gameStatus,
//       startGameSession,
//       joinGameSession,
//       fetchGameSessionData,
//       websocket
//     }}>
//       {children}
//     </GameContext.Provider>
//   );
// };

// export default GameContext;

// src/context/GameContext.js


// import React, { createContext, useState, useEffect, useRef } from 'react';

// const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const [user, setUser] = useState({ email: localStorage.getItem('userEmail') || '' });
//   const [quizId, setQuizId] = useState(null); // ✅ Store the real quizId
//   const [gameSession, setGameSession] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const [websocket, setWebsocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [gameStatus, setGameStatus] = useState('waiting');

//   const websocketRef = useRef(null);
//   const API_BASE_URL = 'http://localhost:9099/api/game';

//   const connectWebSocket = (sessionId) => {
//     if (websocketRef.current) {
//       websocketRef.current.close();
//     }

//     const ws = new WebSocket(`ws://localhost:9099/ws/game/${sessionId}`);
//     websocketRef.current = ws;

//     ws.onopen = () => {
//       console.log('WebSocket connected');
//       setError(null);
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('WebSocket message:', data);

//       switch (data.type) {
//         case 'PLAYER_JOINED':
//           setPlayers((prev) => {
//             if (!prev.some(p => p.email === data.player.email)) {
//               return [...prev, { email: data.player.email, score: data.player.score || 0 }];
//             }
//             return prev;
//           });
//           setMessages(prev => [...prev, { type: 'system', content: `${data.player.email} joined the game!` }]);
//           break;
//         case 'GAME_STARTED':
//           setGameStatus('inProgress');
//           setCurrentQuestion(data.currentQuestion);
//           break;
//         case 'PLAYER_ANSWERED':
//           updatePlayerScore(data.playerEmail, data.score);
//           setMessages(prev => [...prev, { type: 'system', content: `${data.playerEmail} answered!` }]);
//           break;
//         case 'GAME_ENDED':
//           setGameStatus('completed');
//           setGameSession(data.gameSession);
//           break;
//         default:
//           break;
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//       setError('WebSocket connection error');
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     setWebsocket(ws);
//   };

//   const updatePlayerScore = (playerEmail, newScore) => {
//     setPlayers(prev =>
//       prev.map(player =>
//         player.email === playerEmail ? { ...player, score: newScore } : player
//       )
//     );
//   };

//   const startGameSession = async (quizId, email) => {
//     try {
//       setLoading(true);
//       console.log('Starting game with quizId:', quizId, 'email:', email); // Debug ✅

//       const response = await fetch(`${API_BASE_URL}/start/${quizId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) throw new Error('Failed to start game session');

//       const data = await response.json();
//       setGameSession(data);
//       setPlayers([{ email, score: 0, isHost: true }]);
//       connectWebSocket(data.id);
//       setLoading(false);
//       return data;
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   const joinGameSession = async (gameSessionId, email) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/join/${gameSessionId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) throw new Error('Failed to join game session');

//       const data = await response.json();
//       setGameSession(data);

//       const playersArray = [];

//       if (data.host?.email) {
//         playersArray.push({ email: data.host.email, score: 0, isHost: true });
//       }

//       if (Array.isArray(data.players)) {
//         data.players.forEach(player => {
//           if (player.email && !playersArray.some(p => p.email === player.email)) {
//             playersArray.push({ email: player.email, score: player.score || 0, isHost: false });
//           }
//         });
//       }

//       setPlayers(playersArray);
//       connectWebSocket(gameSessionId);
//       setLoading(false);
//       return data;
//     } catch (error) {
//       console.error('Error joining game session:', error);
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   const fetchGameSessionData = async (sessionId, email) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`${API_BASE_URL}/join/${sessionId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to fetch game session');
//       }

//       const data = await response.json();
//       setGameSession(data);
//       await joinGameSession(sessionId, email);
//       setLoading(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   return (
//     <GameContext.Provider value={{
//       user,
//       setUser,
//       quizId,
//       setQuizId,
//       gameSession,
//       currentQuestion,
//       players,
//       messages,
//       error,
//       loading,
//       gameStatus,
//       startGameSession,
//       joinGameSession,
//       fetchGameSessionData,
//       websocket
//     }}>
//       {children}
//     </GameContext.Provider>
//   );
// };

// export default GameContext;

// import React, { createContext, useState, useEffect, useRef } from 'react';

// const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const [user, setUser] = useState({ email: localStorage.getItem('userEmail') || '' });
//   const [quizId, setQuizId] = useState(localStorage.getItem('currentQuizId') || null);
//   const [gameSession, setGameSession] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const [websocket, setWebsocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [gameStatus, setGameStatus] = useState('waiting');

//   const websocketRef = useRef(null);
//   const API_BASE_URL = 'http://localhost:9099/api/game';

//   useEffect(() => {
//     console.log("GameContext - quizId changed:", quizId);
//   }, [quizId]);

//   const updateQuizId = (id) => {
//     console.log("Updating quizId to:", id);
//     setQuizId(id);
//     if (id) {
//       localStorage.setItem('currentQuizId', id);
//     } else {
//       localStorage.removeItem('currentQuizId');
//     }
//   };

//   const connectWebSocket = (sessionId) => {
//     if (websocketRef.current) {
//       console.log('🔌 Closing previous WebSocket connection...');
//       websocketRef.current.close();
//     }

//     console.log('🌐 Connecting to WebSocket at:', `ws://localhost:9099/ws/game/${sessionId}`);
//     const ws = new WebSocket(`ws://localhost:9099/ws/game/${sessionId}`);
//     websocketRef.current = ws;

//     ws.onopen = () => {
//       console.log('✅ WebSocket connected');
//       setError(null);
//     };

//     ws.onmessage = (event) => {
//       console.log('📨 WebSocket message received raw:', event.data);
//       const data = JSON.parse(event.data);
//       console.log('📨 WebSocket message received parsed:', data);

//       switch (data.type) {
//         case 'PLAYER_JOINED':
//           console.log('👤 PLAYER_JOINED:', data.player);
//           setPlayers((prev) => {
//             if (!prev.some(p => p.email === data.player.email)) {
//               return [...prev, { email: data.player.email, score: data.player.score || 0 }];
//             }
//             return prev;
//           });
//           setMessages(prev => [...prev, { type: 'system', content: `${data.player.email} joined the game!` }]);
//           break;
//         case 'GAME_STARTED':
//           console.log('🚀 GAME_STARTED - current question:', data.currentQuestion);
//           setGameStatus('inProgress');
//           if (data.currentQuestion) {
//             const formattedQuestion = {
//               id: data.currentQuestion.id,
//               questionTitle: data.currentQuestion.questionTitle, // Use questionTitle instead of text
//               options: [
//                 data.currentQuestion.option1,
//                 data.currentQuestion.option2,
//                 data.currentQuestion.option3,
//                 data.currentQuestion.option4,
//               ]
//             };
//             console.log('✅ Setting formatted question:', formattedQuestion);
//             setCurrentQuestion(formattedQuestion);
//           } else {
//             console.warn('⚠️ No currentQuestion received in GAME_STARTED');
//           }
//           break;
//         case 'PLAYER_ANSWERED':
//           console.log('✅ PLAYER_ANSWERED:', data);
//           updatePlayerScore(data.playerEmail, data.score);
//           setMessages(prev => [...prev, { type: 'system', content: `${data.playerEmail} answered!` }]);
//           break;
//         case 'GAME_ENDED':
//           console.log('🏁 GAME_ENDED:', data);
//           setGameStatus('completed');
//           setGameSession(data.gameSession);
//           break;
//         default:
//           console.warn('❓ Unknown message type:', data.type);
//           break;
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('❌ WebSocket error:', error);
//       setError('WebSocket connection error');
//     };

//     ws.onclose = () => {
//       console.log('🔌 WebSocket connection closed');
//     };

//     setWebsocket(ws);
//   };

//   const updatePlayerScore = (playerEmail, newScore) => {
//     console.log(`🔄 Updating score for ${playerEmail} to ${newScore}`);
//     setPlayers(prev =>
//       prev.map(player =>
//         player.email === playerEmail ? { ...player, score: newScore } : player
//       )
//     );
//   };

//   const startGameSession = async (gameQuizId, email) => {
//     try {
//       setLoading(true);
//       console.log('🟢 Starting game with quizId:', gameQuizId, 'email:', email);

//       if (!gameQuizId) throw new Error('Quiz ID is not available');

//       updateQuizId(gameQuizId);

//       const response = await fetch(`${API_BASE_URL}/start/${gameQuizId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to start game session');
//       }

//       const data = await response.json();
//       console.log('🎮 Game session created:', data);

//       setGameSession(data);
//       setPlayers([{ email, score: 0, isHost: true }]);
//       connectWebSocket(data.id);
//       setLoading(false);
//       return data;
//     } catch (error) {
//       console.error('❌ Error in startGameSession:', error);
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   const joinGameSession = async (gameSessionId, email) => {
//     try {
//       setLoading(true);
//       console.log('🔵 Joining game session:', gameSessionId, 'email:', email);

//       const response = await fetch(`${API_BASE_URL}/join/${gameSessionId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to join game session');
//       }

//       const data = await response.json();
//       console.log('👥 Joined game session:', data);

//       setGameSession(data);

//       if (data.quizId) {
//         updateQuizId(data.quizId);
//       } else if (data.quiz && data.quiz.id) {
//         updateQuizId(data.quiz.id);
//       }

//       const playersArray = [];

//       if (data.host?.email) {
//         playersArray.push({ email: data.host.email, score: 0, isHost: true });
//       }

//       if (Array.isArray(data.players)) {
//         data.players.forEach(player => {
//           if (player.email && !playersArray.some(p => p.email === player.email)) {
//             playersArray.push({ email: player.email, score: player.score || 0, isHost: false });
//           }
//         });
//       }

//       setPlayers(playersArray);
//       connectWebSocket(gameSessionId);
//       setLoading(false);
//       return data;
//     } catch (error) {
//       console.error('❌ Error joining game session:', error);
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   const fetchGameSessionData = async (sessionId, email) => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log(`📥 Fetching game session data for session ${sessionId} and email ${email}`);

//       const response = await fetch(`${API_BASE_URL}/join/${sessionId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to fetch game session');
//       }

//       const data = await response.json();
//       console.log('📦 Fetched game session data:', data);

//       setGameSession(data);
//       if (data.quizId) {
//         updateQuizId(data.quizId);
//       } else if (data.quiz && data.quiz.id) {
//         updateQuizId(data.quiz.id);
//       }

//       await joinGameSession(sessionId, email);
//       setLoading(false);
//     } catch (error) {
//       console.error('❌ Fetch error:', error);
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   const resetGameState = () => {
//     console.log('🧹 Resetting game state');
//     setGameSession(null);
//     setCurrentQuestion(null);
//     setPlayers([]);
//     setMessages([]);
//     setGameStatus('waiting');
//     if (websocketRef.current) {
//       websocketRef.current.close();
//     }
//   };

//   return (
//     <GameContext.Provider value={{
//       user,
//       setUser,
//       quizId,
//       setQuizId: updateQuizId,
//       gameSession,
//       currentQuestion,
//       players,
//       messages,
//       error,
//       loading,
//       gameStatus,
//       startGameSession,
//       joinGameSession,
//       fetchGameSessionData,
//       resetGameState,
//       websocket
//     }}>
//       {children}
//     </GameContext.Provider>
//   );
// };

// export default GameContext;


// import React, { createContext, useState, useEffect, useRef } from 'react';

// const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const [user, setUser] = useState({ email: localStorage.getItem('userEmail') || '' });
//   const [quizId, setQuizId] = useState(localStorage.getItem('currentQuizId') || null);
//   const [gameSession, setGameSession] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const [websocket, setWebsocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [gameStatus, setGameStatus] = useState('waiting');

//   const websocketRef = useRef(null);
//   const API_BASE_URL = 'http://localhost:9099/api/game';

//   useEffect(() => {
//     console.log("GameContext - quizId changed:", quizId);
//   }, [quizId]);

//   // 🔁 Automatically update currentQuestion when gameSession changes
//   useEffect(() => {
//     if (gameSession && gameSession.currentQuestion) {
//       const q = gameSession.currentQuestion;
//       const formattedQuestion = {
//         id: q.id,
//         questionTitle: q.questionTitle,
//         options: [q.option1, q.option2, q.option3, q.option4],
//       };
//       console.log('🔁 Updating currentQuestion from gameSession:', formattedQuestion);
//       setCurrentQuestion(formattedQuestion);
//     }
//   }, [gameSession]);

//   const updateQuizId = (id) => {
//     console.log("Updating quizId to:", id);
//     setQuizId(id);
//     if (id) {
//       localStorage.setItem('currentQuizId', id);
//     } else {
//       localStorage.removeItem('currentQuizId');
//     }
//   };

//   const connectWebSocket = (sessionId) => {
//     if (websocketRef.current) {
//       console.log('🔌 Closing previous WebSocket connection...');
//       websocketRef.current.close();
//     }

//     console.log('🌐 Connecting to WebSocket at:', `ws://localhost:9099/ws/game/${sessionId}`);
//     const ws = new WebSocket(`ws://localhost:9099/ws/game/${sessionId}`);
//     websocketRef.current = ws;

//     ws.onopen = () => {
//       console.log('✅ WebSocket connected');
//       setError(null);
//     };

//     ws.onmessage = (event) => {
//       console.log('📨 WebSocket message received raw:', event.data);
//       const data = JSON.parse(event.data);
//       console.log('📨 WebSocket message received parsed:', data);

//       switch (data.type) {
//         case 'PLAYER_JOINED':
//           console.log('👤 PLAYER_JOINED:', data.player);
//           setPlayers((prev) => {
//             if (!prev.some(p => p.email === data.player.email)) {
//               return [...prev, { email: data.player.email, score: data.player.score || 0 }];
//             }
//             return prev;
//           });
//           setMessages(prev => [...prev, { type: 'system', content: `${data.player.email} joined the game!` }]);
//           break;
//         case 'GAME_STARTED':
//           console.log('🚀 GAME_STARTED - current question:', data.currentQuestion);
//           setGameStatus('inProgress');
//           setGameSession(prev => ({
//             ...prev,
//             currentQuestion: data.currentQuestion,
//           }));
//           break;
//         case 'PLAYER_ANSWERED':
//           console.log('✅ PLAYER_ANSWERED:', data);
//           updatePlayerScore(data.playerEmail, data.score);
//           setMessages(prev => [...prev, { type: 'system', content: `${data.playerEmail} answered!` }]);
//           break;
//         case 'GAME_ENDED':
//           console.log('🏁 GAME_ENDED:', data);
//           setGameStatus('completed');
//           setGameSession(data.gameSession);
//           break;
//         default:
//           console.warn('❓ Unknown message type:', data.type);
//           break;
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('❌ WebSocket error:', error);
//       setError('WebSocket connection error');
//     };

//     ws.onclose = () => {
//       console.log('🔌 WebSocket connection closed');
//     };

//     setWebsocket(ws);
//   };

//   const updatePlayerScore = (playerEmail, newScore) => {
//     console.log(`🔄 Updating score for ${playerEmail} to ${newScore}`);
//     setPlayers(prev =>
//       prev.map(player =>
//         player.email === playerEmail ? { ...player, score: newScore } : player
//       )
//     );
//   };

//   const startGameSession = async (gameQuizId, email) => {
//     try {
//       setLoading(true);
//       console.log('🟢 Starting game with quizId:', gameQuizId, 'email:', email);

//       if (!gameQuizId) throw new Error('Quiz ID is not available');

//       updateQuizId(gameQuizId);

//       const response = await fetch(`${API_BASE_URL}/start/${gameQuizId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to start game session');
//       }

//       const data = await response.json();
//       console.log('🎮 Game session created:', data);

//       setGameSession(data);
//       setPlayers([{ email, score: 0, isHost: true }]);
//       connectWebSocket(data.id);
//       setLoading(false);
//       return data;
//     } catch (error) {
//       console.error('❌ Error in startGameSession:', error);
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   const joinGameSession = async (gameSessionId, email) => {
//     try {
//       setLoading(true);
//       console.log('🔵 Joining game session:', gameSessionId, 'email:', email);

//       const response = await fetch(`${API_BASE_URL}/join/${gameSessionId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to join game session');
//       }

//       const data = await response.json();
//       console.log('👥 Joined game session:', data);

//       setGameSession(data);

//       if (data.quizId) {
//         updateQuizId(data.quizId);
//       } else if (data.quiz && data.quiz.id) {
//         updateQuizId(data.quiz.id);
//       }

//       const playersArray = [];

//       if (data.host?.email) {
//         playersArray.push({ email: data.host.email, score: 0, isHost: true });
//       }

//       if (Array.isArray(data.players)) {
//         data.players.forEach(player => {
//           if (player.email && !playersArray.some(p => p.email === player.email)) {
//             playersArray.push({ email: player.email, score: player.score || 0, isHost: false });
//           }
//         });
//       }

//       setPlayers(playersArray);
//       connectWebSocket(gameSessionId);
//       setLoading(false);
//       return data;
//     } catch (error) {
//       console.error('❌ Error joining game session:', error);
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   const fetchGameSessionData = async (sessionId, email) => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log(`📥 Fetching game session data for session ${sessionId} and email ${email}`);

//       const response = await fetch(`${API_BASE_URL}/join/${sessionId}/${email}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to fetch game session');
//       }

//       const data = await response.json();
//       console.log('📦 Fetched game session data:', data);

//       setGameSession(data);
//       if (data.quizId) {
//         updateQuizId(data.quizId);
//       } else if (data.quiz && data.quiz.id) {
//         updateQuizId(data.quiz.id);
//       }

//       await joinGameSession(sessionId, email);
//       setLoading(false);
//     } catch (error) {
//       console.error('❌ Fetch error:', error);
//       setError(error.message);
//       setLoading(false);
//       throw error;
//     }
//   };

//   const resetGameState = () => {
//     console.log('🧹 Resetting game state');
//     setGameSession(null);
//     setCurrentQuestion(null);
//     setPlayers([]);
//     setMessages([]);
//     setGameStatus('waiting');
//     if (websocketRef.current) {
//       websocketRef.current.close();
//     }
//   };

//   return (
//     <GameContext.Provider value={{
//       user,
//       setUser,
//       quizId,
//       setQuizId: updateQuizId,
//       gameSession,
//       currentQuestion,
//       players,
//       messages,
//       error,
//       loading,
//       gameStatus,
//       startGameSession,
//       joinGameSession,
//       fetchGameSessionData,
//       resetGameState,
//       websocket
//     }}>
//       {children}
//     </GameContext.Provider>
//   );
// };

// export default GameContext;

import React, { createContext, useState, useEffect, useRef } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState({ email: localStorage.getItem('userEmail') || '' });
  const [quizId, setQuizId] = useState(localStorage.getItem('currentQuizId') || null);
  const [gameSession, setGameSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [players, setPlayers] = useState([]);
  const [websocket, setWebsocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gameStatus, setGameStatus] = useState('waiting');

  const websocketRef = useRef(null);
  const API_BASE_URL = 'http://localhost:9099/api/game';

  useEffect(() => {
    console.log("GameContext - quizId changed:", quizId);
  }, [quizId]);

  useEffect(() => {
    console.log("GameContext - gameStatus changed:", gameStatus);
  }, [gameStatus]);

  // 🔁 Automatically update currentQuestion when gameSession changes
  useEffect(() => {
    if (gameSession && gameSession.currentQuestion) {
      const q = gameSession.currentQuestion;
      const formattedQuestion = {
        id: q.id,
        questionTitle: q.questionTitle,
        options: [q.option1, q.option2, q.option3, q.option4],
      };
      console.log('🔁 Updating currentQuestion from gameSession:', formattedQuestion);
      setCurrentQuestion(formattedQuestion);
    }
  }, [gameSession]);

  const updateQuizId = (id) => {
    console.log("Updating quizId to:", id);
    setQuizId(id);
    if (id) {
      localStorage.setItem('currentQuizId', id);
    } else {
      localStorage.removeItem('currentQuizId');
    }
  };

  const connectWebSocket = (sessionId) => {
    try {
      if (websocketRef.current) {
        console.log('🔌 Closing previous WebSocket connection...');
        websocketRef.current.close();
      }

      console.log('🌐 Connecting to WebSocket at:', `ws://localhost:9099/ws/game/${sessionId}`);
      const ws = new WebSocket(`ws://localhost:9099/ws/game/${sessionId}`);
      websocketRef.current = ws;

      ws.onopen = () => {
        console.log('✅ WebSocket connected');
        setError(null);
      };

      ws.onmessage = (event) => {
        try {
          console.log('📨 WebSocket message received raw:', event.data);
          const data = JSON.parse(event.data);
          console.log('📨 WebSocket message received parsed:', data);

          switch (data.type) {
            case 'PLAYER_JOINED':
              console.log('👤 PLAYER_JOINED:', data.player);
              setPlayers((prev) => {
                if (!prev.some(p => p.email === data.player.email)) {
                  return [...prev, { 
                    email: data.player.email, 
                    score: data.player.score || 0,
                    isHost: data.player.isHost || false 
                  }];
                }
                return prev;
              });
              setMessages(prev => [...prev, { type: 'system', content: `${data.player.email} joined the game!` }]);
              break;
            case 'GAME_STARTED':
              console.log('🚀 GAME_STARTED - current question:', data.currentQuestion);
              // Important! Update gameStatus to trigger navigation for non-host players
              setGameStatus('inProgress');
              setGameSession(prev => ({
                ...prev,
                currentQuestion: data.currentQuestion,
                status: 'IN_PROGRESS'
              }));
              break;
            case 'PLAYER_ANSWERED':
              console.log('✅ PLAYER_ANSWERED:', data);
              updatePlayerScore(data.playerEmail, data.score);
              setMessages(prev => [...prev, { type: 'system', content: `${data.playerEmail} answered!` }]);
              break;
            case 'GAME_ENDED':
              console.log('🏁 GAME_ENDED:', data);
              setGameStatus('completed');
              setGameSession(data.gameSession);
              break;
            default:
              console.warn('❓ Unknown message type:', data.type);
              break;
          }
        } catch (error) {
          console.error('❌ Error processing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setError('WebSocket connection error');
      };

      ws.onclose = () => {
        console.log('🔌 WebSocket connection closed');
      };

      setWebsocket(ws);
    } catch (error) {
      console.error('❌ Error connecting to WebSocket:', error);
      setError(`WebSocket connection error: ${error.message}`);
    }
  };

  const updatePlayerScore = (playerEmail, newScore) => {
    console.log(`🔄 Updating score for ${playerEmail} to ${newScore}`);
    setPlayers(prev =>
      prev.map(player =>
        player.email === playerEmail ? { ...player, score: newScore } : player
      )
    );
  };

  const startGameSession = async (gameQuizId, email) => {
    try {
      setLoading(true);
      console.log('🟢 Starting game with quizId:', gameQuizId, 'email:', email);
  
      if (!gameQuizId) throw new Error('Quiz ID is not available');
  
      updateQuizId(gameQuizId);
  
      const response = await fetch(`${API_BASE_URL}/start/${gameQuizId}/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to start game session');
      }
  
      const data = await response.json();
      console.log('🎮 Game session created:', data);
  
      setGameSession(data);
      
      // ❌ Removed this line so host waits in the lobby:
      // setGameStatus('inProgress');
      
      setPlayers([{ email, score: 0, isHost: true }]);
      connectWebSocket(data.id);
      setLoading(false);
      return data;
    } catch (error) {
      console.error('❌ Error in startGameSession:', error);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };
  

  const joinGameSession = async (gameSessionId, email) => {
    try {
      setLoading(true);
      console.log('🔵 Joining game session:', gameSessionId, 'email:', email);

      const response = await fetch(`${API_BASE_URL}/join/${gameSessionId}/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to join game session');
      }

      const data = await response.json();
      console.log('👥 Joined game session:', data);

      // Check if the game is already in progress and update status accordingly
      if (data.status === 'IN_PROGRESS') {
        console.log('Game is already in progress, updating status');
        setGameStatus('inProgress');
      }

      setGameSession(data);

      if (data.quizId) {
        updateQuizId(data.quizId);
      } else if (data.quiz && data.quiz.id) {
        updateQuizId(data.quiz.id);
      }

      const playersArray = [];

      if (data.host?.email) {
        playersArray.push({ email: data.host.email, score: 0, isHost: true });
      }

      if (Array.isArray(data.players)) {
        data.players.forEach(player => {
          if (player.email && !playersArray.some(p => p.email === player.email)) {
            playersArray.push({ email: player.email, score: player.score || 0, isHost: false });
          }
        });
      }

      setPlayers(playersArray);
      connectWebSocket(gameSessionId);
      setLoading(false);
      return data;
    } catch (error) {
      console.error('❌ Error joining game session:', error);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const fetchGameSessionData = async (sessionId, email) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`📥 Fetching game session data for session ${sessionId} and email ${email}`);

      const response = await fetch(`${API_BASE_URL}/join/${sessionId}/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch game session');
      }

      const data = await response.json();
      console.log('📦 Fetched game session data:', data);

      // Check if the game is already in progress and update status accordingly
      if (data.status === 'IN_PROGRESS') {
        console.log('Game is already in progress, updating status');
        setGameStatus('inProgress');
      }

      setGameSession(data);
      
      if (data.quizId) {
        updateQuizId(data.quizId);
      } else if (data.quiz && data.quiz.id) {
        updateQuizId(data.quiz.id);
      }

      await joinGameSession(sessionId, email);
      setLoading(false);
      return data;
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const resetGameState = () => {
    console.log('🧹 Resetting game state');
    setGameSession(null);
    setCurrentQuestion(null);
    setPlayers([]);
    setMessages([]);
    setGameStatus('waiting');
    if (websocketRef.current) {
      websocketRef.current.close();
    }
  };

  return (
    <GameContext.Provider value={{
      user,
      setUser,
      quizId,
      setQuizId: updateQuizId,
      gameSession,
      currentQuestion,
      players,
      messages,
      error,
      loading,
      gameStatus,
      startGameSession,
      joinGameSession,
      fetchGameSessionData,
      resetGameState,
      websocket
    }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
