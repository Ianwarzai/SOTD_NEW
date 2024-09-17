const express = require('express');
const Stripe = require('stripe');
const cors = require('cors'); // Enable CORS to connect React with backend

// Use your actual Stripe secret key here
const stripe = Stripe('spk_test_51PvUi6CdXfZtCp6aYjgnnzt630eWonLj9U4oFUdPnWagGHLSj1N3ql3juVV2xJlYDGyAch3rIg3w6StfemjxERfC00nTLdKD39');

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Ensure JSON is parsed

// Endpoint to create checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Website Access',
            },
            unit_amount: 1000, // Amount in cents (e.g., $10)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Redirect here after successful payment
      cancel_url: 'http://localhost:3000/cancel', // Redirect here if payment is canceled
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Start the server on port 4243
app.listen(4243, () => console.log('Server running on port 4243'));
