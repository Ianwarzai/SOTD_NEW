from flask import Flask, jsonify, request
from flask_cors import CORS
from stock_data_service import filter_stocks
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch
import numpy as np
import random
import subprocess

app = Flask(__name__)
CORS(app)

# Load GPT-2 model and tokenizer
def load_gpt2_model(model_name="distilgpt2"):
    print("Loading tokenizer and model...")
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
    model = GPT2LMHeadModel.from_pretrained(model_name)
  
    # Set padding token
    tokenizer.pad_token = tokenizer.eos_token
  
    print("Model and tokenizer loaded successfully.")
    return tokenizer, model

def generate_text(prompt, tokenizer, model):
    print("Encoding prompt...")
    inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
    input_ids = inputs['input_ids']
    attention_mask = inputs['attention_mask']
  
    print("Input IDs:", input_ids)
    print("Attention Mask:", attention_mask)

    # Validate input tensors
    if torch.isnan(input_ids).any() or torch.isnan(attention_mask).any():
        raise ValueError("Input tensors contain NaN values")
    if torch.isinf(input_ids).any() or torch.isinf(attention_mask).any():
        raise ValueError("Input tensors contain Inf values")
    if (input_ids < 0).any() or (attention_mask < 0).any():
        raise ValueError("Input tensors contain negative values")

    try:
        print("Generating text...")
      
        outputs = model.generate(
            input_ids=input_ids,
            attention_mask=attention_mask,
            max_new_tokens=50,  # Generate 50 new tokens beyond the input length
            do_sample=True,     # Enable sampling
            top_p=0.95,         # Use nucleus sampling
            temperature=0.7,    # Set a temperature for sampling
            pad_token_id=tokenizer.eos_token_id
        )
      
        print("Text generation complete.")
      
        # Debugging output tensors
        print("Outputs:", outputs)
        if torch.isnan(outputs).any() or torch.isinf(outputs).any():
            raise ValueError("Generated tensors contain NaN or Inf values")
      
        text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return text
    except Exception as e:
        print(f"Error during generation: {e}")
        return "Error during generation"

# Initialize model and tokenizer
tokenizer, model = load_gpt2_model()

# Prompts for generating stock analysis
prompts = [
    "AAPL is a bullish trade today because its technical indicators, including the Bollinger Bands, show the stock trading near its lower band, suggesting a potential bounce. The Relative Strength Index (RSI) is hovering near the oversold zone, indicating a buying opportunity. Additionally, the Moving Average Convergence Divergence (MACD) has recently crossed above its signal line, signaling momentum in the upward direction. With these indicators pointing towards a reversal, this stock appears to be an ideal buy right now.",
    "The bullish case for AAPL is supported by several key technical factors. This stock is currently approaching a strong support level, indicating potential resistance to further declines. The RSI suggests the stock is oversold, making it a prime candidate for a rebound. Moreover, the MACD histogram has begun to tick upward, signaling a shift in momentum. Combined with its historical strength, these technical indicators make this a promising buy today.",
    "AAPL is an attractive bullish trade today, particularly due to its technical setup. This stock has been respecting a critical support level, and the RSI is inching closer to the oversold territory, highlighting a potential buying opportunity. Additionally, the Chaikin Money Flow (CMF) indicator shows positive inflows, suggesting strong institutional interest. This mix of indicators underlines the potential for upward movement, making it an ideal stock to consider buying today.",
    "AAPL exhibits strong bullish potential based on its technical indicators. The price of this stock is approaching a significant resistance level that, if broken, could lead to a substantial upward move. The RSI is currently at a neutral level, leaving room for further gains. Additionally, the On-Balance Volume (OBV) indicator is rising, showing that volume supports the price movement. These factors, combined with its solid market position, make this stock a good buy today.",
    "The bullish outlook for AAPL is bolstered by its technical indicators, such as trading near a major trendline support, which has historically been a launching point for price increases. The RSI indicates oversold conditions, suggesting this stock is undervalued. Furthermore, the Stochastic Oscillator has crossed into the bullish zone, reinforcing the case for a rebound. These signals, along with continued innovation, make this stock a compelling buy today.",
    "AAPL stands out as a bullish trade because it is approaching a critical Fibonacci retracement level, which could act as strong support and trigger a reversal. The RSI is showing signs of a potential move from oversold conditions, while the MACD line has crossed above the signal line, indicating the start of an upward trend. With these indicators aligning, this stock appears to be a smart buy for today.",
    "AAPL is a bullish trade today, supported by its technical indicators showing it is testing a strong moving average support, which has historically led to price rebounds. The RSI is trending upwards from oversold conditions, and the Average Directional Index (ADX) indicates a strengthening bullish trend. Given these positive signals, combined with strong fundamentals, this stock looks like an ideal buy.",
    "The bullish case for AAPL is underscored by technical indicators that show it bouncing off a significant support level, which could lead to a rally. The RSI is beginning to rise, moving out of oversold territory, while the Bollinger Bands suggest that the price could expand upwards. Additionally, the MACD is showing a bullish crossover, signaling momentum is shifting to the upside. These indicators make this stock an attractive buy today.",
    "AAPL presents a bullish trading opportunity as it approaches a key support zone, which has previously acted as a springboard for upward moves. The RSI is pointing towards an oversold condition, and the Parabolic SAR (Stop and Reverse) has flipped to indicate a bullish trend. With these technical indicators signaling a potential uptrend, this stock stands out as a strong buy today.",
    # Add other prompts as needed...
]

@app.route('/api/filtered_stocks', methods=['GET'])
def get_filtered_stocks():
    filtered_stocks = filter_stocks()
    for category in filtered_stocks:
        for stock in filtered_stocks[category]:
            prompt = random.choice(prompts).replace("AAPL", stock['ticker'])
            stock['analysis'] = generate_text(prompt, tokenizer, model)
            for key, value in stock.items():
                if isinstance(value, (np.float64, np.int64)):
                    stock[key] = value.item()
                elif isinstance(value, float) and np.isnan(value):
                    stock[key] = None
    return jsonify(filtered_stocks)

# Endpoint to run the SOTD script
@app.route('/api/run_sotd', methods=['POST'])
def run_sotd():
    try:
        subprocess.Popen(['/Users/ismaelanwarzai/Desktop/SOTD/venv/bin/python', '/Users/ismaelanwarzai/Desktop/SOTD/web/src/sotd.py'])
        return jsonify({"status": "success", "message": "SOTD script started successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
