import React from 'react';

const PasswordStrengthMeter = ({ password }) => {
  // Check password strength
  const getStrength = (password) => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) score += 1;
    
    // Contains digit
    if (/\d/.test(password)) score += 1;
    
    // Contains special character
    if (/[@$!%*?&]/.test(password)) score += 1;
    
    return score;
  };
  
  const strength = getStrength(password);
  
  // Determine color and label based on strength
  const getColor = () => {
    switch (strength) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };
  
  const getLabel = () => {
    switch (strength) {
      case 0: return 'Enter Password';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return 'Enter Password';
    }
  };
  
  return (
    <div className="mt-2 mb-4">
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div 
          className={`h-2 rounded-full ${getColor()}`} 
          style={{ width: `${(strength / 4) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{getLabel()}</p>
      
      <div className="mt-2 text-xs text-gray-600">
        <p>Password must contain:</p>
        <ul className="list-disc pl-4">
          <li className={password.length >= 8 ? 'text-green-500' : ''}>
            At least 8 characters
          </li>
          <li className={/[A-Z]/.test(password) ? 'text-green-500' : ''}>
            One uppercase letter
          </li>
          <li className={/\d/.test(password) ? 'text-green-500' : ''}>
            One number
          </li>
          <li className={/[@$!%*?&]/.test(password) ? 'text-green-500' : ''}>
            One special character (@$!%*?&)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
