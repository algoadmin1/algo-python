# postit.py   i.e. postIntradayTrades.py

import requests
import csv
import datetime
import pytz

#today_date_unix = datetime.datetime.now().timestamp()
#print(today_date_unix )

MAX_Elements=29
dtstr="nydatetime"
dstr="nydate"
tstr="nytime"
url = 'https://algoinvestorr.com/trades/recpost.php'


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
tstr =(f"{current_time_ny.strftime('%H:%M:%S')}")
tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
tstrHHMMstart = tstrHHMM
print("\n\n")
print("Current time in New York is:",tstr)
print("Current time in New York (Tradestation format) is :",tstrHHMM)


# Print today's date as a Unix timestamp
#print(f"Today's date as Unix timestamp: {int(today_date_unix)}")
 
print("\n\n")
print("\n\n")
# Read the CSV file and extract data
file_path = 'intradaytrades.txt'  # Replace with your file path
#file_path = 'intradaytradessm.txt'  # Replace with your file path
data = []
dataToday = []

dstr= "2023-12-13"
print("] OVERIDING dstr = "+dstr)
i=0
with open(file_path, 'r') as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        print("row=",row) 
        data_to_sendLast="nil,nil,"
        data_to_send = ','.join(row)
        print("i=",i,":  ",data_to_send)
        #payload = {'data': data_to_send}
        #response = requests.post(urlPost, data_to_send)
        #print(response.text)

        data.append(row)
        #print("i=",i,data[i])
        arrstr = data[i]
        #print("\n #0,10,21==",arrstr[0],arrstr[10],arrstr[21])
        if(arrstr[0] == dstr):
            #if dates match then POST
            print("Today's (", dstr ,") trade data[",i,"] =  ",data[i], "  SETting...\n")
            data_to_sendLast=data_to_send   
            
            dataToday.append(row)
            signalStrength = int(arrstr[12])  # [12]=sigStrength
            if(signalStrength>=8):
                print("*** Strong "+ arrstr[5].upper()+ " signal !!!\n")
            
        #j=0
        #tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
        #print("EDT tstrHHMM=",tstrHHMM)
        #print("\n\nToday's Trades Extracted today", dstr,": dataToday[][] at time=",tstrHHMM) 
        #for row1 in dataToday:
        #    if(j<MAX_Elements):  ## ie last rowstr[]=''
        #        rowstr = row1[j]
        #        diffTime = 1000 #int(rowstr[1]) - tstrHHMM
        #        print(j,": ",rowstr)
        #        if(j==1):
        #            diffTime = int(tstrHHMM) - int(rowstr) 
        #            print("tstrHHMM - row1[1]=", tstrHHMM, " - " ,rowstr, ", ",diffTime,"hrs ago.")
        #        j=j+1
        # end of j loop

        i=i+1



print("\n\nLAST ITEM:")
j=0
tstrHHMM =(f"{current_time_ny.strftime('%H%M')}")
print("EDT tstrHHMM=",tstrHHMM)
print("\n\nToday's Trades Extracted today", dstr,": dataToday[][] at time=",tstrHHMM) 
for row in dataToday:
    if(j<MAX_Elements):  ## ie last rowstr[]=''
        rowstr = row[j]
        diffTime = 1000 #int(rowstr[1]) - tstrHHMM
        print(j,": ",rowstr)
        if(j==1):
            diffTime = int(tstrHHMM) - int(rowstr) 
            print("tstrHHMM - row[1]=", tstrHHMM, " - " ,rowstr, ", ",diffTime,"hrs ago* MAth NOT Correct for time -.")
        j=j+1


print("\nEND OF Trade Injest.")

print("\n\n")


payload = {'data': data_to_sendLast }
response = requests.post(url, data=payload)
print(response.text)

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
url = 'https://algoinvestorr.com/trades/recpost.php'
print("Called: ",url)

print("\n\n")
print("\n\n")
print("\n\n")
#response = requests.post(url, json=last_line_dict)
#response = requests.post(url, last_line_dict)
#print(response.text)  # Print the response from the PHP script










############################ working _POST to use w/ recpost.php
# sendpost.py sample py => php sender

##import requests

# String data to be sent
##data_to_send = "a,b,c,d,34,554,1.2,g,h,i,j"

# URL to send POST request
##url = 'https://algoinvestorr.com/trades/recpost.php'

# Define data to be sent as a dictionary
##payload = {'data': data_to_send}

# Send POST request 
#response = requests.post(url, data_to_send)

# Print response from the server
##print(response.text)
##
############################ working _POST to use w/ recpost.php
