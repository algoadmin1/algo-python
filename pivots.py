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

# this warning code is for MAC, to work around a deprecation warning.
import warnings
# Suppress FutureWarning related to TimedeltaIndex
warnings.simplefilter(action='ignore', category=FutureWarning)

print("]  Still importing more Python modules...")

#wcb commenting out panda import, appears unneeded. Prob added during initial testing
#import pandas as pd
import calendar
import pandas_market_calendars as mcal
from datetime import datetime, timedelta

#from datetime import date, timedelta
print("]  Still importing ......")

import os
import random

defaultTicker = 'NVDA'

# GLOBALS area.  If we must use globals, please use "g_" as a prefix
# set this True to print all price data rows from scrapes
g_debugHistory = False

# clean up these globals, for market status
g_isMarketOpen = False

# let's have some fun w/ user facing messages
g_TipMessages = []
g_TipMessages.append("|               L E T ' S   G O !              |")
g_TipMessages.append("|           TRIM those POSITIONS !!            |")
g_TipMessages.append("|        D O N ' T   O V E R T R A D E         |")
g_TipMessages.append("|             Wanna quit? Enter 'q'            |")
g_TipMessages.append("|         When in Doubt, CLOSE it OUT!         |")
g_TipMessages.append("|    D O   Y O U R   O W N   R E S E A R C H   |")
g_TipMessages.append("|        Don't go LONG on a DOWN day !         |")
g_TipMessages.append("|       S T A Y   L E V E L - H E A D E D      |")
g_TipMessages.append("|          Check the 1-month T-bill            |")

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

def IsMarketOpen():
	# Define the market calendar (e.g., New York Stock Exchange)
	market_cal = mcal.get_calendar('XNYS')

	# Get the current date and time
	current_datetime = datetime.now()

	# Check if the market is open at the current date and time
	is_market_open = market_cal.valid_days(start_date=current_datetime.date(), end_date=current_datetime.date()).size > 0

	#if is_market_open:
	#	print("The market is currently open.")
	#else:
	#	print("The market is currently closed.")
	return is_market_open

def IsTickerValid(ticker_symbol):
	# Create a Ticker object
	stock_ticker = yf.Ticker(ticker_symbol)
	# Fetch historical data
	historical_data = stock_ticker.history(period="1d")
	isValid = not historical_data.empty
	# Check if the historical data is empty
	#if isValid:
	#	print(f"Data available for {ticker_symbol}")
	#else:
	#	print(f"No data available for {ticker_symbol}")
	return isValid

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
	#g_TipMessages.app"|               L E T ' S   G O !              |\n")
	output = "\n\t\t\t ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\t\t" + msg
	print (output)
	print (    "\t\t\t ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")

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
	val = "1d"
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

	#print("\t\t( Default: ", defaultTicker, ")\n")

def PrintPivots(p:str, i:str):
	global g_isMarketOpen

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

	# TODO: determine if market is open, to decide if which row to grab (either 0 or 1)
	#timeStamp = priceData.index[row]

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

	# Calc the 3d pivot
	threeDayPivot = 0
	if (p=='5d'):
		startIndex = numRows -2 if g_isMarketOpen else numRows - 1
		endIndex = startIndex - 3
		for row in range(startIndex, endIndex, -1):
			threeDayPivot += P[row]
		threeDayPivot /= 3 

	#TODO need an array of row names as strings - why is this so hard
	# rowNames = []
	# for rowName in priceData.index:
	#      print(rowName)
	#      rowNames.append(rowName)

	# print("Dumping row names")
	# for row in range(numRows):
	# 	print(rowNames[row])

	label = "Daily  " if p == "5d" else "Monthly"

	# Figure out the row. for Daily pivots, we'll print todays (using yesterday data) and a work-in-progress pivot
	# Monthly will have last 3 mos,  middle row is the prior month and the one we care about

	startIndex = numRows - 2

	# if invoked w daily pivots, and the market is not open, figure out the row
	if (p=="5d" and not g_isMarketOpen):
		startIndex = numRows - 1

	for row in range(startIndex, startIndex-1, -1):
		timeStamp = priceData.index[row]
		C = priceData.at[timeStamp,'Close']
		lastPrice = f"{C:.2f}"
		print("\n\t\t    ", ticker+" ", label, "\t\t      ", lastPrice, "\t\tas of", timeStamp,"\n")

		# truncate time stamp for Daily and bigger periods. It's a row label, like "2024-02-09 00:00:00-05:00" 
		#if interval == "1d" or interval == "1m":
		#	temp_string = rowNames[row].as_type(str)

		# print 3d pivot if needed
		goldBlueMsg = "V V V -- GOLD is Heavy -- V V V" if threeDayPivot > P[row] else "^ ^ ^    Skies are BLUE    ^ ^ ^"
		msg = "\tP3  " + f"{threeDayPivot:.2f}" + "\t\t\t" + goldBlueMsg
		if (p != "5d"):
			msg = " "
		print("\t\tR3 ", f"{R3[row]:.2f}") 
		print("\t\tR2 ", f"{R2[row]:.2f}")
		print("\t\tR1 ", f"{R1[row]:.2f}")
		print("\t\tP  ",  f"{P[row]:.2f}", msg)
		print("\t\tS1 ", f"{S1[row]:.2f}")
		print("\t\tS2 ", f"{S2[row]:.2f}")
		print("\t\tS3 ", f"{S3[row]:.2f}", "\n")

	# Block below prints additional WIP pivot, if function invoked with daily And the Market is open
	if (p == "5d" and g_isMarketOpen == True):
		label = "  WIP  "
		
		startIndex = numRows-1
		for row in range(startIndex, startIndex-1, -1):
			timeStamp = priceData.index[row]
			C = priceData.at[timeStamp,'Close']
			lastPrice = f"{C:.2f}"
			print("\n\t\t    ", ticker+" ", label, "\t\t      ", lastPrice, "\t\tas of", timeStamp,"\n")

			# truncate time stamp for Daily and bigger periods. It's a row label, like "2024-02-09 00:00:00-05:00" 
			#if interval == "1d" or interval == "1m":
			#	temp_string = rowNames[row].as_type(str)
			print("\t\tR3 ", f"{R3[row]:.2f}") 
			print("\t\tR2 ", f"{R2[row]:.2f}")
			print("\t\tR1 ", f"{R1[row]:.2f}")
			print("\t\tP  ",  f"{P[row]:.2f}")
			print("\t\tS1 ", f"{S1[row]:.2f}")
			print("\t\tS2 ", f"{S2[row]:.2f}")
			print("\t\tS3 ", f"{S3[row]:.2f}", "\n")

	# End of additional PIVOT print

# this block is from ChatGPT I left vars as underscores on purpose.

def GetPriorMonthLastTradingDate(current_date):
    # Find the last day of the prior month
    first_day_of_current_month = datetime(current_date.year, current_date.month, 1)
    last_day_of_prior_month = first_day_of_current_month - timedelta(days=1)
    
    # Calculate the last trading day (excluding weekends)
    while last_day_of_prior_month.weekday() > 4:  # 4 represents Friday, 5 and 6 are Saturday and Sunday
        last_day_of_prior_month -= timedelta(days=1)
    
    return last_day_of_prior_month.date()

# TODO: rework logic for getting last trading date BEFORE today
def get_last_trading_date():
    # Define the exchange calendar (e.g., 'XNYS' for New York Stock Exchange)
    exchange = mcal.get_calendar('XNYS')

    # Get today's date
    today = datetime.today().date()

    # Adjust the date to the previous business day (last trading date)
    last_trading_date = exchange.valid_days(start_date=today - timedelta(days=7), end_date=today)[-1]

    return last_trading_date.date()

#########################
# start of main program #
#########################

# clear screen
os.system('cls' if os.name == 'nt' else 'clear')

# Show useful dates & Market Status
todayDate = datetime.now().date()
lastMonthDate = GetPriorMonthLastTradingDate(todayDate)
lastTradingDate = get_last_trading_date()
print("Today is ", todayDate, "\t\t\tPrior month ended:", lastMonthDate)
g_isMarketOpen = IsMarketOpen()
#TODO debug this
print("Prior is ", lastTradingDate, "  ... Match!! " if (todayDate == lastTradingDate) else "", "\tMarket is ", "Open" if g_isMarketOpen else "Closed")

HelloCustomer()

while (True):

	ticker = GetTicker()
	if (ticker == "q"):
		break

	if (not IsTickerValid(ticker)):
		print("\n\tInvalid ticker, try again\n")
		continue

	# Noobs, please note that Ticker() returns a panda dataframe.
	g_dataFrame = yf.Ticker(ticker)

	# print Monthly
	PrintPivots("3mo","1mo")

	# Daily Pivots. The call below will print levels for today, WIP levels for tomorrow, and the 3D Pivot
	PrintPivots("5d", "1d")

print("\n\tGood job! Have a Blest Day and thanks for choosing AlgoZ Pivotal.\n")
