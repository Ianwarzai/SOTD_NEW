import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './core';
import { Home, SOTD, About, Contact } from './modules';
import { Navbar } from './core/components/Navbar';

import SuccessPage from './components/SuccessPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('email');
    if (loggedInStatus === 'true' && userEmail) {
      setIsLoggedIn(true);
      setEmail(userEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setEmail('');
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        email={email}
        handleLogout={handleLogout}
        darkMode={darkMode}
      />
      <Routes>
        <Route path={ROUTES.HOME_PATH} element={<Home />} />
        <Route path={ROUTES.SOTD_PATH} element={<SOTD />} />
        <Route path={ROUTES.ABOUT_PATH} element={<About />} />
        <Route path={ROUTES.CONTACT_PATH} element={<Contact />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
