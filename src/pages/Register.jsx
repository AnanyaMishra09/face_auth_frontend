// src/pages/Register.jsx

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const webcamRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const capturePhoto = useCallback(() => {
    if (photos.length >= 5) {
      setMessage("You can upload a maximum of 5 photos.");
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setPhotos([...photos, imageSrc]);
      setMessage('');
    }
  }, [webcamRef, photos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photos.length < 2) {
      setMessage("Please capture at least 2 photos.");
      return;
    }
    setIsLoading(true);
    setMessage('');

    try {
      // FIXED: Added a fallback for the API URL for local development
      const backendUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';
      const apiUrl = `${backendUrl}/register`;
      
      const response = await axios.post(apiUrl, {
        ...formData,
        photos: photos,
      });
      setMessage(response.data.message || "Registration successful!");
      setFormData({ name: '', email: '', phone: '' });
      setPhotos([]);
    } catch (error) {
      // Improved error message for network issues
      if (error.request) {
        setMessage("Network error: Could not connect to the backend server.");
      } else {
        setMessage(error.response?.data?.error || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2070')" }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-8 space-y-6 bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-xl shadow-lg"
      >
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required className="w-full px-4 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required className="w-full px-4 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
            <input type="tel" name="phone" placeholder="Phone (Optional)" onChange={handleChange} value={formData.phone} className="w-full px-4 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-xs h-auto rounded-lg overflow-hidden border-2 border-gray-600">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full"
              />
            </div>
            <button type="button" onClick={capturePhoto} className="w-full px-4 py-2 font-semibold text-white bg-violet-600 rounded-md hover:bg-violet-700 transition-all duration-300 shadow-lg disabled:opacity-50" disabled={photos.length >= 5}>
              Capture Photo ({photos.length}/5)
            </button>
          </div>

          {photos.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {photos.map((photo, index) => (
                <img key={index} src={photo} alt={`capture ${index}`} className="w-16 h-16 rounded-md object-cover border-2 border-pink-500" />
              ))}
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full px-4 py-2 font-bold text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-all duration-300 shadow-lg disabled:bg-gray-500">
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          
          {message && <p className={`text-center font-medium ${message.includes('failed') || message.includes('Network error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
        </form>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-pink-400 hover:text-pink-500">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
