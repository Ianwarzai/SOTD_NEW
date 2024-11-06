const express = require('express');
const Stripe = require('stripe');
const cors = require('cors'); // Enable CORS to connect React with backend

// Initialize Stripe with your secret key
const stripe = Stripe('sk_test_51PvUi6CdXfZtCp6al1VLtaD6H2YnhYkiXqWTfBRsccxdZOZs9lJqvRzJ7ZWh75P1HjKpBJvtmDx2a21PSYZJCxcd00MUk9CmLE');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to create a Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
    console.log('Received request to create session');
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: 'Website Access' },
                        unit_amount: 1000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
        console.log('Session created successfully:', session.id);
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

app.listen(4243, () => console.log('Server running on port 4243'));
