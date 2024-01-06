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


# 3) at 1600 BUY AMZN atLimit $144.98 count=4 $1.7 or 1.1702% above S1
# 4) at 1600 BUY AMD atLimit $138.23 count=5 $4.1 or 2.9661% above S1
# 5) at 1600 BUY SPY atLimit $467.15 count=5 $1.24 or 0.2654% above S1
# 6) at 1600 BUY QQQ atLimit $395.98 count=5 $0.97 or 0.2450% above S1
# 7) at 1545 BUY GS atLimit $386.68 count=4 $5.78 or 1.4948% above S1
# 8) at 1500 SELL ROKU atLimit $90.28 count=4 $0.38 or 0.4234% above R1
# (ini.10)  ROKU SELL<<===== above R1  Trade: ROKU LONG_PUTS
# 9) at 1500 SELL AMZN atLimit $145.63 count=5 $-0.99 or -0.6783% below R1
# 10) at 1500 SELL META atLimit $351.92 count=4 $2.89 or 0.8218% above R1
# (ini.2)  META SELL<<===== above R1  Trade: META CREDIT_CALL_SPREAD
# 11) at 1445 SELL SPY atLimit $468.46 count=4 $-1.36 or -0.2894% below R1
# 12) at 1445 SELL AAPL atLimit $182.03 count=4 $-1.02 or -0.5597% below R1
# 13) at 1445 SELL TSLA atLimit $238.73 count=6 $-2.47 or -1.0342% below R1
# 14) at 1445 SELL GS atLimit $387.23 count=4 $1.19 or 0.3065% above R1
# 15) at 1400 BUY AMD atLimit $139.43 count=8 $5.31 or 3.8059% above S1
# 16) at 1400 BUY QQQ atLimit $397.4 count=9 $2.39 or 0.6014% above S1
# 17) at 1400 BUY MSFT atLimit $368.8 count=9 $3.09 or 0.8378% above S1
# 18) at 1345 BUY SPY atLimit $467.47 count=8 $1.57 or 0.3351% above S1
# 19) at 1345 BUY AMZN atLimit $145.28 count=9 $1.99 or 1.3721% above S1
# 20) at 1345 BUY GS atLimit $386.39 count=8 $5.49 or 1.4208% above S1
# 21) at 1315 BUY NVDA atLimit $492 count=5 $16.99 or 3.4532% above S1
# 22) at 1315 BUY AAPL atLimit $181.68 count=6 $0.84 or 0.4624% above S1
# 23) at 1315 BUY TSLA atLimit $237.68 count=7 $1.45 or 0.6101% above S1
# 24) at 1315 BUY INTC atLimit $47.05 count=7 $1.38 or 2.9328% above S1
# 25) at 1315 SELL VXX atLimit $15.74 count=6 $-0.5 or -3.1687% below R1
# 26) at 1300 BUY META atLimit $351.47 count=5 $7.19 or 2.0457% above S1
# 27) at 1200 SELL ROKU atLimit $89.58 count=6 $-0.32 or -0.3547% below R1
# 28) at 1200 SELL NVDA atLimit $493.32 count=8 $8.38 or 1.6996% above R1
# (ini.3)  NVDA SELL<<===== above R1  Trade: NVDA LONG_CALLS
# 29) at 1200 SELL AMD atLimit $140.28 count=8 $2.46 or 1.7504% above R1
# 30) at 1145 SELL QQQ atLimit $399.05 count=6 $0.51 or 0.1289% above R1
# 31) at 1145 SELL META atLimit $352.53 count=7 $3.51 or 0.9950% above R1
# (ini.2)  META SELL<<===== above R1  Trade: META CREDIT_CALL_SPREAD
# 32) at 1145 SELL MSFT atLimit $371.55 count=7 $-0.1 or -0.0257% below R1
# 33) at 1145 SELL SPY atLimit $469.99 count=6 $0.18 or 0.0376% above R1
# 34) at 1145 BUY VXX atLimit $15.53 count=7 $-0.31 or -2.0176% below S1
# 35) at 1145 SELL GS atLimit $388.75 count=6 $2.71 or 0.6974% above R1
# 36) at 1130 SELL INTC atLimit $47.65 count=5 $0.06 or 0.1189% above R1
# 37) at 1130 SELL TSLA atLimit $239.32 count=4 $-1.88 or -0.7860% below R1
# 38) at 1130 SELL AMZN atLimit $146.29 count=6 $-0.33 or -0.2233% below R1
# 39) at 1030 BUY TSLA atLimit $238.64 count=4 $2.41 or 1.0113% above S1
# 40) at 1015 BUY SPY atLimit $468.26 count=4 $2.35 or 0.5019% above S1
# 41) at 1000 BUY AAPL atLimit $182.17 count=8 $1.33 or 0.7319% above S1


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
                pstr9="(ini."+str(linecnt)+")  "+lineiniarr[0]+" "+lineiniarr[1]+"<<====="+" "+aboveBelowstr+" "+S1R1str +"  Trade: "+symbol0+" "+lineiniarr[4]
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