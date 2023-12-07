# stocks.py
# Copyright (c) by Algo Investor, Inc
# created by john 2023-12-06

import yfinance as yf
import mplfinance as mpf
import datetime as dt

# symbolList = ["HRTG", "AAPL", "ROKU", "TSLA", "AMZN", "NFLX", "META"]
symbolList = ["HRTG", "AAPL", "ROKU", "NFLX", "META"]

# let the user enter number of days
days_default = 100
print("\nEnter Days (", days_default, ")")
ndays = input()
if ndays == "":
    print(" Defaulting to ", days_default)
    ndays = days_default
num_days = int(ndays)

for symbol in symbolList:
    # Set the start and end dates
    end_date = dt.datetime.today()
    start_date = end_date - dt.timedelta(days=num_days)

    # Download the data for the stock
    data = yf.download(symbol, start=start_date, end=end_date)

    # Plot the candlestick chart
    #mpf.plot(data, type='line', title=symbol, ylabel='Price')
    mpf.plot(data, type='candle', style='charles',
        title=symbol,
        ylabel='',
        ylabel_lower='')

    #    volume=True, 
    #    mav=(3,6,9), 
    #    savefig='test-mplfiance.png')