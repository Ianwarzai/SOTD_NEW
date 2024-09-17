from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch
import random
import stock_data_service as sds  # Assuming stock_data_service.py is in the same directory

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

def fetch_and_analyze_stocks():
    # Fetch stock data
    stock_groups = sds.filter_stocks()

    # Define the prompts
    prompts = [
        "AAPL stock is considered bullish due to its unwavering financial strength, diverse product offerings, and substantial market influence. The company's dedication to innovation and consistent product launches ensures a steady stream of revenue. Furthermore, Apple's strategic moves in expanding its services and technology segments, along with a solid financial foundation, make it a compelling choice for optimistic investors.",
        "The bullish outlook for AAPL stock is driven by its solid financial health, innovative product development, and significant market share. Apple's ability to consistently deliver new and popular products fuels its revenue growth. Additionally, the company's investments in expanding its service offerings and maintaining a strong balance sheet provide a solid foundation for future growth, appealing to investors with a positive market view.",
        "Investors see AAPL stock as a bullish trade due to its strong financial performance, innovative product lineup, and dominant market position. Apple's commitment to introducing cutting-edge products keeps its revenue robust. The company's strategic expansion in services and technology, supported by a healthy financial status, makes it an attractive option for those with a bullish investment perspective.",
        "AAPL stock remains a bullish trade because of its consistent financial results, forward-thinking product strategy, and significant market presence. Apple's ongoing innovation in product development ensures continuous revenue streams. Additionally, the company's focus on expanding its technology and service offerings, backed by a strong financial base, makes it an appealing choice for bullish investors.",
        "The bullish sentiment around AAPL stock is attributed to its reliable financial performance, creative product advancements, and substantial market footprint. Apple's dedication to consistently releasing popular products drives its revenue growth. Furthermore, the company's strategic focus on technology and services, along with a solid financial foundation, positions it well for long-term gains, attracting bullish investors.",
        "AAPL stock is viewed as a bullish trade due to its stable financial health, innovative product range, and strong market influence. Apple's ongoing commitment to product innovation ensures a steady revenue flow. Additionally, the company's strategic investments in expanding its service offerings and maintaining a robust balance sheet make it an appealing option for investors with a bullish outlook.",
        "The bullish case for AAPL stock stems from its strong financial results, continuous product innovation, and significant market share. Apple's ability to consistently introduce new, successful products sustains its revenue growth. The company's strategic moves in technology and services, underpinned by a healthy financial status, make it a favorable choice for bullish investors.",
        "AAPL stock is considered a bullish trade because of its consistent financial strength, innovative product development, and dominant market position. Apple's focus on introducing new and popular products ensures a robust revenue stream. Additionally, the company's expansion into services and technology, supported by a solid financial foundation, positions it well for long-term growth, attracting bullish investors.",
        "The bullish outlook for AAPL stock is driven by its solid financial health, forward-thinking product strategy, and substantial market presence. Apple's ability to continuously deliver new and appealing products drives its revenue growth. Furthermore, the company's investments in technology and services, along with a strong balance sheet, make it an attractive option for those with a positive market view."
    ]

    # Initialize model and tokenizer
    model_name = "distilgpt2"
    tokenizer, model = load_gpt2_model(model_name)
    
    # Analyze each stock
    for group, stocks in stock_groups.items():
        print(f"\nAnalyzing {group} stocks:")
        for stock in stocks:
            # Select a random prompt and replace "AAPL" with the stock ticker
            prompt = random.choice(prompts).replace("AAPL", stock['ticker'])
            
            # Generate text for the stock
            generated_text = generate_text(prompt, tokenizer, model)
            print(f"\nStock: {stock['ticker']}")
            print(f"Generated Text: {generated_text}")

if __name__ == "__main__":
    fetch_and_analyze_stocks()
