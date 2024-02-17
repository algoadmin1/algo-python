# pivots.py
# Displays the pivots for a given ticker
# (c) 2024 by Level Blest LLC 

# Psuedo Code (trying multiline comment):
'''
	Get ticker via textbox (MVP is User Voice2Text)
	Fetch Ticker data from YF
	Display Simple, Big Button/Font interface
	
	reference:  
	  https://www.babypips.com/tools/pivot-point-calculator
'''

# Different models vary in calculations

# Tom DeMark
# 	If Close < Open: X = H + (2 x L) + C
# 	If Close > Open: X = (2 x H) + L + C
# 	If Close = Open: X = H + L + (2 x C)
# 	R1 = (X / 2) - L
# 	S1 = (X / 2) - H

# Fibonachos
# 	R3 = PP + ((High - Low) x 1.000)
# 	R2 = PP + ((High - Low) x 0.618)
# 	R1 = PP + ((High - Low) x 0.382)
# 	PP = (H + L + C) / 3
# 	S1 = PP - ((High - Low) x 0.382)
# 	S2 = PP - ((High - Low) x 0.618)
# 	S3 = PP - ((High - Low) x 1.000)

# Floor
# 	Pivot (P) = (H + L + C) / 3
# 	Resistance (R1) = (2 x P) - L
# 	R2 = P + H - L
# 	R3 = H + 2 x (P - L)
# 	Support (S1) = (2 x P) - H
# 	S2 = P - H + L
# 	S3 = L - 2 x (H - P)

################################################################
# yfinance reference:  https://pypi.org/project/yfinance/

import yfinance as yf
import pandas as pd
import calendar
#from datetime import date, timedelta
import os
import random

# import scipy as s

defaultTicker = 'NVDA'
defaultPeriod = 'Daily and Monthly'

# set this True to print all price data rows from scrapes
g_debugHistory = False

# let's have some fun
g_Messages = []
g_Messages.append("-----------  L E T ' S   G O !  -----------\n")
g_Messages.append("------- Watch your position sizes. --------\n")
g_Messages.append("---- D O N ' T   O V E R T R A D E ! ------\n")
g_Messages.append("--- Trading plan must specify intervals. --\n")
g_FirstTime = True

def is_valid_ticker(ticker_symbol):
    try:
        # Attempt to fetch data for the given ticker symbol
        stock_data = yf.Ticker(ticker_symbol).info
        
        # If no exception is raised, the ticker is likely valid
        return True

    except ValueError as e:
        # Check if the error message indicates an invalid ticker
        if "No data found" in str(e):
            return False
        else:
            # Re-raise the exception if it's a different ValueError
            raise e

def GetTicker():
	global g_FirstTime
	if g_FirstTime:
		msg = g_Messages[0]
	else:
		msg = random.choice(g_Messages)
	g_FirstTime = False
	print("\n\t", msg)

	val = defaultTicker
	choice = input("\tEnter Ticker: ")
	if(choice != ""):
		val = choice
	return val

def IsPeriodValid(period:str):

	validPeriods = ['1d','5d','1mo','3mo','6mo','1y','2y','5y','10y','ytd','max']
	#print(validPeriods)
	for p in validPeriods:
		if (period == p):
			return True

	print("\t Invalid period. Please choose 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max")
	return False

def GetInterval():
	val = defaultPeriod
	choice = input("\tEnter period: ")
	if (choice != ""):
		if IsPeriodValid(choice):
			val = choice
	return val

def HelloCustomer():
	print("\n")
	print("\t^----------------------------------------------^")
	print("\t$  Welcome to AlgoZ Pivotal Trading Companion  $")
	print("\t^----------------------------------------------^\n")
	print("\t     (Defaults: ", defaultTicker, ",", defaultPeriod, ")")

def PrintPivots(p:str, i:str):
	
	# do the scrape
	try:
		priceData = g_dataFrame.history(period=p, interval=i)

	except ValueError as ve:
		print(f"Invalid period or ticker symbol: {period}, {ticker_symbol}")
	except KeyError as ke:
		print(f"KeyError: {ke}")
	except IOError as ioe:
		print(f"IOError: {ioe}")
	except Exception as e:
		print(f"An unexpected error occurred: {e}")

	if (g_debugHistory):
		print("Price Data: ")
		print(priceData)
		print("\n")

	numRows = len(priceData.index)

	# note for the Pivots and S3->R3 levels we'll use CAPS for var names

	P = [0] * numRows
	R1 = [0] * numRows
	R2 = [0] * numRows
	R3 = [0] * numRows
	S1 = [0] * numRows
	S2 = [0] * numRows
	S3 = [0] * numRows

	# we could store these levels in a [numLevels, numRows] array to handle different models.  Floor would have 7 would be [R3,R2,R1,P,S1,S2,S3]
	# FIB_Levels = [[0 for c in range(numColumns)] for r in range(numRows)] 

	for row in range(numRows):
		timeStamp = priceData.index[row]
		H = priceData.at[timeStamp,'High']
		L = priceData.at[timeStamp,'Low']
		C = priceData.at[timeStamp,'Close']
		P[row] = (H + L + C) / 3
		R1[row] = (2 * P[row]) - L
		R2[row] = P[row] + H - L
		R3[row] = H + 2 * (P[row] - L)
		S1[row] = (2 * P[row]) - H
		S2[row] = P[row] - H + L
		S3[row] = L - 2 * (H - P[row])

	#TODO need an array of row names as strings - why is this so hard
	# rowNames = []
	# for rowName in priceData.index:
	#      print(rowName)
	#      rowNames.append(rowName)

	# print("Dumping row names")
	# for row in range(numRows):
	# 	print(rowNames[row])

	label = "Daily" if p == "1d" else "Monthly"
	print("\n\t\t    ", ticker, label, "\t\t      Date\n")

	# figure out how to extract the correct row. monthly will have last 3 mos,  middle row would be prior.  There is prob a better way to do this..
	startIndex = numRows-1 if p == "1d" else numRows-2
	endIndex = numRows-2 if p == "1d" else numRows-3
	for row in range(startIndex, endIndex, -1):
		timeStamp = priceData.index[row]

		# truncate time stamp for Daily and bigger periods. It's a row label, like "2024-02-09 00:00:00-05:00" 
		#if interval == "1d" or interval == "1m":
		#	temp_string = rowNames[row].as_type(str)

		print("\t\tR3 ", R3[row]) 
		print("\t\tR2 ", R2[row])
		print("\t\tR1 ", R1[row])
		print("\t\tP  ",  P[row], "\t\t", timeStamp)
		print("\t\tS1 ", S1[row])
		print("\t\tS2 ", S2[row])
		print("\t\tS3 ", S3[row], "\n")


# this block is from ChatGPT I left vars as underscores on purpose.
from datetime import datetime, timedelta

def last_trading_date_of_prior_month(current_date):
    # Find the last day of the prior month
    first_day_of_current_month = datetime(current_date.year, current_date.month, 1)
    last_day_of_prior_month = first_day_of_current_month - timedelta(days=1)
    
    # Calculate the last trading day (excluding weekends)
    while last_day_of_prior_month.weekday() > 4:  # 4 represents Friday, 5 and 6 are Saturday and Sunday
        last_day_of_prior_month -= timedelta(days=1)
    
    return last_day_of_prior_month.date()


#########################
# start of main program #
#########################

# clear screen
os.system('cls' if os.name == 'nt' else 'clear')

# Show useful dates
todayDate = datetime.now().date()
lastMonthDate = last_trading_date_of_prior_month(todayDate)

print("Today is ", todayDate, "\t\t\tPrior month ended:", lastMonthDate)

HelloCustomer()

while (True):

	ticker = GetTicker()
	if (ticker == "q"):
		break

	if (not is_valid_ticker(ticker)):
		print("\n\tInvalid ticker")
		break

	# Noobs, please note that Ticker() returns a panda dataframe.
	g_dataFrame = yf.Ticker(ticker)

	# print Daily Levels in a Blest manner
	PrintPivots("1d", "1d")
	# print Monthly
	PrintPivots("3mo","1mo")

print("\n\tGood job! Have a Blest Day and thanks for choosing AlgoZ Pivotal.\n")


'''
 TODOS
 -----
 
   Add 3 day Pivot average.   The golden goose !  consider graphics for "gold on the back", "carrying the gold" , or whatever the sayings are

   User could input interval as well idk prob overkill
 
 Reference
 ---------
 
  How to print column and row names of priceData:

	 for colName in priceData.columns:
	    print(colName)

	 for rowName in priceData.index:
	    print(rowName)

  How to GET TODAYS DATE AND CONVERT IT TO A STRING WITH YYYY-MM-DD FORMAT (YFINANCE EXPECTS THAT FORMAT)

    end_date = datetime.now().strftime('%Y-%m-%d')
    amzn_hist = amzn.history(start='2022-01-01',end=end_date)
    print(amzn_hist)

  How to understand period parameter:
     The following are the valid values: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max.

  What are valid interval params to the .history() method ?  
     1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo

'''

