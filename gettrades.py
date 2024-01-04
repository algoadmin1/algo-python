#gettrades.py

import requests

def GetTrades(url):
    arrTrades = []
    response = requests.get(url)

    if response.status_code == 200:
        lines = response.text.split('\n')
        i=0
        for line in lines:
            print(i,line )
            i=i+1
            arrTrades.append(line)
            # if line[:8] == "RAWTRADES":
            #     arrTrades.append(line)
    
    return arrTrades

# Example usage:
url = 'https://algoinvestorr.com/trades/gettrades.php?d=2024-01-03'
result = GetTrades(url)
print(result)
