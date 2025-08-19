// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-white text-center p-4 bg-cover bg-center bg-fixed" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2070')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Welcome to <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">FaceAuth</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          The future of security is here. Log in or register using only your face. No passwords, no hassle.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mt-10"
      >
        <Link to="/login">
          <button className="px-8 py-3 font-bold text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all duration-300 w-48 shadow-lg">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-8 py-3 font-bold text-gray-900 bg-gray-200 rounded-lg hover:bg-white transition-all duration-300 w-48 shadow-lg">
            Register
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
