import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const JoinGame = () => {
  const { gameSessionId } = useParams();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const joinGame = async () => {
    try {
      await axios.post(`http://localhost:9099/api/game/join/${gameSessionId}/${email}`);

      // ✅ Navigate with email as query param
      navigate(`/game/${gameSessionId}?email=${email}`);
    } catch (error) {
      console.error("Error joining game", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title className="text-center">Join Game</Card.Title>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
              />
            </Form.Group>
            <Button variant="success" block onClick={joinGame}>Join Game</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JoinGame;
