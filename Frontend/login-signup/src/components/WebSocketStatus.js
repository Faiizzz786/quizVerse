// src/components/WebSocketStatus.js
import React, { useContext, useEffect, useState } from 'react';
import GameContext from '../context/GameContext';

const WebSocketStatus = () => {
  const { websocket } = useContext(GameContext);
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    if (!websocket) {
      setStatus('disconnected');
      return;
    }

    const handleOpen = () => setStatus('connected');
    const handleClose = () => setStatus('disconnected');
    const handleError = () => setStatus('error');

    websocket.addEventListener('open', handleOpen);
    websocket.addEventListener('close', handleClose);
    websocket.addEventListener('error', handleError);

    // Initial check
    if (websocket.readyState === WebSocket.OPEN) {
      setStatus('connected');
    } else if (websocket.readyState === WebSocket.CONNECTING) {
      setStatus('connecting');
    } else {
      setStatus('disconnected');
    }

    return () => {
      websocket.removeEventListener('open', handleOpen);
      websocket.removeEventListener('close', handleClose);
      websocket.removeEventListener('error', handleError);
    };
  }, [websocket]);

  const getStatusBadge = () => {
    switch (status) {
      case 'connected': return <span className="badge bg-success">Connected</span>;
      case 'connecting': return <span className="badge bg-warning text-dark">Connecting...</span>;
      case 'error': return <span className="badge bg-danger">Connection Error</span>;
      default: return <span className="badge bg-secondary">Disconnected</span>;
    }
  };

  return (
    <div className="mb-3">
      WebSocket Status: {getStatusBadge()}
    </div>
  );
};

export default WebSocketStatus;
