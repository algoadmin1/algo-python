#
# apm.py or Automated Portfolio Manager by John Botti Jan 2024
#
#
#
from portfolio import Portfolio


portfolio1 = Portfolio( "Johnnie"  , "354333", "GYFBOB", "etrade", "E3F266FC2A10034D")

portfolio1.initialize()

portfolio1.authenticate()
portfolio1.getAssets()

portfolio1.print()

