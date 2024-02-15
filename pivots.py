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

import yfinance as yahooFinance
import pandas as pd

# Get Customer choices (ticker, interval)
def GetTicker():
	print("TODO: get ticker from 1")
	return 'NVDA'

def GetInterval():
	print("TODO: get interval from user!")
	return '5d'

ticker = GetTicker()
interval = GetInterval()

print ("ticker is ", ticker)
print ("interval is ", interval)

data = yahooFinance.Ticker(ticker)


# test 1 blindly print all info.. works
# print(data.info)

# test 2 get all key value pairs that are available
for key, value in data.info.items():
	print(key, ":", value)

# test 3 display for example, PE
print("Price Earnings Ratio : ", data.info['trailingPE'])

priceData = data.history(period='5d')

print("\n Price Data: ")
print(priceData)

''' 
Example output for inputs 'NVDA', '5d':

                                 Open        High         Low       Close    Volume  Dividends  Stock Splits
Date
2024-02-09 00:00:00-05:00  705.330017  721.849976  702.119995  721.330017  43663700        0.0           0.0
2024-02-12 00:00:00-05:00  726.000000  746.109985  712.500000  722.479980  61371000        0.0           0.0
'''

# end multiline nonsense

# Calc the Daily Pivots for the last 5 days
# for each day
#    calc Pivot

# TODO: figure out how to debug python line step

# TODO: use dataframes ?
# df = pd.DataFrame(priceData)
# df

# print ("Length of Price Data = ", priceData.info)
counter = 0

for row in priceData:
	print ("counter = ", counter, "012 elements are",  row[0] , row[1], row[2])
	++counter



# Valid intervals are below. Could display in a scroll bar select

#   1d 5d 1mo 3mo 6mo 1y 2y 5y 10y ytd

#print(data.history(period="max"))
#print(data.history(period="6mo"))

print("\nYES SIR!\n")


# TODO: fix exception w/ bad ticker entry 'NDVA'
#  KeyStatistics%2CassetProfile%2CsummaryDetail&ssl=true&crumb=RsKbvrgHfdXFile "C:\Users\willb\AppData\Local\Programs\Python\Python312\Lib\site-packages\requests\models.py", line 1021, in raise_for_status
#     raise HTTPError(http_error_msg, response=self)
# requests.exceptions.HTTPError: 404 Client Error: Not Found for url: https://query2.finance.yahoo.com/v10/finance/quoteSummary/NDVA?modules=financialData%2CquoteType%2Cdefault
