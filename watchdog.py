# watchdog.py   by John Botti Copyright (c) 2024 by Algo Investor Inc.
#
versionStr =                    "3.74"

import time
import datetime
import pytz

# Get current date in New York - we need EDT for markets...
new_york_timezone = pytz.timezone('America/New_York')
current_date_ny = datetime.datetime.now(new_york_timezone).date()

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



def timeNow(strchar):   # ="" or ":"
    if(strchar!="" and strchar!=":" and strchar!="_" and strchar!="-" and strchar!="." ):
        strchar=":" 

    # Set the time zone to New York
    new_york_timezone = pytz.timezone('America/New_York')
    
    # Get the current time in New York
    ny_time = datetime.datetime.now(new_york_timezone)
    
    # Format the time as HH:MM
    formatstr1='%H'
    formatstr2='%M'
    fstr=formatstr1+ strchar +formatstr2
    # formatted_time = ny_time.strftime('%H:%M')
    formatted_time = ny_time.strftime(fstr)  #('%H:%M')
    return formatted_time


def leftRightStr(input_str, LR_str, num_chars):
    if LR_str == "right":
        return input_str[-num_chars:]
    elif LR_str == "left":
        return input_str[:num_chars]
    else:
        return "Invalid LR_str, please use 'left' or 'right'."


# ie  tradestaTimeStr = "1130" - "0930" = 120
def getMinutesFromDayStart(tradestaTimeStr0):
    lstr = leftRightStr(tradestaTimeStr0, "left", 2)
    hrs0 = int(lstr)
    rstr = leftRightStr(tradestaTimeStr0, "right", 2)
    mins0= int(rstr)
    mins = ( hrs0 * 60 ) + mins0
    return mins

def getMinutesFromOpen(tradestaTimeStr):
    strmkt="0930"
    minsMktStart = getMinutesFromDayStart(strmkt)
    minsToCompare= getMinutesFromDayStart(tradestaTimeStr)
    return minsToCompare - minsMktStart

def getMinutesFromClose(tradestaTimeStr):
    strmkt="1600"
    minsMktClose = getMinutesFromDayStart(strmkt)
    minsToCompare= getMinutesFromDayStart(tradestaTimeStr)
    return minsMktClose - minsToCompare


def printTodaysDate():
    dstr7 = ( f"{current_date_ny.strftime('%Y-%m-%d')}" )
    print("Today's date in New York:",dstr7 )
    return dstr7

def print_colored(text, color_code): 
    print(f"\033[{color_code}m{text}\033[0m") 

def print_colored_rnd1(text, r):
    # r = rand(colorArrayLen)
    print_colored(text, colorArray[r])

def printWatchDogWelcome():
    print("\n $$$ Welcome to the Algo Investor's 'Watch Dog' - the Automated Porfolio Manager: APM ver",versionStr)
    print("\n ")  
    dstr7a= printTodaysDate()
    print("\n ")  
    print("\n  dstr7a...")  

    c=2
    dog0="                -^_"
    print_colored_rnd1(dog0,c)
    dog1="   / \\\\__     o''|\\_____/)"
    print_colored_rnd1(dog1,c)
    dog2="  (    @\\___    \\_/|_)     )"
    print_colored_rnd1(dog2,c)
    dog3="  /         O      \\  __  /"
    print_colored_rnd1(dog3,c)
    dog4=" /   (_____/       (_/ (_/"
    print_colored_rnd1(dog4,c)
    dog5="/_____/   U    "
    print_colored_rnd1(dog5,c)


printWatchDogWelcome()

print("\n\n] *** Importing python modules; this may take a moment on the first run...")

import requests
import csv
# import time
# import datetime
# import pytz
import shutil
import sys
import random

import os

import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
# from datetime import datetime 
print("]  Still importing Python modules...")

import json
import robin_stocks as rs
import webbrowser

#custom JB class
from portfolio import Portfolio


print("]  ALL Python modules imported!")

msg00=0

#   open .ini file
#
#
# RULES: dont trade on FED Announc day, M T trad
def openUrl(urlstr):
    webbrowser.open(urlstr)

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


def removeCharsFromLeftRight(str0,leftRightStr, numchars):
    modified_string="nil"
    if(leftRightStr=='left'):
        modified_string = str0[numchars:]
    if(leftRightStr=='right'):
        numchars = numchars * -1
        modified_string = str0[:numchars]
        # modified_string = original_string[:-5]
    return modified_string

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
    qtyMAX=0
    acct0='497177477'

    if(qty==0):
        print("] qty=0, exiting; NO ORDER WAS PLACED")
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

            # result0 =  rs.robinhood.order_sell_market(symbol0, qty, price0, 'gfd',  False, True  ) 
            result0 =  rs.robinhood.order_sell_market(symbol0, qty, price0, 'gtc',  True, True ) 

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



def removeChar(input_str, char_to_remove):
    """
    Remove specified characters from the input string.

    Parameters:
    - input_str (str): The input string.
    - char_to_remove (str): The characters to be removed.

    Returns:
    - str: The result string after removing specified characters.

    Example:
    >>> removeChar("2024-02-09", "-")
    '20240209'
    """
    result_str = input_str.replace(char_to_remove, "")
    return result_str

# https://robin-stocks.readthedocs.io/en/latest/_modules/robin_stocks/robinhood/options.html
# robinhood examples

def padStringLeft(input_str, char_str, max_chars):
    """
    Pad the input string with characters to the left.

    Parameters:
    - input_str (str): The input string.
    - char_str (str): The characters to pad with.
    - max_chars (int): The maximum number of characters after padding.

    Returns:
    - str: The result string after padding to the left.

    Example:
    >>> padStringLeft("175", "0", 10)
    '0000000175'
    """
    padding_size = max(0, max_chars - len(input_str))
    padded_str = char_str * padding_size + input_str
    return padded_str

# # Example usage:
# input_string = "175"
# char_to_pad = "0"
# max_characters = 10
# result_string = padStringLeft(input_string, char_to_pad, max_characters)
# print(result_string)




def sendOptionLimitOrder(symbol0,qty,price0,expdate,strike0,putcall,buysell):
    sendOptionOrder( symbol0,qty,price0,expdate,strike0,putcall,buysell ,"limit" )


def sendOptionOrder(symbol0,qty,price0,expdate,strike0,putcall,buysell,mktOrLimitStr):  #   mktOrLimitStr ="mkt" or "limit"
    #  Buy 5 $150 May 1st, 2020 SPY puts if the price per contract is $1.00. Good until cancelled.
    # robin_stocks.order_buy_option_limit('open','debit',1.00,'SPY',5,'2020-05-01',150,'put','gtc')
    # dur='gtc'
    if(qty==0):
        print(" Zero qty ==0 , exiting send0ption0rder()")
        return
    acct0='497177477'
    if(mktOrLimitStr=="limit"):
        if(buysell=="BUY"):
            rs.robinhood.order_buy_option_limit('open','debit',price0,symbol0, qty, expdate,strike0,putcall,acct0)
        if(buysell=="SELL"):
            rs.robinhood.order_sell_option_limit('close','credit',price0,symbol0, qty, expdate,strike0,putcall,acct0)
    if(mktOrLimitStr=="mkt"):
        print("Option Market Order Detected, returning did nothing.")
        print("     1st  -  GET BID/ASK FOR ABC symbol's Option at strike for expdate  ")
        print("     2nd  -  IF BUY,  mktPrice = ASK FOR ABC symbol's Option at strike for expdate  ")
        print("     3rd  -  IF SELL, mktPrice = BID FOR ABC symbol's Option at strike for expdate  ")
        print("     4th  -  Execute order as LIMIT order with slippage  slipUSD/slipPct    ")
        print("\n")

def GetHoldingsButLoginFirst(str, username0, pwd0): 

    days0 = 5
    secsInADay = 86400
    totalseconds = secsInADay * days0

    rs.robinhood.authentication.login(username=username0, password=pwd0, expiresIn=totalseconds, scope='internal', by_sms=True, store_session=True, mfa_code=None, pickle_name='')

    print("] Your Holdings ",str," :")
    my_items =  rs.robinhood.build_holdings()
    h=0;
    for key,value in my_items.items():
    # for key,value in my_items():
        print("symbol=",key, "  ",h," )")
        print(key,value)
        h+=1
    return my_items

def FindOptions(symbol, expiration_date, strike0, option_type, username0, pwd0):
    days0 = 5
    secsInADay = 86400
    totalseconds = secsInADay * days0
    rs.robinhood.authentication.login(username=username0, password=pwd0, expiresIn=totalseconds, scope='internal', by_sms=True, store_session=True, mfa_code=None, pickle_name='')

    result0 = rs.robinhood.find_tradable_options( symbol, expiration_date, strike0, option_type )  
    return result0


def GetHoldings(str):
    print("] Your Holdings ",str," :")
    my_items =  rs.robinhood.build_holdings()
    h=0;
    for key,value in my_items.items():
    # for key,value in my_items():
        print("symbol=",key, "  ", h, " ")
        # print("symbol=",h," )")
        print(key,value)
        h+=1
    return my_items



# def get_chains(symbol, info=None):
#     """Returns the chain information of an option.

#     :param symbol: The ticker of the stock.
#     :type symbol: str
#     :param info: Will filter the results to get a specific value.
#     :type info: Optional[str]
#     :returns: Returns a dictionary of key/value pairs for the option. If info parameter is provided, \
#     a list of strings is returned where the strings are the value of the key that matches info.

#     """
#     try:
#         symbol = symbol.upper().strip()
#     except AttributeError as message:
#         print(message, file=get_output())
#         return None

#     url = chains_url(symbol)
#     data = request_get(url)

#     return(filter_data(data, info))


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
    getOptionsPOSS=1
    
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


    # print("] User: CREATOR Logged In.")
    # print("] Attempting Mock Portfolio Object Operations: BEFORE...")

    # portfolio1 = Portfolio("JB", "roguequant1@gmail.com", "354" "Crixus2011", "Robinhood", "E3F266FC2A10034D")

    # portfolio1.initialize()

    # portfolio1.authenticate()

    # portfolio1.getPositions()

    # portfolio1.print()

    # print("] Attempted Mock Portfolio Object Operations:   AFTER...")


    # Get portfolio information
    # rs.robinhood.profiles.load_account_profile(account_number=None, info=None)
    prof = rs.robinhood.profiles.load_account_profile(account_number=None, info=None)
    if(msg00==1):
        printJson(prof, "Profile")

    poss = rs.robinhood.get_open_stock_positions()
    # poss= rs.robinhood.options.get_open_positions(info=None)
    printJson(poss, "********* Open Stock positions:")
    # if(msg00==1):
    #     printJson(poss, "Stock positions")

    # possOptions = rs.robinhood.options.get_all_option_positions()
    # printJson(possOptions, "********* Open OPTIONS positions:")


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

        buySell0    = "SELL"
        
        sym0        =   "amzn"

        price0      =  '165.75'

        sendStockOrder( buySell0, qty0, sym0, assettype0  , "market", price0)
        



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
        # se ndOptionLimitOrder(sym0,qty0,price0,expdate,strike0,putcall, buySell0)

        ###################################### 
        qty0        =   0
        sym0        =   "AAPL"
        putcall     =   'call'
        price0      =  6
        expdate     =   "2024-02-09"
        strike0     =   195
        buySell0    =   "BUY"
        # buySell0    =   "SELL"

        # qty0        =   1
        # sym0        =   "amzn"
        # putcall     =   'call'
        # price0      =   11.0
        # expdate     =   "2024-02-09"
        # strike0     =   150
        # # buySell0  =   "BUY"
        # buySell0    =   "SELL"

        qty0        =   0
        print(".robinhood *SENDING Order" , sym0, qty0, price0, expdate, strike0, putcall, buySell0 )
        sendOptionLimitOrder( sym0,qty0,price0,expdate,strike0,putcall, buySell0 )


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
        # sendOptionLimitOrder(sym0,qty0,price0,expdate,strike0,putcall, buySell0)





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
        my_Options_items = rs.robinhood.options.get_open_option_positions(account_number=None, info=None)
        printJson(my_Options_items, "Option OPEN Orders")



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

# def print_colored(text, color_code): 
#     print(f"\033[{color_code}m{text}\033[0m") 

def print_colored_rnd(text):
    r = rand(colorArrayLen)
    print_colored(text, colorArray[r])

# def print_colored_rnd1(text, r):
#     # r = rand(colorArrayLen)
#     print_colored(text, colorArray[r])
 
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

# def printWatchDogWelcome():
#     print("\n $$$ Welcome to the Algo Investor's 'Watch Dog' - the Automated Porfolio Manager (APM) $$$")
#     print("\n ")  

#     c=2
#     dog0="                  ^_"
#     print_colored_rnd1(dog0,c)
#     dog1="   / \\\\__     o-''|\\_____/)"
#     print_colored_rnd1(dog1,c)
#     dog2="  (    @\\___    \\_/|_)     )"
#     print_colored_rnd1(dog2,c)
#     dog3="  /         O      \\  __  /"
#     print_colored_rnd1(dog3,c)
#     dog4=" /   (_____/       (_/ (_/"
#     print_colored_rnd1(dog4,c)
#     dog5="/_____/   U    "
#     print_colored_rnd1(dog5,c)

def openUrls(my_items0):
    # algoinvestorurl="https://itraderpro.co/candlesticks.php?sym="+symbol2str+"&uname=Gianni&email=johnbotti9000@gmail.com&key=8a2b18a0"
    algoinvestorurl0="https://itraderpro.co/candlesticks.php?sym="
    algoinvestorurl2="&uname=Guesti&email=algoinvestorr@gmail.com&key=19112b1b54"

    h=0;
    for key,value in my_items0.items():
        print("symbol=",key, "  ", h, " ")
        symbol2str=str(key)
        urlstr0 = algoinvestorurl0 +  symbol2str + algoinvestorurl2
        openUrl(urlstr0)
        h+=1
    


################################################################ END OF def FUNCTIONS():
    

########################################################################### 
########################################################################### 
########################################################################### 
##################################################### MAIN CODE ###########
##################################################### MAIN CODE ###########
##################################################### MAIN CODE ###########
########################################################################### 
########################################################################### 
###########################################################################

 


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



# print("\n $$$ Welcome to the Algo Investor's 'Watch Dog' - the Automated Porfolio Manager (APM) $$$")
# printWatchDogWelcome()

print("\n\nThis module will call the Brokerage APIs directly.")
print("\nPlanned: Robinhood API, Fidelity API, Schwab/TD API, E*Trade API, Webull and Tasty Trade.")


##################################################### CLASS STRUCTURE TESTS ###########
#####
#####  Start integrating Class structure for tested functions' migration to Portfolio.cancelOrder() or .sendStockOrder()

print("] Attempting Mock Portfolio Object Operations: BEFORE...")
print("] User: CREATOR Logged In. porfolio.initialize() + beginning...")
portfolio1 = Portfolio("JB",   "roguequant1@gmail.com", "354" ,"Crixus2011", "Robinhood", "E3F266FC2A10034D")
portfolio1.initialize()
portfolio1.authenticate()
portfolio1.getPositions()
portfolio1.print()
print("] Attempted & Completed Mock Portfolio Object Operations:   AFTER...")

#########

hrsmins="1145"
mins9 = getMinutesFromOpen( hrsmins )
print(hrsmins, " mins fromOpen = " , mins9)

hrsmins="1330"
mins9 = getMinutesFromOpen( hrsmins )
print(hrsmins, " mins fromOpen = " , mins9)

hrsmins="0945"
mins9 = getMinutesFromOpen( hrsmins )
print(hrsmins, " mins fromOpen = " , mins9)

hrsmins="1015"
mins9 = getMinutesFromOpen( hrsmins )
print(hrsmins, " mins fromOpen = " , mins9)


hrsmins="1245"
mins9 = getMinutesFromClose( hrsmins )
print(hrsmins, " mins fromClose = " , mins9)

hrsmins="1545"
mins9 = getMinutesFromClose( hrsmins )
print(hrsmins, " mins fromClose = " , mins9)

hrsmins="0935"
mins9 = getMinutesFromClose( hrsmins )
print(hrsmins, " mins fromClose = " , mins9)

gtstr = timeNow("")
print(gtstr)
hrsmins=gtstr #"0935"
mins9 = getMinutesFromClose( hrsmins )
print("TIME IN NYC:",hrsmins, " mins fromClose = " , mins9)

gtstr = timeNow(":")
print(gtstr)
gtstr = timeNow("=")
print(gtstr)

######### 
##################################################### CLASS STRUCTURE TESTS END ###########





print("\n\n\nAttempting Robinhood Access...")
pwd0="c"+pwd0+"2011"
simLIVE=1       # 0 = off, 1 = live
EnterPostionsRobinhood( "roguequant1@gmail.com", pwd0 , simLIVE )





# ] **************************************** optionSymbol =  AAPL_240209c175
# option_chain= [{'chain_id': '7dd906e5-7d4b-4161-a3fe-2c3b62038482', 
# 'chain_symbol': 'AAPL', 'created_at': '2023-12-28T02:05:38.841588Z', 
# 'expiration_date': '2024-02-09', 'id': 'c54349d7-0ef3-4874-ab27-6933f2c2b114', 
# 'issue_date': '2023-12-28', 'min_ticks': {'above_tick': '0.05', 'below_tick': '0.01', 'cutoff_price': '3.00'}, 
# 'rhs_tradability': 'tradable', 'state': 'active', 'strike_price': '175.0000', 'tradability': 'tradable', 
# 'type': 'call', 'updated_at': '2023-12-28T02:05:38.841591Z', 'url': 'https://api.robinhood.com/options/instruments/c54349d7-0ef3-4874-ab27-6933f2c2b114/', 
# 'sellout_datetime': '2024-02-09T20:30:00+00:00', 'long_strategy_code': 'c54349d7-0ef3-4874-ab27-6933f2c2b114_L1', 
# 'short_strategy_code': 'c54349d7-0ef3-4874-ab27-6933f2c2b114_S1'}]

# Option details
findoptions=False
symbol = "AAPL"
strike0 = 175
expiration_date = "2024-02-09"
option_type = "put"   # "call"
aPCstr=leftRightStr(option_type.upper(),"left",1)
if(findoptions):
    option_chain = FindOptions( symbol, expiration_date, strike0, option_type, "roguequant1@gmail.com", pwd0 )  
    aPCstr =option_type[0]

char_to_remove = "-"
result_string = removeChar(expiration_date, char_to_remove)
result_string1= removeCharsFromLeftRight(result_string,"left", 2)
result_strikePadded = padStringLeft(str(strike0), "0", 5)
optionsymbol=symbol+"  "+result_string1+ aPCstr.upper() + result_strikePadded
print("] **************************************** optionSymbol = " , optionsymbol)

# this Works!!
if(findoptions):
    print("option_chain=",option_chain)
# Get option instrument data

bid_price = 0.0 
ask_price = 0.0  

if(findoptions):
    # gg = rs.robinhood.options.find_options_by_expiration(['aapl','amzn','msft'],expdate,putcall)
    option_instruments = rs.robinhood.options.find_options_by_expiration(
        symbol,
        expirationDate=expiration_date,
        optionType=option_type
        # strikePrice=strike0
    )
    # print("] option_instrument==",option_instruments)
    option_instrument = option_instruments[0]           # Extract the first option instrument

    bid_price = float(option_instrument['bid_price'])
    ask_price = float(option_instrument['ask_price'])




# Print bid and ask prices
print(f"Bid Price: {bid_price}")
print(f"Ask Price: {ask_price}")
# Logout from Robinhood
# rs.logout()
######################################################





#######################################################################
####################################################################### LOOP
#######################################################################
#######################################################################
# Starting Balance
#
#
my_stock_items = GetHoldingsButLoginFirst("BEFORE TRADE", "roguequant1@gmail.com", pwd0)

startingBalance_default = float(100000.0)
print("\nEnter Starting Balance (", startingBalance_default, "  [0=exit]):")
startingBalance = input()
if startingBalance == "-":
    openUrls(my_stock_items)
    exit("exiting...-")
if startingBalance == "0":
    openUrls(my_stock_items)
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


gtstr = timeNow("")
print(gtstr)
hrsmins=gtstr #"0935"
mins9 = getMinutesFromClose( hrsmins )
print("TIME IN NYC:",hrsmins, " mins fromClose = " , mins9)


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

print("]  TASK*** Get INI FILE ...")

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

    print("] TASK*** BrokerageRequest[ 'RobinhoodAPI', 'GetPositions' ...")
    # CheckPositions("Gianni", "12345354911")


    print("] TASK***   .../Gettrades.php  :  RETURNING:  'buy' or 'sell' signals...")

    print("] TASK***  IF INI FILE HAS CHANGED IN FILESIZE, Get INI FILE ...")

    print("] TASK***  LOOP THRU ALL TRADES FROM GETTRADES ")  
    print("] TASK***        IF there IS a buy/sell signals within Epsilon minutes from signal'sMinutesFromOpen? ")  
    print("] TASK*** ")  
    print("] TASK***          YES,  INI-interpret buy/sell signals into trade and ")
    print("] TASK***                SUBMIT TRADE...")
    print("] TASK*** ")  
    print("] TASK***        LOOP THRU ALL INI CSV CMD_   ")  
    print("] TASK***          IF CMD_ VALID FOUND THEN ")
    print("] TASK***                SUBMIT TRADE...")


    current_date_time_ny = datetime.datetime.now(new_york_timezone)
    dtstr= (f"{current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
    print("\n======================>Today's Date and Time in NYC (EDT) is:",dtstr)
    
    
    gtstr = timeNow("")
    # print(gtstr)
    hrsmins=gtstr #"0935"
    mins9 = getMinutesFromClose( hrsmins )
    print("TIME NOW IN NYC is ",hrsmins, ", or mins fromClose = " , mins9)

#### End of Loop
    # Decrement keepLooping to eventually exit the loop
    keepLooping -= 1  # You might have a condition to break the loop based on a certain condition
    print("\n] Attempting to Loop",keepLooping," times, with a" , timeDelay, " second delay between reading the local file, for a \nMax # minutes of:", (keepLooping * (timeDelay+0 )/60 )," and Max # HOURS=", (keepLooping * (timeDelay+0 )/60 )/60  ,"\n\n" )

    #END OF THE LOOP

###################### ENDING LOOP **********************************************

print("\n] Exiting LOOP.\n")



