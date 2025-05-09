// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Button, Form, ListGroup, Card, Alert } from 'react-bootstrap';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';
// import { useParams, useSearchParams } from 'react-router-dom';

// const GamePage = () => {
//   const { gameSessionId } = useParams();
//   const [searchParams] = useSearchParams();
//   const email = searchParams.get('email');

//   const [gameSession, setGameSession] = useState(null);
//   const [chatMessage, setChatMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const stompClientRef = useRef(null);

//   useEffect(() => {
//     if (!email) return;

//     // Join game session
//     axios.post(`http://localhost:9099/api/game/join/${gameSessionId}/${email}`)
//       .then((response) => {
//         setGameSession(response.data);
//       })
//       .catch((err) => console.error("Join failed:", err));

//     // Setup WebSocket
//     const socket = new SockJS('http://localhost:9099/ws');
//     const client = new Client({
//       webSocketFactory: () => socket,
//       onConnect: () => {
//         client.subscribe(`/topic/game/${gameSessionId}`, (message) => {
//           const messageData = JSON.parse(message.body);
//           if (messageData.action === 'chat') {
//             setMessages((prev) => [...prev, messageData.message]);
//           }
//         });
//       },
//     });

//     client.activate();
//     stompClientRef.current = client;

//     return () => {
//       if (stompClientRef.current) {
//         stompClientRef.current.deactivate();
//       }
//     };
//   }, [gameSessionId, email]);

//   const sendAction = async (type) => {
//     if (!gameSession || !email) return;

//     const request = {
//       gameSessionId,
//       actionType: type,
//     };

//     try {
//       await axios.post(`http://localhost:9099/api/game/action/${email}`, request);
//     } catch (error) {
//       console.error("Error sending action:", error);
//     }
//   };

//   const sendChat = () => {
//     if (stompClientRef.current && chatMessage.trim() !== '') {
//       const chatPayload = {
//         action: 'chat',
//         message: chatMessage,
//       };
//       stompClientRef.current.publish({
//         destination: `/app/game/${gameSessionId}`,
//         body: JSON.stringify(chatPayload),
//       });
//       setChatMessage('');
//     }
//   };

//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
//       <Card style={{ width: '30rem' }}>
//         <Card.Body>
//           <Card.Title className="text-center">Game Session</Card.Title>

//           {gameSession ? (
//             <>
//               <h5>Quiz: {gameSession.quiz.name}</h5>
//               <Alert variant="info">
//                 <strong>Question:</strong> {gameSession.currentQuestion}
//               </Alert>

//               <div className="mb-3">
//                 <Button variant="primary" onClick={() => sendAction('ANSWER')} className="w-100">
//                   Answer Question
//                 </Button>
//                 <Button variant="warning" onClick={() => sendAction('LIFELINE')} className="w-100 mt-2">
//                   Use Lifeline
//                 </Button>
//               </div>

//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 placeholder="Type a message..."
//               />
//               <Button variant="success" className="mt-2 w-100" onClick={sendChat}>
//                 Send Message
//               </Button>

//               <h5 className="mt-4">Messages:</h5>
//               <ListGroup>
//                 {messages.map((msg, index) => (
//                   <ListGroup.Item key={index}>{msg}</ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </>
//           ) : (
//             <p>Loading game session...</p>
//           )}
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default GamePage;



// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Button, Form, ListGroup, Card, Alert } from 'react-bootstrap';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';
// import { useParams, useSearchParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';


// const GamePage = () => {
//   const { gameSessionId } = useParams();
 

// // ...
// const location = useLocation();




//   const [searchParams] = useSearchParams();
//   const email = searchParams.get('email') || location.state?.email;
//   console.log('Email:', email); 

//   const [gameSession, setGameSession] = useState(null);
//   const [chatMessage, setChatMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const stompClientRef = useRef(null);

//   useEffect(() => {
//     console.log('GamePage mounted');
//     console.log('GameSession ID:', gameSessionId);
//     console.log('Email:', email);

//     if (!email) {
//       console.warn('Email is missing. Exiting useEffect.');
//       return;
//     }

//     // Join game session
//     axios.post(`http://localhost:9099/api/game/join/${gameSessionId}/${email}`)
//       .then((response) => {
//         console.log('Game session joined:', response.data);
//         setGameSession(response.data);
//       })
//       .catch((err) => console.error("Join failed:", err));

//       const socket = new SockJS("http://localhost:9099/ws", null, {
//         withCredentials: true,
//         transports: ['websocket', 'xhr-streaming', 'xhr-polling']
//       });
    
//     const client = new Client({
//       webSocketFactory: () => socket,
//       onConnect: () => {
//         console.log('STOMP client connected');
//         client.subscribe(`/topic/game/${gameSessionId}`, (message) => {
//           console.log('WebSocket message received:', message.body);
//           const messageData = JSON.parse(message.body);
//           if (messageData.action === 'chat') {
//             console.log('Chat message received:', messageData.message);
//             setMessages((prev) => [...prev, messageData.message]);
//           }
//         });
//       },
//       onStompError: (frame) => {
//         console.error('STOMP error:', frame);
//       },
//       onWebSocketError: (err) => {
//         console.error('WebSocket error:', err);
//       },
//       onWebSocketClose: () => {
//         console.log('WebSocket connection closed');
//       }
//     });

//     client.activate();
//     stompClientRef.current = client;

//     return () => {
//       console.log('Cleaning up WebSocket...');
//       if (stompClientRef.current) {
//         stompClientRef.current.deactivate();
//       }
//     };
//   }, [gameSessionId, email]);

//   const sendAction = async (type) => {
//     if (!gameSession || !email) {
//       console.warn('Cannot send action: missing game session or email');
//       return;
//     }

//     const request = {
//       gameSessionId,
//       actionType: type,
//     };

//     try {
//       console.log(`Sending action: ${type}`);
//       await axios.post(`http://localhost:9099/api/game/action/${email}`, request);
//       console.log(`Action ${type} sent successfully`);
//     } catch (error) {
//       console.error("Error sending action:", error);
//     }
//   };

//   const sendChat = () => {
//     if (stompClientRef.current && chatMessage.trim() !== '') {
//       const chatPayload = {
//         action: 'chat',
//         message: chatMessage,
//       };
//       console.log('Sending chat message:', chatPayload);

//       stompClientRef.current.publish({
//         destination: `/app/game/${gameSessionId}`,
//         body: JSON.stringify(chatPayload),
//       });

//       setChatMessage('');
//     } else {
//       console.warn('Empty chat message or STOMP client not ready');
//     }
//   };

//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
//       <Card style={{ width: '30rem' }}>
//         <Card.Body>
//           <Card.Title className="text-center">Game Session</Card.Title>

//           {gameSession ? (
//             <>
//               <h5>Quiz: {gameSession.quiz.name}</h5>
//               <Alert variant="info">
//   <strong>Question:</strong> {gameSession.currentQuestion ? gameSession.currentQuestion.questionTitle : 'Waiting for question...'}
// </Alert>
// {gameSession.currentQuestion && gameSession.currentQuestion.options && (
//   <div className="mb-3">
//     <strong>Options:</strong>
//     <ListGroup className="mt-2">
//       {gameSession.currentQuestion.options.map((option, idx) => (
//         <ListGroup.Item key={idx}>{option}</ListGroup.Item>
//       ))}
//     </ListGroup>
//   </div>
// )}


//               <div className="mb-3">
//                 <Button variant="primary" onClick={() => sendAction('ANSWER')} className="w-100">
//                   Answer Question
//                 </Button>
//                 <Button variant="warning" onClick={() => sendAction('LIFELINE')} className="w-100 mt-2">
//                   Use Lifeline
//                 </Button>
//               </div>

//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 placeholder="Type a message..."
//               />
//               <Button variant="success" className="mt-2 w-100" onClick={sendChat}>
//                 Send Message
//               </Button>

//               <h5 className="mt-4">Messages:</h5>
//               <ListGroup>
//                 {messages.map((msg, index) => (
//                   <ListGroup.Item key={index}>{msg}</ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </>
//           ) : (
//             <p>Loading game session...</p>
//           )}
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default GamePage;








// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Button, Form, ListGroup, Card, Alert } from 'react-bootstrap';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';
// import { useParams, useSearchParams, useLocation } from 'react-router-dom';

// const GamePage = () => {
//   const { gameSessionId } = useParams();
//   const location = useLocation();
//   const [searchParams] = useSearchParams();
//   const email = searchParams.get('email') || location.state?.email;
//   console.log('Email:', email);

//   const [gameSession, setGameSession] = useState(null);
//   const [chatMessage, setChatMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const stompClientRef = useRef(null);

//   useEffect(() => {
//     console.log('GamePage mounted');
//     console.log('GameSession ID:', gameSessionId);
//     console.log('Email:', email);

//     if (!email) {
//       console.warn('Email is missing. Exiting useEffect.');
//       return;
//     }

//     // Join game session
//     axios.post(`http://localhost:9099/api/game/join/${gameSessionId}/${email}`)
//       .then((response) => {
//         console.log('Game session joined:', response.data);
//         setGameSession(response.data);
//       })
//       .catch((err) => console.error("Join failed:", err));

//     // WebSocket setup
//     const socket = new SockJS("http://localhost:9099/ws", null, {
//       withCredentials: true,
//       transports: ['websocket', 'xhr-streaming', 'xhr-polling']
//     });

//     const client = new Client({
//       webSocketFactory: () => socket,
//       onConnect: () => {
//         console.log('STOMP client connected');
//         client.subscribe(`/topic/game/${gameSessionId}`, (message) => {
//           console.log('WebSocket message received:', message.body);
//           const messageData = JSON.parse(message.body);
//           if (messageData.action === 'chat') {
//             console.log('Chat message received:', messageData.message);
//             setMessages((prev) => [...prev, messageData.message]);
//           }
//         });
//       },
//       onStompError: (frame) => {
//         console.error('STOMP error:', frame);
//       },
//       onWebSocketError: (err) => {
//         console.error('WebSocket error:', err);
//       },
//       onWebSocketClose: () => {
//         console.log('WebSocket connection closed');
//       }
//     });

//     client.activate();
//     stompClientRef.current = client;

//     return () => {
//       console.log('Cleaning up WebSocket...');
//       if (stompClientRef.current) {
//         stompClientRef.current.deactivate();
//       }
//     };
//   }, [gameSessionId, email]);

//   const sendAction = async (type, payload = {}) => {
//     if (!gameSession || !email) {
//       console.warn('Cannot send action: missing game session or email');
//       return;
//     }

//     const request = {
//       gameSessionId,
//       actionType: type,
//       ...payload
//     };

//     try {
//       console.log(`Sending action: ${type}`, payload);
//       await axios.post(`http://localhost:9099/api/game/action/${email}`, request);
//       console.log(`Action ${type} sent successfully`);
//     } catch (error) {
//       console.error("Error sending action:", error);
//     }
//   };

//   const sendChat = () => {
//     if (stompClientRef.current && chatMessage.trim() !== '') {
//       const chatPayload = {
//         action: 'chat',
//         message: chatMessage,
//       };
//       console.log('Sending chat message:', chatPayload);

//       stompClientRef.current.publish({
//         destination: `/app/game/${gameSessionId}`,
//         body: JSON.stringify(chatPayload),
//       });

//       setChatMessage('');
//     } else {
//       console.warn('Empty chat message or STOMP client not ready');
//     }
//   };

//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
//       <Card style={{ width: '30rem' }}>
//         <Card.Body>
//           <Card.Title className="text-center">Game Session</Card.Title>

//           {gameSession ? (
//             <>
//               <h5>Quiz: {gameSession.quiz.name}</h5>
//               <Alert variant="info">
//                 <strong>Question:</strong>{' '}
//                 {gameSession.currentQuestion
//                   ? gameSession.currentQuestion.questionTitle
//                   : 'Waiting for question...'}
//               </Alert>

//               {gameSession.currentQuestion && gameSession.currentQuestion.options && (
//                 <Form className="mb-3">
//                   <strong>Options:</strong>
//                   {gameSession.currentQuestion.options.map((option, idx) => (
//                     <Form.Check
//                       key={idx}
//                       type="radio"
//                       label={option}
//                       name="quiz-options"
//                       value={option}
//                       checked={selectedOption === option}
//                       onChange={(e) => setSelectedOption(e.target.value)}
//                       className="mt-2"
//                     />
//                   ))}
//                 </Form>
//               )}

// <Button
//   variant="primary"
//   className="w-100 mb-2"
//   onClick={() => {
//     if (selectedOption) {
//       const questionId = gameSession?.currentQuestion?.id;
//       console.log('📤 Submitting selected answer:', selectedOption);
//       sendAction('ANSWER', {
//         questionId: questionId,
//         answerId: selectedOption,
//       });
//       setSelectedOption(null);
//     } else {
//       alert('Please select an option before submitting!');
//     }
//   }}
// >
//   Submit Answer
// </Button>


//               <Button
//                 variant="warning"
//                 onClick={() => sendAction('LIFELINE')}
//                 className="w-100 mb-3"
//               >
//                 Use Lifeline
//               </Button>

//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 placeholder="Type a message..."
//               />
//               <Button
//                 variant="success"
//                 className="mt-2 w-100"
//                 onClick={sendChat}
//               >
//                 Send Message
//               </Button>

//               <h5 className="mt-4">Messages:</h5>
//               <ListGroup>
//                 {messages.map((msg, index) => (
//                   <ListGroup.Item key={index}>{msg}</ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </>
//           ) : (
//             <p>Loading game session...</p>
//           )}
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default GamePage;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Form, ListGroup, Card, Alert } from 'react-bootstrap';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';

const GamePage = () => {
  const { gameSessionId } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || location.state?.email;

  const [gameSession, setGameSession] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (!email) {
      console.warn('Email is missing. Exiting useEffect.');
      return;
    }

    axios.post(`http://localhost:9099/api/game/join/${gameSessionId}/${email}`)
      .then((response) => {
        setGameSession(response.data);
      })
      .catch((err) => console.error("Join failed:", err));

    const socket = new SockJS("http://localhost:9099/ws", null, {
      withCredentials: true,
      transports: ['websocket', 'xhr-streaming', 'xhr-polling']
    });

    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('✅ STOMP client connected');
      
        client.subscribe(`/topic/game/${gameSessionId}`, (message) => {
          const messageData = JSON.parse(message.body);
          console.log('📩 WebSocket message received:', messageData);
      
          if (messageData.actionType === 'chat') {
            setMessages((prev) => [...prev, messageData.message]);
          } else if (messageData.actionType === 'update') {
            // 🔁 Refresh game session to get the new question
            axios.get(`http://localhost:9099/api/game/session/${gameSessionId}`)
              .then((response) => {
                console.log("🔄 Game session refreshed with new question:", response.data);
                setGameSession(response.data);
              })
              .catch(err => console.error("Failed to refresh game session:", err));
          }
        });
      },
      onStompError: (frame) => console.error('STOMP error:', frame),
      onWebSocketError: (err) => console.error('WebSocket error:', err),
      onWebSocketClose: () => console.log('WebSocket connection closed'),
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [gameSessionId, email]);

  useEffect(() => {
    if (gameSession?.currentQuestion) {
      setSelectedOption(null);
    }
  }, [gameSession?.currentQuestion]);

  const sendAction = async (type, payload = {}) => {
    if (!gameSession || !email) {
      console.warn('Cannot send action: missing game session or email');
      return;
    }

    const request = {
      gameSessionId,
      actionType: type,
      ...payload
    };

    try {
      console.log(`Sending action: ${type}`, request);
      await axios.post(`http://localhost:9099/api/game/action/${email}`, request);
      console.log(`Action ${type} sent successfully`);
    } catch (error) {
      console.error("Error sending action:", error);
    }
  };

  const sendChat = () => {
    if (stompClientRef.current && chatMessage.trim() !== '') {
      const chatPayload = {
        action: 'chat',
        message: chatMessage,
      };

      stompClientRef.current.publish({
        destination: `/app/game/${gameSessionId}`,
        body: JSON.stringify(chatPayload),
      });

      setChatMessage('');
    } else {
      console.warn('Empty chat message or STOMP client not ready');
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title className="text-center">Game Session</Card.Title>

          {gameSession ? (
            <>
              <h5>Quiz: {gameSession.quiz.name}</h5>
              <Alert variant="info">
                <strong>Question:</strong>{' '}
                {gameSession.currentQuestion
                  ? gameSession.currentQuestion.questionTitle
                  : 'Waiting for question...'}
              </Alert>

              {gameSession.currentQuestion?.options?.length > 0 && (
                <Form className="mb-3">
                  <strong>Options:</strong>
                  {gameSession.currentQuestion.options.map((option, idx) => (
                    <Form.Check
                      key={idx}
                      type="radio"
                      label={option}
                      name="quiz-options"
                      value={option}
                      checked={selectedOption === option}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="mt-2"
                    />
                  ))}
                </Form>
              )}

              <Button
                variant="primary"
                className="w-100 mb-2"
                onClick={() => {
                  if (selectedOption) {
                    const questionId = gameSession?.currentQuestion?.id;
                    console.log('📤 Submitting selected answer:', selectedOption);
                    sendAction('ANSWER', {
                      questionId: questionId,
                      answerId: selectedOption,
                    });
                  } else {
                    alert('Please select an option before submitting!');
                  }
                }}
              >
                Submit Answer
              </Button>

              <Button
                variant="warning"
                onClick={() => sendAction('LIFELINE')}
                className="w-100 mb-3"
              >
                Use Lifeline
              </Button>

              <Form.Control
                as="textarea"
                rows={2}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <Button
                variant="success"
                className="mt-2 w-100"
                onClick={sendChat}
              >
                Send Message
              </Button>

              <h5 className="mt-4">Messages:</h5>
              <ListGroup>
                {messages.map((msg, index) => (
                  <ListGroup.Item key={index}>{msg}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          ) : (
            <p>Loading game session...</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GamePage;


