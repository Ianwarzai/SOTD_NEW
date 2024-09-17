import React, { useEffect } from 'react';

const SuccessPage = () => {
  useEffect(() => {
    console.log('Success page loaded');  // Debug log
  }, []);

  return (
    <div style={styles.successPage}>
      <div style={styles.successAnimation}>
        <div style={styles.checkmark}></div>
      </div>
      <h1 style={styles.heading}>Login Successful!</h1>
    </div>
  );
};

const styles = {
  successPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: 'white',
  },
  successAnimation: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#4caf50',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'pulse 1s infinite',
    position: 'relative',
  },
  checkmark: {
    width: '50px',
    height: '25px',
    borderLeft: '5px solid white',
    borderBottom: '5px solid white',
    transform: 'rotate(-45deg)',
    animation: 'checkmarkDraw 0.5s ease-out forwards',
  },
  heading: {
    marginTop: '20px',
    fontSize: '24px',
    textAlign: 'center',
    color: '#4caf50',
  },
};

// Keyframe animations
const keyframes = `
  @keyframes pulse {
    0% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(0.9);
    }
  }
  @keyframes checkmarkDraw {
    0% {
      width: 0;
      height: 0;
    }
    100% {
      width: 50px;
      height: 25px;
    }
  }
`;

// Inject keyframe styles
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default SuccessPage;
