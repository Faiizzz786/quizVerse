// features/scrambledGame/Scramble.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Scramble.css';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import HintSection from './HintSection';
import LevelSelector from './LevelSelector';
import ScoreBoard from './ScoreBoard';

function Scramble() {
  const [level, setLevel] = useState(1);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('waiting'); // waiting, playing, success, failure
  const [hints, setHints] = useState([]);
  const [originalWord, setOriginalWord] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timer, setTimer] = useState(null);

  // Start a new game
  // const startGame = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:9099/api/game/start?level=${level}`);
  //     const data = await response.json();
  //     console.log(data);
      
  //     setScrambledWord(data.scrambledWord);
  //     setUserGuess('');
  //     setMessage('');
  //     setStatus('playing');
  //     setHints([]);
      
  //     // For development, if originalWord is returned
  //     if (data.originalWord) {
  //       setOriginalWord(data.originalWord);
  //     }
      
  //     // Clear any existing timer
  //     clearInterval(timer);
      
  //     // Calculate time based on level - higher levels get less time
  //     // Formula: Base time (60s) - (level-1)*5, with a minimum of 15 seconds
  //     const seconds = Math.max(60 - ((level - 1) * 5), 15);
  //     setTimeLeft(seconds);
      
  //     const newTimer = setInterval(() => {
  //       setTimeLeft(prev => {
  //         if (prev <= 1) {
  //           clearInterval(newTimer);
  //           setStatus('failure');
  //           setMessage(`Time's up! The word was: ${data.originalWord || "???"}`);
  //           setStreak(0);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
      
  //     setTimer(newTimer);
      
  //   } catch (error) {
  //     console.error("Error starting game:", error);
  //     setMessage("Error connecting to server. Please try again.");
  //   }
  // };
  const startGame = async () => {
    try {
      const response = await fetch(`http://localhost:9099/api/game/start?level=${level}`);
      const data = await response.json();
      
      setScrambledWord(data.scrambledWord);
      setUserGuess('');
      setMessage('');
      setStatus('playing');
      setHints([]);
      
      // For development, if originalWord is returned
      if (data.originalWord) {
        setOriginalWord(data.originalWord);
      }
      
      // Clear any existing timer
      clearInterval(timer);
      
      // Calculate time based on level - higher levels get less time
      // Formula: Base time (60s) - (level-1)*5, with a minimum of 15 seconds
      const seconds = Math.max(60 - ((level - 1) * 5), 15);
      setTimeLeft(seconds);
      
      const newTimer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(newTimer);
            setStatus('failure');
            setMessage(`Time's up! The word was: ${data.originalWord || "???"}`);
            setStreak(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimer(newTimer);
      
    } catch (error) {
      console.error("Error starting game:", error);
      setMessage("Error connecting to server. Please try again.");
    }
  };

  // Check the user's answer
  const checkAnswer = () => {
    if (userGuess.toLowerCase() === originalWord) {
      // Success!
      clearInterval(timer);
      setStatus('success');
      setMessage('Correct! Great job!');
      const points = calculatePoints();
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
    } else {
      // Wrong answer
      setMessage('That\'s not right. Try again!');
      // Reduce time as penalty
      setTimeLeft(prev => Math.max(prev - 5, 0));
    }
  };

  // Calculate points based on level, time left, and hints used
  const calculatePoints = () => {
    // Base points scale with level
    const basePoints = level * 100;
    
    // Time bonus: more points for answering quickly
    const timeBonus = timeLeft * level;
    
    // Hint penalty: more penalty for higher levels
    const hintPenalty = hints.length * (25 * level);
    
    return basePoints + timeBonus - hintPenalty;
  };

  // Get a hint
  const getHint = async (type) => {
    try {
      // Only allow a limited number of hints
      if (hints.length >= 3) {
        setMessage("You've used all your hints!");
        return;
      }
      
      const response = await fetch(`http://localhost:9099/api/game/hint?word=${originalWord}&level=${level}&type=${type}`);
      const hintText = await response.text();
      
      // Add the hint to our hints array
      const newHint = { type, text: hintText };
      setHints(prev => [...prev, newHint]);
      
    } catch (error) {
      console.error("Error getting hint:", error);
      setMessage("Error getting hint. Please try again.");
    }
  };

  // Change level
  const changeLevel = (newLevel) => {
    setLevel(newLevel);
    setStatus('waiting');
    clearInterval(timer);
  };

  // Skip the current word
  const skipWord = () => {
    setStreak(0);
    startGame();
  };

  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  return (
    <div className="scramble-container">
      <div className="container py-4">
        <GameHeader />
        
        <div className="row mb-4">
          <div className="col-md-6">
            <LevelSelector 
              level={level} 
              changeLevel={changeLevel} 
              disabled={status === 'playing'} 
            />
          </div>
          <div className="col-md-6">
            <ScoreBoard score={score} streak={streak} timeLeft={timeLeft} />
          </div>
        </div>
        
        <GameBoard 
          status={status}
          scrambledWord={scrambledWord}
          userGuess={userGuess}
          setUserGuess={setUserGuess}
          message={message}
          checkAnswer={checkAnswer}
          startGame={startGame}
          skipWord={skipWord}
        />
        
        {status === 'playing' && (
          <HintSection getHint={getHint} hints={hints} />
        )}
      </div>
    </div>
  );
}

export default Scramble;