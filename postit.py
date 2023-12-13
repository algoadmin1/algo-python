# postit.py   i.e. postIntradayTrades.py

import requests
import csv
import datetime
import pytz

#today_date_unix = datetime.datetime.now().timestamp()
#print(today_date_unix )

dtstr="nydatetime"
dstr="nydate"
tstr="nytime"

# Get current date in New York - we need EDT for markets...
new_york_timezone = pytz.timezone('America/New_York')
current_date_time_ny = datetime.datetime.now(new_york_timezone)
current_date_ny = datetime.datetime.now(new_york_timezone).date()
current_time_ny = datetime.datetime.now(new_york_timezone).time()

#print (f"Current date and time in New York: {current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
dtstr= (f"{current_date_time_ny.strftime('%Y-%m-%dT%H:%M:%S')}")
print("Today's Date and Time in NYC (EDT) is:",dtstr)


# Print current date in New York as YYYY-MM-DD
#print(f"Current date in New York: {current_date_ny.strftime('%Y-%m-%d')}")
dstr= ( f"{current_date_ny.strftime('%Y-%m-%d')}" )
print("Today's date in New York:",dstr)


# Print current time in New York as HH:MM:SS
tstr =(f"Current time in New York: {current_time_ny.strftime('%H:%M:%S')}")
tstrHHMM =(f"Current time in New York (Tradestation format): {current_time_ny.strftime('%H%M')}")
print("EDT tstr=",tstr)
print("EDT tstrHHMM=",tstrHHMM)


# Print today's date as a Unix timestamp
#print(f"Today's date as Unix timestamp: {int(today_date_unix)}")
 
print("\n\n")
print("\n\n")
print("\n\n")
# Read the CSV file and extract data
file_path = 'intradaytrades.txt'  # Replace with your file path
#file_path = 'intradaytradessm.txt'  # Replace with your file path
data = []
dataToday = []
i=0
with open(file_path, 'r') as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        data.append(row)
        #print("i=",i,data[i])
        arrstr = data[i]
        #print("\n #0,10,21==",arrstr[0],arrstr[10],arrstr[21])
        if(arrstr[0] == dstr):
            print("Today's trade data[",i,"] =  ",data[i])
            dataToday.append(row)
            signalStrength = int(arrstr[12])  # [12]=sigStrength
            if(signalStrength>=8):
                print("*** Strong "+ arrstr[5].upper()+ " signal !!!\n")
        i=i+1


print("\n\n")
# Get the last line from the CSV data
#last_line = data[-1]
#print(last_line)
#print(data[-2])
#last_line_dict = last_line



# Create a dictionary from the last line
##keys = ['key1', 'key2', 'key3']  # Replace with your keys
##last_line_dict = dict(zip(keys, last_line))

# POST the last line to the PHP script
url = 'https://algoinvestorr.com/trades/cueintradaytrade.php'
print("Calling",url)
#response = requests.post(url, json=last_line_dict)
#response = requests.post(url, last_line_dict)
#print(response.text)  # Print the response from the PHP script
