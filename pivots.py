# pivots.py
# Displays the pivots for a given ticker
# (c) 2024 by Level Blest LLC 

''' Psuedo Code (trying multiline comment):

	Get ticker via textbox; Goal is Voice2Text
	Fetch Ticker data from YF
	Display Simple, Big Button/Font interface
	
	reference:
		 yfinance:  https://pypi.org/project/yfinance/
		Pivots UI:  https://www.babypips.com/tools/pivot-point-calculator
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

print("\n\n] *** Importing python modules; this may take a moment on the first run...")
import yfinance as yf
print("]  Still importing more Python modules...")

#wcb commenting out panda import, appears unneeded. Prob added during initial testing
#import pandas as pd
import calendar
#from datetime import date, timedelta
print("]  Still importing ......")

import os
import random

defaultTicker = 'NVDA'
defaultPeriod = 'Daily and Monthly'

# GLOBALS area.  If we must use globals, please use "g_" as a prefix
# set this True to print all price data rows from scrapes
g_debugHistory = False

# let's have some fun w/ user facing messages
g_TipMessages = []
g_TipMessages.append("-----------  L E T ' S   G O !  -----------\n")
g_TipMessages.append("------- Watch your position sizes! --------\n")
g_TipMessages.append("---- D O N ' T   O V E R T R A D E ! ------\n")
g_TipMessages.append("--------  Wanna quit? Enter 'q' -----------\n")
g_TipMessages.append("----- When in Doubt, Close it Out! --------\n")
g_TipMessages.append("- D O   Y O U R   O W N   R E S E A R C H -\n")

g_FirstTime = True
g_LastMessageIndex = -1


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

def ShowTipMessage():
	global g_FirstTime
	global g_LastMessageIndex
	arraySize = len(g_TipMessages)
	msgIndex = 0 if g_FirstTime else random.choice(range(0,arraySize))
	if (msgIndex == g_LastMessageIndex):
		msgIndex += 1
		msgIndex = msgIndex % arraySize
	g_FirstTime = False
	msg = g_TipMessages[msgIndex]
	g_LastMessageIndex = msgIndex
	print("\n\t\t\t", msg)

def GetTicker():

	ShowTipMessage()
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


# def printTodaysDate():
#     dstr7 = ( f"{current_date_ny.strftime('%Y-%m-%d')}" )
#     print("Today's date in New York:",dstr7 )
#     return dstr7

def rand(num):
    return(random.randint(0, (num-1)))

def print_colored(text, color_code): 
    print(f"\033[{color_code}m{text}\033[0m") 

def print_colored_rnd1(text, r):
    # r = rand(colorArrayLen)
    print_colored(text, colorArray[r])

def printWatchDogWelcome():
    # print("\n ")  
    # dstr7a= printTodaysDate()

    c=2
    dog0="\t\t                -^_"
    print_colored_rnd1(dog0,c)
    dog1="\t\t   / \\\\__     o''|\\_____/)"
    print_colored_rnd1(dog1,c)
    dog2="\t\t  (    @\\___    \\_/|_)     )"
    print_colored_rnd1(dog2,c)
    dog3="\t\t  /         O      \\  __  /"
    print_colored_rnd1(dog3,c)
    dog4="\t\t /   (_____/       (_/ (_/"
    print_colored_rnd1(dog4,c)
    dog5="\t\t/_____/   U    "
    print_colored_rnd1(dog5,c)
    print("\n")


def HelloCustomer():
	print("\n")
	print("\t^----------------------------------------------^")
	print("\t$  Welcome to AlgoZ Pivotal Trading Companion  $")
	print("\t^----------------------------------------------^\n")
	printWatchDogWelcome()

	print("\t    ( Defaults: ", defaultTicker, ",", defaultPeriod, ")")

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
	lastPrice = -1.0
	for row in range(numRows):
		timeStamp = priceData.index[row]
		H = priceData.at[timeStamp,'High']
		L = priceData.at[timeStamp,'Low']
		C = priceData.at[timeStamp,'Close']
		lastPrice = f"{C:.2f}"
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

	# We will only print one row. Figure out how to extract. Monthly will have last 3 mos,  middle row would be prior.
	startIndex = numRows-1 if p == "1d" else numRows-2
	endIndex = numRows-2 if p == "1d" else numRows-3
	for row in range(startIndex, endIndex, -1):
		timeStamp = priceData.index[row]
		C = priceData.at[timeStamp,'Close']
		lastPrice = f"{C:.2f}"
		print("\n\t\t    ", ticker, label, "\t\t      ", lastPrice, "  ( last Price as of", timeStamp,")\n")

		# truncate time stamp for Daily and bigger periods. It's a row label, like "2024-02-09 00:00:00-05:00" 
		#if interval == "1d" or interval == "1m":
		#	temp_string = rowNames[row].as_type(str)

		print("\t\tR3 ", R3[row]) 
		print("\t\tR2 ", R2[row])
		print("\t\tR1 ", R1[row])
		print("\t\tP  ",  P[row])
		print("\t\tS1 ", S1[row])
		print("\t\tS2 ", S2[row])
		print("\t\tS3 ", S3[row], "\n")


# this block is from ChatGPT I left vars as underscores on purpose.
from datetime import datetime, timedelta

def GetPriorMonthLastTradingDate(current_date):
    # Find the last day of the prior month
    first_day_of_current_month = datetime(current_date.year, current_date.month, 1)
    last_day_of_prior_month = first_day_of_current_month - timedelta(days=1)
    
    # Calculate the last trading day (excluding weekends)
    while last_day_of_prior_month.weekday() > 4:  # 4 represents Friday, 5 and 6 are Saturday and Sunday
        last_day_of_prior_month -= timedelta(days=1)
    
    return last_day_of_prior_month.date()

import pandas_market_calendars as mcal

def get_last_trading_date():
    # Define the exchange calendar (e.g., 'XNYS' for New York Stock Exchange)
    exchange = mcal.get_calendar('XNYS')

    # Get today's date
    today = datetime.today().date()

    # Adjust the date to the previous business day (last trading date)
    last_trading_date = exchange.valid_days(start_date=today - timedelta(days=7), end_date=today)[-1]

    return last_trading_date.date()

# Example usage
#last_trading_date = get_last_trading_date()
#print("Last trading date before today:", last_trading_date)

#########################
# start of main program #
#########################

# clear screen
os.system('cls' if os.name == 'nt' else 'clear')

# Show useful dates
todayDate = datetime.now().date()
lastMonthDate = GetPriorMonthLastTradingDate(todayDate)
lastTradingDate = get_last_trading_date()
print("Today is ", todayDate, "\t\t\tPrior month ended:", lastMonthDate)
print("Prior is ", lastTradingDate, "  ... Match!! " if (todayDate == lastTradingDate) else "")

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
