### README.md for algo-python

This repo has python code for grabbing yahoo finance data, chart graphing, a monte carlo trading simulator, and more

Note to new team members: No spaghetti code! We need to Code Clean and execute our vision of helping Clients Trade Smarter, with AlgoZ.ai

Testing a one line change from mac, using willbotti@gmail.com GIT vs algoadmin1

## Dependencies (stuff we need to import)
	pip install yfinance
	pip install pandas_market_calendars

##########################################
## Common Git Commands

git status                                                  

git add <file>										# add to list of files that will be committed 

git commit -m "Refactored spaghetti code"			# commits the changes, locally.  They still need to be pushed

git commit -am "Do it in one go"					# adds to index  (staging area) and commits in one step

git changelog										# shows the changelog (list of commits)

git push origin <branchname>						# push my local branch <branchname> to the server (origin)

git log -p -- filename								# show history of specific file, including patch info (ie change details)

git config -l									# show git configuration like user name,  email

#############################################

## Useful links: 
# MAC git cmd installer
https://git-scm.com/download/mac.

## TODO Items for the Botti Bros

Will:  
	add 3 day pivots, add simple graph. Fix current pivots to show YESTERDAY if we are actively trading, and also show the 'active' pivots intraday, but properly annotated
		Consider graphics for "gold on the back", "carrying the gold" , or whatever the sayings are around the blue / gold pivot crossover
	Fix exception on bad ticker entry (see BUG section below)
	Create diagram of 'computer assisted improvisation' AI product.  The market for AI-assisted music composition is still wide open, relative to other areas
	Continue dog-fooding  - use products personally and follow the signals, giving feedback etc
	
John: 
	visit Twin and Nephews in NC. Trust the process. LEVEL BLEST will cover half of ALL expenses incurred in trip, as a minimum.
	Continue boxing
	Finish coding up the Autobot
	Take care of paying customers on a proactive basis
	Raise $ and then Raise Hell w/ Fellow Moose and MIT MAFIA
	Hammer out partner agreement w/ Bro so expectations, exits, what-ifs are properly covered

Diego: 
	Start learning UE 5.3 - we need tutors + he can help on UE 5 promotional materials and plumbing with the new 'ai-assisted production techstack'

Matteo: 
	assist Uncle Johnnie w/ Social marketing/ad plan for our initial test products.  Use both AI and IRL network to promote and ID trends/eyeballs

Other notes, comments from python.py


## Other Reference
 
  # How to print column and row names of priceData:

	 for colName in priceData.columns:
	    print(colName)

	 for rowName in priceData.index:
	    print(rowName)

  # How to GET TODAYS DATE AND CONVERT IT TO A STRING WITH YYYY-MM-DD FORMAT (YFINANCE EXPECTS THAT FORMAT)

    end_date = datetime.now().strftime('%Y-%m-%d')
    amzn_hist = amzn.history(start='2022-01-01',end=end_date)
    print(amzn_hist)

  # How to understand period parameter:
     The following are the valid values: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max.

  # What are valid interval params to the .history() method ?  
     1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo


## BUGS TO FIX

# Pivots.py - fix bad ticker exception.  Example output:

        Enter Ticker: asdf
ASDF: Period '1d' is invalid, must be one of ['1mo', '3mo', '6mo', 'ytd', '1y', '2y', '5y', '10y', 'max']

                     asdf Daily                       Date

Traceback (most recent call last):
  File "C:\Users\willb\_dev\Projects\algo-python\pivots.py", line 326, in <module>
    PrintPivots("1d", "1d")
  File "C:\Users\willb\_dev\Projects\algo-python\pivots.py", line 267, in PrintPivots
    timeStamp = priceData.index[row]
                ~~~~~~~~~~~~~~~^^^^^
  File "C:\Users\willb\AppData\Local\Programs\Python\Python312\Lib\site-packages\pandas\core\indexes\base.py", line 5365, in __getitem__
    return getitem(key)
           ^^^^^^^^^^^^
IndexError: index -1 is out of bounds for axis 0 with size 0

# Pivots.py - MAC Bug
 Example output [JB please fill in if I don't get to it first]

