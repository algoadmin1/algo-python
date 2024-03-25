//
//
//  global variables for
//
var gVersionGlobalNum = "v12.115ui";

var gStockNum =-99;
var gStockSymbol="ABCD" ;
var gStockTrending = "Up" ;

var gBlueBGColorStr = "#3399ff";

var timetotradeGENERAL =  6;  //0..6    if( x <= timetotradeGENERAL)
var timetotradeLONG    = 11;  //7..11	if( x <= timetotradeLONG   )
var timetotradeSHORT   = 16;  //12..16	if( x <= timetotradeSHORT  )


var dormantIndicators = 0;
var dormantIndicatorsLONG  = 0;
var dormantIndicatorsSHORT = 0;

var timetotrade3a = [
                    "-Bearish",         "Stock Trending", "+Bullish",
/*
                   // "-Bad",             "Market News",     "+Good",
                   // "-Street Bearish",             "Earnings",     "+Street Bullish",
                   // "-Short",             "Almanac Long S&P 500",     "+Long",
                   // "-High",             "52-Week",     "+Low",
                    

                    "-Bad",             "RSRVD[News]",     "+Good",
                    "-Street Bearish",   "RSRVD[Earn]",     "+Street Bullish",
                    
                    "-Short",            "Almanac Long S&P 500",     "+Long",
                    "-High",             "52-Week",     "+Low",
*/
                  
                    "-Short",            "Almanac Long S&P",     "+Long",
                    "-High",             "52-Week",     "+Low",

                    "-Bad",             "RSRVD[News]",     "+Good",
                    "-Street Bearish",   "RSRVD[Earn]",     "+Street Bullish",
    



                    "-OverBOUGHT",        "RSI",        "+OverSOLD",
                    "-OverBOUGHT",        "Slow Stochastic",        "+OverSOLD",
// timetotradeGENERAL = 6                   


                    "No",         "+[Bullish Pennant]", "+Formed",
                    "No",         "+Buy Signal", "+Yes",
                    "No",            "+Hi-Close Doji", "+Yes",
                    "No",     "+at S1 Support","+Yes",
                    "No",     "+below GAP Down","+Yes",
// timetotradeLONG    = 11


                    "No",         "-[Bearish Wedge]", "-Formed",
                    "No",         "-Sell Signal", "-Yes",
                    "No",             "-Low-Close Doji", "-Yes",
                    "No",         "-at R1 Resistance", "-Yes",
                    "No",     "-above GAP Up","-Yes",
// timetotradeSHORT    = 16


                    "Low",             "END",     "High",
                    
                    ];

var gNumIndicators = timetotrade3a.length / 3;


// up to 40 indicaors    READ / WRITE
var gIndicators=[// stockTrend   mktNews    earnings    yrlyAlmanc   52wkHiLo   etc
                   "-1.0", "-1.0", "-1.0", "-1.0", "-1.0",  "-1.0", "-1.0", "-1.0", "-1.0", "-1.0",
                 
                   "-1.0", "-1.0", "-1.0", "-1.0", "-1.0",  "-1.0", "-1.0",   //"-1.0", "-1.0", "-1.0",
                 //  "-1.0", "-1.0", "-1.0", "-1.0", "-1.0",  "-1.0", "-1.0", "-1.0", "-1.0", "-1.0",
                 //  "-1.0", "-1.0", "-1.0", "-1.0", "-1.0",  "-1.0", "-1.0", "-1.0", "-1.0", "-1.0",
                   "-1.0"
                 
                   ];

var gIndicatorsLen = gIndicators.length;

var gLastBuySignal_i     = -1;
var gLastBuySignalValue  = -1;
var gLastBuySignalPrice  = -1;

var gLastSellSignal_i    = -1;
var gLastSellSignalValue = -1;
var gLastSellSignalPrice  = -1;


// General AI Indicators in order of gaugejb.js
var gAIstockTrending        = 0;

var gAIyearlyAlmanac        = 1;
var gAI52weekHiLo           = 2;

var gAImarketNews           = 3;
var gAIearnings             = 4;
/*
var gAImarketNews           = 1;   // old way
var gAIearnings             = 2;

var gAIyearlyAlmanac        = 3;
var gAI52weekHiLo           = 4;
*/
var gAIRSI                  = 5;
var gAIslowStochastic       = 6;

// Bullish Indicators
var   gAIbullishPennant       = 7;
var   gAIbullishWedge         = 7;  
var gAIbuySignal            = 8;
var gAIHCD                  = 9;
var gAIatMonthlyS1          =10;
var gAIbelowGapDown         =11;   // bullish

// Bearish Indicators
var   gAIbearishWedge         =12;
var gAIsellSignal           =13;
var gAILCD                  =14;
var gAIatMonthlyR1          =15;
var gAIaboveGapUp           =16;   // bearish



var gAIcatIndicatorStr     = "-1";


var gR4day                   =175;
var gR3day                   =173;
var gR2day                   =172;
var gR1day                   =171;

var gPday                    =31;
var gP3day                   =33;

var gS1day                   =181;
var gS2day                   =182;
var gS3day                   =183;
var gS4day                   =184;





var gR4month                   =175;
var gR3month                   =173;
var gR2month                   =172;
var gR1month                   =171;

var gPmonth                    =31;
var gP3month                   =33;

var gS1month                   =181;
var gS2month                   =182;
var gS3month                   =183;
var gS4month                   =184;



var gOPENday                 =481;
var gHIday                   =482;
var gLOWday                   =483;
var gCLOSEday                =484;


var gHCD_candleNum            = -1;
var gLCD_candleNum            = -1;

var gBuySig_candleNum         = -1;
var gSellSig_candleNum        = -1;

var gAtR1_candleNum            = -1;
var gAtS1_candleNum            = -1;

var gAboveGapDown_candleNum    = -1;
var gBelowGapUp_candleNum      = -1;

var gBullishPennant_candleNum   = -1;
var gBearishPennant_candleNum   = -1;

var gTestString = "500 max";
var gTestStringLCD = "100 min";


var gNumGapsDOWN_Open     = -1;    
var gNumGapsDOWN_Closed   = -1;

var gNumGapsUP_Open     = -1 ;    
var gNumGapsUP_Closed   = -1 ;



var gMostRecentGap_hi   = -1;
var gMostRecentGap_lo   = -1;


var gLastClose_PreScanAI =-1;

var gPrevStockNum =0;

//saved from candlesticks.drawCandlestickGeo..()
var gLastMonthNum=0;
var  gThisMonthX =0;
var  gDiffM =0; 



var gCorpName   = "Corp Name Unavailable";
var gCorpSector = "Corp Sector Unavailable";
   
    
 // jan thru dec % should be long the s&P ie March ==100%
var Almanac_LongSnP = [

                    "10",
                    "20",
                    "99",    // march

                    "95",
                    "65",
                    "50",     // jun

                    "40",
                    "50",
                    "70",     // sep

                    "60",
                    "50",
                    "40",      // dec

                    ];




// crypto digital
var digitalCurrencies = [

'1ST','FirstBlood ',
'2GIVE','GiveCoin ',
'808','808Coin ',
'ABT','ArcBlock ',
'ABY','ArtByte ',
'AC','AsiaCoin ',
'ACT','Achain ',
'ADA','Cardano ',
'ADT','adToken ',
'ADX','AdEx ',
'AE','Aeternity ',
'AEON','Aeon ',
'AGI','SingularityNET ',
'AGRS','IDNI-Agoras ',
'AI','POLY-AI ',
'AID','AidCoin ',
'AION','Aion ',
'AIR','AirToken ',
'AKY','Akuya-Coin ',
'ALIS','ALIS ',
'AMBER','AmberCoin ',
'AMP','Synereo ',
'AMPL','Ampleforth ',
'ANC','Anoncoin ',
'ANT','Aragon ',
'APPC','AppCoins ',
'APX','APX-Ventures ',
'ARDR','Ardor ',
'ARK','Ark ',
'ARN','Aeron ',
'AST','AirSwap ',
'ATB','ATBCoin ',
'ATM','ATMChain ',
'ATS','Authorship ',
'AUR','Auroracoin ',
'AVT','Aventus ',
'B3','B3Coin ',
'BAT','Basic-Attention-Token ',
'BAY','BitBay ',
'BBR','Boolberry ',
'BCAP','BCAP ',
'BCC','BitConnect ',
'BCD','Bitcoin-Diamond ',
'BCH','Bitcoin-Cash ',
'BCN','Bytecoin ',
'BCPT','BlockMason-Credit-Protocol-Token ',
'BCX','BitcoinX ',
'BCY','BitCrystals ',
'BDL','Bitdeal ',
'BEE','Bee-Token ',
'BELA','BelaCoin ',
'BET','DAO-Casino ',
'BFT','BF-Token ',
'BIS','Bismuth ',
'BITB','BitBean ',
'BITBTC','BitBTC ',
'BITCNY','BitCNY ',
'BITEUR','BitEUR ',
'BITGOLD','BitGOLD ',
'BITSILVER','BitSILVER ',
'BITUSD','BitUSD ',
'BIX','Bibox-Token ',
'BLITZ','Blitzcash ',
'BLK','Blackcoin ',
'BLN','Bolenum ',
'BLOCK','Blocknet ',
'BLZ','Bluzelle ',
'BMC','Blackmoon-Crypto ',
'BNB','Binance-Coin ',
'BNT','Bancor-Network-Token ',
'BNTY','Bounty0x ',
'BOST','BoostCoin ',
'BOT','Bodhi ',
'BQ','bitqy ',
'BRD','Bread ',
'BRK','Breakout-Coin ',
'BRX','Breakout-Stake ',
'BTA','Bata ',
'BTC','Bitcoin ',
'BTCD','BitcoinDark ',
'BTCP','Bitcoin-Private ',
'BTG','Bitcoin-Gold ',
'BTM','Bitmark ',
'BTS','BitShares ',
'BTSR','BTSR ',
'BTX','Bitcore ',
'BURST','Burstcoin ',
'BUSD','Binance-USD ',
'BUZZ','BuzzCoin ',
'BYC','Bytecent ',
'BYTOM','Bytom ',
'C20','Crypto20 ',
'CANN','CannabisCoin ',
'CAT','BlockCAT ',
'CCRB','CryptoCarbon ',
'CDT','Blox ',
'CFI','Cofound-it ',
'CHAT','ChatCoin ',
'CHIPS','Chips ',
'CLAM','Clams ',
'CLOAK','CloakCoin ',
'CMP','Compcoin ',
'CMT','CyberMiles ',
'CND','Cindicator ',
'CNX','Cryptonex ',
'COFI','CoinFi ',
'COSS','COSS ',
'COVAL','Circuits-Of-Value ',
'CRBIT','CreditBIT ',
'CREA','CreativeCoin ',
'CREDO','Credo ',
'CRW','Crown ',
'CSNO','BitDice ',
'CTR','Centra ',
'CTXC','Cortex ',
'CURE','CureCoin ',
'CVC','Civic ',
'DAI','Dai ',
'DAR','Darcrus ',
'DASH','Dash ',
'DATA','DATAcoin ',
'DAY','Chronologic ',
'DBC','DeepBrain-Chain ',
'DBIX','DubaiCoin ',
'DCN','Dentacoin ',
'DCR','Decred ',
'DCT','DECENT ',
'DDF','Digital-Developers-Fund ',
'DENT','Dent ',
'DFS','DFSCoin ',
'DGB','DigiByte ',
'DGC','Digitalcoin ',
'DGD','DigixDAO ',
'DICE','Etheroll ',
'DLT','Agrello-Delta ',
'DMD','Diamond ',
'DMT','DMarket ',
'DNT','district0x ',
'DOGE','DogeCoin ',
'DOPE','DopeCoin ',
'DRGN','Dragonchain ',
'DTA','Data ',
'DTB','Databits ',
'DYN','Dynamic ',
'EAC','EarthCoin ',
'EBST','eBoost ',
'EBTC','eBTC ',
'ECC','ECC ',
'ECN','E-coin ',
'EDG','Edgeless ',
'EDO','Eidoo ',
'EFL','Electronic-Gulden ',
'EGC','EverGreenCoin ',
'EKT','EDUCare ',
'ELA','Elastos ',
'ELEC','Electrify.Asia ',
'ELF','aelf ',
'ELIX','Elixir ',
'EMB','Embercoin ',
'EMC','Emercoin ',
'EMC2','Einsteinium ',
'ENG','Enigma ',
'ENJ','Enjin-Coin ',
'ENRG','EnergyCoin ',
'EOS','EOS ',
'EOT','EOT-Token ',
'EQT','EquiTrader ',
'ERC','EuropeCoin ',
'ETC','Ethereum-Classic ',
'ETH','Ethereum ',
'ETHD','Ethereum-Dark ',
'ETHOS','Ethos ',
'ETN','Electroneum ',
'ETP','Metaverse-Entropy ',
'ETT','EncryptoTel ',
'EVE','Devery ',
'EVX','Everex ',
'EXCL','ExclusiveCoin ',
'EXP','Expanse ',
'FCT','Factom ',
'FLDC','FoldingCoin ',
'FLO','FlorinCoin ',
'FLT','FlutterCoin ',
'FRST','FirstCoin ',
'FTC','Feathercoin ',
'FUEL','Etherparty ',
'FUN','FunFair ',
'GAM','Gambit ',
'GAME','GameCredits ',
'GAS','Gas ',
'GBG','Golos Gold ',
'GBX','GoByte ',
'GBYTE','Byteball ',
'GCR','GCRCoin ',
'GEO','GeoCoin ',
'GLD','GoldCoin ',
'GNO','Gnosis-Token ',
'GNT','Golem-Tokens ',
'GOLOS','Golos ',
'GRC','Gridcoin ',
'GRS','Groestlcoin ',
'GRWI','Growers-International ',
'GTC','Game ',
'GTO','Gifto ',
'GUP','Guppy ',
'GVT','Genesis-Vision ',
'GXS','GXShares ',
'HBN','HoboNickels ',
'HEAT','HEAT ',
'HMQ','Humaniq ',
'HPB','High-Performance-Blockchain ',
'HSR','Hshare ',
'HUSH','Hush ',
'HVN','Hive ',
'HXX','HexxCoin ',
'ICN','ICONOMI ',
'ICX','ICON ',
'IFC','Infinitecoin ',
'IFT','investFeed ',
'IGNIS','Ignis ',
'INCNT','Incent ',
'IND','Indorse-Token ',
'INF','InfChain ',
'INK','Ink ',
'INS','INS-Ecosystem ',
'INSTAR','Insights-Network ',
'INT','Internet-Node-Token ',
'INXT','Internxt ',
'IOC','IOCoin ',
'ION','ION ',
'IOP','Internet-of-People ',
'IOST','IOStoken ',
'IOTA','IOTA ',
'IOTX','IoTeX ',
'IQT','Iquant-Chain ',
'ITC','IoT-Chain ',
'IXC','iXcoin ',
'IXT','InsureX ',
'J8T','JET8 ',
'JNT','Jibrel-Network ',
'KCS','KuCoin ',
'KICK','KickCoin ',
'KIN','KIN ',
'KMD','Komodo ',
'KNC','Kyber-Network ',
'KORE','KoreCoin ',
'LBC','LBRY-Credits ',
'LCC','Litecoin-Cash ',
'LEND','EthLend ',
'LEV','Leverj ',
'LGD','Legends-Room ',
'LINDA','Linda ',
'LINK','ChainLink ',
'LKK','Lykke ',
'LMC','LoMoCoin ',
'LOCI','LOCIcoin ',
'LOOM','Loom-Token ',
'LRC','Loopring ',
'LSK','Lisk ',
'LTC','Litecoin ',
'LUN','Lunyr ',
'MAID','MaidSafeCoin ',
'MANA','Decentraland ',
'MAX','Maxcoin ',
'MBRS','Embers ',
'MCAP','MCAP ',
'MCO','Monaco ',
'MDA','Moeda-Loyalty-Points ',
'MEC','Megacoin ',
'MED','MediBlock ',
'MEME','Memetic ',
'MER','Mercury ',
'MGC','MergeCoin ',
'MGO','MobileGo ',
'MINEX','Minex ',
'MINT','Mintcoin ',
'MITH','Mithril ',
'MKR','Maker ',
'MLN','Melon ',
'MNE','Minereum ',
'MNX','MinexCoin ',
'MOD','Modum ',
'MONA','MonaCoin ',
'MRT','Miners-Reward-Token ',
'MSP','Mothership ',
'MTH','Monetha ',
'MTN','MedToken ',
'MUE','MonetaryUnit ',
'MUSIC','Musicoin ',
'MYB','MyBit-Token ',
'MYST','Mysterium ',
'MZC','Mazacoin ',
'NAMO','Namocoin ',
'NANO','Nano ',
'NAS','Nebulas-Token ',
'NAV','Nav-Coin ',
'NBT','NuBits ',
'NCASH','Nucleus-Vision ',
'NDC','NeverDie-Coin ',
'NEBL','Neblio ',
'NEO','NEO ',
'NEOS','NeosCoin ',
'NET','Nimiq ',
'NLC2','NoLimitCoin ',
'NLG','Gulden ',
'NMC','Namecoin ',
'NMR','Numeraire ',
'NOBL','NobleCoin ',
'NOTE','DNotes ',
'NPXS','Pundi-X-Token ',
'NSR','NuShares ',
'NTO','Fujinto ',
'NULS','Nuls ',
'NVC','Novacoin ',
'NXC','Nexium ',
'NXS','Nexus ',
'NXT','Nxt ',
'OAX','openANX ',
'OBITS','Obits ',
'OCL','Oceanlab ',
'OCN','Odyssey ',
'ODEM','ODEM ',
'ODN','Obsidian ',
'OF','OFCOIN ',
'OK','OKCash ',
'OMG','OmiseGo ',
'OMNI','Omni ',
'ONION','DeepOnion ',
'ONT','Ontology ',
'OPT','Opus ',
'OST','Simple-Token ',
'PART','Particl ',
'PASC','PascalCoin ',
'PAY','TenX ',
'PBL','Pebbles ',
'PBT','Primalbase-Token ',
'PFR','Payfair ',
'PING','CryptoPing ',
'PINK','Pinkcoin ',
'PIVX','PIVX ',
'PIX','Lampix ',
'PLBT','Polybius ',
'PLR','Pillar ',
'PLU','Pluton ',
'POA','POA-Network ',
'POE','Poet ',
'POLY','Polymath ',
'POSW','PoSW-Coin ',
'POT','PotCoin ',
'POWR','Power-Ledger ',
'PPC','Peercoin ',
'PPT','Populous ',
'PPY','Peerplays ',
'PRG','Paragon-Coin ',
'PRL','Oyster-Pearl ',
'PRO','Propy ',
'PST','Primas ',
'PTC','Pesetacoin ',
'PTOY','Patientory ',
'PURA','Pura ',
'QASH','QASH ',
'QAU','Quantum ',
'QLC','Qlink ',
'QRK','Quark ',
'QRL','Quantum-Resistant-Ledger ',
'QSP','Quantstamp ',
'QTL','Quatloo ',
'QTUM','Qtum ',
'QWARK','Qwark ',
'R','Revain ',
'RADS','Radium ',
'RAIN','Condensate ',
'RBIES','Rubies ',
'RBX','Ripto-Bux ',
'RBY','RubyCoin ',
'RCN','Ripio-Credit-Network ',
'RDD','ReddCoin ',
'RDN','Raiden-Network-Token ',
'REC','Regalcoin ',
'RED','Redcoin ',
'REP','Augur ',
'REQ','Request-Network ',
'RHOC','RChain ',
'RIC','Riecoin ',
'RISE','Rise ',
'RLC','RLC-Token ',
'RLT','RouletteToken ',
'RPX','Red-Pulse ',
'RRT','Recovery-Right-Tokens ',
'RUFF','Ruff ',
'RUP','Rupee ',
'RVT','Rivetz ',
'SAFEX','SafeExchangeCoin ',
'SALT','Salt ',
'SAN','Santiment-Network-Token ',
'SBD','Steem-Dollars ',
'SBTC','Super-Bitcoin ',
'SC','Siacoin ',
'SEELE','Seele ',
'SEQ','Sequence ',
'SHIFT','SHIFT ',
'SIB','SIBCoin ',
'SIGMA','SIGMAcoin ',
'SIGT','Signatum ',
'SJCX','Storjcoin-X ',
'SKIN','SkinCoin ',
'SKY','Skycoin ',
'SLR','SolarCoin ',
'SLS','SaluS ',
'SMART','SmartCash ',
'SMT','SmartMesh ',
'SNC','SunContract ',
'SNGLS','SingularDTV ',
'SNM','SONM ',
'SNRG','Synergy ',
'SNT','Status-Network-Token ',
'SOC','All-Sports ',
'SOUL','Phantasma ',
'SPANK','SpankChain ',
'SPC','SpaceChain ',
'SPHR','Sphere ',
'SPR','SpreadCoin ',
'SNX','Synthetix-Network-Token ',
'SRN','Sirin-Labs-Token ',
'START','Startcoin ',
'STEEM','Steem ',
'STK','STK-Token ',
'STORJ','Storj ',
'STORM','Storm ',
'STQ','Storiqa ',
'STRAT','Stratis ',
'STX','Stox ',
'SUB','Substratum ',
'SWFTC','SwftCoin ',
'SWIFT','Bitswift ',
'SWT','Swarm-City ',
'SYNX','Syndicate ',
'SYS','SysCoin ',
'TAAS','Taas ',
'TAU','Lamden ',
'TCC','The-ChampCoin ',
'TFL','True-Flip ',
'THC','HempCoin ',
'THETA','Theta-Token ',
'TIME','Time ',
'TIX','Blocktix ',
'TKN','TokenCard ',
'TKR','Trackr ',
'TKS','Tokes ',
'TNB','Time-New-Bank ',
'TNT','Tierion ',
'TOA','ToaCoin ',
'TRAC','OriginTrail ',
'TRC','Terracoin ',
'TRCT','Tracto ',
'TRIG','Triggers ',
'TRST','Trustcoin ',
'TRUE','TrueChain ',
'TRUST','TrustPlus ',
'TRX','Tronix ',
'TUSD','TrueUSD ',
'TX','TransferCoin ',
'UBQ','Ubiq ',
'UKG','UnikoinGold ',
'ULA','Ulatech ',
'UNB','UnbreakableCoin ',
'UNITY','SuperNET ',
'UNO','Unobtanium ',
'UNY','Unity-Ingot ',
'UP','UpToken ',
'URO','Uro ',
'USDT','Tether ',
'UTK','UTrust ',
'VEE','BLOCKv ',
'VEN','VeChain ',
'VERI','Veritaseum ',
'VIA','Viacoin ',
'VIB','Viberate ',
'VIBE','Vibe ',
'VIVO','VIVO ',
'VOISE','Voise ',
'VOX','Voxels ',
'VPN','VPNCoin ',
'VRC','Vericoin ',
'VRM','Verium ',
'VRS','Veros ',
'VSL','vSlice ',
'VTC','Vertcoin ',
'VTR','vTorrent ',
'WABI','WaBi ',
'WAN','Wanchain ',
'WAVES','Waves ',
'WAX','Wax-Token ',
'WCT','Waves-Community ',
'WDC','WorldCoin ',
'WGO','WavesGo ',
'WGR','Wagerr ',
'WINGS','Wings ',
'WPR','WePower ',
'WTC','Walton ',
'WTT','Giga-Watt-Token ',
'XAS','Asch ',
'XAUR','Xaurum ',
'XBC','Bitcoin-Plus ',
'XBY','XtraBYtes ',
'XCN','Cryptonite ',
'XCP','Counterparty ',
'XDN','DigitalNote ',
'XEL','Elastic ',
'NEM','NEM ',
'XHV','Haven-Protocol ',
'XID','Sphere-Identity ',
'XLM','Stellar ',
'XMG','Magi ',
'XMR','Monero ',
'XMT','Metal ',
'XMY','Myriadcoin ',
'XPM','Primecoin ',
'XRL','Rialto ',
'XRP','Ripple ',
'XSPEC','Spectrecoin ',
'XST','Stealthcoin ',
'XTZ','Tezos ',
'XUC','Exchange-Union ',
'XVC','Vcash ',
'XVG','Verge ',
'XWC','WhiteCoin ',
'XZC','ZCoin ',
'XZR','ZrCoin ',
'YEE','Yee ',
'YOYOW','YOYOW ',
'ZCC','ZcCoin ',
'ZCL','Zclassic ',
'ZCO','Zebi ',
'ZEC','Zcash ',
'ZEN','ZenCash ',
'ZET','Zetacoin ',
'ZIL','Zilliqa ',
'ZLA','Zilla ',
'ZRX','0x ',
// 540 crypto digital currencies found.
   ];

// physical traditional
var physicalCurrencies = [

'AED','United Arab Emirates Dirham ',
'AFN','Afghan Afghani ',
'ALL','Albanian Lek ',
'AMD','Armenian Dram ',
'ANG','Netherlands Antillean Guilder ',
'AOA','Angolan Kwanza ',
'ARS','Argentine Peso ',
'AUD','Australian Dollar ',
'AWG','Aruban Florin ',
'AZN','Azerbaijani Manat ',
'BAM','Bosnia-Herzegovina Convertible Mark ',
'BBD','Barbadian Dollar ',
'BDT','Bangladeshi Taka ',
'BGN','Bulgarian Lev ',
'BHD','Bahraini Dinar ',
'BIF','Burundian Franc ',
'BMD','Bermudan Dollar ',
'BND','Brunei Dollar ',
'BOB','Bolivian Boliviano ',
'BRL','Brazilian Real ',
'BSD','Bahamian Dollar ',
'BTN','Bhutanese Ngultrum ',
'BWP','Botswanan Pula ',
'BZD','Belize Dollar ',
'CAD','Canadian Dollar ',
'CDF','Congolese Franc ',
'CHF','Swiss Franc ',
'CLF','Chilean Unit of Account UF ',
'CLP','Chilean Peso ',
'CNH','Chinese Yuan Offshore ',
'CNY','Chinese Yuan ',
'COP','Colombian Peso ',
'CUP','Cuban Peso ',
'CVE','Cape Verdean Escudo ',
'CZK','Czech Republic Koruna ',
'DJF','Djiboutian Franc ',
'DKK','Danish Krone ',
'DOP','Dominican Peso ',
'DZD','Algerian Dinar ',
'EGP','Egyptian Pound ',
'ERN','Eritrean Nakfa ',
'ETB','Ethiopian Birr ',
'EUR','Euro ',
'FJD','Fijian Dollar ',
'FKP','Falkland Islands Pound ',
'GBP','British Pound Sterling ',
'GEL','Georgian Lari ',
'GHS','Ghanaian Cedi ',
'GIP','Gibraltar Pound ',
'GMD','Gambian Dalasi ',
'GNF','Guinean Franc ',
'GTQ','Guatemalan Quetzal ',
'GYD','Guyanaese Dollar ',
'HKD','Hong Kong Dollar ',
'HNL','Honduran Lempira ',
'HRK','Croatian Kuna ',
'HTG','Haitian Gourde ',
'HUF','Hungarian Forint ',
'IDR','Indonesian Rupiah ',
'ILS','Israeli New Sheqel ',
'INR','Indian Rupee ',
'IQD','Iraqi Dinar ',
'IRR','Iranian Rial ',
'ISK','Icelandic Krona ',
'JEP','Jersey Pound ',
'JMD','Jamaican Dollar ',
'JOD','Jordanian Dinar ',
'JPY','Japanese Yen ',
'KES','Kenyan Shilling ',
'KGS','Kyrgystani Som ',
'KHR','Cambodian Riel ',
'KMF','Comorian Franc ',
'KPW','North Korean Won ',
'KRW','South Korean Won ',
'KWD','Kuwaiti Dinar ',
'KYD','Cayman Islands Dollar ',
'KZT','Kazakhstani Tenge ',
'LAK','Laotian Kip ',
'LBP','Lebanese Pound ',
'LKR','Sri Lankan Rupee ',
'LRD','Liberian Dollar ',
'LSL','Lesotho Loti ',
'LYD','Libyan Dinar ',
'MAD','Moroccan Dirham ',
'MDL','Moldovan Leu ',
'MGA','Malagasy Ariary ',
'MKD','Macedonian Denar ',
'MMK','Myanma Kyat ',
'MNT','Mongolian Tugrik ',
'MOP','Macanese Pataca ',
'MRO','Mauritanian Ouguiya (pre-2018) ',
'MRU','Mauritanian Ouguiya ',
'MUR','Mauritian Rupee ',
'MVR','Maldivian Rufiyaa ',
'MWK','Malawian Kwacha ',
'MXN','Mexican Peso ',
'MYR','Malaysian Ringgit ',
'MZN','Mozambican Metical ',
'NAD','Namibian Dollar ',
'NGN','Nigerian Naira ',
'NOK','Norwegian Krone ',
'NPR','Nepalese Rupee ',
'NZD','New Zealand Dollar ',
'OMR','Omani Rial ',
'PAB','Panamanian Balboa ',
'PEN','Peruvian Nuevo Sol ',
'PGK','Papua New Guinean Kina ',
'PHP','Philippine Peso ',
'PKR','Pakistani Rupee ',
'PLN','Polish Zloty ',
'PYG','Paraguayan Guarani ',
'QAR','Qatari Rial ',
'RON','Romanian Leu ',
'RSD','Serbian Dinar ',
'RUB','Russian Ruble ',
'RUR','Old Russian Ruble ',
'RWF','Rwandan Franc ',
'SAR','Saudi Riyal ',
'SBDf','Solomon Islands Dollar ',
'SCR','Seychellois Rupee ',
'SDG','Sudanese Pound ',
'SDR','Special Drawing Rights ',
'SEK','Swedish Krona ',
'SGD','Singapore Dollar ',
'SHP','Saint Helena Pound ',
'SLL','Sierra Leonean Leone ',
'SOS','Somali Shilling ',
'SRD','Surinamese Dollar ',
'SYP','Syrian Pound ',
'SZL','Swazi Lilangeni ',
'THB','Thai Baht ',
'TJS','Tajikistani Somoni ',
'TMT','Turkmenistani Manat ',
'TND','Tunisian Dinar ',
'TOP','Tongan Pa`anga ',
'TRY','Turkish Lira ',
'TTD','Trinidad and Tobago Dollar ',
'TWD','New Taiwan Dollar ',
'TZS','Tanzanian Shilling ',
'UAH','Ukrainian Hryvnia ',
'UGX','Ugandan Shilling ',
'USD','United States Dollar ',
'UYU','Uruguayan Peso ',
'UZS','Uzbekistan Som ',
'VND','Vietnamese Dong ',
'VUV','Vanuatu Vatu ',
'WST','Samoan Tala ',
'XAF','CFA Franc BEAC ',
'XCD','East Caribbean Dollar ',
'XDR','Special Drawing Rights ',
'XOF','CFA Franc BCEAO ',
'XPF','CFP Franc ',
'YER','Yemeni Rial ',
'ZAR','South African Rand ',
'ZMW','Zambian Kwacha ',
'ZWL','Zimbabwean Dollar ',
// 156 physical currencies found.
   ];






//
// CLASSES
//
/*

// OPEN  HIGH LOW CLOSE VOL  DATE   PIVT PIVT3day  DAY     SYMBOL   BUY SELL
var O=0, H=1, L=2, C=3, V=4, DATE=5, P=6, P3=7,   MTWTF=8, SYMB=9 , BUYSELL=9 , LCDHCD=10, HILO=11, VOLRANGE=12, MVAVG50=12, MVAVG200=13, MVAVG100=14, CORPNAME=15 , SPLIT_COEF=15 ;    
var volLow = 100000000000, volHigh=-1, gPctNear=0.015;

*/


class AlgoIndicator{
    constructor(  typestr, typesubstr, pct, age, sym, price, udate ){
        this.typestr    = typestr        // doji  hcd
        this.typesubstr = typesubstr
        this.pct    = pct
        this.candleage    = age
        this.sym    = sym
        this.price = price
        this.udate = udate

    }
}
 

class CandlestickObj{
    constructor(  idx, sym, symtype,   currency,    corpname , udate, utime,  uday,
                  open, high, low, close, volume, p, p3, splitcoeff, divcoeff,
                  buysell, dojitype, dojinum , hilo, volrange,
                   mvavg50, mvavg100, mvavg200, mvavg500 ,mvavg1000 , 
                   gaprange, gapstart, rvol, vwap, mktcap, dayinqtr,dayinyr,
                   interval,
                  canvasx, canvasy, canvasw, canvash,
                  // june 22 2021 jmb
                  newDay, newWeek, newMonth, newYear ){

        this.idx        =idx
        this.sym        =sym
        this.symtype    =symtype    // ie stock crypto options futures


        this.currency   =currency   // for crypto ie LTC-USD

        this.corpname   =corpname
        this.udate      =udate
        this.utime      =utime
        this.uday       = uday  // mon tue fri etc

        this.open       =open
        this.high       =high
        this.low        =low
        this.close      =close
        this.volume     =volume


        this.p          =Number(p)
        this.p3         =Number(p3)
        this.p3vector   ={p_1: -1, p_2:-1, p_3: -1 }

        this.splitcoeff =splitcoeff
        this.divcoeff   =divcoeff
            
         this.buysell    = buysell
         this.dojitype   = dojitype
         this.dojinum    = dojinum
         this.hilo      = hilo
         this.volrange  = volrange

         this.mvavg50  = mvavg50
         this.mvavg100 = mvavg100
         this.mvavg200 = mvavg200
         this.mvavg500 = mvavg500 
         this.mvavg1000= mvavg1000 


         this.wedgehigh   = -1  
         this.wedgelow    =  -1
         this.wedgeslope  =  -1

         this.vol10day    =  -20



         this.gaprange   = gaprange           // ie +12.50 = gap up from  // or -9.50 = game DOWN from 
         this.gapstart   = gapstart           //             gapstart of $100.00  = $112.50   // = 90.50
         this.rvol       = rvol
         this.vwap       = vwap

         this.mktcap    = mktcap
         this.dayinqtr  = Number(dayinqtr)
         this.dayinyr   = Number(dayinyr)
         this.interval   = interval      //=="day", "15min"

         this.SupResDaily    = { s4:0, s3:0,s2:0,s1:0, p:0, p3:0, r1:0,r2:0, r3:0, r4:0 }
         this.SupResWeekly   = { s4:0, s3:0,s2:0,s1:0, p:0, p3:0, r1:0,r2:0, r3:0, r4:0 }
         this.SupResMonthly  = { s4:0, s3:0,s2:0,s1:0, p:0, p3:0, r1:0,r2:0, r3:0, r4:0 }
         

         this.canvasx       = canvasx
         this.canvasy       = canvasy
         this.canvasw       = canvasw
         this.canvash       = canvash

         this.newDay   = "nil";
         this.newWeek  = "nil";
         this.newMonth = "nil";
         this.newYear  = "nil";

    }
}
    

