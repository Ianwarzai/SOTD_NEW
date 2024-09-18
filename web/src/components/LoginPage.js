import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js'; // Stripe integration

const stripePromise = loadStripe('pk_test_51PvUi6CdXfZtCp6aYjgnnzt630eWonLj9U4oFUdPnWagGHLSj1N3ql3juVV2xJlYDGyAch3rIg3w6StfemjxERfC00nTLdKD39'); // Replace with your Stripe publishable key

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false); // For showing the pop-up
  const [isUpgradeDisabled, setIsUpgradeDisabled] = useState(true); // Disable upgrade until valid credentials
  const [isShaking, setIsShaking] = useState(false); // State to trigger shake effect

  // Function to check if both email and password are valid
  const validateInputs = () => {
    const isEmailValid = email.trim() !== ''; // Check if email is not empty
    const isPasswordValid = password.trim() !== ''; // Check if password is not empty
    setIsUpgradeDisabled(!(isEmailValid && isPasswordValid)); // Enable/disable upgrade button based on inputs
  };

  // Call validateInputs when email or password changes
  useEffect(() => {
    validateInputs();
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4243/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful, setting localStorage values');
        localStorage.setItem('isLoggedIn', 'true'); // Set login status
        localStorage.setItem('email', email); // Save email in localStorage
        setIsLoggedIn(true); // Set state to true
        onLogin(email); // Pass email to parent
        
        // Show upgrade pop-up after 1.5 seconds
        setTimeout(() => {
          setShowUpgradeModal(true);
        }, 1500);
      } else {
        setError(data.error || 'Login failed!');
        console.log('Login failed:', data.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:4243/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const session = await response.json();
      const stripe = await stripePromise;
      stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to create checkout session. Please try again.');
    }
  };

  const handleUpgradeClick = () => {
    if (isUpgradeDisabled) {
      // Trigger the shake effect when the button is disabled and clicked
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); // Remove the shake effect after 0.5s
    } else {
      setShowUpgradeModal(true);
    }
  };

  const handleFullPayment = () => {
    handleCheckout(); // Proceed to Stripe payment when the user chooses "Full Payment"
    setShowUpgradeModal(false);
  };

  const handleUseBeta = () => {
    setShowUpgradeModal(false); // Close the modal and continue to use the beta version
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        {!isLoggedIn ? (
          <>
            <h2 style={styles.formTitle}>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.inputField}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputField}
                required
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {/* Remove the original Login button */}
            </form>
          </>
        ) : (
          <>
            <h2 style={styles.formTitle}>Welcome, you are logged in!</h2>
            <button onClick={() => setIsLoggedIn(false)} style={styles.submitButton}>
              Logout
            </button>
          </>
        )}

        {/* Checkout/Upgrade Button */}
        <button
          onClick={handleUpgradeClick}
          style={{
            ...styles.paymentButton,
            ...(isShaking ? styles.shakeAnimation : {}),
          }}
          disabled={isUpgradeDisabled} // Disable the button if inputs are invalid
        >
          Login
        </button>

        {/* Modal for choosing between full payment and beta version */}
        {showUpgradeModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h3>Upgrade Options</h3>
              <p>How would you like to proceed?</p>
              <button onClick={handleFullPayment} style={styles.modalButton}>
                Pay Full Amount $10/month
              </button>
              <button onClick={handleUseBeta} style={styles.modalButton}>
                Use Beta Version
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: '#121212',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    maxWidth: '400px',
    margin: 'auto',
  },
  formTitle: {
    color: '#ffffff',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  inputField: {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    border: '1px solid #444',
    borderRadius: '5px',
    backgroundColor: '#333',
    color: '#ffffff',
    fontSize: '16px',
  },
  submitButton: {
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
  paymentButton: {
    width: '100%',
    backgroundColor: 'white', // Green color for payment button
    color: 'black',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  // CSS shake animation
  shakeAnimation: {
    animation: 'shake 0.5s',
    animationIterationCount: '1',
  },
  '@keyframes shake': {
    '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
    '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
    '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
    '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
    '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
    '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
    '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
    '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
    '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
    '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
    '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
  },
};

export default LoginPage;
