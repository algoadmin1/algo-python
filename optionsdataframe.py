#
#       optionsdataframe.py         by John Botti     Copyright (c) 2023-2025 by Algo Investor Inc
#
# pip install yfinance
# pip install matplotlib
# pip install pandas
#
#
#       also use:
#
#           optionsexpTest.py - goes through different yfinance functions
#
#           optionsexp.py derived from options.py  by John Botti      
#
#           
#
#


import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime 

# Define the symbol
symbol_default = "AAPL"
currstr        ="$"
prgname        = "optionsdataframe.py"
prgvers        =                            "3.0"


def DaysDifference(udate1, udate2):
    date_format = "%Y-%m-%d" 
    parsed_date1 = datetime.strptime(udate1, date_format) 
    parsed_date2 = datetime.strptime(udate2, date_format) 
    difference = parsed_date2 - parsed_date1
    return difference.days


def PrintStrike(optionCallOrPuts, a,descstr):
    print(descstr)
    print("Contract Symbol=",optionCallOrPuts.contractSymbol[a])
    print("Strike         ="+currstr,optionCallOrPuts.strike[a])
    print("Last Trade Date=",optionCallOrPuts.lastTradeDate[a])
    print("Last Price     ="+currstr,optionCallOrPuts.lastPrice[a])
    print("Bid            ="+currstr,optionCallOrPuts.bid[a])
    print("Ask            ="+currstr,optionCallOrPuts.ask[a])
    print("Implied Vol.   =",optionCallOrPuts.impliedVolatility[a])
    print("ITM?           =",optionCallOrPuts.inTheMoney[a])


print("\n] Welcome to ",prgname," for dataframe testing...")

print("\n] Enter Symbol (", symbol_default , ")")
symbol = input()
if symbol == "":
    print("] Defaulting Symbol to ", symbol_default)
    symbol = symbol_default



# Create a Ticker object for the symbol
tickerObj = yf.Ticker(symbol)

# Get the options data
options = tickerObj.options
print(options)

print("\n] Above are the available expiration dates for",symbol,"...\n")

# options Expiry
expdate_date = "2024-03-15"
print("\n] ENTER options Expiration Date desired (", expdate_date , "): ")
input0 = input()
if input0 == "":
    print("\n] Defaulting ExpirationDate to ", expdate_date)
    input0 = expdate_date

expdate_dateSelected = input0
print("\n] Selected Options ExpirationDate is:", expdate_dateSelected)

# Print the options chain
print("\n\n] Options Chain for", symbol)
for option_date in options:
    if option_date==expdate_dateSelected:
        option_chain = tickerObj.option_chain(option_date)
        print("\n * Expiration Date:", option_date)
        calls0= option_chain.calls
        puts0 = option_chain.puts


       
##################################### find otm/itm for CALLS
        callsITM=0
        callsOTM=0

        i=0 
        df = pd.DataFrame(calls0)
        max_rows = df.shape[0]
        print(" max_rows =",max_rows)
        keepsearching=1
        while i<max_rows and keepsearching==1:
            print(i," ",calls0.contractSymbol[i], calls0.inTheMoney[i])
            if( str(calls0.inTheMoney[i])=="False"):
                print("Found the CALLs ITM/OTM at: ",i-1," / ",i)
                callsOTM=i
                callsITM=i-1
                keepsearching=0
            i += 1 
        
        print(symbol.upper(),": CALLS ITM=",callsITM, " OTM=",callsOTM)

        a=callsITM
        print("\nCalls ITM for [",a,"]:")
        cpstr=symbol.upper()+"'s Calls Expiring: "+option_date
        PrintStrike(calls0, a, cpstr)  
        
        a=callsOTM
        print("\nCalls OTM for [",a,"]:")
        cpstr=symbol.upper()+"'s Calls Expiring: "+option_date
        PrintStrike(calls0, a, cpstr)






##################################### find otm/itm for PUTS
        putsITM=0
        putsOTM=0

        i=0 
        df = pd.DataFrame(puts0)
        max_rows = df.shape[0]
        print(" max_rows =",max_rows)
        keepsearching=1
        while i<max_rows and keepsearching==1:
            print(i," ",puts0.contractSymbol[i], puts0.inTheMoney[i])
            if( str(puts0.inTheMoney[i])=="True"):
                print("Found the PUTs OTM/ITM at: ",i-1," / ",i)
                putsITM=i
                putsOTM=i-1
                keepsearching=0
            i += 1

        print(symbol.upper(),": PUTS ITM=",putsITM, " OTM=",putsOTM)



        a=putsITM
        print("\nPuts  data for [",a,"]:")
        cpstr=symbol.upper()+"'s Puts Expiring: "+option_date
        PrintStrike(puts0, a, cpstr)

        a=putsOTM
        print("\nPuts  data for [",a,"]:")
        cpstr=symbol.upper()+"'s Puts Expiring: "+option_date
        PrintStrike(puts0, a, cpstr)



         

        print("\n\n\n\n")
        print("CALLS:")
        print(calls0)

        print("PUTS:")
        print(puts0)


        #  contractSymbol lastTradeDate  strike  lastPrice    bid   ask  change  percentChange  
        #  volume  openInterest  impliedVolatility  inTheMoney contractSize currency
       
        print("\n\n\n END OF DATAFRAME ANALYSIS.")







# END OF PROGRAM







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
