#comments.py

##### base class order() fn
# @login_required
# def order(symbol, quantity, side, limitPrice=None, stopPrice=None, account_number=None, timeInForce='gtc', extendedHours=False, jsonify=True):
#     """A generic order function.

#     :param symbol: The stock ticker of the stock to sell.
#     :type symbol: str
#     :param quantity: The number of stocks to sell.
#     :type quantity: int
#     :param side: Either 'buy' or 'sell'
#     :type side: str
#     :param limitPrice: The price to trigger the market order.
#     :type limitPrice: float
#     :param stopPrice: The price to trigger the limit or market order.
#     :type stopPrice: float
#     :param account_number: the robinhood account number.
#     :type account_number: Optional[str]
#     :param timeInForce: Changes how long the order will be in effect for. 'gtc' = good until cancelled. \
#     'gfd' = good for the day.
#     :type timeInForce: str
#     :param extendedHours: Premium users only. Allows trading during extended hours. Should be true or false.
#     :type extendedHours: Optional[str]
#     :param jsonify: If set to False, function will return the request object which contains status code and headers.
#     :type jsonify: Optional[str]
#     :returns: Dictionary that contains information regarding the purchase or selling of stocks, \
#     such as the order id, the state of order (queued, confired, filled, failed, canceled, etc.), \
#     the price, and the quantity.

#     """ 
#     try:
#         symbol = symbol.upper().strip()
#     except AttributeError as message:
#         print(message, file=get_output())
#         return None

#     orderType = "market"
#     trigger = "immediate"

#     if side == "buy":
#         priceType = "ask_price"
#     else:
#         priceType = "bid_price"

#     if limitPrice and stopPrice:
#         price = round_price(limitPrice)
#         stopPrice = round_price(stopPrice)
#         orderType = "limit"
#         trigger = "stop"
#     elif limitPrice:
#         price = round_price(limitPrice)
#         orderType = "limit"
#     elif stopPrice:
#         stopPrice = round_price(stopPrice)
#         if side == "buy":
#             price = stopPrice
#         else:
#             price = None
#         trigger = "stop"
#     else:
#         price = round_price(next(iter(get_latest_price(symbol, priceType, extendedHours)), 0.00))
#     payload = {
#         'account': load_account_profile(account_number=account_number, info='url'),
#         'instrument': get_instruments_by_symbols(symbol, info='url')[0],
#         'symbol': symbol,
#         'price': price,
#         'quantity': quantity,
#         'ref_id': str(uuid4()),
#         'type': orderType,
#         'stop_price': stopPrice,
#         'time_in_force': timeInForce,
#         'trigger': trigger,
#         'side': side,
#         'extended_hours': extendedHours
#     }
#     # BEGIN PATCH FOR NEW ROBINHOOD BUY FORM (GuitarGuyChrisB 5/26/2023)
#     if side == "buy":
#         payload['order_form_version'] = "2"
#         payload['preset_percent_limit'] = "0.05"
#     # END PATCH FOR NEW ROBINHOOD BUY FORM (GuitarGuyChrisB 5/26/2023)

#     url = orders_url()


#     data = request_post(url, payload, jsonify_data=jsonify)

#     return(data)
#
#
#
#
# #
# When you call

# r.order_buy_limit

# which has a signature of:

# order_buy_limit(symbol, quantity, limitPrice, account_number=None, timeInForce='gtc', extendedHours=False, jsonify=True)

# That method calls

# order(symbol, quantity, "buy", account_number, limitPrice, None, timeInForce, extendedHours, jsonify)

# When your parameters are passed in, the resulting call is

# order("BBCP", 1, "buy", "XXXXXX", "8.42000000", None, 'gfd', True, True)

# The original signature for the order method is

# order(symbol, quantity, side, limitPrice=None, stopPrice=None, account_number=None, timeInForce='gtc', extendedHours=False, jsonify=True, market_hours='regular_hours')

# When your parameters are passed in according to position, you get:

# order(symbol="BBCP", quantity=1, side="buy", limitPrice="XXXXXX", stopPrice="8.42000000", account_number=None, timeInForce='gfd', extendedHours=True, jsonify=True, market_hours='regular_hours')

# The order method calls

# round_price(limitPrice)

# which in your case is

# round_price("XXXXXX")

# ...

# @justindavies I think that's what's causing your error. In order to avoid it, I would probably just use the order method and explicitly pass in your parameters while defining side = 'buy', stopPrice=None.

# ...
# @jmfernandes , would it be unreasonable to refactor the methods to call the order method using keyword arguments instead of positional arguments?

# Thanks, I enjoy your repo and would love to help out however possible :) !
