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
import datetime as dt
import scipy as s

# Get Customer choices (ticker, interval)
def GetTicker():
	#print("TODO: get ticker input")
	defaultSymbol='NVDA'
	insym=""
	insym = input()
    if( insym == "" ):
    	print("  Defaulting Ticker Loss to ", defaultSymbol )
    	insym = defaultSymbol
    defaultSymbol = insym
	return defaultSymbol


def GetInterval():
	#print("TODO: get interval")
	return '5d'

ticker = GetTicker()
interval = GetInterval()

print("\n ^^^ Welcome to AlgoZ Pivot Calculator (TM) ^^^\n")
print("\n             ", ticker, " ", interval)
print("\n")

# Noobs, please note that Ticker() returns a panda dataframe
data = yf.Ticker(ticker)

# test 2 get all key value pairs that are available..works
#for key, value in data.info.items():
#	print(key, ":", value)

# test 3 display for example, PE.. works
#print("Trailing PE: ", data.info['trailingPE'])

# OK do the scrape already
priceData = data.history(period='5d')

print("Price Data: ")
print(priceData)
print("\n")

# print("\nTry to get High")
# H = priceData.at['2024-02-09 00:00:00-05:00','High']
# print ("\tH = ", H)

numRows = len(priceData.index)
# print("Num Rows = ", numRows)

# print("\nColumn Names?")
# for colName in priceData.columns:
#     print(colName)

# print("\nRow Names?")
# for rowName in priceData.index:
#     print(rowName)

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

print("\n\tLevel Blest Levels (reverse Chrono)\n")

for row in range(numRows-1, -1, -1):
	print("\t\tR3 ", R3[row], "\t\t", priceData.index[row])
	print("\t\tR2 ", R2[row])
	print("\t\tR1 ", R1[row])
	print("\t\tP  ",  P[row])
	print("\t\tS1 ", S1[row])
	print("\t\tS2 ", S2[row])
	print("\t\tS3 ", S3[row], "\n")

''' 
Example output for inputs 'NVDA', '5d':

                                 Open        High         Low       Close    Volume  Dividends  Stock Splits
Date
2024-02-09 00:00:00-05:00  705.330017  721.849976  702.119995  721.330017  43663700        0.0           0.0
2024-02-12 00:00:00-05:00  726.000000  746.109985  712.500000  722.479980  61371000        0.0           0.0
'''

# TODO: fix exception w/ bad ticker entry 'NDVA' - use try-catch
#  KeyStatistics%2CassetProfile%2CsummaryDetail&ssl=true&crumb=RsKbvrgHfdXFile "C:\Users\willb\AppData\Local\Programs\Python\Python312\Lib\site-packages\requests\models.py", line 1021, in raise_for_status
#     raise HTTPError(http_error_msg, response=self)
# requests.exceptions.HTTPError: 404 Client Error: Not Found for url: https://query2.finance.yahoo.com/v10/finance/quoteSummary/NDVA?modules=financialData%2CquoteType%2Cdefault
