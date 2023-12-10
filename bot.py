# bot.py derived from options.py
#


import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import requests
import time
import json

# Define the symbol
symbol_default = "AAPL"
tradesqueuedFn ="https://algoinvestorr.com/trades/tradesqueued.php"
fname_log ="tradeslog.txt"


############################################################################ FUNCTIONS START

def fn_GetPauseInputFromUser(jbstr="Press Enter to Continue:"):
    tmpstr="\n"+jbstr
    print(tmpstr)
    tmpInput=input()

def fn_printUdateTime():   
    current_time_unix = time.strftime('%s', time.localtime())
    print("Current date and time in Unix format:", current_time_unix)

def fn_PollServerForTradeCMDs():
    #print("\nConnecting to the Algo Investor Server...")
    #x = requests.get('https://algoinvestorr.com/trades/trades_test.php')
    x = requests.get(tradesqueuedFn)
    x1="'"+ x.text +"'"
    print("\nDownloaded json:",x1 )
    y = json.loads(x.text)
    #print("\n",y)
    #print("\n",y["reqTimestamp"]," > TRADE_CMD: ",y["tradeCmd"], y["symbol"], "reason:",y["signalType"] )
    
    if y["tradeCmd"] == "sellIronCondor" or y["tradeCmd"] == "buyButterfly" or y["tradeCmd"] == "sellCallCreditSpread" or y["tradeCmd"] == "sellPutCreditSpread":
        print("\n",y["reqTimestamp"]," > TRADE_CMD: ",y["symbol"],y["tradeCmd"], y["wings"], "reason:",y["signalType"] )
    else:
        print("\n",y["reqTimestamp"]," > TRADE_CMD: ",y["symbol"],y["tradeCmd"], "reason:",y["signalType"] )
     
    if y["tradeCmd"] == "killBot":
        print("\nKILLING TRADING BOT. EXITING...")
        exit()
    print("\n")

    f = open(fname_log, "a")
    current_time_unix = time.strftime('%s', time.localtime())
    f.write("\n"+current_time_unix+": "+x.text)
    f.close()
    
    #fn_printUdateTime() 

#def fn_abc():
    #

    
############################################################################ CODE START

print("\nWelcome to the Algo Investor Stock and Options Trading Bot!\n")

# on mac: open Terminal, > pwd
# on mac: > cd _dev/Projects/algo-python

# Initialize the timer
start_time = time.time()
#print("time=",start_time)
#fn_printUdateTime() 

print("\nConnecting to the Algo Investor Server...")

delaySeconds = 5
gLooping = 1
cnt =0
maxSeconds=120
   
print("\nEntering the Algo Investor Bot's Trade Loop for", maxSeconds ,"seconds, polling every", delaySeconds,"secs...")
while gLooping==1:
    #print(".", cnt*delaySeconds)
    #fn_printUdateTime()
    time.sleep(delaySeconds)
    fn_PollServerForTradeCMDs()
    cnt += 1
    secsleft=maxSeconds - cnt*delaySeconds

    txt = "\nMinutes remaining in polling loop: {:.2f} minutes"+ "  ("+ str(secsleft)+ " secs)"
    print(txt.format(secsleft/60, ','))

  
    #print("\nMinutes remaining in polling loop:",secsleft/60,"  (",secsleft," seconds)")
    if(cnt*delaySeconds > maxSeconds ):
        gLooping=0




# print("\nReaching out to the Algo Investor Server (https://algoinvestorr.com), one moment please...")
# x = requests.get('https://algoinvestorr.com/trades/trades_test.php')
# fn_GetPauseInputFromUser("Press Enter to see the trades_test.php contents from http server: ")
# print("\nx.text (from php executable)=",x.text)


# y = requests.get('https://algoinvestorr.com/trades/trades.json')
# fn_GetPauseInputFromUser("Press Enter to see the trades.json contents from http server: ")
# print("\ny.text= (from static .json)", y.text)
# fn_GetPauseInputFromUser();







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

#hist = tickerObj.history(period="max")

#print(symbol, "Header = ", hist.head())
#note hist.actions, hist.dividends, hist.split, hist.financials, hist.balance_sheet, hist.cashflow,
#     hist.options



# fn_GetPauseInputFromUser("Press Enter for Financials:")
# print(tickerObj.financials)

# fn_GetPauseInputFromUser("Press Enter for Balance Sheet:")
# print(tickerObj.balance_sheet)

# fn_GetPauseInputFromUser("Press Enter for Cashflow:")
# print(tickerObj.cashflow)



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

questions = [
    {
        "question": "What is the tallest being in existence?",
        "options": [
            "Is it A, Dinosaur?",
            "B, The one and only, Giraffe",
            "C,The soul of the ocean Whale",
            "or D, None"
        ],
        "correctOption": "a",
        "prize": 100_000
    },
    {
        "question": "Which famous inventor was born in 1856?",
        "options": [
            "A Einstein",
            "B, Tesla",
            "C, Napoleon",
            "D, Newton"
        ],
        "correctOption": "b",
        "prize": 100_000
    }
]