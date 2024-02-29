# pivots.py
# Displays the pivots for a given ticker
# (c) 2024 by Level Blest LLC 

# set this True to print price data rows from scrapes
# UPDATE: user can now enter 'debug' at prompt to toggle this flag. Amazing !
g_debugHistory = False

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

import calendar
import pandas_market_calendars as mcal
import pandas as pd
from datetime import datetime, timedelta, timezone

#from datetime import date, timedelta
print("]  Still importing ......")

import os
import random
from enum import Enum, auto

defaultTicker = 'NVDA'

# GLOBALS area.  If we must use globals, please use "g_" as a prefix

# let's have some fun w/ user facing messages
g_TipMessages = []
g_TipMessages.append("$                   L E T ' S   G O !                  $")
g_TipMessages.append("$   TRIM those POSITIONS they're so damn hairy, OH !   $")
g_TipMessages.append("$            D O N ' T   O V E R T R A D E             $")
g_TipMessages.append("$                 Wanna quit? Enter 'q'                $")
g_TipMessages.append("$             When in DOUBT, CLOSE it OUT!             $")
g_TipMessages.append("$        D O   Y O U R   O W N   R E S E A R C H       $")
g_TipMessages.append("$            DON'T go LONG on a DOWN day !             $")
g_TipMessages.append("$           S T A Y   L E V E L - H E A D E D          $")
g_TipMessages.append("$              CHECK the 1-month T-BILL                $")
g_TipMessages.append("$  An INVESTMENT in KNOWLEDGE pays the most DIVIDENDS  $")

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

# example of pythone enum
class MarketStatus(Enum):
    PRE_MARKET = auto()
    OPEN = auto()
    CLOSED = auto()

# Default market status to PRE_MARKET
g_market_status = MarketStatus.PRE_MARKET

############################################ METHODS BELOW HERE #################################################

def set_market_status():
    # Get current time in UTC
    #current_time_utc = datetime.utcnow()
	current_time_utc = datetime.now(timezone.utc)

    # Convert UTC to EST (Eastern Standard Time)
	est_offset = timedelta(hours=-5)
	current_time_est = current_time_utc + est_offset

    # Extract hour and minute from the current time
	hour = current_time_est.hour
	minute = current_time_est.minute

    # Set market status based on the time
	global g_market_status
	if hour < 9 or (hour == 9 and minute < 30):
		g_market_status = MarketStatus.PRE_MARKET
	elif hour >= 16 or (hour == 16 and minute >= 30):
		g_market_status = MarketStatus.CLOSED
	else:
		g_market_status = MarketStatus.OPEN

	# for testing, override market status
	#g_market_status = MarketStatus.PRE_MARKET

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
	output = "\n\t\t\t ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\t\t" + msg
	print (output)
	print (    "\t\t\t ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")

def GetTicker():

	ShowTipMessage()
	val = defaultTicker
	choice = input("\tEnter Ticker: ")
	if(choice != ""):
		val = choice
	return val

# def IsPeriodValid(period:str):

# 	validPeriods = ['1d','5d','1mo','3mo','6mo','1y','2y','5y','10y','ytd','max']
# 	#print(validPeriods)
# 	for p in validPeriods:
# 		if (period == p):
# 			return True

# 	print("\t Invalid period. Please choose 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max")
# 	return False

# def GetInterval():
# 	val = "1d"
# 	choice = input("\tEnter period: ")
# 	if (choice != ""):
# 		if IsPeriodValid(choice):
# 			val = choice
# 	return val

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
    dog0="\t\t\t                -^_"
    print_colored_rnd1(dog0,c)
    dog1="\t\t\t   / \\\\__     o''|\\_____/)"
    print_colored_rnd1(dog1,c)
    dog2="\t\t\t  (    @\\___    \\_/|_)     )"
    print_colored_rnd1(dog2,c)
    dog3="\t\t\t  /         O      \\  __  /"
    print_colored_rnd1(dog3,c)
    dog4="\t\t\t /   (_____/       (_/ (_/"
    print_colored_rnd1(dog4,c)
    dog5="\t\t\t/_____/   U    "
    print_colored_rnd1(dog5,c)
    print("\n")


def HelloCustomer():
	print("\n")
	print("\t\t^----------------------------------------------^")
	print("\t\t$  Welcome to AlgoZ Pivotal Trading Companion  $")
	print("\t\t^----------------------------------------------^\n")
	printWatchDogWelcome()

def PrintPivots(p:str, i:str):
	global g_market_status

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

	# Convert index to datetime
	priceData.index = pd.to_datetime(priceData.index)
	# Format datetime index to string, but only show date
	priceData.index = priceData.index.strftime("%m-%d-%Y")

	if (g_debugHistory):
		# ALERT: the monthlies used to return EOM like 2024-01-31, now I'm seeing output below on Feb 26
		'''
				Price Data:
			                                 Open        High         Low       Close     Volume  Dividends  Stock Splits
			Date
			2023-12-01 00:00:00-05:00  465.209087  504.285637  450.060425  495.176453  740951700       0.04           0.0
			2024-01-01 00:00:00-05:00  492.440002  634.929993  473.200012  615.270020  970385300       0.00           0.0
			2024-02-01 00:00:00-05:00  621.000000  823.940002  616.500000  790.919983  977536215       0.00           0.0
		'''

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

	# Calc the 3d pivot
	threeDayPivot = 0
	if (p == '5d'):
		startIndex = numRows -2 if g_market_status == MarketStatus.OPEN else numRows - 1
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

	# THIS BLOCK PRINTS EITHER THE MONTHLY OR DAILY PIVOT

	label = "Daily  " if p == "5d" else "Monthly"
	targetIndex = numRows - 1
	# UPDATE: 2/27/24 looks like yfinance api now fetches monthly data starting on 1st vs ending on 31st
	# so we will use last row not middle for monthly
	#if (p == "3mo" or  (p=="5d" and g_market_status == MarketStatus.OPEN)):
	if (p=="5d" and g_market_status == MarketStatus.OPEN):
		# Monthly will have last 3 mos,  middle row is the prior month and the one we care about
		# if Market open, Daily will also have an extra row
		targetIndex = numRows - 2

	for row in range(targetIndex, targetIndex-1, -1):
		timeStamp = priceData.index[row]
		C = priceData.at[timeStamp,'Close']
		lastPrice = f"{C:.2f}"
		print("\n\t\t    ", ticker+" ", label, "Pivots for ", timeStamp, "\tClosing Price:  ", lastPrice,"\n")

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

	# THIS BLOCK PRINTS Additional WIP pivot, if needed. 
	if (p == "5d" and g_market_status == MarketStatus.OPEN):
		label = "  WIP  "
		
		targetIndex = numRows-1
		for row in range(targetIndex, targetIndex-1, -1):
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

##############################################################################################
#                                   start of main program                                    #
##############################################################################################

# clear screen
os.system('cls' if os.name == 'nt' else 'clear')

# Show useful dates & Market Status
todayDate = datetime.now().date()
lastMonthDate = GetPriorMonthLastTradingDate(todayDate)

set_market_status()

print("\tToday is ", todayDate.strftime("%m-%d-%y"), "\t\t\tPrior month ended:", lastMonthDate.strftime("%m-%d-%Y"))
print("\n\t\t\tMarket is ", g_market_status.name )

HelloCustomer()

while (True):

	ticker = GetTicker()
	if (ticker == "q" or ticker == "Q"):
		break

	if (ticker == "debug"):
		g_debugHistory = not g_debugHistory
		print("\n\t\tOk then! Debug Mode is", "ON\n" if g_debugHistory else "OFF\n")
		continue

	if (not IsTickerValid(ticker)):
		print("\n\tInvalid ticker, try again\n")
		continue

	# Noobs, please note that Ticker() returns a panda dataframe.
	g_dataFrame = yf.Ticker(ticker)

	# print Monthly
	PrintPivots("3mo","1mo")

	# Daily Pivots. The call below will print levels for today, WIP levels for tomorrow, and the 3D Pivot
	PrintPivots("5d", "1d")

print("\n\tThanks for choosing AlgoZ Pivotal. Have a Blest Day! \n")
