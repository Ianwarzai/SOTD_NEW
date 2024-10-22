import React, { useState } from 'react';

const SignupPage = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [error, setError] = useState('');
 const [isSignedUp, setIsSignedUp] = useState(false); // New state to track signup success

 const handleSubmit = async (e) => {
   e.preventDefault();

   // Basic validation for matching passwords
   if (password !== confirmPassword) {
     setError('Passwords do not match');
     return;
   }

   try {
     const response = await fetch('http://localhost:4243/signup', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password }),
     });

     const data = await response.json();
     if (!response.ok) {
       setError(data.error);
       return;
     }

     // Set signup success state
     setIsSignedUp(true);
     setError('');
   } catch (error) {
     setError('An error occurred. Please try again later.');
   }
 };

 if (isSignedUp) {
   // Show success message
   return (
     <div style={styles.pageContainer}>
       <div style={styles.successContainer}>
         <h2 style={styles.successMessage}>Sign Up Successful!</h2>
       </div>
     </div>
   );
 }

 return (
   <div style={styles.pageContainer}>
     <div style={styles.formContainer}>
       <h2 style={styles.formTitle}>Sign Up</h2>
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
         <input
           type="password"
           placeholder="Confirm Password"
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}
           style={styles.inputField}
           required
         />
         {error && <p style={{ color: 'red' }}>{error}</p>}
         <button type="submit" style={styles.submitButton}>
           Sign Up
         </button>
       </form>
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
 successContainer: {
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column',
   backgroundColor: '#1e1e1e',
   padding: '40px',
   borderRadius: '10px',
   boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
 },
 successMessage: {
   color: '#4caf50',
   fontSize: '24px',
   fontWeight: 'bold',
 },
};

export default SignupPage;
