import React, { useState } from 'react';
import { registerUser } from '../api';
import FormField from './FormField';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration status
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!formData.password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      newErrors.password = 'Password does not meet requirements';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    try {
      // Remove confirmPassword as it's not part of the User model
      const { confirmPassword, ...userData } = formData;
      const response = await registerUser(userData);

      setSuccessMessage(response);
      setIsRegistered(true); // Mark as registered after successful registration
      // Clear form after successful registration
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      if (error.message.includes('Invalid email format')) {
        setErrors({ email: 'Please enter a valid email address.' });
      }
      else if (error.message.includes('Email already exists')) {
        // If error message contains 'Email already exists', display a custom message
        setErrors({ submit: 'Email is already registered. Please use another email.' });
      } else {
        // Handle other errors
        setErrors({ submit: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container p-4">
      <div className="card mx-auto p-4 shadow-lg" style={{ maxWidth: '500px' }}>
        <h2 className="card-title text-center mb-4">Create an Account</h2>
        
        {successMessage && !isRegistered && (
          <div className="alert alert-success mb-4">
            {successMessage}
          </div>
        )}
        
        {errors.submit && (
          <div className="alert alert-danger mb-4">
            {errors.submit}
          </div>
        )}
        
        {/* If the user is registered, show the verify your email message */}
        {isRegistered ? (
          <div className="alert alert-info mb-4">
            Please check your email to verify your account.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormField
              label="Full Name"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            
            <FormField
              label="Email"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <FormField
              label="Phone Number"
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            
            <FormField
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            
            <PasswordStrengthMeter password={formData.password} />
            
            <FormField
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
            
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
        
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="btn btn-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
