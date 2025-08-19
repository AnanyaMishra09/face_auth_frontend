// src/pages/Login.jsx

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleFindUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      // FIXED: Added a fallback for the API URL for local development
      const backendUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';
      await axios.post(`${backendUrl}/find-user`, { name });
      setStep(2);
    } catch (error) {
      // Improved error message for network issues
      if (error.request) {
        setMessage("Network error: Could not connect to the backend server.");
      } else {
        setMessage(error.response?.data?.error || 'User not found.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyFace = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setMessage("Could not capture image. Please try again.");
      return;
    }
    setIsLoading(true);
    setMessage('');
    try {
      // FIXED: Added a fallback for the API URL for local development
      const backendUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';
      const response = await axios.post(`${backendUrl}/verify-face`, {
        name,
        photo: imageSrc,
      });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      navigate('/dashboard');
    } catch (error) {
       // Improved error message for network issues
      if (error.request) {
        setMessage("Network error: Could not connect to the backend server.");
      } else {
        setMessage(error.response?.data?.error || 'Face verification failed.');
      }
      setTimeout(() => {
        setStep(1);
        setMessage('');
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  }, [name, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2070')" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">Login</h1>
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleFindUser}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Enter Your Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 font-bold text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-all duration-300 shadow-lg disabled:bg-gray-500"
              >
                {isLoading ? 'Searching...' : 'Continue'}
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center space-y-4"
            >
              <p className="text-center text-gray-300">Welcome, {name}! Please verify your face.</p>
              <div className="w-full max-w-xs h-auto rounded-lg overflow-hidden border-2 border-gray-600">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full"
                />
              </div>
              <button
                onClick={handleVerifyFace}
                disabled={isLoading}
                className="w-full px-4 py-2 font-bold text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-all duration-300 shadow-lg disabled:bg-gray-500"
              >
                {isLoading ? 'Verifying...' : 'Verify Face'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {message && (
          <p className={`text-center font-medium ${message.includes('failed') || message.includes('not found') || message.includes('Network error') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-pink-400 hover:text-pink-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
