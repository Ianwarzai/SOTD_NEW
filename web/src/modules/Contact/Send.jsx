// server.js (or your backend server file)
const express = require('express');
const bodyParser = require('body-parser');
const sendGridMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 5000;

sendGridMail.setApiKey('YOUR_SENDGRID_API_KEY');

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'ianwarzai909@gmail.com', // Recipient email
    from: 'your-email@example.com', // Verified sender email
    subject: 'Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  sendGridMail
    .send(msg)
    .then(() => {
      res.status(200).json({ status: 'Email sent' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'Error sending email' });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
