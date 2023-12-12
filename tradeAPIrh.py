# robinhood API call for simple buy at limit order, by chatGPT

# at Terminal: pip install robin_stocks

import robin_stocks.robinhood as rh

# Log in to your Robinhood account
# Replace 'username' and 'password' with your actual login credentials
login = rh.login('your_username', 'your_password')

# Define order details
stock_symbol = 'AAPL'
limit_price = 190.00
quantity = 1  # Specify the quantity of shares you want to buy

# Place a buy order at the limit price
order = rh.order_buy_limit(stock_symbol, quantity, limit_price)

print(order)  # Print the order details


# Please ensure you use your actual Robinhood username and password when logging in. This code will attempt to execute a buy order for 1 share of AAPL at the specified limit price. 
# Adjust the quantity and limit_price variables as needed for your requirements.



######################### code to get rh positions

# import robin_stocks.robinhood as rh

# Log in to your Robinhood account
# Replace 'username' and 'password' with your actual login credentials
login = rh.login('your_username', 'your_password')

# Get all positions
positions = rh.build_holdings()

# Display the positions
for symbol, data in positions.items():
    print(f"Symbol: {symbol}")
    print(f"Quantity: {data['quantity']}")
    print(f"Average Buy Price: {data['average_buy_price']}")
    print(f"Current Price: {data['current_price']}")
    print("---------------------------")


######################### code to SELL AT MKT

# Log in to your Robinhood account
# Replace 'username' and 'password' with your actual login credentials
login = rh.login('your_username', 'your_password')

# Define order details
stock_symbol = 'AAPL'
stop_price = 185.00
quantity = 1  # Specify the quantity of shares you want to sell

# Place a sell order at the stop market price
order = rh.order_sell_stop_loss(stock_symbol, quantity, stop_price)

print(order)  # Print the order details