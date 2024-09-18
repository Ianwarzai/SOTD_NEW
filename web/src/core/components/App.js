import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '/Users/ismaelanwarzai/Desktop/SOTD_NEW/web/src/components/LoginPage.js'; // Adjust paths as needed
import SignupPage from '/Users/ismaelanwarzai/Desktop/SOTD_NEW/web/src/components/SignupPage.js';
import SuccessPage from '/Users/ismaelanwarzai/Desktop/SOTD/web/src/core/components/SuccessPage.js';  // Importing SuccessPage component
import { Navbar } from '/Users/ismaelanwarzai/Desktop/SOTD/web/src/core/components/Navbar.js';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(''); // State to track the logged-in user's email

  useEffect(() => {
    // Check if the user is already logged in when the app loads
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('email');

    if (loggedInStatus === 'true' && userEmail) {
      setIsLoggedIn(true); // Update state if user is logged in
      setEmail(userEmail); // Set the email of the logged-in user
    }
  }, []);

  const handleLogin = (email) => {
    localStorage.setItem('isLoggedIn', 'true'); // Set login status
    localStorage.setItem('email', email); // Store email in localStorage
    setIsLoggedIn(true); // Set login state to true
    setEmail(email); // Set email in state
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false'); // Set login status to false
    localStorage.removeItem('email'); // Remove email from localStorage
    setIsLoggedIn(false); // Update state to log out the user
    setEmail(''); // Clear email state
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} email={email} handleLogout={handleLogout} />
      <Switch>
        <Route path="/login">
          <LoginPage onLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
};

export default App;