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
import random

import os

import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
# from datetime import datetime 

import json
import robin_stocks as rs

msg00=0

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

def cancelOrders(assettype):
    if(assettype=="stock"):
        rs.robinhood.orders.cancel_all_stock_orders()
    if(assettype=="options"):
        rs.robinhood.orders.cancel_all_option_orders()
    if(assettype=="crypto"):
        rs.robinhood.orders.cancel_all_crypto_orders()

def sendStockOrder( buySell, qty, symbol0 , assettype, mktLimit, price0):
    # if(mktLimit<>"" and mktLimit<>""):
    qtyMAX=10
    acct0='497177477'

    if(qty==0):
        return
    
    ask_price = rs.robinhood.stocks.get_latest_price(symbol0,  'ask_price')
    # print("ASK price for",symbol0,"= ",ask_price[0])
    bid_price = rs.robinhood.stocks.get_latest_price(symbol0,  'bid_price')
    print("BID / ASK price for",symbol0,"=     ",bid_price[0], "  /  ", ask_price[0])
    

#  # ask_price = rs.robinhood.stocks.get_latest_price(sym0, includeExtendedHours=True, info='ask_price')
#             ask_price = rs.robinhood.stocks.get_latest_price(symbol0,  'ask_price')
#             print("Ask price for",symbol0,"= ",ask_price[0])
#             # print(f"Current ask price for {sym0}: ${ask_price}")
            




    if(assettype=="stock"):
        qtyMAX=10
        if(qty>qtyMAX):
            qty=qtyMAX


        if(buySell=="BUY"):
            rs.robinhood.order_buy_market(symbol0, qty)  
            print(".robinhood*BUY  sendMarket0rder(" ,buySell, qty, symbol0 , assettype,") sent to market.")
            # if(mktLimit=="market"): 
            # price1 = ask_price[0]           
            #     print("MARKET BUY ORDER: overriding orig price:", price0, "with ASK=", price1)
                # price0 = price1
        

        if(buySell=="SELL"):
            # rs.robinhood.order_sell_market(symbol0, qty)  
            # print(".robinhood*SELL sendStock0rder(" ,buySell, qty, symbol0 , assettype,") sent to market.")
            print(".robinhood*** BEFORE SELL new sendStock0rder(" ,buySell, qty, symbol0 , assettype,") sent to market.")
            
            # result0 = rs.robinhood.orders.order_sell_market(symbol0, qty, acct0, 'gtc',  False, True)
            # result0 = rs.robinhood.orders.order(symbol0, qty, "sell", "200", "8.42", None, 'gfd', True, True)
            # result0 = rs.robinhood.orders.order(symbol0, qty, "sell",price0, "5.00", acct0, 'gfd', False, True, 'regular_hours')
            
        #### ALMOST WORKED - see result0 at end of file    
            # result0 = rs.robinhood.orders.order(symbol0, qty, "sell","179.50", "5.00", acct0, 'gfd', False, True, 'regular_hours')
            
            # result0 =  rs.robinhood.orders.order_sell_market(symbol0, qty, 'gtc')  
            if(mktLimit=="market"):
                price1 = ask_price[0]           
                print("MARKET SELL ORDER: overriding orig price:", price0, "with ASK=", price1)
                price0 = price1

            result0 =  rs.robinhood.order_sell_market(symbol0, qty, price0, 'gfd',  False, True ) 

            print(".robinhood*** AFTER  SELL new sendStock0rder(" ,buySell, qty, symbol0 , assettype,") sent to market.")
            print("result.rs.robinhood=",result0)


# order(symbol, quantity, "buy", account_number, limitPrice, None, timeInForce, extendedHours, jsonify)
#     When your parameters are passed in, the resulting call is
# order("BBCP", 1, "buy", "XXXXXX", "8.42000000", None, 'gfd', True, True)
#     The original signature for the order method is
# order(symbol, quantity, side, limitPrice=None, stopPrice=None, account_number=None, timeInForce='gtc', extendedHours=False, jsonify=True, market_hours='regular_hours')

# result0 =  rs.robinhood.order_sell_market(symbol0, qty, '196.75', 'gtc',  False, True ) #, 'regular_hours')  
# result.rs.robinhood= {'id': '65b3d4a1-f92b-4560-8d1a-16dc5aec6512', 'ref_id': 'd1948f2b-3d52-42bb-8e06-a1c53f544b1a', 'url': 'https://api.robinhood.com/orders/65b3d4a1-f92b-4560-8d1a-16dc5aec6512/', 
#                       'account': 'https://api.robinhood.com/accounts/497177477/', 'user_uuid': 'ed4f6f97-af00-48ec-b24b-3ada949c0eec', 'position': 'https://api.robinhood.com/positions/497177477/940fc3f5-1db5-4fed-b452-f3a2e4562b5f/', 
#                       'cancel': 'https://api.robinhood.com/orders/65b3d4a1-f92b-4560-8d1a-16dc5aec6512/cancel/', 'instrument': 'https://api.robinhood.com/instruments/940fc3f5-1db5-4fed-b452-f3a2e4562b5f/', 'instrument_id': '940fc3f5-1db5-4fed-b452-f3a2e4562b5f', 'cumulative_quantity': '0.00000000', 
#                       'average_price': None, 'fees': '0.00', 'state': 'unconfirmed', 'pending_cancel_open_agent': None, 
#                       'type': 'limit', 'side': 'sell', 'time_in_force': 'gtc', 'trigger': 'immediate', 'price': '196.75000000', 'stop_price': None, 'quantity': '1.00000000', 'reject_reason': None, 
#                       'created_at': '2024-01-26T15:49:53.575795Z', 'updated_at': '2024-01-26T15:49:53.575812Z', 'last_transaction_at': '2024-01-26T15:49:53.575795Z', 'executions': [], 'extended_hours': False, 'market_hours': 'regular_hours', 'override_dtbp_checks': False, 'override_day_trade_checks': False, 'response_category': None, 'stop_triggered_at': None, 'last_trail_price': None, 'last_trail_price_updated_at': None, 'last_trail_price_source': None, 'dollar_based_amount': None, 'total_notional': {'amount': '196.75', 'currency_code': 'USD', 'currency_id': '1072fc76-1862-41ab-82c2-485837590762'}, 'executed_notional': None, 'investment_schedule_id': None, 'is_ipo_access_order': False, 'ipo_access_cancellation_reason': None, 'ipo_access_lower_collared_price': None, 'ipo_access_upper_collared_price': None, 'ipo_access_upper_price': None, 'ipo_access_lower_price': None, 'is_ipo_access_price_finalized': False, 'is_visible_to_user': True, 'has_ipo_access_custom_price_limit': False, 'is_primary_account': True, 'order_form_version': 4, 'preset_percent_limit': None, 'order_form_type': 'all_day_trading_v1_2', 'last_update_version': None, 'placed_agent': 'user'}



# .robinhood*** BEFORE SELL new sendStock0rder( SELL 1 amd stock ) sent to market.
# .robinhood*** AFTER  SELL new sendStock0rder( SELL 1 amd stock ) sent to market.
# result.rs.robinhood= {'id': '65b3cf6d-f0d4-4e49-9cf3-907044171e5c', 'ref_id': 'a6741fc5-c32f-4429-a65f-930c8205aa92', 
#                       'url': 'https://api.robinhood.com/orders/65b3cf6d-f0d4-4e49-9cf3-907044171e5c/', 'account': 'https://api.robinhood.com/accounts/497177477/', 
#                       'user_uuid': 'ed4f6f97-af00-48ec-b24b-3ada949c0eec', 'position': 'https://api.robinhood.com/positions/497177477/940fc3f5-1db5-4fed-b452-f3a2e4562b5f/', 
#                       'cancel': 'https://api.robinhood.com/orders/65b3cf6d-f0d4-4e49-9cf3-907044171e5c/cancel/', 'instrument': 'https://api.robinhood.com/instruments/940fc3f5-1db5-4fed-b452-f3a2e4562b5f/', 
#                       'instrument_id': '940fc3f5-1db5-4fed-b452-f3a2e4562b5f', 'cumulative_quantity': '0.00000000', 'average_price': None, 'fees': '0.00', 'state': 'unconfirmed', 'pending_cancel_open_agent': None, 
                      
#                       'type': 'limit', 'side': 'sell', 'time_in_force': 'gfd', 'trigger': 'stop', 
#                       'price': '179.50000000', 'stop_price': '5.00000000', 'quantity': '1.00000000', 'reject_reason': None, 'created_at': '2024-01-26T15:27:41.872068Z', 'updated_at': '2024-01-26T15:27:41.872090Z', 'last_transaction_at': '2024-01-26T15:27:41.872068Z', 
                      
#                       'executions': [], 'extended_hours': False, 'market_hours': 'regular_hours', 'override_dtbp_checks': False, 'override_day_trade_checks': False, 'response_category': None, 'stop_triggered_at': None, 'last_trail_price': None, 'last_trail_price_updated_at': None, 'last_trail_price_source': None, 'dollar_based_amount': None, 
#                       'total_notional': {'amount': '179.50', 'currency_code': 'USD', 'currency_id': '1072fc76-1862-41ab-82c2-485837590762'}, 'executed_notional': None, 'investment_schedule_id': None, 'is_ipo_access_order': False, 'ipo_access_cancellation_reason': None, 'ipo_access_lower_collared_price': None, 'ipo_access_upper_collared_price': None, 'ipo_access_upper_price': None, 'ipo_access_lower_price': None, 'is_ipo_access_price_finalized': False, 'is_visible_to_user': True, 'has_ipo_access_custom_price_limit': False, 'is_primary_account': True, 'order_form_version': 4, 'preset_percent_limit': None, 'order_form_type': 'all_day_trading_v1_2', 'last_update_version': None, 'placed_agent': 'user'}









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




def GetOpenPositions(assettype0):
    if(assettype0=="stock"):
        print("Get0penPositions()...")
    # robin_stocks.robinhood.account.get_open_stock_positions(account_number=None, info=None)[source]
    # Returns a list of stocks that are currently held.

    # Parameters:	
    # acccount_number (Optional[str]) – the robinhood account number.
    # info (Optional[str]) – Will filter the results to get a specific value.
    # Returns:	
    # [list] Returns a list of dictionaries of key/value pairs for each ticker. If info parameter is provided, a list of strings is returned where the strings are the value of the key that matches info.

    # Dictionary Keys:
        
    # url
    # instrument
    # account
    # account_number
    # average_buy_price
    # pending_average_buy_price
    # quantity
    # intraday_average_buy_price
    # intraday_quantity
    # shares_held_for_buys
    # shares_held_for_sells
    # shares_held_for_stock_grants
    # shares_held_for_options_collateral
    # shares_held_for_options_events
    # shares_pending_from_options_events
    # updated_at
    # created_at

def WithDrawFundsToBankAccount():
    print("Withdrawing...")
    # robin_stocks.robinhood.account.withdrawl_funds_to_bank_account(ach_relationship, amount, info=None)[source]
    # Submits a post request to withdraw a certain amount of money to a bank account.

    # Parameters:	
    # ach_relationship (str) – The url of the bank account you want to withdrawl the money to.
    # amount (float) – The amount of money you wish to withdrawl.
    # info (Optional[str]) – Will filter the results to get a specific value.
    # Returns:	
    # Returns a list of dictionaries of key/value pairs for the transaction.




# robin_stocks Docs:  https://robin-stocks.readthedocs.io/en/latest/robinhood.html#logging-in-and-out
def EnterPostionsRobinhood( username0, pwd0, ordersLIVE ):
    print("CheckPostionsRobinhood() Positions for ", username0)
    
    # UNCOMMENT FOR NO ORDER FLOW
    # ordersLIVE= 0

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
    if(msg00==1):
        printJson(prof, "Profile")

    poss = rs.robinhood.get_open_stock_positions()
    # poss= rs.robinhood.options.get_open_positions(info=None)
    if(msg00==1):
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
        qty0        =   0
        assettype0  = "stock"
        buySell0    = "BUY"
        
        sym0        =   "tsla"
        price0      =  '183.21'
        #
        #   not3: this is actually treated as a BUY LIMIT order
        ### sendStockOrder( buySell0, qty0, sym0, assettype0  , "market", price0)
        
        # qty0        =   2
        # buySell0    = "SELL"
        sendStockOrder( buySell0, qty0, sym0, assettype0  , "market", price0)
        # .robinhood*** BEFORE SELL new sendStock0rder( SELL 1 aapl stock ) sent to market.
        # Ask price for aapl =  194.440000
        # MARKET SELL ORDER: overriding orig price: 194.48 with 194.440000
        # .robinhood*** AFTER  SELL new sendStock0rder( SELL 1 aapl stock ) sent to market.




        ####################################### 
        # result1 = cancelOrders("stocks")
        # print("Cancel = ",result1)
       
        
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


        # qty0        =   1
        # sym0        =   "roku"
        # putcall     ='call'
        # price0      =3.6
        # # price0      =6.30
        # # expdate="2024-02-02"
        # expdate     ="2024-02-02"
        # strike0     =90
        # buySell0    ="BUY"
        # # buySell0    ="SELL"
        # print(".robinhood *SENDING Order" , sym0,qty0,price0,expdate,strike0,putcall, buySell0)
        # sendOptionOrder(sym0,qty0,price0,expdate,strike0,putcall, buySell0)





# POST ORDER SEND   *** DELAY ***
    if(qty0>0):
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
    if(qty0>0):
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


def get_udate():
    datestr = ( f"{current_date_ny.strftime('%Y-%m-%d')}" )
    return datestr

def rand(num):
    return(random.randint(0, (num-1)))

def print_colored(text, color_code): 
    print(f"\033[{color_code}m{text}\033[0m") 

def print_colored_rnd(text):
    r = rand(colorArrayLen)
    print_colored(text, colorArray[r])

def print_colored_rnd1(text, r):
    # r = rand(colorArrayLen)
    print_colored(text, colorArray[r])
 
#    / \\__
#   (    @\___
#   /         O
#  /   (_____/
# /_____/   U

#      __
# o-''|\_____/)
#  \_/|_)     )
#     \  __  /
#     (_/ (_/ 

def printWatchDogWelcome():
    c=2
    dog0="                  ^_"
    print_colored_rnd1(dog0,c)
    dog1="   / \\\\__     o-''|\\_____/)"
    print_colored_rnd1(dog1,c)
    dog2="  (    @\\___    \\_/|_)     )"
    print_colored_rnd1(dog2,c)
    dog3="  /         O      \\  __  /"
    print_colored_rnd1(dog3,c)
    dog4=" /   (_____/       (_/ (_/"
    print_colored_rnd1(dog4,c)
    dog5="/_____/   U    "
    print_colored_rnd1(dog5,c)

################################################################ END OF def abcs():
    


# colors 
colorGreen ="32"
colorBlue  ="34"
colorCyan  ="36"
colorOrange  ="33"
colorRed  ="31"
colorMagenta  ="35"
colorYellow  ="33"
colorDarkGreen  ="32;2"
colorDarkRed  ="31;2"
colorPurple  ="35;2"
colorBrown  ="33;2"
colorWhite  ="97"
colorLimeGreen  ="92"
colorAqua  ="96"
colorGray  ="90"

colorArray = [ colorRed, colorBlue, colorGreen, colorOrange, colorCyan, colorAqua, colorYellow ,colorPurple, colorMagenta,colorBrown ]
colorArrayLen = len(colorArray)



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
printWatchDogWelcome()

print("\n\nThis module will call the Brokerage APIs directly.\nPlanned: Robinhood API, Fidelity API, Schwab/TD API, E*Trade API")

print("\n\n\nAttempting Robinhood Access...")
# pwd0="C"+pwd0+"2011"
pwd0="c"+pwd0+"2011"
simLIVE=1       # 0 = off, 1 = live
EnterPostionsRobinhood( "roguequant1@gmail.com", pwd0 , simLIVE )





#######################################################################
####################################################################### LOOP
#######################################################################
#######################################################################
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





##### base class order() fn
# @login_required
# def order(symbol, quantity, side, limitPrice=None, stopPrice=None, account_number=None, timeInForce='gtc', extendedHours=False, jsonify=True):
#     """A generic order function.

#     :param symbol: The stock ticker of the stock to sell.
#     :type symbol: str
#     :param quantity: The number of stocks to sell.
#     :type quantity: int
#     :param side: Either 'buy' or 'sell'
#     :type side: str
#     :param limitPrice: The price to trigger the market order.
#     :type limitPrice: float
#     :param stopPrice: The price to trigger the limit or market order.
#     :type stopPrice: float
#     :param account_number: the robinhood account number.
#     :type account_number: Optional[str]
#     :param timeInForce: Changes how long the order will be in effect for. 'gtc' = good until cancelled. \
#     'gfd' = good for the day.
#     :type timeInForce: str
#     :param extendedHours: Premium users only. Allows trading during extended hours. Should be true or false.
#     :type extendedHours: Optional[str]
#     :param jsonify: If set to False, function will return the request object which contains status code and headers.
#     :type jsonify: Optional[str]
#     :returns: Dictionary that contains information regarding the purchase or selling of stocks, \
#     such as the order id, the state of order (queued, confired, filled, failed, canceled, etc.), \
#     the price, and the quantity.

#     """ 
#     try:
#         symbol = symbol.upper().strip()
#     except AttributeError as message:
#         print(message, file=get_output())
#         return None

#     orderType = "market"
#     trigger = "immediate"

#     if side == "buy":
#         priceType = "ask_price"
#     else:
#         priceType = "bid_price"

#     if limitPrice and stopPrice:
#         price = round_price(limitPrice)
#         stopPrice = round_price(stopPrice)
#         orderType = "limit"
#         trigger = "stop"
#     elif limitPrice:
#         price = round_price(limitPrice)
#         orderType = "limit"
#     elif stopPrice:
#         stopPrice = round_price(stopPrice)
#         if side == "buy":
#             price = stopPrice
#         else:
#             price = None
#         trigger = "stop"
#     else:
#         price = round_price(next(iter(get_latest_price(symbol, priceType, extendedHours)), 0.00))
#     payload = {
#         'account': load_account_profile(account_number=account_number, info='url'),
#         'instrument': get_instruments_by_symbols(symbol, info='url')[0],
#         'symbol': symbol,
#         'price': price,
#         'quantity': quantity,
#         'ref_id': str(uuid4()),
#         'type': orderType,
#         'stop_price': stopPrice,
#         'time_in_force': timeInForce,
#         'trigger': trigger,
#         'side': side,
#         'extended_hours': extendedHours
#     }
#     # BEGIN PATCH FOR NEW ROBINHOOD BUY FORM (GuitarGuyChrisB 5/26/2023)
#     if side == "buy":
#         payload['order_form_version'] = "2"
#         payload['preset_percent_limit'] = "0.05"
#     # END PATCH FOR NEW ROBINHOOD BUY FORM (GuitarGuyChrisB 5/26/2023)

#     url = orders_url()


#     data = request_post(url, payload, jsonify_data=jsonify)

#     return(data)
#
#
#
#
# #
# When you call

# r.order_buy_limit

# which has a signature of:

# order_buy_limit(symbol, quantity, limitPrice, account_number=None, timeInForce='gtc', extendedHours=False, jsonify=True)

# That method calls

# order(symbol, quantity, "buy", account_number, limitPrice, None, timeInForce, extendedHours, jsonify)

# When your parameters are passed in, the resulting call is

# order("BBCP", 1, "buy", "XXXXXX", "8.42000000", None, 'gfd', True, True)

# The original signature for the order method is

# order(symbol, quantity, side, limitPrice=None, stopPrice=None, account_number=None, timeInForce='gtc', extendedHours=False, jsonify=True, market_hours='regular_hours')

# When your parameters are passed in according to position, you get:

# order(symbol="BBCP", quantity=1, side="buy", limitPrice="XXXXXX", stopPrice="8.42000000", account_number=None, timeInForce='gfd', extendedHours=True, jsonify=True, market_hours='regular_hours')

# The order method calls

# round_price(limitPrice)

# which in your case is

# round_price("XXXXXX")

# ...

# @justindavies I think that's what's causing your error. In order to avoid it, I would probably just use the order method and explicitly pass in your parameters while defining side = 'buy', stopPrice=None.

# ...
# @jmfernandes , would it be unreasonable to refactor the methods to call the order method using keyword arguments instead of positional arguments?

# Thanks, I enjoy your repo and would love to help out however possible :) !
