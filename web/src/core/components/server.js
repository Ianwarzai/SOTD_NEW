const express = require('express');
const Stripe = require('stripe');
const cors = require('cors'); // Enable CORS to connect React with backend

// Initialize Stripe with your secret key
const stripe = Stripe('sk_test_51PvUi6CdXfZtCp6al1VLtaD6H2YnhYkiXqWTfBRsccxdZOZs9lJqvRzJ7ZWh75P1HjKpBJvtmDx2a21PSYZJCxcd00MUk9CmLE'); // Replace with your Stripe secret key

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON bodies

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
             product_data: {
               name: 'Website Access',
             },
             unit_amount: 1000, // $10 in cents
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

// Add signup endpoint
app.post('/signup', (req, res) => {
   const { email, password } = req.body;
   
   // You would normally save the email and password into your database here.
   console.log('Received signup request:', email);

   // For now, simulate successful signup
   res.status(200).json({ message: 'Signup successful' });
});

// Add login endpoint
// Add login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
 
    // Log the request for debugging
    console.log('Received login request:', email);
 
    // Dummy logic for validation (you should replace this with actual database validation)
    if (email && password) {
      // Simulate a successful login
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Return an error if email or password is missing
      res.status(400).json({ error: 'Invalid email or password' });
    }
 });
 
 

app.listen(4243, () => console.log('Server running on port 4243'));
