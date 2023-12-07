import yfinance as yf
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# Define the list of symbols
symbolList = ["AAPL", "ROKU", "TSLA", "AMZN", "NFLX", "META"]

# Define the time frame (last 2 years)
end_date = datetime.now()
start_date = end_date - timedelta(days=365 * 2)

# Define a function to plot the historical data for a stock
def plot_stock_data(stock_data, symbol):
    plt.figure(figsize=(12, 6))
    plt.plot(stock_data['Close'], label=symbol)
    plt.title(f'{symbol} Stock Price Over the Last 2 Years')
    plt.xlabel('Date')
    plt.ylabel('Closing Price')
    plt.legend()
    plt.grid()
    plt.show()

# Loop through each symbol and fetch and plot historical data
for symbol in symbolList:
    stock = yf.Ticker(symbol)
    stock_data = stock.history(start=start_date, end=end_date)
    plot_stock_data(stock_data, symbol)