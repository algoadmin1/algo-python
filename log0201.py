# # log Feb 1 2024
# Today's date in New York: 2024-02-01

#  $$$ Welcome to the Algo Investor's 'Watch Dog' - the Automated Porfolio Manager (APM) $$$
#                   ^_
#    / \\__     o-''|\_____/)
#   (    @\___    \_/|_)     )
#   /         O      \  __  /
#  /   (_____/       (_/ (_/
# /_____/   U    


# This module will call the Brokerage APIs directly.
# Planned: Robinhood API, Fidelity API, Schwab/TD API, E*Trade API



# Attempting Robinhood Access...
# CheckPostionsRobinhood() Positions for  roguequant1@gmail.com
# ] Your Holdings  BEFORE TRADE  :
# 0  )
# MSFT {'price': '404.000000', 'quantity': '1.00000000', 'average_buy_price': '406.0500', 'equity': '404.00', 'percent_change': '-0.50', 'intraday_percent_change': '0.00', 'equity_change': '-2.050000', 'type': 'stock', 'name': 'Microsoft', 'id': '50810c35-d215-4866-9758-0ada4ac79ffa', 'pe_ratio': '35.958300', 'percentage': '4.49'}
# 1  )
# TSLA {'price': '188.360000', 'quantity': '10.00000000', 'average_buy_price': '183.2000', 'equity': '1883.60', 'percent_change': '2.82', 'intraday_percent_change': '0.00', 'equity_change': '51.600000', 'type': 'stock', 'name': 'Tesla', 'id': 'e39ed23a-7bd1-4587-b060-71988d9ef483', 'pe_ratio': '43.516300', 'percentage': '20.93'}
# 2  )
# AMZN {'price': '158.810700', 'quantity': '5.00000000', 'average_buy_price': '159.2000', 'equity': '794.05', 'percent_change': '-0.24', 'intraday_percent_change': '0.00', 'equity_change': '-1.946500', 'type': 'stock', 'name': 'Amazon', 'id': 'c0bb3aec-bd1e-471e-a4f0-ca011cbec711', 'pe_ratio': '81.035900', 'percentage': '8.82'}
# 3  )
# NVDA {'price': '630.150000', 'quantity': '1.00000000', 'average_buy_price': '630.2400', 'equity': '630.15', 'percent_change': '-0.01', 'intraday_percent_change': '-0.01', 'equity_change': '-0.090000', 'type': 'stock', 'name': 'NVIDIA', 'id': 'a4ecd608-e7b4-4ff3-afa5-f77ae7632dfb', 'pe_ratio': '81.238800', 'percentage': '7.00'}
# BID / ASK price for tsla =      188.330000   /   188.360000
# .robinhood*** BEFORE SELL new sendStock0rder( SELL 1 tsla stock ) sent to market.
# MARKET SELL ORDER: overriding orig price: 189.21 with ASK= 188.360000
# .robinhood*** AFTER  SELL new sendStock0rder( SELL 1 tsla stock ) sent to market.
# result.rs.robinhood= {'id': '65bbfd98-f27c-4d31-957e-6973c8e2b718', 'ref_id': 'fc794c03-1ba8-49ac-81ce-5e97f2788c8d', 'url': 'https://api.robinhood.com/orders/65bbfd98-f27c-4d31-957e-6973c8e2b718/', 'account': 'https://api.robinhood.com/accounts/497177477/', 'user_uuid': 'ed4f6f97-af00-48ec-b24b-3ada949c0eec', 'position': 'https://api.robinhood.com/positions/497177477/e39ed23a-7bd1-4587-b060-71988d9ef483/', 'cancel': 'https://api.robinhood.com/orders/65bbfd98-f27c-4d31-957e-6973c8e2b718/cancel/', 'instrument': 'https://api.robinhood.com/instruments/e39ed23a-7bd1-4587-b060-71988d9ef483/', 'instrument_id': 'e39ed23a-7bd1-4587-b060-71988d9ef483', 'cumulative_quantity': '0.00000000', 'average_price': None, 'fees': '0.00', 'state': 'unconfirmed', 'pending_cancel_open_agent': None, 'type': 'limit', 'side': 'sell', 'time_in_force': 'gfd', 'trigger': 'immediate', 'price': '188.36000000', 'stop_price': None, 'quantity': '1.00000000', 'reject_reason': None, 'created_at': '2024-02-01T20:22:48.594434Z', 'updated_at': '2024-02-01T20:22:48.594450Z', 'last_transaction_at': '2024-02-01T20:22:48.594434Z', 'executions': [], 'extended_hours': False, 'market_hours': 'regular_hours', 'override_dtbp_checks': False, 'override_day_trade_checks': False, 'response_category': None, 'stop_triggered_at': None, 'last_trail_price': None, 'last_trail_price_updated_at': None, 'last_trail_price_source': None, 'dollar_based_amount': None, 'total_notional': {'amount': '188.36', 'currency_code': 'USD', 'currency_id': '1072fc76-1862-41ab-82c2-485837590762'}, 'executed_notional': None, 'investment_schedule_id': None, 'is_ipo_access_order': False, 'ipo_access_cancellation_reason': None, 'ipo_access_lower_collared_price': None, 'ipo_access_upper_collared_price': None, 'ipo_access_upper_price': None, 'ipo_access_lower_price': None, 'is_ipo_access_price_finalized': False, 'is_visible_to_user': True, 'has_ipo_access_custom_price_limit': False, 'is_primary_account': True, 'order_form_version': 4, 'preset_percent_limit': None, 'order_form_type': 'all_day_trading_v1_2', 'last_update_version': None, 'placed_agent': 'user'}
# delaying  2 seconds...
# resuming...
# ] Your Holdings  AFTER TRADE  :
# 0  )
# MSFT {'price': '404.022000', 'quantity': '1.00000000', 'average_buy_price': '406.0500', 'equity': '404.02', 'percent_change': '-0.50', 'intraday_percent_change': '0.00', 'equity_change': '-2.028000', 'type': 'stock', 'name': 'Microsoft', 'id': '50810c35-d215-4866-9758-0ada4ac79ffa', 'pe_ratio': '35.958300', 'percentage': '4.49'}
# 1  )
# TSLA {'price': '188.365000', 'quantity': '9.00000000', 'average_buy_price': '183.2000', 'equity': '1695.29', 'percent_change': '2.82', 'intraday_percent_change': '0.00', 'equity_change': '46.485000', 'type': 'stock', 'name': 'Tesla', 'id': 'e39ed23a-7bd1-4587-b060-71988d9ef483', 'pe_ratio': '43.516300', 'percentage': '18.84'}
# 2  )
# AMZN {'price': '158.823900', 'quantity': '5.00000000', 'average_buy_price': '159.2000', 'equity': '794.12', 'percent_change': '-0.24', 'intraday_percent_change': '0.00', 'equity_change': '-1.880500', 'type': 'stock', 'name': 'Amazon', 'id': 'c0bb3aec-bd1e-471e-a4f0-ca011cbec711', 'pe_ratio': '81.035900', 'percentage': '8.83'}
# 3  )
# NVDA {'price': '630.158000', 'quantity': '1.00000000', 'average_buy_price': '630.2400', 'equity': '630.16', 'percent_change': '-0.01', 'intraday_percent_change': '-0.01', 'equity_change': '-0.082000', 'type': 'stock', 'name': 'NVIDIA', 'id': 'a4ecd608-e7b4-4ff3-afa5-f77ae7632dfb', 'pe_ratio': '81.238800', 'percentage': '7.00'}

# Enter Starting Balance ( 100000.0   [0=exit]):

