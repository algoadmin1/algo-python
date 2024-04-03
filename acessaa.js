// acessaa.js



function GetSecuritiesData( datafeedstr, symbolstr, sectypestr,intervalstr){


	if( datafeedstr != "alphavantage" ){
		return("Error_wrongDataFeedService_"+datafeedstr);
	}

	GetAlphaAdvantageData(sectypestr,intervalstr);
	
	// GetAlphaAdvantageData("stocks","day");
	// GetAlphaAdvantageData("crypto","day");


}