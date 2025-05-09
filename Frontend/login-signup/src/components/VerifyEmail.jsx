import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyEmail } from '../api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing.');
        return;
      }
      
      try {
        const response = await verifyEmail(token);
        setStatus('success');
        setMessage(response);
      } catch (error) {
        setStatus('error');
        setMessage(error.message);
      }
    };
    
    verify();
  }, [token]);
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Email Verification</h2>
      
      {status === 'loading' && (
        <div className="text-center">
          <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">Verifying your email...</p>
        </div>
      )}
      
      {status === 'success' && (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mb-4">{message}</p>
          <Link to="/login" className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Proceed to Login
          </Link>
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="mb-4 text-red-500">{message}</p>
          <Link to="/register" className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Back to Registration
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;