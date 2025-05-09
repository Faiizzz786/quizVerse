// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Form, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const StartGame = () => {
//   const [quizId, setQuizId] = useState('');
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();

//   const startGame = async () => {
//     try {
//       const response = await axios.post(`http://localhost:9099/api/game/start/${quizId}/${email}`);
//       const gameSessionId = response.data.id;

//       // ✅ Navigate with email as query param
//       navigate(`/game/${gameSessionId}?email=${email}`);
//     } catch (error) {
//       console.error("Error starting game", error);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center min-vh-100">
//       <Card style={{ width: '25rem' }}>
//         <Card.Body>
//           <Card.Title className="text-center">Start a New Game</Card.Title>
//           <Form>
//             <Form.Group controlId="quizId">
//               <Form.Label>Quiz ID</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 value={quizId} 
//                 onChange={(e) => setQuizId(e.target.value)} 
//                 placeholder="Enter Quiz ID"
//               />
//             </Form.Group>
//             <Form.Group controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control 
//                 type="email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 placeholder="Enter your email"
//               />
//             </Form.Group>
//             <Button variant="primary" className="w-100 mt-3" onClick={startGame}>
//               Start Game
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default StartGame;


import React, { useState } from 'react'; // Import useState from React
import axios from 'axios'; // Import axios for HTTP requests
import { Button, Form, Card } from 'react-bootstrap'; // Import required components from react-bootstrap
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const StartGame = () => {
  const [quizId, setQuizId] = useState(''); // State for quiz ID
  const [gameSessionId, setGameSessionId] = useState(''); // State for game session ID
  const [email, setEmail] = useState(''); // State for email
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to start a new game
  const startGame = async () => {
    try {
      console.log("Sending quizId:", quizId); // Log quizId here
  const response = await axios.post(`http://localhost:9099/api/game/start/${quizId}/${email}`);
  const gameSessionId = response.data.id;
  console.log("Game session ID:", gameSessionId);

      // Navigate to the game session page
      navigate(`/game/${gameSessionId}?email=${email}`);
    } catch (error) {
      console.error("Error starting game", error);
    }
  };

  // Function to join an existing game
  const joinGame = async () => {
    try {
      const response = await axios.post(`http://localhost:9099/api/game/join/${gameSessionId}/${email}`);
      const gameSessionId = response.data.id;

      // Navigate to the game session page
      navigate(`/game/${gameSessionId}?email=${email}`);
    } catch (error) {
      console.error("Error joining game", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title className="text-center">Start or Join a Game</Card.Title>
          <Form>
            {/* Start a new game */}
            <Form.Group controlId="quizId">
              <Form.Label>Quiz ID</Form.Label>
              <Form.Control 
                type="text" 
                value={quizId} 
                onChange={(e) => setQuizId(e.target.value)} 
                placeholder="Enter Quiz ID" 
              />
            </Form.Group>

            {/* Or Join an existing game */}
            <Form.Group controlId="gameSessionId">
              <Form.Label>Game Session ID</Form.Label>
              <Form.Control 
                type="text" 
                value={gameSessionId} 
                onChange={(e) => setGameSessionId(e.target.value)} 
                placeholder="Enter Game Session ID (if joining)"
              />
            </Form.Group>

            {/* Email input */}
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
              />
            </Form.Group>

            <Button variant="primary" className="w-100 mt-3" onClick={startGame}>
              Start New Game
            </Button>

            <Button variant="secondary" className="w-100 mt-3" onClick={joinGame}>
              Join Existing Game
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StartGame; // Export the component to use in other parts of the app

