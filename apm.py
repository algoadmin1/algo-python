#
#    apm.py -  Automated Portfolio Manager by John Botti Jan 2024
#
#
#
from portfolio import Portfolio

#
#  apm should use (1) alphavantage to get HLC for last month, 
#
#  apm should use  udates for upcoming earnings for trading strategies, for example:
#       
#       EARNINGS_RUNUP_DEBIT_CALL_SPREAD,
#       EARNINGS_RUNUP_DEBIT_PUT_SPREAD,
#       BUY_WRITE_WHEEL,
#

portfolio1 = Portfolio( "Johnnie"  , "354333", "GYFBOB", "etrade", "E3F266FC2A10034D")

portfolio1.initialize()

portfolio1.authenticate()
portfolio1.getAssets()

portfolio1.print()

