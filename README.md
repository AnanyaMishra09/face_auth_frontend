FaceAuth Frontend ✨
This repository contains the frontend client for FaceAuth, a modern, passwordless authentication system. Built with React, Vite, and Tailwind CSS, this application provides a beautiful, animated, and highly secure user interface for facial recognition.

The user experience is designed to be seamless, guiding the user through a secure registration and login process without the need for traditional passwords.

✨ Features
Stunning UI: A modern, responsive interface with a beautiful glassmorphism effect and a consistent pink/violet theme.

Smooth Animations: Powered by Framer Motion, all components feature fluid transitions and engaging micro-interactions.

Interactive Authentication: Guides users through a multi-step login process, including a "blink challenge" for liveness detection.

Webcam Integration: Uses react-webcam to seamlessly capture photos and image sequences directly in the browser.

Protected Routes: Ensures that sensitive pages, like the user dashboard, are only accessible after successful authentication.

Dynamic Dashboard: A professional dashboard layout with a sidebar, animated welcome messages, and a clean, modern design.

Ready for Deployment: Configured for easy, free deployment on cloud platforms like Vercel.

🛠️ Tech Stack
Framework: React (bootstrapped with Vite)

Styling: Tailwind CSS

Animation: Framer Motion

Routing: React Router DOM

API Communication: Axios

Camera Access: React Webcam

Deployment: Vercel

⚙️ Setup and Local Installation
To run this application on your local machine, follow these steps:

Clone the Repository

git clone https://github.com/your-username/face_auth_frontend.git
cd face_auth_frontend

Install Dependencies

npm install

Configure Environment Variables

This project uses an environment variable to know the address of the backend API. For local development, the code includes a fallback to http://127.0.0.1:5001.

For production, you will set this variable on your deployment platform (see Deployment section).

Run the Development Server

npm run dev

The application will now be running at http://localhost:5173.

🔑 Configuration
The application connects to the backend API using an environment variable.

VITE_API_URL: The full URL of your deployed backend server (e.g., https://your-api.onrender.com).

When running locally, you do not need to set this, as the code will automatically connect to your local backend server.
