# options.py
#


import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt

# Define the symbol
symbol_default = "AAPL"
 

def PrintStrike(optionCallOrPuts, a):
    print(optionCallOrPuts.contractSymbol[a])
    print(optionCallOrPuts.strike[a])
    print(optionCallOrPuts.lastPrice[a])
    print(optionCallOrPuts.bid[a])
    print(optionCallOrPuts.ask[a])
    print(optionCallOrPuts.inTheMoney[a])

print("\nWelcome to optionswb.py for dataframe testing...")

print("\nEnter Symbol (", symbol_default , ")")
symbol = input()
if symbol == "":
    print(" Defaulting Symbol to ", symbol_default)
    symbol = symbol_default



# Create a Ticker object for the symbol
tickerObj = yf.Ticker(symbol)

# Get the options data
options = tickerObj.options
print(options)

print("\nAbove are the available expiration dates for",symbol,"...\n")

# options Expiry
expdate_date = "2024-03-15"
print("\nEnter options ExpirationDate desired (", expdate_date , "): ")
input0 = input()
if input0 == "":
    print("\nDefaulting ExpirationDate to ", expdate_date)
    input0 = expdate_date

expdate_dateSelected = input0
print("\nSelected Options ExpirationDate is:", expdate_dateSelected)

# Print the options chain
print("\n\nOptions Chain for", symbol)
for option_date in options:
    if option_date==expdate_dateSelected:
        option_chain = tickerObj.option_chain(option_date)
        print("\nExpiration Date:", option_date)
        calls0= option_chain.calls
        puts0 = option_chain.puts

        print(calls0)
        print("Calls data for [1]:")
            
        a=1
        PrintStrike(calls0, a)
         
        #  contractSymbol lastTradeDate  strike  lastPrice    bid   ask  change  percentChange  
        #  volume  openInterest  impliedVolatility  inTheMoney contractSize currency
        print(puts0)

        print("\n")



# Optionally, you can also plot some option data using matplotlib
# option_chain = tickerObj.option_chain(options[0])
# plt.figure(figsize=(10, 6))
# plt.plot(option_chain.calls['strike'], option_chain.calls['lastPrice'], label='Call Last Price', marker='o')
# plt.plot(option_chain.puts['strike'], option_chain.puts['lastPrice'], label='Put Last Price', marker='o')
# plt.xlabel('Strike Price')
# plt.ylabel('Last Price')
# plt.title('Option Prices for ' + symbol)
# plt.legend()
# plt.grid()
# plt.show()
