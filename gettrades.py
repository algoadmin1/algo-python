#gettrades.py
prgname="gettrades.py"
vers="1.23"
msg0=0

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

result = GetTrades(url1)
if(msg0==1):
    print("] result[]=...")
    print(result)

i=0
for line in result:
    print("] result:",i,line )
    i=i+1

fname="trades_ini.txt"
arrCSVfile = ReadFile(fname)
print(arrCSVfile)
print_colored("] END of "+prgname, colorGreen )

           
