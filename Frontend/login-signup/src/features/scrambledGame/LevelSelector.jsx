// src/components/LevelSelector.jsx
import React, { useState } from 'react';

function LevelSelector({ level, changeLevel, disabled }) {
  const [customLevel, setCustomLevel] = useState('');
  
  // Predefined difficulty levels
  const presetLevels = [
    { value: 1, label: 'Easy' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'Hard' }
  ];
  
  const handleCustomLevelChange = (e) => {
    const value = e.target.value;
    // Only allow positive integers
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setCustomLevel(value);
    }
  };
  
  const handleCustomLevelSubmit = (e) => {
    e.preventDefault();
    if (customLevel) {
      changeLevel(parseInt(customLevel, 10));
      setCustomLevel('');
    }
  };

  return (
    <div className="level-selector mb-3">
      <h4 className="mb-2">Difficulty Level</h4>
      
      {/* Preset levels */}
      <div className="btn-group mb-3">
        {presetLevels.map(lvl => (
          <button
            key={lvl.value}
            className={`btn ${level === lvl.value ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => changeLevel(lvl.value)}
            disabled={disabled}
          >
            {lvl.label}
          </button>
        ))}
      </div>
      
      {/* Custom level input */}
      <form onSubmit={handleCustomLevelSubmit} className="d-flex align-items-center">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Custom level (1-∞)"
            value={customLevel}
            onChange={handleCustomLevelChange}
            disabled={disabled}
            aria-label="Custom difficulty level"
          />
          <button 
            type="submit" 
            className="btn btn-outline-primary"
            disabled={disabled || !customLevel}
          >
            Set
          </button>
        </div>
      </form>
      
      {/* Current level display */}
      <div className="mt-2">
        <span className="badge bg-secondary">Current Level: {level}</span>
      </div>
    </div>
  );
}

export default LevelSelector;