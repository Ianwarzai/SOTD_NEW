from flask import Flask, jsonify
from flask_restful import Api, Resource
import finviz
from finviz.screener import Screener
import requests
import pandas as pd

app = Flask(__name__)
api = Api(app)

class HelloApiHandler(Resource):
    def get_stock_info(self, ticker):
        # Define the API endpoint and parameters
        endpoint = "https://www.alphavantage.co/query"
        params = {
            "function": "GLOBAL_QUOTE",
            "symbol": ticker,
            "apikey": 'G3CULXRQTCTOLKCK'
        }

        # Make the request
        response = requests.get(endpoint, params=params)
        data = response.json()

        stock_info = []
        price = data['Global Quote']['05. price']
        price = round(float(price), 2)
        stock_info += [price]

        change = data['Global Quote']['09. change']
        change = round(float(change), 2)
        if change > 0:
            change = "+{}".format(change)
        stock_info += [change]

        change_percent = data['Global Quote']['10. change percent']
        change_percent = change_percent.replace('%', '')
        change_percent = round(float(change_percent), 2)
        change_percent = "({:.2f}%)".format(change_percent)
        stock_info += [change_percent]

        volume = data['Global Quote']['06. volume']
        volume = int(volume)
        vol_str = None
        if volume >= 1000000:
            volume = volume / 1000000
            vol_str = "{}M".format(round(volume, 2))
        elif volume >= 1000:
            volume = volume / 1000
            vol_str = "{}K".format(round(volume, 2))
        else:
            vol_str = f"{format(int(volume), ',')}"
        stock_info += [vol_str]

        high = data['Global Quote']['03. high']
        high = round(float(high), 2)
        stock_info += [f"HIGH: {high}"]

        low = data['Global Quote']['04. low']
        low = round(float(low), 2)
        stock_info += [f"LOW: {low}"]

        return stock_info

    def get(self):
        data = {}

        """ Long-term """
        try:
            filters = ['idx_', 'exch_', 'sh_avgvol_o1000', 'ta_sma20_pb', 'ta_sma50_pb', 'ta_highlow52w_nl', 'ta_rsi_os40', 'ind_stocksonly', 'geo_usa', 'fa_epsyoy1_pos']
            stock_list = Screener(filters=filters, table='Performance', order='price', rows=5)
            if stock_list.data:
                DJ1 = pd.DataFrame(stock_list.data).drop("No.", axis=1).set_index("Ticker")
                DJ1 = DJ1.sort_values(by=['Recom'], ascending=False).head(5)
                DJ1['Company'] = [finviz.get_stock(ticker)['Company'] for ticker in DJ1.index]
                DJ1['Stock Info'] = [self.get_stock_info(ticker) for ticker in DJ1.index]
                data["longterm"] = {"ticker": list(DJ1.index), "company": list(DJ1.Company), "stock info": DJ1['Stock Info'].tolist()}
            else:
                print("None")
        except Exception as e:
            return {
                "status": 400,
                "detail": str(e)
            }

        """ Swing """
        try:
            filters = ['idx_', 'exch_', 'sh_avgvol_o1000', 'sh_short_o20', 'sh_float_u20', 'geo_usa', 'sh_price_u10']
            stock_list = Screener(filters=filters, table='Performance', order='price', rows=5)
            if stock_list.data:
                DJ1 = pd.DataFrame(stock_list.data).drop("No.", axis=1).set_index("Ticker")
                DJ1 = DJ1.sort_values(by=['Recom'], ascending=False).head(5)
                DJ1['Company'] = [finviz.get_stock(ticker)['Company'] for ticker in DJ1.index]
                DJ1['Stock Info'] = [self.get_stock_info(ticker) for ticker in DJ1.index]
                data["swingtrading"] = {"ticker": list(DJ1.index), "company": list(DJ1.Company), "stock info": DJ1['Stock Info'].tolist()}
            else:
                print("None")
        except Exception as e:
            return {
                "status": 400,
                "detail": str(e)
            }

        """ Day-trading """
        try:
            filters = ['idx_', 'exch_', 'sh_float_u5', 'geo_usa', 'sh_avgvol_o2000', 'cap_microunder']
            stock_list = Screener(filters=filters, table='Performance', order='price', rows=5)
            if stock_list.data:
                DJ1 = pd.DataFrame(stock_list.data).drop("No.", axis=1).set_index("Ticker")
                DJ1 = DJ1.sort_values(by=['Recom'], ascending=False).head(5)
                DJ1['Company'] = [finviz.get_stock(ticker)['Company'] for ticker in DJ1.index]
                DJ1['Stock Info'] = [self.get_stock_info(ticker) for ticker in DJ1.index]
                data["daytrading"] = {"ticker": list(DJ1.index), "company": list(DJ1.Company), "stock info": DJ1['Stock Info'].tolist()}
            else:
                print("None")
        except Exception as e:
            return {
                "status": 400,
                "detail": str(e)
            }

        return jsonify({
            'resultStatus': 'SUCCESS',
            'message': data
        })

api.add_resource(HelloApiHandler, '/flask/hello')

if __name__ == '__main__':
    app.run(debug=True)
