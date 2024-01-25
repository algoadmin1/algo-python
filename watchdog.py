# watchdog.py   by John Botti
#
#

import requests
import csv
import time
import datetime
import pytz
import shutil
import sys

import os

import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
# from datetime import datetime 

import json
import robin_stocks as rs


#   open .ini file
#
#
#

def delayLoop(secs):
    """
    Delays execution for the specified number of seconds.

    Parameters:
    - secs (float): The number of seconds to delay.

    Example:
    >>> delayLoop(5)
    # Pauses execution for 5 seconds
    """
    time.sleep(secs)

# Example usage:
#delayLoop(3)  

def Check_data(array, datastr):
    return datastr in array

def CheckPositions(name, account):
    print("Checking Positions, build_holdings...", account, " for ", name)
    my_stocks =  rs.robinhood.build_holdings()
    for key,value in my_stocks.items():
        print(key,value)
    return True

def ClosePositions(name, account):
    print("Calling CLOSE Positions on ", account)
    return True

def printJson(dict0, str0):
    json1 = json.dumps(dict0, indent=10)
    print( str0," json=",json1)


def sendOrderSell( buySell, qty0, symbol0 , assettype, priceLimit ):
    # Get the instrument URL for the stock
    # instrument = rs.robinhood.get_stock_instrument_data(symbol0)[0]['url']
    # # Get the current ask price (market price) for the stock
    # ask_price = rs.robinhood.get_latest_price(symbol0, includeExtendedHours=True, info='ask_price')
    # # Place a market sell order at  ask price
    # order_id = rs.robinhood.order_sell_market( instrument=instrument, quantity=qty0 )
    #priceLimit=300
    rs.robinhood.order_sell_limit(symbol0 , qty0, priceLimit )
    print(".robinhood*SELL_LIMIT send0rderSell(" ,buySell, qty0, symbol0 , assettype,") sent to market.")


def sendMarketOrder( buySell, qty, symbol0 , assettype ):
    qtyMAX=10
    if(assettype=="stock"):
        qtyMAX=10
        if(qty>qtyMAX):
            qty=qtyMAX
        if(buySell=="BUY"):
            rs.robinhood.order_buy_market(symbol0, qty)  
            print(".robinhood*BUY  sendMarket0rder(" ,buySell, qty, symbol0 , assettype,") sent to market.")
        if(buySell=="SELL"):
            rs.robinhood.order_sell_market(symbol0, qty)  
            print(".robinhood*SELL sendMarket0rder(" ,buySell, qty, symbol0 , assettype,") sent to market.")

def sendOptionOrder(symbol0,qty,price0,expdate,strike0,putcall,buysell):
    #  Buy 5 $150 May 1st, 2020 SPY puts if the price per contract is $1.00. Good until cancelled.
    # robin_stocks.order_buy_option_limit('open','debit',1.00,'SPY',5,'2020-05-01',150,'put','gtc')
    # dur='gtc'
    if(qty==0):
        print(" Zero qty ==0 , exiting send0ption0rder()")
        return
    acct0='497177477'
    if(buysell=="BUY"):
        rs.robinhood.order_buy_option_limit('open','debit',price0,symbol0, qty, expdate,strike0,putcall,acct0)
    if(buysell=="SELL"):
        rs.robinhood.order_sell_option_limit('close','debit',price0,symbol0, qty, expdate,strike0,putcall,acct0)



def GetHoldings(str):
    print("] Your Holdings ",str," :")
    my_items =  rs.robinhood.build_holdings()
    h=0;
    for key,value in my_items.items():
    # for key,value in my_items():
        print(h," )")
        print(key,value)
        h+=1
    return my_items


# robin_stocks Docs:  https://robin-stocks.readthedocs.io/en/latest/robinhood.html#logging-in-and-out
def CheckPostionsRobinhood( username0, pwd0 ):
    print("CheckPostionsRobinhood() Positions for ", username0)
    
    ordersLIVE= 1
    getOptionsPOSS=0
    
    days0 = 1
    secsInADay = 86400
    totalseconds = secsInADay * days0

    # 497177477
    rs.robinhood.authentication.login(username=username0, password=pwd0, expiresIn=totalseconds, scope='internal', by_sms=True, store_session=True, mfa_code=None, pickle_name='')

    # Log in to Robinhood (replace 'username' and 'password' with your credentials)
    # rs.robinhood.authentication.login(username=username0, password='Crixus2011', expiresIn=86400, scope='internal', by_sms=True, store_session=True, mfa_code=None, pickle_name='')
    
    # login = rs.robinhood.login(username=username0, password='Crixus2011') # expiresIn=86400, scope='internal', by_sms=True, store_session=True, mfa_code=None )
    
    # login = rs.robinhood.login(username="my_email_@gmail.com",password="my_password_here",mfa_code="otp", pickle_name="")
    # login = r.login(<username>,<password>)

    # Get portfolio information
    # rs.robinhood.profiles.load_account_profile(account_number=None, info=None)
    prof = rs.robinhood.profiles.load_account_profile(account_number=None, info=None)
    printJson(prof, "Profile")

    poss = rs.robinhood.get_open_stock_positions()
    # poss= rs.robinhood.options.get_open_positions(info=None)
    printJson(poss, "Stock positions")

    # poss = rs.get_current_positions()
    # printJson(poss, "Open positions")

###### THIS WORKS !
    # ord = rs.robinhood.export_completed_option_orders(".", "Completed ORDERS:") 
    # printJson(ord, "Completed Orders")

###### THIS WORKS !
    # rs.robinhood.order_buy_market('AMD',2,  "gtc", extendedHours=True )
    # rs.robinhood.order_buy_market(  'AMD',1,timeInForce='gtc', extendedHours=True )

    my_items = GetHoldings("BEFORE TRADE")


######################################################
###################
###################     ORDERS START HERE
###################
######################################################

    if(ordersLIVE==1):
        qty0        =   1
        sym0        =   "aapl"
        buySell0= "BUY"
        assettype0  ="stock"
        #sendMarketOrder( buySell0, qty0,sym0 , assettype0  )
            
        # buySell0    = "SELL"
        # price0 = 182.50
        # sendOrderSell( buySell0, qty0, sym0, assettype0, price0 )
        

        ####################################### 
        # qty0        =   1
        # sym0        =   "amd"
        # putcall     ='call'
        # price0      =0.98
        # # price0      =6.30
        # # expdate="2024-02-02"
        # expdate     ="2024-01-26"
        # strike0     =185
        # buySell0    ="BUY"
        # # buySell0    ="SELL"
        # print(".robinhood *SENDING Order" , sym0,qty0,price0,expdate,strike0,putcall, buySell0)
        # sendOptionOrder(sym0,qty0,price0,expdate,strike0,putcall, buySell0)

        ####################################### 
        # qty0        =   3
        # sym0        =   "amd"
        # putcall     ='call'
        # price0      =2.70
        # # price0      =6.30
        # # expdate="2024-02-02"
        # expdate     ="2024-01-26"
        # strike0     =180
        # buySell0    ="BUY"
        # # buySell0    ="SELL"
        # print(".robinhood *SENDING Order" , sym0,qty0,price0,expdate,strike0,putcall, buySell0)
        # sendOptionOrder(sym0,qty0,price0,expdate,strike0,putcall, buySell0)


        qty0        =   0
        sym0        =   "amzn"
        putcall     ='call'
        price0      =2.85
        # price0      =6.30
        # expdate="2024-02-02"
        expdate     ="2024-01-26"
        strike0     =155
        buySell0    ="BUY"
        # buySell0    ="SELL"
        print(".robinhood *SENDING Order" , sym0,qty0,price0,expdate,strike0,putcall, buySell0)
        sendOptionOrder(sym0,qty0,price0,expdate,strike0,putcall, buySell0)





# POST ORDER SEND   *** DELAY ***
    secs=2
    print("delaying ",secs,"seconds...")
    delayLoop(2.5)  
    print("resuming...")






# response:
# AMD {'price': '179.030000', 'quantity': '0.00000000', 'average_buy_price': '0.0000', 'equity': '0.00', 'percent_change': '0.00', 'intraday_percent_change': '0.00', 'equity_change': '0.000000', 'type': 'stock', 'name': 'AMD', 'id': '940fc3f5-1db5-4fed-b452-f3a2e4562b5f', 'pe_ratio': '1328.230000', 'percentage': '0.00'}

###### THIS WORKS !
    if(getOptionsPOSS==1):
        my_items = rs.robinhood.options.get_open_option_positions(account_number=None, info=None)
        printJson(my_items, "Option OPEN Orders")



###### THIS WORKS !
    my_items = GetHoldings("AFTER TRADE")

    # print("] Holdings AFTER BUY ")
    # my_items =  rs.robinhood.build_holdings()
    # h=0;
    # for key,value in my_items.items():
    # # for key,value in my_items():
    #     print(h," )")
    #     print(key,value)
    #     h+=1

    # rs.login(username=username0, password=pwd0)
    # portfolio = rs.account.get_portfolio()


###### THIS WORKS !
    # Log out from Robinhood
    rs.robinhood.authentication.logout()    
    # print(portfolio)


tstr="nytime"
LOOPMax =  7 * 24  * 60 * 12
SECSMax =  5  # 20 loops * 12 secs
pwd0="rixus"
# Get current date in New York - we need EDT for markets...
new_york_timezone = pytz.timezone('America/New_York')
current_date_ny = datetime.datetime.now(new_york_timezone).date()


# Print current date in New York as YYYY-MM-DD
#print(f"Current date in New York: {current_date_ny.strftime('%Y-%m-%d')}")
dstr = ( f"{current_date_ny.strftime('%Y-%m-%d')}" )
dstr1 = dstr  # dstr1 = doesnt change in code todays DATE in NYC

print("Today's date in New York:",dstr1)



print("\n $$$ Welcome to the Algo Investor's 'Watch Dog' - the Automated Porfolio Manager (APM) $$$")
print("\n\nThis module will call the Brokerage APIs directly.\nPlanned: Robinhood API, Fidelity API, Schwab/TD API, E*Trade API")

print("\n\n\nAttempting Robinhood Access...")
# pwd0="C"+pwd0+"2011"
pwd0="c"+pwd0+"2011"
CheckPostionsRobinhood( "roguequant1@gmail.com", pwd0 )


# Starting Balance
startingBalance_default = float(100000.0)
print("\nEnter Starting Balance (", startingBalance_default, "  [0=exit]):")
startingBalance = input()
if startingBalance == "-":
    exit("exiting...-")
if startingBalance == "0":
    exit("exiting...0")
if startingBalance == "":
    print("  Defaulting Starting Balance to ", startingBalance_default)
    startingBalance = startingBalance_default

AcctStart = int(startingBalance)
AcctCurr  = AcctStart
AcctMax   = AcctStart

# Max Dollar Loss
MaxDollarLoss = AcctStart / 2;
print("\nEnter Maximum Loss Allowed $ (", MaxDollarLoss, "): ")
MaxDL = input()
if MaxDL == "":
    print("  Defaulting Max Loss to ", MaxDollarLoss)
    MaxDL = MaxDollarLoss

MaxDollarLoss = int(MaxDL)





# GET TIME
current_time_ny = datetime.datetime.now(new_york_timezone).time()
current_date_time_ny = datetime.datetime.now(new_york_timezone)
dtstr= (f"{current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
print("Today's Date and Time in NYC (EDT) is:",dtstr)



# Print current time in New York as HH:MM:SS
# tstr =(f"{current_time_ny.strftime('%H:%M:%S')}")
# tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
# tstrHHMMstart = tstrHHMM
# print("\n")
# print("Current time in New York is:",tstr)
# print("Current time in New York (Tradestation format) is :",tstrHHMM)

# tt = int(tstrHHMM)
# if(tt<930):
#     print("\n] Markets not open yet- time remaining:", (930-tt)," minutes...\n\n\n")
#     # uncomment for production
#     #sys.exit()
# if(tt>1415):
#     print("\n] Markets Closed !\n\n\n")
#     #sys.exit()
# if(tt<930 and tt>1415):
#     print("\n] Markets are Open!\n\n\n")



keepLooping = LOOPMax # Set keepLooping to a value greater than 0 to enter the loop
timeDelay   = SECSMax    # secs
print("\ndstr=",dstr  ,"len(dstr)=", len(dstr)  )
print("\n] Starting to Loop for ",str((timeDelay*keepLooping)/60), "minutes,\n\n]  *** ENTERING THE WATCHDOG ALERT LOOP...\n")
# print("\n] currentTradestaionNY_Time=", tt,"\n\n> HH:MM:SS NY EDT_-_-_")

current_time = datetime.datetime.now()
    
tstr =(f"{current_time_ny.strftime('%H:%M:%S')}")
print(">",tstr, end="", flush=True)
lastminute = tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")


MaxMinutes = (keepLooping * (timeDelay+0 )/60 ) 
print("\n] Attempting to Loop",keepLooping," times, with a" , timeDelay, " second delay between reading the local file, for a \nMax # minutes of:",MaxMinutes," Max HOURS=",MaxMinutes/60,"\n\n" )
###################### STARTING LOOP ****************************************

while keepLooping > 0:
    current_time_ny = datetime.datetime.now(new_york_timezone).time()
    lastminute1 = tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
    if(lastminute1>lastminute):
        lastminute=lastminute1
        #print("\n")
        tstr =(f"{current_time_ny.strftime('%H:%M:%S')}")
        print("\n>",tstr, end="", flush=True)


    #current_time = time.strftime("%H:%M:%S")  # Get current time
    #print(f"Current time: {current_time}")
    tstr =(f"{current_time_ny.strftime('%H:%M:%S.%f')}")
    #print(" ",tstr)
    print(".", end="", flush=True)
    #print(">",tstr,".", end="", flush=True)
    time.sleep(timeDelay) 
    
    # Wait for 3 seconds then open local file... (adjust for longer durations like 5 sec+ )

    print("BrokerageRequest[ 'RobinhoodAPI', 'GetPositions' ...")
    # CheckPositions("Gianni", "12345354911")


    current_date_time_ny = datetime.datetime.now(new_york_timezone)
    dtstr= (f"{current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
    print("\n======================>Today's Date and Time in NYC (EDT) is:",dtstr)
   
  
#### End of Loop
    # Decrement keepLooping to eventually exit the loop
    keepLooping -= 1  # You might have a condition to break the loop based on a certain condition
    print("\n] Attempting to Loop",keepLooping," times, with a" , timeDelay, " second delay between reading the local file, for a \nMax # minutes of:", (keepLooping * (timeDelay+0 )/60 )," and Max # HOURS=", (keepLooping * (timeDelay+0 )/60 )/60  ,"\n\n" )

    #END OF THE LOOP

###################### ENDING LOOP **********************************************

print("\n] Exiting LOOP.\n")