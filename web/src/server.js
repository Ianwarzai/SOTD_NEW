const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());


// Example stock data
const stockData = [
 {
   ticker: 'AAPL',
   name: 'Apple Inc.',
   volume: 1000000,
   price: 150,
   market_cap: '2.5T',
   pe_ratio: 30,
   change_percent: 1.2,
   '50_MA': 145,
   '200_MA': 130,
   RSI: 70,
   Upper_BB: 155,
   Lower_BB: 135,
 },
 {
   ticker: 'GOOGL',
   name: 'Alphabet Inc.',
   volume: 500000,
   price: 2800,
   market_cap: '1.8T',
   pe_ratio: 35,
   change_percent: 0.8,
   '50_MA': 2750,
   '200_MA': 2600,
   RSI: 65,
   Upper_BB: 2900,
   Lower_BB: 2700,
 },
];


app.get('/get-stock-data', (req, res) => {
 res.json(stockData);
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});



