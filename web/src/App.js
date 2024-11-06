import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './core';
import { Home, SOTD, About, Contact } from './modules';
import { Navbar } from './core/components/Navbar';
import SuccessPage from './components/SuccessPage';

const App = () => {
  return (
    <Router>
      <Navbar />
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
