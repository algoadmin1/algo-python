# usage:
#   from portfolio import Portfolio
#

# import requests
# import csv
# import time
# import datetime
# import pytz
# import shutil
# import sys

# import os

# import yfinance as yf
# import pandas as pd
# import matplotlib.pyplot as plt
# from datetime import datetime 
# import robin_stocks.robinhood as r

import robin_stocks as rs

class Portfolio:
    def __init__( self, name, emailstr, accountnumber, pwd, broker, apikey ):
        self.name           = name
        self.emailstr       = emailstr
        self.accountnumber  = accountnumber
        self.pwd            = pwd
        self.broker         = broker
        self.apikey         = apikey

    def initialize(self):
        print("Portfolio.initialize() called [ did nothing | stub ]...")

    def print(self):
        print("Portfolio.print() called...")
        print("    name, #, pwd, broker, apikey==" )
        print( self.name, self.emailstr, self.accountnumber, self.pwd, self.broker, self.apikey )




    # robin_stocks Docs:  https://robin-stocks.readthedocs.io/en/latest/robinhood.html#logging-in-and-out
    def CheckPostionsRobinhood( username0, pwd0 ):
        print("CheckPostionsRobinhood() Positions for ", username0)

        # Log in to Robinhood (replace 'username' and 'password' with your credentials)
 #       rs.robinhood.authentication.login(username=username0, password='Crixus2011', expiresIn=86400, scope='internal', by_sms=True, store_session=True, mfa_code=None, pickle_name='')

        # Get portfolio information
   #     rs.robinhood.profiles.load_account_profile(account_number=None, info=None)

        # rs.login(username=username0, password=pwd0)
        # portfolio = rs.account.get_portfolio()
        # Log out from Robinhood
  #      rs.robinhood.authentication.logout()    
        # print(portfolio)



    def authenticate(self):
        print("Portfolio.authenticate() called...")
        print("returning for now...")
        return
    
        # login = rs.login(self.name ,self.pwd )
        days0 = 3
        secsInADay = 86400
        totalseconds = secsInADay * days0
        login = rs.robinhood.authentication.login(username=self.name, password=self.pwd, expiresIn=totalseconds, scope='internal', by_sms=True, store_session=True, mfa_code=None, pickle_name='pickle_name')

        # Get portfolio information
        prof = rs.robinhood.profiles.load_account_profile(account_number=None, info=None)
        print("prof=",prof)
        # rs.login(username=username0, password=pwd0)
        # portfolio = rs.account.get_portfolio()
        # Log out from Robinhood
        rs.robinhood.authentication.logout()    
        # print(portfolio)



    def getHoldings(self):
        print("Portfolio.getAssets() called...")
        # my_stocks = robin_stocks.build_holdings()
        my_stocks =  rs.build_holdings()
        for key,value in my_stocks.items():
            print(key,value)
        return my_stocks


    def getPositions(self):
        return
        positions_data =  rs.get_current_positions()
 ## Note: This for loop adds the stock ticker to every order, since Robinhood
  ## does not provide that information in the stock orders.
  ## This process is very slow since it is making a GET request for each order.
        for item in positions_data:
            item['symbol'] = robin_stocks.get_symbol_by_url(item['instrument'])


    def getAllOrders(self):
        # let's say that I am running code from C:/Users/josh/documents/
        rs.export_completed_stock_orders(".") # saves at C:/Users/josh/documents/stock_orders_Jun-28-2020.csv
        # rs.export_completed_option_orders("../", "toplevel") # save at C:/Users/josh/toplevel.csv


    def getOpenPositions(self, stockOrOptions):
        if(stockOrOptions=="stock"):
            ## ???? cal api
            rs.robinhood.options.get_open_stock_positions(info=None)
        # Collapses all open option positions for a stock into a single dictionary.
        # Parameters:	info (Optional[str]) – Will filter the results to get a specific value.
        # Returns:	Returns a list of dictionaries of key/value pairs for each order. If info parameter is provided, a list of strings is returned where the strings are the value of the key that matches info.
        if(stockOrOptions=="options"):
            rs.robinhood.options.get_open_option_positions(account_number=None, info=None)
            # Returns all open option positions for the account.

            # Parameters:	
            # acccount_number (Optional[str]) – the robinhood account number.
            # info (Optional[str]) – Will filter the results to get a specific value.
            # Returns:	
            # Returns a list of dictionaries of key/value pairs for each option. If info parameter is provided, a list of strings is returned where the strings are the value of the key that matches info.
                        



            #robin_stocks.robinhood.options.get_aggregate_positions(info=None) 
            # Collapses all option orders for a stock into a single dictionary.
            # Parameters:	info (Optional[str]) – Will filter the results to get a specific value.
            # Returns:	Returns a list of dictionaries of key/value pairs for each order. If info parameter is provided, a list of strings is returned where the strings are the value of the key that matches info.


######################## TRADING STOCK
            

#     def tradeStockMarket(self, buySell, symbol, numshares):
#         print("Portfolio.sendTrade() called...")
#     #   robin_stocks.order_buy_market('AAPL',10)
#         if(buySell=="BUY"):
#             robin_stocks.order_buy_market(symbol, numshares)
#         else if(buySell=="SELL"):
#             robin_stocks.order_sell_market(symbol, numshares)
#             # check 1st with APM if there are numshares stock in portfolio

# # dur = gtc, ioc, opg, gfd
#     def tradeStockLimit(self, buySell, symbol, numshares, limitPrice, dur):
#         print("Portfolio.sendTrade() called...")
#     #   robin_stocks.order_buy_market('AAPL',10)
#         if(buySell=="BUY"):
#             robin_stocks.order_buy_limit(symbol, numshares,limitPrice)
#         else if(buySell=="SELL"):
#             robin_stocks.order_sell_limit(symbol, numshares,limitPrice)
#             # robin_stocks.order_sell_limit('TSLA',sellQuantity,200.00)
#             # check 1st with APM if there are numshares stock in portfolio

#     def getStockQuote(self, symbol):
#         url="https://api.robinhood.com/instruments/"+symbol
#         robin_stocks.robinhood.stocks.get_instrument_by_url(url, info=None) 
#         robin_stocks.robinhood.stocks.get_instruments_by_symbols( symbols, info=None)
#         # robin_stocks.robinhood.stocks.get_instruments_by_symbols(inputSymbols, info=None)
#         # Takes a single url for the stock. Should be located at 
#         # https://api.robinhood.com/instruments/<id> where <id> is the id of the stock.


######################## TRADING OPTIONS

    # def tradeOptionsLimit(self, openClose, symbol, numcontracts, limitPrice, expdate, strike, callPut, dur):
    #     # robin_stocks.order_buy_option_limit('open','debit',1.00,'SPY',5,'2020-05-01',150,'put','gtc')
    #     if(openClose=="OPEN"):
    #         robin_stocks.order_buy_option_limit('open','debit',limitPrice,symbol,numcontracts,expdate,strike,callPut,dur)
    #     else if(openClose=="CLOSE"):
    #         robin_stocks.order_buy_option_limit('close','debit',limitPrice,symbol,numcontracts,expdate,strike,callPut,dur)
    #         robin_stocks.order_sell_option_limit('close','debit',limitPrice,symbol,numcontracts,expdate,strike,callPut,dur)
    #         # check 1st with APM if there are numshares stock in portfolio


    # def findOptions(self):
    #     # Manually clicking on stocks and viewing available options can be a chore. Especially, when you also want to view additional information like the greeks. 
    #     # Robin Stocks gives you the ability to view all the options for a specific expiration date by typing
    #     optionData =  rs.find_options_for_list_of_stocks_by_expiration_date(['fb','aapl','tsla','nflx'],expirationDate='2018-11-16',optionType='call')
    #     for item in optionData:
    #         print(' price -',item['strike_price'],' exp - ',item['expiration_date'],' symbol - ', item['chain_symbol'],' delta - ',item['delta'],' theta - ',item['theta'])








################################OPTHER
            #
# robin_stocks.robinhood.stocks.get_latest_price(inputSymbols, priceType=None, includeExtendedHours=True)[source]
# Takes any number of stock tickers and returns the latest price of each one as a string.

# Parameters:	
# inputSymbols (str or list) – May be a single stock ticker or a list of stock tickers.
# priceType (str) – Can either be ‘ask_price’ or ‘bid_price’. If this parameter is set, then includeExtendedHours is ignored.
# includeExtendedHours (bool) – Leave as True if you want to get extendedhours price if available. False if you only want regular hours price, even after hours.
# Returns:	
# [list] A list of prices as strings.

# robin_stocks.robinhood.stocks.get_name_by_symbol[source]
# Returns the name of a stock from the stock ticker.

# Parameters:	symbol (str) – The ticker of the stock as a string.
# Returns:	[str] Returns the simple name of the stock. If the simple name does not exist then returns the full name.
# robin_stocks.robinhood.stocks.get_name_by_url[source]
# Returns the name of a stock from the instrument url. Should be located at https://api.robinhood.com/instruments/<id> where <id> is the id of the stock.

# Parameters:	url (str) – The url of the stock as a string.
# Returns:	[str] Returns the simple name of the stock. If the simple name does not exist then returns the full name.
# robin_stocks.robinhood.stocks.get_news(symbol, info=None)[source]
# Returns news stories for a stock.

# Parameters:	
# symbol (str) – The stock ticker.
# info (Optional[str]) – Will filter the results to get a specific value.
# Returns:	
# [list] Returns a list of dictionaries. If info parameter is provided, a list of strings is returned where the strings are the value of the key that matches info.

# Dictionary Keys:
 	
# api_source
# author
# num_clicks
# preview_image_url
# published_at
# relay_url
# source
# summary
# title
# updated_at
# url
# uuid
# related_instruments
# preview_text
# currency_id


# robin_stocks.robinhood.stocks.get_stock_historicals(inputSymbols, interval='hour', span='week', bounds='regular', info=None)[source]
# Represents the historicl data for a stock.

# Parameters:	
# inputSymbols (str or list) – May be a single stock ticker or a list of stock tickers.
# interval (Optional[str]) – Interval to retrieve data for. Values are ‘5minute’, ‘10minute’, ‘hour’, ‘day’, ‘week’. Default is ‘hour’.
# span (Optional[str]) – Sets the range of the data to be either ‘day’, ‘week’, ‘month’, ‘3month’, ‘year’, or ‘5year’. Default is ‘week’.
# bounds (Optional[str]) – Represents if graph will include extended trading hours or just regular trading hours. Values are ‘extended’, ‘trading’, or ‘regular’. Default is ‘regular’
# info (Optional[str]) – Will filter the results to have a list of the values that correspond to key that matches info.
# Returns:	
# [list] Returns a list of dictionaries where each dictionary is for a different time. If multiple stocks are provided the historical data is listed one after another.

# Dictionary Keys:
 	
# begins_at
# open_price
# close_price
# high_price
# low_price
# volume
# session
# interpolated
# symbol

# robin_stocks.robinhood.options.find_options_by_expiration_and_strike(inputSymbols, expirationDate, strikePrice, optionType=None, info=None)[source]
# Returns a list of all the option orders that match the seach parameters

# Parameters:	
# inputSymbols (str) – The ticker of either a single stock or a list of stocks.
# expirationDate (str) – Represents the expiration date in the format YYYY-MM-DD.
# strikePrice (str) – Represents the strike price to filter for.
# optionType (Optional[str]) – Can be either ‘call’ or ‘put’ or leave blank to get both.
# info (Optional[str]) – Will filter the results to get a specific value.
# Returns:	
# Returns a list of dictionaries of key/value pairs for all options of the stock that match the search parameters. If info parameter is provided, a list of strings is returned where the strings are the value of the key that matches info.





#### Sell half a Bitcoin is price reaches 10,000
# robin_stocks.order_sell_crypto_limit('BTC',0.5,10000)
# #Buy $500 worth of Bitcoin
# robin_stocks.order_buy_crypto_by_price('BTC',500)