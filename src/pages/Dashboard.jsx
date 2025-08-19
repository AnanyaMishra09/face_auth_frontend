// src/pages/Dashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Icon Components (for the navbar) ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

// --- Animated "Typing" Text Component ---
const AnimatedText = ({ text }) => {
  const textArray = text.split("");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.5 } },
  };
  const childVariants = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <motion.p
      className="text-lg text-gray-300" // Brighter text for better readability
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {textArray.map((char, index) => (
        <motion.span key={index} variants={childVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.p>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2070')" }}
    >
      <div className="flex">
        {/* --- Sidebar / Navbar with Black and Pink theme --- */}
        <aside className="w-64 h-screen sticky top-0 bg-black p-4 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-10">
              Face<span className="text-pink-500">Auth</span>
            </h1>
            <nav className="space-y-4">
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-white bg-pink-600 rounded-lg"><HomeIcon /> Dashboard</a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg"><ProfileIcon /> Profile</a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg"><SettingsIcon /> Settings</a>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 font-bold text-white bg-pink-600/80 rounded-lg hover:bg-pink-700"
          >
            <LogoutIcon /> Logout
          </button>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="flex-1 p-8 md:p-12 flex items-center justify-center">
          {/* --- Single Black Notification Card --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/80 backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-2xl text-center"
          >
            {/* --- Colorful Animated Success Icon --- */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
              className="mx-auto mb-6 w-24 h-24"
            >
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="joyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#joyGradient)" />
                <motion.path
                  d="M30 50 L45 65 L70 35"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                />
              </svg>
            </motion.div>
            
            {/* UPDATED: Title with gradient text */}
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Login Successful!
            </h2>
            
            <AnimatedText text="Your account is secured with our industry-leading facial recognition." />
            
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
