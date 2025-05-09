// // src/components/GameSession.js
// import React, { useContext, useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import GameContext from '../context/GameContext';

// const GameSession = () => {
//   const { gameSessionId } = useParams();
//   const navigate = useNavigate();
//   const { 
//     user, 
//     currentQuestion, 
//     players, 
//     messages, 
//     sendPlayerAction, 
//     fiftyFiftyLifeline, 
//     skipLifeline,
//     endGameSession,
//     gameStatus,
//     loading
//   } = useContext(GameContext);
  
//   const [selectedOption, setSelectedOption] = useState('');
//   const [chatMessage, setChatMessage] = useState('');
//   const [showChat, setShowChat] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(30);

//   const isHost = players.find(p => p.email === user.email)?.isHost;

//   useEffect(() => {
//     if (gameStatus === 'completed') {
//       navigate('/');
//     }
//   }, [gameStatus, navigate]);

//   useEffect(() => {
//     if (currentQuestion && gameStatus === 'inProgress') {
//       setTimeLeft(30);
//       const timer = setInterval(() => {
//         setTimeLeft(prev => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [currentQuestion, gameStatus]);

//   const handleAnswerSubmit = async (option) => {
//     if (loading) return;
//     setSelectedOption(option);
//     const action = {
//       type: 'ANSWER',
//       gameSessionId,
//       questionId: currentQuestion.id,
//       answer: option
//     };
//     try {
//       await sendPlayerAction(user.email, action);
//     } catch (err) {
//       console.error('Error submitting answer:', err);
//     }
//   };

//   const handleSendEmoji = async (emoji) => {
//     if (loading) return;
//     const action = {
//       type: 'EMOJI',
//       gameSessionId,
//       emoji
//     };
//     try {
//       await sendPlayerAction(user.email, action);
//     } catch (err) {
//       console.error('Error sending emoji:', err);
//     }
//   };

//   const handleSendChatMessage = async (e) => {
//     e.preventDefault();
//     if (!chatMessage.trim() || loading) return;
//     const action = {
//       type: 'CHAT',
//       gameSessionId,
//       message: chatMessage
//     };
//     try {
//       await sendPlayerAction(user.email, action);
//       setChatMessage('');
//     } catch (err) {
//       console.error('Error sending chat message:', err);
//     }
//   };

//   const handleUseFiftyFifty = async () => {
//     if (loading || !currentQuestion) return;
//     try {
//       await fiftyFiftyLifeline(gameSessionId, currentQuestion.id);
//     } catch (err) {
//       console.error('Error using 50-50 lifeline:', err);
//     }
//   };

//   const handleUseSkip = async () => {
//     if (loading) return;
//     try {
//       await skipLifeline(gameSessionId);
//     } catch (err) {
//       console.error('Error using skip lifeline:', err);
//     }
//   };

//   const handleEndGame = async () => {
//     if (loading) return;
//     try {
//       await endGameSession(gameSessionId);
//     } catch (err) {
//       console.error('Error ending game:', err);
//     }
//   };

//   if (loading && !currentQuestion) {
//     return (
//       <div className="d-flex justify-content-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

// import React, { useContext, useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import GameContext from '../context/GameContext';

// const GameSession = () => {
//   console.log("=== GameSession Component Rendering ===");
//   const { gameSessionId } = useParams();
//   const navigate = useNavigate();
//   const { 
//     user, 
//     currentQuestion, 
//     players, 
//     messages, 
//     sendPlayerAction, 
//     fiftyFiftyLifeline, 
//     skipLifeline,
//     endGameSession,
//     gameStatus,
//     loading
//   } = useContext(GameContext);
//    // Debug the currentQuestion structure
//    console.log("currentQuestion type:", typeof currentQuestion);
//    console.log("currentQuestion value:", currentQuestion);
  
//   const [selectedOption, setSelectedOption] = useState('');
//   const [chatMessage, setChatMessage] = useState('');
//   const [showChat, setShowChat] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(30);

//   const isHost = players.find(p => p.email === user.email)?.isHost;

//   // Debugging: Log game status and currentQuestion
//   useEffect(() => {
//     console.log("Game Status:", gameStatus);
//     console.log("Current Question:", currentQuestion);
//   }, [gameStatus, currentQuestion]);

//   useEffect(() => {
//     console.log("=== Debug: Game Status Changed ===");
//   console.log("Game Status:", gameStatus);
//   console.log("Current Question:", currentQuestion);
//   if (currentQuestion) {
//     console.log("Question properties:", Object.keys(currentQuestion));
//     console.log("Question structure:", JSON.stringify(currentQuestion, null, 2));
//   }
//   }, [gameStatus, navigate]);

//   useEffect(() => {
//     console.log("=== Before rendering question section ===");
// console.log("Will render question:", currentQuestion ? "yes" : "no");
//     if (currentQuestion && gameStatus === 'inProgress') {
//       console.log("Question title type:", typeof currentQuestion.text);
//       console.log("Question options type:", typeof currentQuestion.options);
//       setTimeLeft(30);
//       const timer = setInterval(() => {
//         setTimeLeft(prev => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [currentQuestion, gameStatus]);

//   const handleAnswerSubmit = async (option) => {
//     console.log("Answer submitted:", option);  // Debug: Log selected answer
//     if (loading) return;
//     setSelectedOption(option);
//     const action = {
//       type: 'ANSWER',
//       gameSessionId,
//       questionId: currentQuestion.id,
//       answer: option
//     };
//     try {
//       await sendPlayerAction(user.email, action);
//     } catch (err) {
//       console.error('Error submitting answer:', err);
//     }
//   };

//   const handleSendEmoji = async (emoji) => {
//     console.log("Emoji sent:", emoji);  // Debug: Log emoji sent
//     if (loading) return;
//     const action = {
//       type: 'EMOJI',
//       gameSessionId,
//       emoji
//     };
//     try {
//       await sendPlayerAction(user.email, action);
//     } catch (err) {
//       console.error('Error sending emoji:', err);
//     }
//   };

//   const handleSendChatMessage = async (e) => {
//     e.preventDefault();
//     console.log("Sending chat message:", chatMessage);  // Debug: Log chat message
//     if (!chatMessage.trim() || loading) return;
//     const action = {
//       type: 'CHAT',
//       gameSessionId,
//       message: chatMessage
//     };
//     try {
//       await sendPlayerAction(user.email, action);
//       setChatMessage('');
//     } catch (err) {
//       console.error('Error sending chat message:', err);
//     }
//   };

//   const handleUseFiftyFifty = async () => {
//     console.log("Using 50/50 lifeline");  // Debug: Log 50/50 lifeline usage
//     if (loading || !currentQuestion) return;
//     try {
//       await fiftyFiftyLifeline(gameSessionId, currentQuestion.id);
//     } catch (err) {
//       console.error('Error using 50-50 lifeline:', err);
//     }
//   };

//   const handleUseSkip = async () => {
//     console.log("Using Skip lifeline");  // Debug: Log skip lifeline usage
//     if (loading) return;
//     try {
//       await skipLifeline(gameSessionId);
//     } catch (err) {
//       console.error('Error using skip lifeline:', err);
//     }
//   };

//   const handleEndGame = async () => {
//     console.log("Ending game");  // Debug: Log end game action
//     if (loading) return;
//     try {
//       await endGameSession(gameSessionId);
//     } catch (err) {
//       console.error('Error ending game:', err);
//     }
//   };

//   if (loading && !currentQuestion) {
//     return (
//       <div className="d-flex justify-content-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }
//   const optionLabels = ['A', 'B', 'C', 'D']; // 👈 Add this at the top of your component or above return if you want labels

//   console.log("Rendering question block with:", currentQuestion);

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-8">
//           <div className="card mb-4">
//             <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//               <h3 className="mb-0">Quiz Game</h3>
//               <div className="badge bg-warning text-dark fs-5">Time: {timeLeft}s</div>
//             </div>
//             {currentQuestion ? (
//               <div className="card-body">
//                 <h4 className="mb-4">{currentQuestion.questionTitle}</h4>

//     <div className="list-group mb-4">
//     {(currentQuestion.options || []).map((option, index) => (
//       <button 
//         key={index}
//         className={`list-group-item list-group-item-action ${selectedOption === option ? 'active' : ''}`}
//         onClick={() => handleAnswerSubmit(option)}
//         disabled={selectedOption !== ''}
//       >
//         <strong>{optionLabels[index]}:</strong> {option}
//       </button>
//     ))}
//   </div>


//                 <div className="d-flex gap-2">
//                   <button 
//                     className="btn btn-warning"
//                     onClick={handleUseFiftyFifty}
//                     disabled={loading}
//                   >
//                     50/50 Lifeline
//                   </button>
//                   <button 
//                     className="btn btn-info"
//                     onClick={handleUseSkip}
//                     disabled={loading}
//                   >
//                     Skip Question
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="card-body">
//                 <div className="alert alert-info">Waiting for questions...</div>
//               </div>
//             )}
//           </div>

//           <div className="card mb-4">
//             <div className="card-header">Express Yourself</div>
//             <div className="card-body d-flex gap-2 flex-wrap">
//               {['👍', '👎', '😀', '😂', '🤔', '🎉', '👏', '❤️', '🔥', '⚡'].map(emoji => (
//                 <button
//                   key={emoji}
//                   className="btn btn-outline-secondary fs-3"
//                   onClick={() => handleSendEmoji(emoji)}
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {isHost && (
//             <div className="d-grid">
//               <button 
//                 className="btn btn-danger"
//                 onClick={handleEndGame}
//                 disabled={loading}
//               >
//                 End Game
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="col-md-4">
//           <div className="card mb-4">
//             <div className="card-header bg-success text-white">
//               <h4 className="mb-0">Scoreboard</h4>
//             </div>
//             <div className="card-body p-0">
//               <ul className="list-group list-group-flush">
//                 {players
//                   .sort((a, b) => b.score - a.score)
//                   .map((player, index) => (
//                     <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                       <div>
//                         {player.email}
//                         {player.isHost && <span className="badge bg-primary ms-2">Host</span>}
//                         {player.email === user.email && <span className="badge bg-info ms-2">You</span>}
//                       </div>
//                       <span className="badge bg-success rounded-pill">{player.score}</span>
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           </div>

//           <div className="card">
//             <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
//               <h4 className="mb-0">
//                 {showChat ? 'Chat' : 'Notifications'}
//               </h4>
//               <button 
//                 className="btn btn-sm btn-outline-light"
//                 onClick={() => setShowChat(!showChat)}
//               >
//                 {showChat ? 'Show Notifications' : 'Show Chat'}
//               </button>
//             </div>
//             <div className="card-body">
//               <div className="chat-messages mb-3" style={{ height: '200px', overflowY: 'auto' }}>
//                 {showChat 
//                   ? messages
//                       .filter(msg => msg.type === 'chat')
//                       .map((msg, index) => (
//                         <div key={index} className={`mb-2 ${msg.player === user.email ? 'text-end' : ''}`}>
//                           <div className={`d-inline-block p-2 rounded ${msg.player === user.email ? 'bg-primary text-white' : 'bg-light'}`}>
//                             <strong>{msg.player}</strong>: {msg.content}
//                           </div>
//                         </div>
//                       ))
//                   : messages
//                       .filter(msg => msg.type === 'system' || msg.type === 'emoji')
//                       .map((msg, index) => (
//                         <div key={index} className="mb-2">
//                           {msg.type === 'system' ? (
//                             <div className="alert alert-secondary py-1 mb-0">
//                               {msg.content}
//                             </div>
//                           ) : (
//                             <div className="d-flex align-items-center">
//                               <span className="me-2">{msg.player}:</span>
//                               <span className="fs-4">{msg.emoji}</span>
//                             </div>
//                           )}
//                         </div>
//                       ))
//                 }
//               </div>

//               {showChat && (
//                 <form onSubmit={handleSendChatMessage}>
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Type your message..."
//                       value={chatMessage}
//                       onChange={(e) => setChatMessage(e.target.value)}
//                       disabled={loading}
//                     />
//                     <button 
//                       type="submit" 
//                       className="btn btn-primary"
//                       disabled={!chatMessage.trim() || loading}
//                     >
//                       Send
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameSession;


// import React, { useContext, useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import GameContext from '../context/GameContext';

// const GameSession = () => {
//   console.log("=== GameSession Component Rendering ===");
//   const { gameSessionId } = useParams();
//   const navigate = useNavigate();
//   const { 
//     user, 
//     currentQuestion, 
//     players, 
//     messages, 
//     sendPlayerAction, 
//     fiftyFiftyLifeline, 
//     skipLifeline,
//     endGameSession,
//     gameStatus,
//     loading
//   } = useContext(GameContext);

//   const [selectedOption, setSelectedOption] = useState('');
//   const [chatMessage, setChatMessage] = useState('');
//   const [showChat, setShowChat] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(30);

//   const optionLabels = ['A', 'B', 'C', 'D'];
//   const isHost = players.find(p => p.email === user.email)?.isHost;

//   useEffect(() => {
//     if (currentQuestion && gameStatus === 'inProgress') {
//       setTimeLeft(30);
//       const timer = setInterval(() => {
//         setTimeLeft(prev => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [currentQuestion, gameStatus]);

//   const handleAnswerSubmit = async (option) => {
//     if (loading) return;
//     setSelectedOption(option);
//     const action = {
//       type: 'ANSWER',
//       gameSessionId,
//       questionId: currentQuestion.id,
//       answer: option
//     };
//     try {
//       await sendPlayerAction(user.email, action);
//     } catch (err) {
//       console.error('Error submitting answer:', err);
//     }
//   };

//   const handleSendEmoji = async (emoji) => {
//     if (loading) return;
//     const action = {
//       type: 'EMOJI',
//       gameSessionId,
//       emoji
//     };
//     try {
//       await sendPlayerAction(user.email, action);
//     } catch (err) {
//       console.error('Error sending emoji:', err);
//     }
//   };

//   const handleSendChatMessage = async (e) => {
//     e.preventDefault();
//     if (!chatMessage.trim() || loading) return;
//     const action = {
//       type: 'CHAT',
//       gameSessionId,
//       message: chatMessage
//     };
//     try {
//       await sendPlayerAction(user.email, action);
//       setChatMessage('');
//     } catch (err) {
//       console.error('Error sending chat message:', err);
//     }
//   };

//   const handleUseFiftyFifty = async () => {
//     if (loading || !currentQuestion) return;
//     try {
//       await fiftyFiftyLifeline(gameSessionId, currentQuestion.id);
//     } catch (err) {
//       console.error('Error using 50-50 lifeline:', err);
//     }
//   };

//   const handleUseSkip = async () => {
//     if (loading) return;
//     try {
//       await skipLifeline(gameSessionId);
//     } catch (err) {
//       console.error('Error using skip lifeline:', err);
//     }
//   };

//   const handleEndGame = async () => {
//     if (loading) return;
//     try {
//       await endGameSession(gameSessionId);
//     } catch (err) {
//       console.error('Error ending game:', err);
//     }
//   };

//   if (loading && !currentQuestion) {
//     return (
//       <div className="d-flex justify-content-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-8">
//           <div className="card mb-4">
//             <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//               <h3 className="mb-0">Quiz Game</h3>
//               <div className="badge bg-warning text-dark fs-5">Time: {timeLeft}s</div>
//             </div>
//             {currentQuestion ? (
//               <div className="card-body">
//                 <h4 className="mb-4">{currentQuestion.questionTitle}</h4>

//                 <div className="list-group mb-4">
//                   {(currentQuestion.options || []).map((option, index) => (
//                     <button 
//                       key={index}
//                       className={`list-group-item list-group-item-action ${selectedOption === option ? 'active' : ''}`}
//                       onClick={() => handleAnswerSubmit(option)}
//                       disabled={selectedOption !== ''}
//                     >
//                       <strong>{optionLabels[index]}:</strong> {option}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="d-flex gap-2">
//                   <button 
//                     className="btn btn-warning"
//                     onClick={handleUseFiftyFifty}
//                     disabled={loading}
//                   >
//                     50/50 Lifeline
//                   </button>
//                   <button 
//                     className="btn btn-info"
//                     onClick={handleUseSkip}
//                     disabled={loading}
//                   >
//                     Skip Question
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="card-body">
//                 <div className="alert alert-info">Waiting for questions...</div>
//               </div>
//             )}
//           </div>

//           <div className="card mb-4">
//             <div className="card-header">Express Yourself</div>
//             <div className="card-body d-flex gap-2 flex-wrap">
//               {['👍', '👎', '😀', '😂', '🤔', '🎉', '👏', '❤️', '🔥', '⚡'].map(emoji => (
//                 <button
//                   key={emoji}
//                   className="btn btn-outline-secondary fs-3"
//                   onClick={() => handleSendEmoji(emoji)}
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {isHost && (
//             <div className="d-grid">
//               <button 
//                 className="btn btn-danger"
//                 onClick={handleEndGame}
//                 disabled={loading}
//               >
//                 End Game
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="col-md-4">
//           <div className="card mb-4">
//             <div className="card-header bg-success text-white">
//               <h4 className="mb-0">Scoreboard</h4>
//             </div>
//             <div className="card-body p-0">
//               <ul className="list-group list-group-flush">
//                 {players
//                   .sort((a, b) => b.score - a.score)
//                   .map((player, index) => (
//                     <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                       <div>
//                         {player.email}
//                         {player.isHost && <span className="badge bg-primary ms-2">Host</span>}
//                         {player.email === user.email && <span className="badge bg-info ms-2">You</span>}
//                       </div>
//                       <span className="badge bg-success rounded-pill">{player.score}</span>
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           </div>

//           <div className="card">
//             <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
//               <h4 className="mb-0">{showChat ? 'Chat' : 'Notifications'}</h4>
//               <button 
//                 className="btn btn-sm btn-outline-light"
//                 onClick={() => setShowChat(!showChat)}
//               >
//                 {showChat ? 'Show Notifications' : 'Show Chat'}
//               </button>
//             </div>
//             <div className="card-body">
//               <div className="chat-messages mb-3" style={{ height: '200px', overflowY: 'auto' }}>
//                 {showChat 
//                   ? messages
//                       .filter(msg => msg.type === 'chat')
//                       .map((msg, index) => (
//                         <div key={index} className={`mb-2 ${msg.player === user.email ? 'text-end' : ''}`}>
//                           <div className={`d-inline-block p-2 rounded ${msg.player === user.email ? 'bg-primary text-white' : 'bg-light'}`}>
//                             <strong>{msg.player}</strong>: {msg.content}
//                           </div>
//                         </div>
//                       ))
//                   : messages
//                       .filter(msg => msg.type === 'system' || msg.type === 'emoji')
//                       .map((msg, index) => (
//                         <div key={index} className="mb-2">
//                           {msg.type === 'system' ? (
//                             <div className="alert alert-secondary py-1 mb-0">{msg.content}</div>
//                           ) : (
//                             <div className="d-flex align-items-center">
//                               <span className="me-2">{msg.player}:</span>
//                               <span className="fs-4">{msg.emoji}</span>
//                             </div>
//                           )}
//                         </div>
//                       ))
//                 }
//               </div>

//               {showChat && (
//                 <form onSubmit={handleSendChatMessage}>
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Type your message..."
//                       value={chatMessage}
//                       onChange={(e) => setChatMessage(e.target.value)}
//                       disabled={loading}
//                     />
//                     <button 
//                       type="submit" 
//                       className="btn btn-primary"
//                       disabled={!chatMessage.trim() || loading}
//                     >
//                       Send
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameSession;







import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';

const GameSession = () => {
  console.log("=== GameSession Component Rendering ===");
  const { gameSessionId } = useParams();
  const navigate = useNavigate();
  const { 
    user, 
    currentQuestion, 
    players, 
    messages, 
    sendPlayerAction, 
    fiftyFiftyLifeline, 
    skipLifeline,
    endGameSession,
    gameStatus,
    loading,
    fetchGameSessionData
  } = useContext(GameContext);

  const [selectedOption, setSelectedOption] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const optionLabels = ['A', 'B', 'C', 'D'];
  const isHost = players.find(p => p.email === user.email)?.isHost;

  // Fetch session when component mounts
  useEffect(() => {
    if (gameSessionId && user?.email) {
      fetchGameSessionData(gameSessionId, user.email);
    }
  }, [gameSessionId, user?.email]);

  // Countdown timer per question
  useEffect(() => {
    if (currentQuestion && gameStatus === 'inProgress') {
      setTimeLeft(30);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestion, gameStatus]);

  const handleAnswerSubmit = async (option) => {
    if (loading) return;
    setSelectedOption(option);
    const action = {
      type: 'ANSWER',
      gameSessionId,
      questionId: currentQuestion.id,
      answer: option
    };
    try {
      await sendPlayerAction(user.email, action);
    } catch (err) {
      console.error('Error submitting answer:', err);
    }
  };

  const handleSendEmoji = async (emoji) => {
    if (loading) return;
    const action = {
      type: 'EMOJI',
      gameSessionId,
      emoji
    };
    try {
      await sendPlayerAction(user.email, action);
    } catch (err) {
      console.error('Error sending emoji:', err);
    }
  };

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim() || loading) return;
    const action = {
      type: 'CHAT',
      gameSessionId,
      message: chatMessage
    };
    try {
      await sendPlayerAction(user.email, action);
      setChatMessage('');
    } catch (err) {
      console.error('Error sending chat message:', err);
    }
  };

  const handleUseFiftyFifty = async () => {
    if (loading || !currentQuestion) return;
    try {
      await fiftyFiftyLifeline(gameSessionId, currentQuestion.id);
    } catch (err) {
      console.error('Error using 50-50 lifeline:', err);
    }
  };

  const handleUseSkip = async () => {
    if (loading) return;
    try {
      await skipLifeline(gameSessionId);
    } catch (err) {
      console.error('Error using skip lifeline:', err);
    }
  };

  const handleEndGame = async () => {
    if (loading) return;
    try {
      await endGameSession(gameSessionId);
    } catch (err) {
      console.error('Error ending game:', err);
    }
  };

  if (loading && !currentQuestion) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Quiz Game</h3>
              <div className="badge bg-warning text-dark fs-5">Time: {timeLeft}s</div>
            </div>
            {currentQuestion ? (
              <div className="card-body">
                <h4 className="mb-4">{currentQuestion.questionTitle}</h4>

                <div className="list-group mb-4">
                  {(currentQuestion.options || []).map((option, index) => (
                    <button 
                      key={index}
                      className={`list-group-item list-group-item-action ${selectedOption === option ? 'active' : ''}`}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={selectedOption !== ''}
                    >
                      <strong>{optionLabels[index]}:</strong> {option}
                    </button>
                  ))}
                </div>

                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-warning"
                    onClick={handleUseFiftyFifty}
                    disabled={loading}
                  >
                    50/50 Lifeline
                  </button>
                  <button 
                    className="btn btn-info"
                    onClick={handleUseSkip}
                    disabled={loading}
                  >
                    Skip Question
                  </button>
                </div>
              </div>
            ) : (
              <div className="card-body">
                <div className="alert alert-info">Waiting for questions...</div>
              </div>
            )}
          </div>

          <div className="card mb-4">
            <div className="card-header">Express Yourself</div>
            <div className="card-body d-flex gap-2 flex-wrap">
              {['👍', '👎', '😀', '😂', '🤔', '🎉', '👏', '❤️', '🔥', '⚡'].map(emoji => (
                <button
                  key={emoji}
                  className="btn btn-outline-secondary fs-3"
                  onClick={() => handleSendEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {isHost && (
            <div className="d-grid">
              <button 
                className="btn btn-danger"
                onClick={handleEndGame}
                disabled={loading}
              >
                End Game
              </button>
            </div>
          )}
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Scoreboard</h4>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {players
                  .sort((a, b) => b.score - a.score)
                  .map((player, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        {player.email}
                        {player.isHost && <span className="badge bg-primary ms-2">Host</span>}
                        {player.email === user.email && <span className="badge bg-info ms-2">You</span>}
                      </div>
                      <span className="badge bg-success rounded-pill">{player.score}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">{showChat ? 'Chat' : 'Notifications'}</h4>
              <button 
                className="btn btn-sm btn-outline-light"
                onClick={() => setShowChat(!showChat)}
              >
                {showChat ? 'Show Notifications' : 'Show Chat'}
              </button>
            </div>
            <div className="card-body">
              <div className="chat-messages mb-3" style={{ height: '200px', overflowY: 'auto' }}>
                {showChat 
                  ? messages
                      .filter(msg => msg.type === 'chat')
                      .map((msg, index) => (
                        <div key={index} className={`mb-2 ${msg.player === user.email ? 'text-end' : ''}`}>
                          <div className={`d-inline-block p-2 rounded ${msg.player === user.email ? 'bg-primary text-white' : 'bg-light'}`}>
                            <strong>{msg.player}</strong>: {msg.content}
                          </div>
                        </div>
                      ))
                  : messages
                      .filter(msg => msg.type === 'system' || msg.type === 'emoji')
                      .map((msg, index) => (
                        <div key={index} className="mb-2">
                          {msg.type === 'system' ? (
                            <div className="alert alert-secondary py-1 mb-0">{msg.content}</div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <span className="me-2">{msg.player}:</span>
                              <span className="fs-4">{msg.emoji}</span>
                            </div>
                          )}
                        </div>
                      ))
                }
              </div>

              {showChat && (
                <form onSubmit={handleSendChatMessage}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      disabled={loading}
                    />
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={!chatMessage.trim() || loading}
                    >
                      Send
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSession;



