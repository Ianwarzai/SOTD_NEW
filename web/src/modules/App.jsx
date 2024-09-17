import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './modules/About/About';
import TermsOfService from './modules/About/TermsOfService';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<div>404 Not Found</div>} /> {/* Fallback route */}
      </Routes>
    </Router>
  );
};

export default App;
