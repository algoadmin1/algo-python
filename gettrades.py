#gettrades.py
prgname="gettrades.py"
vers="1.23"
msg0=0
currstr="$"

print("] Running",prgname,'vers', vers, "- Importing...\n")

import requests
import csv
import time
import datetime
# from datetime import datetime

import pytz
import shutil
import sys

import os

import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt

import robin_stocks as rs


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


def TodaysDate():
    # today_date = datetime.today().strftime('%Y-%m-%d') 
    today_date = datetime.datetime.now(new_york_timezone).date().strftime('%Y-%m-%d')

    # today_date = datetime.now().strftime("%Y-%m-%d")
    return today_date

# Example usage:
# print(TodaysDate())

def print_colored(text, color_code): 
    print(f"\033[{color_code}m{text}\033[0m") 

def DaysDifference(udate1, udate2):
    date_format = "%Y-%m-%d" 
    parsed_date1 = datetime.strptime(udate1, date_format) 
    parsed_date2 = datetime.strptime(udate2, date_format) 
    difference = parsed_date2 - parsed_date1
    return difference.days


def GetStockPrice(stock_symbol): 
    stock = yf.Ticker(stock_symbol) 
    current_price = stock.history(period="1d")["Close"].iloc[-1] 
    return current_price 
    
# Replace "AAPL" with the symbol of the stock you want to get the price for stock_symbol = "AAPL" 
# Example: Apple Inc. price = GetStockPrice(stock_symbol) 
#                     print(f"The current price of {stock_symbol} is: {price}")

def PrintDollars(prefixstr, amt):
    #prefixstr = "\tTrade #" + str(TradeCount) + ":   WIN!, rnd# = " + str(RandomPct) + " Gain = " + str(RandomPctGain) + "%,    "
    txt = "\t  ${:.2f}"
    print(prefixstr , txt.format(amt, ','))

def round_down(num, modulo):
    return num // modulo * modulo

def ReadFile(fname):
    arrStr = []
    try:
        with open(fname, 'r') as file:
            for line in file:
                if(len(line)>16):
                    arrStr.append(line.strip())  # Removing newline characters
    except FileNotFoundError:
        print(f"File '{fname}' not found.")
    return arrStr

# Example usage:
# file_name = 'your_file.txt'  # Replace 'your_file.txt' with your file name
# lines = ReadFile(file_name)
# print(lines)  # This will print the lines read from the file into the array
def StringParts(input_str,char0):
    # arr_str = input_str.split(',')
    arr_str = input_str.split(char0)
    return arr_str

# Example usage:
# csv_string = "12,456,a,bgb,78h,34f,009,23,eol"
# parts = StringParts(csv_string)
# print(parts)

# ___ ini file:
# ] trades_INI.txt =
# 0 AAPL,BUY,BELOW,S1,LONG_CALLS,COUNT,6
# 1 NVDA,SELL,ABOVE,R1,LONG_CALLS,COUNT,6
# 2 INTC,BUY,BELOW,S1,LONG_CALLS,COUNT,6
# 3 TSLA,BUY,BELOW,S1,LONG_CALLS,COUNT,6
# 4 ADBE,SELL,ABOVE,R1,COUNT,6,CREDIT_CALL_SPREAD
# 5 TSLA,BUY,PUT_CALL_SPREAD
# 6 QQQ,BUY,LONG_STOCK
# ] trades_INI.txt =====================

# ] todaysTrades[ 21 ] =  RAWTRADE,485,2024-01-04,1300,BUY,TSLA,atLimit,241.26,4,2.7619%,6.66,285|275|205|190,
# ] todaysTrades[ 22 ] =  RAWTRADE,483,2024-01-04,1215,SELL,SPY,atLimit,470.56,7,-0.0000%,-0,560|540|395|375,
# ] todaysTrades[ 23 ] =  RAWTRADE,484,2024-01-04,1215,SELL,QQQ,atLimit,399.06,7,-0.3004%,-1.2,475|455|335|315,

def GenerateTrade(arr, idx, arrINIcsv ):
    S1R1str="S1"
    col=colorLimeGreen
    if(arr[4]=="SELL"):
        S1R1str="R1"
        col=colorRed

    aboveBelowstr="above"
    pct0str=arr[9]
    if(pct0str[0]=='-'):
        aboveBelowstr="below"
        if(arr[4]=="SELL"):
            col=colorDarkRed
    else:
        if(arr[4]=="BUY"):
            col=colorDarkGreen

    
#   35) at 1030 BUY INTC atLimit $46.57 count=6 $-0.06 or -0.1360% below S1
    pstr=str(idx)+") at "+arr[3]+" "+arr[4]+" "+arr[5]+" "+ arr[6]+" "+currstr+arr[7]+" count="+arr[8]+" "+currstr+arr[10]+" or "+arr[9]+ " "+aboveBelowstr+" "+ S1R1str
    print_colored(pstr, col )

    buySell= arr[4]
    symbol0= arr[5]
    #aboveBelowstr  ="below"
    #S1R1str        ="R1"

    linecnt=0
    if(col==colorDarkGreen or col==colorDarkRed):
        dummy9=0
    else:
        for lineini in arrINIcsv:
            # print(lineini)
            lineiniarr = StringParts( lineini, ',' )
            #  NVDA,SELL,ABOVE,R1,LONG_CALLS,COUNT,6
            if(symbol0==lineiniarr[0] and buySell==lineiniarr[1] ):
                pstr9="("+str(linecnt)+")  "+lineiniarr[0]+" "+lineiniarr[1]+"<<====="+" "+aboveBelowstr+" "+S1R1str +"  Trade: "+symbol0+" "+lineiniarr[4]
                print_colored(pstr9,colorGray)
            linecnt=linecnt+1




def GetTrades(url):
    arrTrades = []
    response = requests.get(url)

    if response.status_code == 200:
        # lines = response.text.split('\n')
        lines = response.text.split('<br />')
        i=0
        for line in lines:
            #print(i,line )
            i=i+1
            if(len(line)>2):
                arrTrades.append(line)
            # if line[:8] == "RAWTRADES":
            #     arrTrades.append(line)
    
    return arrTrades

# Example usage:
urlbase = 'https://algoinvestorr.com/trades/gettrades.php?d='
url = 'https://algoinvestorr.com/trades/gettrades.php?d=2024-01-04'


# Get current date in New York - we need EDT for markets...
new_york_timezone = pytz.timezone('America/New_York')
current_date_ny = datetime.datetime.now(new_york_timezone).date()

 

todaysDate0=TodaysDate()

pstr= "\n",str(current_date_ny),"] ENTER trades Date (default="+todaysDate0+"): "  
print_colored(pstr,colorRed)
input0 = input()
if input0 == "":
    print("\n] Defaulting Date to ", todaysDate0 )
    input0 = todaysDate0
todaysDate0 = input0

url1=url
if(len(str(todaysDate0))==10):
    url1=urlbase+todaysDate0

print("] Attemping live trade retrieval for", url1, " on ", current_date_ny)

todaysTrades = GetTrades(url1)
if(msg0==1):
    print("] todaysTrades[]=...")
    print(todaysTrades)



# # each line = today's line trade
# i=0
# for linetrade in todaysTrades:
#     print("] todaysTrades[",i,"] = ",linetrade )
#     i=i+1
#     linetradearr = StringParts( linetrade, ',' )



# GRAB INI FILE
fname="trades_ini.txt"
arrINIcsvfile = ReadFile(fname)
print(arrINIcsvfile)
print_colored("] Finished reading: " +fname+ " for "+prgname, colorYellow )


print_colored("] trades_INI.txt =", colorMagenta)        
j=0
for line in arrINIcsvfile:
    print(j,line)
    linearr = StringParts( line, ',' )
    for field in linearr:
        dummy=0
        #print(field,"|")
    # print("\n")
    j=j+1           
print_colored("] trades_INI.txt =====================", colorMagenta)        







i=0
for linetrade in todaysTrades:
    if(msg0==1):
        print("] todaysTrades[",i,"] = ",linetrade )
    i=i+1
    linetradearr = StringParts( linetrade, ',' )
    if(linetradearr[0]=='RAWTRADE'):
        # print("rawtrade found.")
        if(linetradearr[2]==todaysDate0):
            GenerateTrade(linetradearr,i, arrINIcsvfile)




pstr="\n]  END OF PROGRAM: "+prgname
print_colored(pstr, colorMagenta)