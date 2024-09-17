const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/contact', (req, res) => {
  const userDetails = req.body;
  console.log('User Details Received:', userDetails);

  // You can save the details to a database or send an email here
  res.json({ status: 'Message Received' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
