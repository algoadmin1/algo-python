# postit.py   i.e. postIntradayTrades.py

import requests
import csv

# Read the CSV file and extract data
file_path = 'intradaytrades.txt'  # Replace with your file path
data = []
with open(file_path, 'r') as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        print(row)
        data.append(row)

# Get the last line from the CSV data
last_line = data[-1]
print(last_line)
last_line_dict = last_line



# Create a dictionary from the last line
##keys = ['key1', 'key2', 'key3']  # Replace with your keys
##last_line_dict = dict(zip(keys, last_line))

# POST the last line to the PHP script
url = 'https://algoinvestorr.com/trades/cueintradaytrade.php'
#response = requests.post(url, json=last_line_dict)
response = requests.post(url, last_line_dict)

print(response.text)  # Print the response from the PHP script
