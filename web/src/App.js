import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { ROUTES } from './core';
import { Home, SOTD, About, Contact } from './modules';
import { Navbar } from './core/components/Navbar';

// Import the new Login, Signup, and Success components
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import SuccessPage from './components/SuccessPage';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(''); // State to track the logged-in user's email
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Check if the user is already logged in when the app loads
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('email');

    if (loggedInStatus === 'true' && userEmail) {
      setIsLoggedIn(true);
      setEmail(userEmail);
    }
  }, []);

  const handleLogin = (email) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', email);
    setIsLoggedIn(true);
    setEmail(email);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setEmail('');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        email={email}
        handleLogout={handleLogout}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      <Routes>
        <Route path={ROUTES.HOME_PATH} element={<Home />} />
        <Route path={ROUTES.SOTD_PATH} element={<SOTD />} />
        <Route path={ROUTES.ABOUT_PATH} element={<About />} />
        <Route path={ROUTES.CONTACT_PATH} element={<Contact />} />

        {/* Add the new Login, Signup, and Success routes */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
