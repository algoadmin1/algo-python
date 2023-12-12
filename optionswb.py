# options.py
#


import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import requests
import time

# Define the symbol
symbol_default = "AAPL"
 
def fn_GetPauseInputFromUser(jbstr="Press Enter to Continue:"):
    tmpstr="\n"+jbstr
    print(tmpstr)
    tmpInput=input()


print("\nWelcome to the Algo Investor Options Bot.\n\n")

# on mac: open Terminal, > pwd
# on mac: > cd _dev/Projects/algo-python

# Initialize the timer
start_time = time.time()
print("time=",start_time)








print("\nReaching out to the Algo Investor Server (https://algoinvestorr.com), one moment please...")

x = requests.get('https://algoinvestorr.com/trades/trades_test.php')
fn_GetPauseInputFromUser("Press Enter to see the trades_test.php contents from http server: ")
print("\nx.text (from php executable)=",x.text)


y = requests.get('https://algoinvestorr.com/trades/trades.json')
fn_GetPauseInputFromUser("Press Enter to see the trades.json contents from http server: ")
print("\ny.text= (from static .json)", y.text)


fn_GetPauseInputFromUser();







print("\nEnter the underlying Symbol to retrieve its Options Chain (", symbol_default , ")")
symbol = input()
if symbol == "":
    print(" Defaulting Symbol to ", symbol_default)
    symbol = symbol_default



# Create a Ticker object for the symbol
# github repo
# https://github.com/ranaroussi/yfinance 
tickerObj = yf.Ticker(symbol)
#print(tickerObj.info)

hist = tickerObj.history(period="max")
#hist.head()
print(symbol, "Header = ", hist.head())
#note hist.actions, hist.dividends, hist.split, hist.financials, hist.balance_sheet, hist.cashflow,
#     hist.options

fn_GetPauseInputFromUser("Press Enter for Financials:")
print(tickerObj.financials)

fn_GetPauseInputFromUser("Press Enter for Balance Sheet:")
print(tickerObj.balance_sheet)

fn_GetPauseInputFromUser("Press Enter for Cashflow:")
print(tickerObj.cashflow)

# Get the options data
options = tickerObj.options
print("\n\n"+symbol+"'s options expiration dates:",options)

print("\nThese are the available expiration dates for",symbol,"...\n")

# options Expiry
expdate_date = "2024-02-16"
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
        fn_GetPauseInputFromUser("Press Enter for "+symbol+"'s CALLS:")
        print(option_chain.calls)
#        print(option_chain.calls)

#        fn_GetPauseInputFromUser()
        
        fn_GetPauseInputFromUser("Press Enter for "+symbol+"'s PUTS:")
        print(option_chain.puts)
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
