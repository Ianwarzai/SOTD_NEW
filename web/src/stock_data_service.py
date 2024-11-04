import yfinance as yf
import pandas as pd
import concurrent.futures
import random



# Dictionary to store the last entry and exit points for each stock
price_cache = {}

def fetch_sp500_tickers():
  url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
  table = pd.read_html(url, header=0)[0]
  return table['Symbol'].tolist()

def fetch_penny_stock_tickers():
  df = pd.read_csv("penny_stocks.csv", header=None) 
  return df[0].tolist()

def fetch_stock_data(ticker):
  stock = yf.Ticker(ticker)
  try:
      data = stock.history(period="1y")
  except Exception as e:
      print(f"{ticker}: {e}")
      data = stock.history(period="6mo")

  if data.empty:
      return None

  try:
      info = stock.info
  except Exception as e:
      print(f"{ticker}: Unable to fetch stock info. Error: {e}")
      return None

  if not info:
      return None

  data['50_MA'] = data['Close'].rolling(window=50).mean()
  data['200_MA'] = data['Close'].rolling(window=200).mean()

  delta = data['Close'].diff(1)
  gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
  loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
  rs = gain / loss
  data['RSI'] = 100 - (100 / (1 + rs))

  data['20_MA'] = data['Close'].rolling(window=20).mean()
  data['20_STD'] = data['Close'].rolling(window=20).std()
  data['Upper_BB'] = data['20_MA'] + (2 * data['20_STD'])
  data['Lower_BB'] = data['20_MA'] - (2 * data['20_STD'])

  current_price = info.get('currentPrice', data['Close'].iloc[-1])

  entry_point, exit_point = calculate_entry_exit_points(ticker, current_price, data['Lower_BB'].iloc[-1], data['Upper_BB'].iloc[-1])

  return {
      'ticker': ticker,
      'name': info.get('longName', 'N/A'),
      'volume': int(data['Volume'].iloc[-1]),
      'price': format_price(data['Close'].iloc[-1]),
      'market_cap': info.get('marketCap', 0),
      'pe_ratio': info.get('trailingPE', None) if isinstance(info.get('trailingPE', None), (int, float)) else None,
      'change_percent': ((data['Close'].iloc[-1] - data['Open'].iloc[-1]) / data['Open'].iloc[-1]) * 100,
      '50_MA': round(data['50_MA'].iloc[-1], 2),
      '200_MA': round(data['200_MA'].iloc[-1], 2),
      'RSI': round(data['RSI'].iloc[-1], 2),
      'Upper_BB': round(data['Upper_BB'].iloc[-1], 2),
      'Lower_BB': round(data['Lower_BB'].iloc[-1], 2),
      'entry_point': round(entry_point, 2),
      'exit_point': round(exit_point, 2)
  }

def calculate_entry_exit_points(ticker, current_price, lower_bb, upper_bb):
    # Check if we already have stored prices for this ticker
    if ticker in price_cache:
        last_entry, last_exit, last_price = price_cache[ticker]
        # Only update if the price has changed significantly
        if abs(current_price - last_price) / last_price < 0.01:  # 1% change threshold
            return last_entry, last_exit

    # Randomly decide if the entry point should be above or below the current price
    if random.choice([True, False]):
        entry_point = current_price * (1 + random.uniform(0.01, 0.03))  # Slightly above (1-3%)
    else:
        entry_point = current_price * (1 - random.uniform(0.01, 0.03))  # Slightly below (1-3%)

    # Set the exit point to be higher than the current price (e.g., 5-10% above)
    exit_point = current_price * (1 + random.uniform(0.05, 0.10))

    # Update the cache
    price_cache[ticker] = (round(entry_point, 6), round(exit_point, 6), current_price)

    return entry_point, exit_point

def format_price(price):
  if price < 0.01 and price > 0:
      return round(price, 6)
  return round(price, 2)

def filter_stocks():
    penny_tickers = fetch_penny_stock_tickers()
    sp500_tickers = fetch_sp500_tickers()

    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        penny_stock_futures = {executor.submit(fetch_stock_data, ticker): ticker for ticker in penny_tickers}
        sp500_stock_futures = {executor.submit(fetch_stock_data, ticker): ticker for ticker in sp500_tickers}

        penny_stock_data_list = []
        for future in concurrent.futures.as_completed(penny_stock_futures):
            stock_data = future.result()
            if stock_data and stock_data['price'] >= 0.001:  # Filter stocks priced below 0.001
                penny_stock_data_list.append(stock_data)

        sp500_stock_data_list = []
        for future in concurrent.futures.as_completed(sp500_stock_futures):
            stock_data = future.result()
            if stock_data and stock_data['price'] >= 0.001:  # Filter stocks priced below 0.001
                sp500_stock_data_list.append(stock_data)

    day_trading_stocks = [s for s in penny_stock_data_list if s['volume'] >= 1_000_000]
    day_trading_stocks = sorted(day_trading_stocks, key=lambda x: x['change_percent'], reverse=True)[:5]

    swing_trading_stocks = [s for s in sp500_stock_data_list if s['50_MA'] > s['200_MA'] and 10 <= s['price'] <= 1000]
    swing_trading_stocks = sorted(swing_trading_stocks, key=lambda x: x['volume'], reverse=True)[:5]

    long_term_stocks = [s for s in sp500_stock_data_list if s['market_cap'] > 1_000_000_000 and s['pe_ratio'] and s['pe_ratio'] < 20]
    long_term_stocks = sorted(long_term_stocks, key=lambda x: x['market_cap'], reverse=True)[:5]

    return {
        'Day Trading': day_trading_stocks,
        'Swing Trading': swing_trading_stocks,
        'Long Term': long_term_stocks
    }
