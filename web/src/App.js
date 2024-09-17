import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './core';
import { Home, SOTD, About, Contact } from './modules';
import { Navbar } from './core/components/Navbar';

// Import the new Login and Signup components
import LoginPage from '/Users/ismaelanwarzai/Desktop/SOTD/web/src/core/components/LoginPage.js';
import SignupPage from '/Users/ismaelanwarzai/Desktop/SOTD/web/src/core/components/SignupPage.js';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <Routes>
        <Route path={ROUTES.HOME_PATH} element={<Home />} />
        <Route path={ROUTES.SOTD_PATH} element={<SOTD />} />
        <Route path={ROUTES.ABOUT_PATH} element={<About />} />
        <Route path={ROUTES.CONTACT_PATH} element={<Contact />} />

        {/* Add the new Login and Signup routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
