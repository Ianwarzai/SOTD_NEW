from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import stock_data_service as sds
import concurrent.futures

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    penny_tickers = sds.fetch_penny_stock_tickers()
    sp500_tickers = sds.fetch_sp500_tickers()

    with concurrent.futures.ThreadPoolExecutor() as executor:
        penny_stock_futures = {executor.submit(sds.fetch_stock_data, ticker): ticker for ticker in penny_tickers}
        sp500_stock_futures = {executor.submit(sds.fetch_stock_data, ticker): ticker for ticker in sp500_tickers}

        penny_stock_data_list = []
        for future in concurrent.futures.as_completed(penny_stock_futures):
            stock_data = future.result()
            if stock_data:
                stock_data['ticker'] = penny_stock_futures[future]
                penny_stock_data_list.append(stock_data)

        sp500_stock_data_list = []
        for future in concurrent.futures.as_completed(sp500_stock_futures):
            stock_data = future.result()
            if stock_data:
                stock_data['ticker'] = sp500_stock_futures[future]
                sp500_stock_data_list.append(stock_data)

    day_trading_stocks = [s for s in penny_stock_data_list if s['volume'] >= 1_000_000]
    day_trading_stocks = sorted(day_trading_stocks, key=lambda x: x['change_percent'], reverse=True)[:5]

    swing_trading_stocks = [s for s in sp500_stock_data_list if s['50_MA'] > s['200_MA'] and 10 <= s['price'] <= 1000]
    swing_trading_stocks = sorted(swing_trading_stocks, key=lambda x: x['volume'], reverse=True)[:5]

    long_term_stocks = [s for s in sp500_stock_data_list if s['market_cap'] > 1_000_000_000 and s['pe_ratio'] and s['pe_ratio'] < 20]
    long_term_stocks = sorted(long_term_stocks, key=lambda x: x['market_cap'], reverse=True)[:5]

    data = {
        'daytrading': day_trading_stocks,
        'swingtrading': swing_trading_stocks,
        'longterm': long_term_stocks
    }

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
