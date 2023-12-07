# options.py
# 

import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt

# Define the symbol
symbol_default = "AAPL"
 
 
print("\nEnter Symbol (", symbol_default , ")")
symbol = input()
if symbol == "":
    print(" Defaulting to ", symbol_default)
    symbol = symbol_default


# Create a Ticker object for the symbol
tickerObj = yf.Ticker(symbol)

# Get the options data
options = tickerObj.options

# Print the options chain
print("Options Chain for", symbol)
for option_date in options:
    option_chain = tickerObj.option_chain(option_date)
    print("\nExpiration Date:", option_date)
    print(option_chain)
    print("\n")

# Optionally, you can also plot some option data using matplotlib
option_chain = tickerObj.option_chain(options[0])
plt.figure(figsize=(10, 6))
plt.plot(option_chain.calls['strike'], option_chain.calls['lastPrice'], label='Call Last Price', marker='o')
plt.plot(option_chain.puts['strike'], option_chain.puts['lastPrice'], label='Put Last Price', marker='o')
plt.xlabel('Strike Price')
plt.ylabel('Last Price')
plt.title('Option Prices for ' + symbol)
plt.legend()
plt.grid()
plt.show()
