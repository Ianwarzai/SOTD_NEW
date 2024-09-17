import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Use your Stripe publishable key here
const stripePromise = loadStripe('pk_test_51PvUi6CdXfZtCp6aYjgnnzt630eWonLj9U4oFUdPnWagGHLSj1N3ql3juVV2xJlYDGyAch3rIg3w6StfemjxERfC00nTLdKD39'); // Replace with your actual publishable key

const CheckoutButton = () => {
  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:4243/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const session = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to create checkout session. Please try again.');
    }
  };

  return <button onClick={handleCheckout}>Pay to Access</button>;
};

export default CheckoutButton;
