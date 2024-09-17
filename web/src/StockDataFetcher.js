// src/StockDataFetcher.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const StockDataFetcher = () => {
 const [stockData, setStockData] = useState([]);


 useEffect(() => {
   axios.get('http://localhost:5000/get-stock-data')
     .then(response => {
       setStockData(response.data);
     })
     .catch(error => {
       console.error('Error fetching the stock data:', error);
     });
 }, []);


 return (
   <div>
     <h1>Stock Data</h1>
     <ul>
       {stockData.map((stock, index) => (
         <li key={index}>
           <p>Ticker: {stock.ticker}</p>
           <p>Name: {stock.name}</p>
           <p>Volume: {stock.volume}</p>
           <p>Price: {stock.price}</p>
           <p>Market Cap: {stock.market_cap}</p>
           <p>P/E Ratio: {stock.pe_ratio}</p>
           <p>Change Percent: {stock.change_percent}%</p>
           <p>50 MA: {stock['50_MA']}</p>
           <p>200 MA: {stock['200_MA']}</p>
           <p>RSI: {stock.RSI}</p>
           <p>Upper BB: {stock.Upper_BB}</p>
           <p>Lower BB: {stock.Lower_BB}</p>
         </li>
       ))}
     </ul>
   </div>
 );
};


export default StockDataFetcher;



