<?php

/** 
                    by John Botti 08.20.2020,   10/14/13, 02.07.15
       aiDTregister.php - adapted from: userNewsignup.php    Version __________    - w/ NEW geobytes.com ___                   ver 5.4
//                                                                                 - with returning unique user ID #
* .php - Unity to SQL Database Connection
**/

//date_default_timezone_set("America/New_York");
//$nyTime == date("h:i:sa"). " on ".  date("Y-m-d") ;

//date_default_timezone_set("America/LosAngeles");



//   https://itraderpro.co/av/getdailydata.php?sym=dis&ds=2020-07-14&de=2016-12-13&num=112&msgs=1


//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set("America/New_York");
$nyTime = date("h:i:sa"). " on ".  date("Y-m-d") ;
date_default_timezone_set("America/Los_Angeles");
ob_implicit_flush(1);

set_time_limit(0);

$msgs =1;

$sym="";
$dstart="";
$dend="";

$msgs=0;
$numCandlesReq = 200;  


 if(isset( $_GET['msgs'] )){
        $msgs = $_GET['msgs'] ;
    }else{
        $msgs =0 ;
    }
   if($msgs==1)  echo "<br />] msgs= $msgs <br />";



 if(isset( $_GET['sym'] )){
        $sym = $_GET['sym'] ;
    }else{
        $sym = "QQQ";
    }
   $sym = strtoupper($sym);

   if($msgs==1) {
echo "] sym = ". $sym ;
echo "<br />";
}

if(isset( $_GET['ds'] )){
        $dstart = $_GET['ds'] ;
    }else{
        $dstart = "2020-10-01"; //09-30";
    }
 
   if($msgs==1) echo "] ds = ". $dstart ;


if(isset( $_GET['de'] )){
        $dend = $_GET['de'] ;
    }else{
        $dend = "2019-01-01";
    }
 
    if($msgs==1) {

    echo "] de = ". $dend ;

echo "<br />";
}

if(isset( $_GET['num'] )){
        $numCandlesReq = $_GET['num'] ;
    }else{
        $numCandlesReq = 200;  
    }
 
   if($msgs==1) {
    echo "] numCandlesReq = ". $numCandlesReq ;

echo "<br />";
}

$verNo="6.0 getdailydata !";
$last_id ="";
$MIN_CANDLE_COUNT = 5;

// ########################################################################################
// 1 == go do Mysql SELECT to see if it exists IFnot THEN INSERT
// 0 == no insert
                     //   $MASTER_INSERT_FLAG = 0;
                        $MASTER_INSERT_FLAG = 1;
//
//
// ########################################################################################

  
   if($msgs==1) {
    echo "] Reached Server... vers. $verNo <br />] The Time in New York is $nyTime, this system is running on PST. <br />";

    echo "<br />] ticker == $sym ...";
    echo "<br />] Connecting...";

}
 

// ########################################################################################
// ########################################################################################  MASTER LIST



// running at 2020-09-28 4:24am PDT
$stocksList_MASTERLIST = array(

'DOW30',
'MMM','AXP','AAPL','BA','CAT','CVX','CSCO','KO','DOW','XOM','GS','HD','INTC','IBM','JNJ','JPM','MCD','MRK','MSFT','NKE',
'PFE','PG','TRV','UTX','UNH','VZ','V','WBA','WMT','DIS',
//'DUMMYSTOCK' );



'SNP500',
//$stocksList_snp = array(
'MMM','AOS','ABT','ABBV','ABMD','ACN','ATVI','ADBE','AAP','AMD','AES','AFL','A','APD','AKAM','ALK','ALB','ARE','ALXN','ALGN',
'ALLE','LNT','ALL','GOOGL','GOOG','MO','AMZN','AMCR','AEE','AAL','AEP','AXP','AIG','AMT','AWK','AMP','ABC','AME','AMGN','APH',
'ADI','ANSS','ANTM','AON','APA','AIV','AAPL','AMAT','APTV','ADM','ANET','AJG','AIZ','T','ATO','ADSK','ADP','AZO','AVB','AVY',
'BKR','BLL','BAC','BAX','BDX','BRK.B','BBY','BIO','BIIB','BLK','BA','BKNG','BWA','BXP','BSX','BMY','AVGO','BR','BF.B','CHRW',
'COG','CDNS','CPB','COF','CAH','KMX','CCL','CARR','CAT','CBOE','CBRE','CDW','CE','CNC','CNP','CTL','CERN','CF','SCHW','CHTR',
'CVX','CMG','CB','CHD','CI','CINF','CTAS','CSCO','C','CFG','CTXS','CME','CMS','KO','CTSH','CL','CMCSA','CMA','CAG','CXO',
'COP','ED','STZ','CPRT','GLW','CTVA','COST','COTY','CCI','CSX','CMI','CVS','DHI','DHR','DRI','DVA','DE','DAL','XRAY','DVN',
'DXCM','FANG','DLR','DFS','DISCA','DISCK','DISH','DG','DLTR','D','DPZ','DOV','DOW','DTE','DUK','DRE','DD','DXC','ETFC','EMN',
'ETN','EBAY','ECL','EIX','EW','EA','EMR','ETR','EOG','EFX','EQIX','EQR','ESS','EL','RE','EVRG','ES','EXC','EXPE','EXPD',
'EXR','XOM','FFIV','FB','FAST','FRT','FDX','FIS','FITB','FRC','FE','FISV','FLT','FLIR','FLS','FMC','F','FTNT','FTV','FBHS',
'FOXA','FOX','BEN','FCX','GPS','GRMN','IT','GD','GE','GIS','GM','GPC','GILD','GPN','GL','GS','GWW','HRB','HAL','HBI',
'HIG','HAS','HCA','PEAK','HSIC','HES','HPE','HLT','HFC','HOLX','HD','HON','HRL','HST','HWM','HPQ','HUM','HBAN','HII','IEX',
'IDXX','INFO','ITW','ILMN','INCY','IR','INTC','ICE','IBM','IFF','IP','IPG','INTU','ISRG','IVZ','IPGP','IQV','IRM','JBHT','JKHY',
'J','SJM','JNJ','JCI','JPM','JNPR','KSU','K','KEY','KEYS','KMB','KIM','KMI','KLAC','KSS','KHC','KR','LB','LHX','LH',
'LRCX','LW','LVS','LEG','LDOS','LEN','LLY','LNC','LIN','LYV','LKQ','LMT','L','LOW','LYB','MTB','MRO','MPC','MKTX','MAR',
'MMC','MLM','MAS','MA','MXIM','MKC','MCD','MCK','MDT','MRK','MET','MTD','MGM','MCHP','MU','MSFT','MAA','MHK','TAP','MDLZ',
'MNST','MCO','MS','MSI','MSCI','MYL','NDAQ','NOV','NTAP','NFLX','NWL','NEM','NWSA','NWS','NEE','NLSN','NKE','NI','NBL','NSC',
'NTRS','NOC','NLOK','NCLH','NRG','NUE','NVDA','NVR','ORLY','OXY','ODFL','OMC','OKE','ORCL','OTIS','PCAR','PKG','PH','PAYX','PAYC',
'PYPL','PNR','PBCT','PEP','PKI','PRGO','PFE','PM','PSX','PNW','PXD','PNC','PPG','PPL','PFG','PG','PGR','PLD','PRU','PEG',
'PSA','PHM','PVH','QRVO','QCOM','PWR','DGX','RL','RJF','RTX','O','REG','REGN','RF','RSG','RMD','RHI','ROK','ROL','ROP',
'ROST','RCL','SPGI','CRM','SBAC','SLB','STX','SEE','SRE','NOW','SHW','SPG','SWKS','SLG','SNA','SO','LUV','SWK','SBUX','STT',
'STE','SYK','SIVB','SYF','SNPS','SYY','TMUS','TROW','TTWO','TPR','TGT','TEL','FTI','TDY','TFX','TXN','TXT','BK','CLX','COO',
'HSY','MOS','TRV','DIS','TMO','TIF','TJX','TSCO','TT','TDG','TFC','TWTR','TYL','TSN','USB','UDR','ULTA','UAA','UA','UNP',
'UAL','UNH','UPS','URI','UHS','UNM','VLO','VAR','VTR','VRSN','VRSK','VZ','VRTX','VFC','VIAC','V','VNO','VMC','WRB','WAB',
'WBA','WMT','WM','WAT','WEC','WFC','WELL','WST','WDC','WU','WRK','WY','WHR','WMB','WLTW','WYNN','XEL','XRX','XLNX','XYL',
'YUM','ZBRA','ZBH','ZION','ZTS',
// 'DUMMYSTOCK' );



// $stocksList = array(
//$stocksList_nas = array( 
'NASDAQ3000',
'AAIT','AAL','AAME','AAOI','AAON','AAPL','AAVL','AAWW','AAXJ','ABAC','ABAX','ABCB','ABCD','ABCO','ABCW','ABDC','ABGB','ABIO','ABMD','ABTL',
'ABY','ACAD','ACAS','ACAT','ACET','ACFC','ACFN','ACGL','ACHC','ACHN','ACIW','ACLS','ACNB','ACOR','ACPW','ACRX','ACSF','ACST','ACTA','ACTG',
'ACTS','ACUR','ACWI','ACWX','ACXM','ADAT','ADBE','ADEP','ADES','ADHD','ADI','ADMA','ADMP','ADMS','ADNC','ADP','ADRA','ADRD','ADRE','ADRU',
'ADSK','ADTN','ADUS','ADVS','ADXS','ADXSW','AEGN','AEGR','AEHR','AEIS','AEPI','AERI','AETI','AEY','AEZS','AFAM','AFCB','AFFX','AFH','AFMD',
'AFOP','AFSI','AGEN','AGII','AGIIL','AGIO','AGNC','AGNCB','AGNCP','AGND','AGRX','AGTC','AGYS','AGZD','AHGP','AHPI','AIMC','AINV','AIQ','AIRM',
'AIRR','AIRT','AIXG','AKAM','AKAO','AKBA','AKER','AKRX','ALCO','ALDR','ALDX','ALGN','ALGT','ALIM','ALKS','ALLB','ALLT','ALNY','ALOG','ALOT',
'ALQA','ALSK','ALTR','ALXA','ALXN','AMAG','AMAT','AMBA','AMBC','AMBCW','AMCC','AMCF','AMCN','AMCX','AMD','AMDA','AMED','AMGN','AMIC','AMKR',
'AMNB','AMOT','AMOV','AMPH','AMRB','AMRI','AMRK','AMRN','AMRS','AMSC','AMSF','AMSG','AMSGP','AMSWA','AMTX','AMWD','AMZN','ANAC','ANAD','ANAT',
'ANCB','ANCI','ANCX','ANDE','ANGI','ANGO','ANIK','ANIP','ANSS','ANTH','ANY','AOSL','APAGF','APDN','APDNW','APEI','APOG','APOL','APPY','APRI',
'APSA','APTO','APWC','AQXP','ARAY','ARCB','ARCC','ARCI','ARCP','ARCPP','ARCW','ARDM','ARDX','AREX','ARGS','ARIA','ARII','ARIS','ARKR','ARLP',
'ARMH','ARNA','AROW','ARQL','ARRS','ARRY','ARTNA','ARTW','ARTX','ARUN','ARWR','ASBB','ASBI','ASCMA','ASEI','ASFI','ASMB','ASMI','ASML','ASNA',
'ASPS','ASPX','ASRV','ASRVP','ASTC','ASTE','ASTI','ASUR','ASYS','ATAI','ATAX','ATEA','ATEC','ATHN','ATHX','ATLC','ATLO','ATML','ATNI','ATNY',
'ATOS','ATRA','ATRC','ATRI','ATRM','ATRO','ATRS','ATSG','ATTU','ATVI','AUBN','AUDC','AUMA','AUMAU','AUMAW','AUPH','AUXL','AVAV','AVEO','AVGO',
'AVHI','AVID','AVNR','AVNW','AWAY','AWRE','AXAS','AXDX','AXGN','AXJS','AXPW','AXPWW','AXTI','AZPN','BABY','BAGR','BAMM','BANF','BANFP','BANR',
'BANX','BASI','BBBY','BBC','BBCN','BBEP','BBEPP','BBGI','BBLU','BBNK','BBOX','BBP','BBRG','BBRY','BBSI','BCBP','BCLI','BCOM','BCOR','BCOV',
'BCPC','BCRX','BDBD','BDCV','BDE','BDGE','BDMS','BDSI','BEAT','BEAV','BEBE','BECN','BELFA','BELFB','BFIN','BGCP','BGFV','BGMD','BHBK','BIB',
'BICK','BIDU','BIIB','BIND','BIOC','BIOD','BIOL','BIOS','BIRT','BIS','BJRI','BKCC','BKEP','BKEPP','BKMU','BKSC','BKYF','BLCM','BLDP','BLDR',
'BLFS','BLIN','BLKB','BLMN','BLMT','BLRX','BLUE','BLVD','BLVDU','BLVDW','BMRC','BMRN','BMTC','BNCL','BNCN','BNDX','BNFT','BNSO','BOBE','BOCH',
'BOFI','BOKF','BONA','BONT','BOOM','BOSC','BOTA','BOTJ','BPFH','BPFHP','BPFHW','BPOP','BPOPM','BPOPN','BPTH','BRCD','BRCM','BRDR','BREW','BRID',
'BRKL','BRKR','BRKS','BRLI','BSDM','BSET','BSF','BSFT','BSPM','BSQR','BSRR','BSTC','BTUI','BUR','BUSE','BV','BVA','BVSN','BWEN','BWFG',
'BWINA','BWINB','BWLD','BYBK','BYFC','BYLK','CA','CAAS','CAC','CACB','CACC','CACG','CACGU','CACGW','CACH','CACQ','CADC','CADT','CADTR','CADTU',
'CADTW','CAKE','CALA','CALD','CALI','CALL','CALM','CAMB','CAMBU','CAMBW','CAMP','CAMT','CAPN','CAPNW','CAR','CARA','CARB','CARO','CART','CARV',
'CARZ','CASH','CASI','CASM','CASS','CASY','CATM','CATY','CATYW','CAVM','CBAK','CBAN','CBAY','CBDE','CBF','CBFV','CBIN','CBLI','CBMG','CBMX',
'CBNJ','CBNK','CBOE','CBPO','CBRL','CBRX','CBSH','CBSHP','CBST','CBSTZ','CCBG','CCCL','CCCR','CCIH','CCLP','CCMP','CCNE','CCOI','CCRN','CCUR',
'CCXI','CDC','CDK','CDNA','CDNS','CDTI','CDW','CDXS','CDZI','CECE','CECO','CELG','CELGZ','CEMI','CEMP','CENT','CENTA','CENX','CERE','CERN',
'CERS','CERU','CETV','CEVA','CFA','CFBK','CFFI','CFFN','CFGE','CFNB','CFNL','CFO','CFRX','CFRXW','CFRXZ','CG','CGEN','CGIX','CGNX','CGO',
'CHCI','CHCO','CHDN','CHEF','CHEV','CHFC','CHFN','CHI','CHKE','CHKP','CHLN','CHMG','CHNR','CHOP','CHRS','CHRW','CHSCM','CHSCN','CHSCO','CHSCP',
'CHTR','CHUY','CHW','CHXF','CHY','CHYR','CIDM','CIFC','CIMT','CINF','CISAW','CISG','CIZ','CIZN','CJJD','CKEC','CKSW','CLAC','CLACU','CLACW',
'CLBH','CLCT','CLDN','CLDX','CLFD','CLIR','CLMS','CLMT','CLNE','CLNT','CLRB','CLRBW','CLRO','CLRX','CLSN','CLTX','CLUB','CLVS','CLWT','CMCO',
'CMCSA','CMCSK','CMCT','CME','CMFN','CMGE','CMLS','CMPR','CMRX','CMSB','CMTL','CNAT','CNBKA','CNCE','CNDO','CNET','CNIT','CNLM','CNLMR','CNLMU',
'CNLMW','CNMD','CNOB','CNSI','CNSL','CNTF','CNTY','CNV','CNXR','CNYD','COB','COBK','COBZ','COCO','COHR','COHU','COKE','COLB','COLM','COMM',
'COMT','CONE','CONN','COOL','CORE','CORI','CORT','COSI','COST','COVS','COWN','COWNL','CPAH','CPGI','CPHC','CPHD','CPHR','CPIX','CPLA','CPLP',
'CPRT','CPRX','CPSI','CPSS','CPST','CPTA','CPXX','CRAI','CRAY','CRDC','CRDS','CRDT','CREE','CREG','CRESW','CRESY','CRIS','CRME','CRMT','CRNT',
'CROX','CRRC','CRRS','CRTN','CRTO','CRUS','CRVL','CRWN','CRWS','CRZO','CSBK','CSCD','CSCO','CSF','CSFL','CSGP','CSGS','CSII','CSIQ','CSOD',
'CSPI','CSQ','CSRE','CSTE','CSUN','CSWC','CTAS','CTBI','CTCM','CTCT','CTG','CTHR','CTIB','CTIC','CTRE','CTRL','CTRN','CTRP','CTRX','CTSH',
'CTSO','CTWS','CTXS','CU','CUBA','CUI','CUNB','CUTR','CVBF','CVCO','CVCY','CVGI','CVGW','CVLT','CVLY','CVTI','CVV','CWAY','CWBC','CWCO',
'CWST','CXDC','CY','CYAN','CYBE','CYBR','CYBX','CYCC','CYCCP','CYHHZ','CYNO','CYOU','CYRN','CYTK','CYTR','CYTX','CZFC','CZNC','CZR','CZWI',
'DAEG','DAIO','DAKT','DARA','DATE','DAVE','DAX','DBVT','DCIX','DCOM','DCTH','DENN','DEPO','DERM','DEST','DFRG','DFVL','DFVS','DGAS','DGICA',
'DGICB','DGII','DGLD','DGLY','DGRE','DGRS','DGRW','DHIL','DHRM','DIOD','DISCA','DISCB','DISCK','DISH','DJCO','DLBL','DLBS','DLHC','DLTR','DMLP',
'DMND','DMRC','DNBF','DNKN','DORM','DOVR','DOX','DPRX','DRAD','DRAM','DRIV','DRNA','DRRX','DRWI','DRWIW','DRYS','DSCI','DSCO','DSGX','DSKX',
'DSKY','DSLV','DSPG','DSWL','DTLK','DTSI','DTUL','DTUS','DTV','DTYL','DTYS','DVAX','DVCR','DWA','DWAT','DWCH','DWSN','DXCM','DXGE','DXJS',
'DXKW','DXLG','DXM','DXPE','DXPS','DXYN','DYAX','DYNT','DYSL','EA','EAC','EARS','EBAY','EBIO','EBIX','EBMT','EBSB','EBTC','ECHO','ECOL',
'ECPG','ECTE','ECYT','EDAP','EDGW','EDS','EDUC','EEFT','EEI','EEMA','EEME','EEML','EFII','EFOI','EFSC','EFUT','EGAN','EGBN','EGHT','EGLE',
'EGLT','EGOV','EGRW','EGRX','EGT','EHTH','EIGI','ELGX','ELNK','ELON','ELOS','ELRC','ELSE','ELTK','EMCB','EMCF','EMCG','EMCI','EMDI','EMEY',
'EMIF','EMITF','EMKR','EML','EMMS','EMMSP','ENDP','ENFC','ENG','ENOC','ENPH','ENSG','ENT','ENTA','ENTG','ENTR','ENVI','ENZN','ENZY','EOPN',
'EPAX','EPAY','EPIQ','EPRS','EPZM','EQIX','ERI','ERIC','ERIE','ERII','EROC','ERS','ERW','ESBF','ESBK','ESCA','ESCR','ESCRP','ESEA','ESGR',
'ESIO','ESLT','ESMC','ESPR','ESRX','ESSA','ESSX','ESXB','ESYS','ETFC','ETRM','EUFN','EVAL','EVAR','EVBS','EVEP','EVK','EVLV','EVOK','EVOL',
'EVRY','EWBC','EXA','EXAC','EXAS','EXEL','EXFO','EXLP','EXLS','EXPD','EXPE','EXPO','EXTR','EXXI','EYES','EZCH','EZPW','FALC','FANG','FARM',
'FARO','FAST','FATE','FB','FBIZ','FBMS','FBNC','FBNK','FBRC','FBSS','FCAP','FCBC','FCCO','FCCY','FCEL','FCFS','FCHI','FCLF','FCNCA','FCS',
'FCSC','FCTY','FCVA','FCZA','FCZAP','FDEF','FDIV','FDML','FDUS','FEIC','FEIM','FELE','FEMB','FES','FEUZ','FEYE','FFBC','FFBCW','FFHL','FFIC',
'FFIN','FFIV','FFKT','FFNM','FFNW','FFWM','FGEN','FHCO','FIBK','FINL','FISH','FISI','FISV','FITB','FITBI','FIVE','FIVN','FIZZ','FLAT','FLDM',
'FLEX','FLIC','FLIR','FLL','FLML','FLWS','FLXN','FLXS','FMB','FMBH','FMBI','FMER','FMI','FMNB','FNBC','FNFG','FNGN','FNHC','FNJN','FNLC',
'FNRG','FNSR','FOLD','FOMX','FONE','FONR','FORD','FORM','FORR','FORTY','FOSL','FOX','FOXA','FOXF','FPRX','FPXI','FRAN','FRBA','FRBK','FRED',
'FREE','FRGI','FRME','FRP','FRPH','FRPHV','FRPT','FRSH','FSAM','FSBK','FSBW','FSC','FSCFL','FSFG','FSFR','FSGI','FSLR','FSNN','FSRV','FSTR',
'FSYS','FTCS','FTD','FTEK','FTGC','FTHI','FTLB','FTNT','FTR','FTSL','FTSM','FUEL','FULL','FULLL','FULT','FUNC','FUND','FV','FWM','FWP',
'FWRD','FXCB','FXEN','FXENP','GABC','GAI','GAIA','GAIN','GAINO','GAINP','GALE','GALT','GALTU','GALTW','GAME','GARS','GASS','GBCI','GBDC','GBIM',
'GBLI','GBNK','GBSN','GCBC','GCVRZ','GDEF','GENC','GENE','GEOS','GERN','GEVA','GEVO','GFED','GFN','GFNCP','GFNSL','GGAC','GGACR','GGACU','GGACW',
'GGAL','GHDX','GIFI','GIGA','GIGM','GIII','GILD','GILT','GK','GKNT','GLAD','GLADO','GLBS','GLBZ','GLDC','GLDD','GLDI','GLMD','GLNG','GLPI',
'GLRE','GLRI','GLUU','GLYC','GMAN','GMCR','GMLP','GNBC','GNCA','GNCMA','GNMA','GNMK','GNTX','GNVC','GOGO','GOLD','GOMO','GOOD','GOODN','GOODO',
'GOODP','GOOG','GOOGL','GPIC','GPOR','GPRE','GPRO','GRBK','GRFS','GRID','GRIF','GRMN','GROW','GRPN','GRVY','GSBC','GSIG','GSIT','GSM','GSOL',
'GSVC','GT','GTIM','GTIV','GTLS','GTWN','GTXI','GUID','GULF','GULTU','GURE','GWGH','GWPH','GYRO','HA','HABT','HAFC','HAIN','HALL','HALO',
'HART','HAS','HAWK','HAWKB','HAYN','HBAN','HBANP','HBCP','HBHC','HBIO','HBK','HBMD','HBNC','HBNK','HBOS','HBP','HCAC','HCACU','HCACW','HCAP',
'HCBK','HCCI','HCKT','HCOM','HCSG','HCT','HDNG','HDP','HDRA','HDRAR','HDRAU','HDRAW','HDS','HDSN','HEAR','HEES','HELE','HEOP','HERO','HFBC',
'HFBL','HFFC','HFWA','HGSH','HIBB','HIFS','HIHO','HIIQ','HILL','HIMX','HKTV','HLIT','HLSS','HMHC','HMIN','HMNF','HMNY','HMPR','HMST','HMSY',
'HMTV','HNH','HNNA','HNRG','HNSN','HOFT','HOLI','HOLX','HOMB','HOTR','HOTRW','HOVNP','HPJ','HPTX','HQY','HRTX','HRZN','HSGX','HSIC','HSII',
'HSKA','HSNI','HSOL','HSON','HSTM','HTBI','HTBK','HTBX','HTCH','HTHT','HTLD','HTLF','HTWO','HTWR','HUBG','HURC','HURN','HWAY','HWBK','HWCC',
'HWKN','HYGS','HYLS','HYND','HYZD','HZNP','IACI','IART','IBB','IBCA','IBCP','IBKC','IBKR','IBOC','IBTX','ICAD','ICCC','ICEL','ICFI','ICLD',
'ICLDW','ICLN','ICLR','ICON','ICPT','ICUI','IDCC','IDRA','IDSA','IDSY','IDTI','IDXX','IEP','IESC','IEUS','IFAS','IFEU','IFGL','IFNA','IFON',
'IFV','IGLD','IGOV','IGTE','III','IIIN','IIJI','IILG','IIN','IIVI','IKAN','IKGH','IKNX','ILMN','IMDZ','IMGN','IMI','IMKTA','IMMR','IMMU',
'IMMY','IMNP','IMOS','IMRS','INAP','INBK','INCR','INCY','INDB','INDY','INFA','INFI','INFN','INGN','ININ','INNL','INO','INOD','INPH','INSM',
'INSY','INTC','INTG','INTL','INTLL','INTU','INTX','INVE','INVT','INWK','IOSP','IPAR','IPAS','IPCC','IPCI','IPCM','IPDN','IPGP','IPHS','IPKW',
'IPWR','IPXL','IQNT','IRBT','IRDM','IRDMB','IRDMZ','IRG','IRIX','IRMD','IROQ','IRWD','ISBC','ISCA','ISHG','ISIG','ISIL','ISIS','ISLE','ISM',
'ISNS','ISRG','ISRL','ISSC','ISSI','ISTR','ITCI','ITIC','ITRI','ITRN','IVAC','IVAN','IXYS','JACK','JACQ','JACQU','JACQW','JAKK','JASN','JASNW',
'JASO','JAXB','JAZZ','JBHT','JBLU','JBSS','JCOM','JCS','JCTCF','JD','JDSU','JGBB','JIVE','JJSF','JKHY','JMBA','JOBS','JOEZ','JOUT','JRJC',
'JRVR','JSM','JST','JTPY','JUNO','JVA','JXSB','JYNT','KALU','KANG','KBAL','KBIO','KBSF','KCAP','KCLI','KE','KELYA','KELYB','KEQU','KERX',
'KEYW','KFFB','KFRC','KFX','KGJI','KIN','KINS','KIRK','KITE','KLAC','KLIC','KLXI','KMDA','KNDI','KONA','KONE','KOOL','KOPN','KOSS','KPTI',
'KRFT','KRNY','KTCC','KTEC','KTOS','KTWO','KUTV','KVHI','KWEB','KYTH','KZ','LABC','LABL','LACO','LAKE','LALT','LAMR','LANC','LAND','LARK',
'LAWS','LAYN','LBAI','LBIX','LBRDA','LBRDK','LBRKR','LBTYA','LBTYB','LBTYK','LCNB','LCUT','LDRH','LDRI','LE','LECO','LEDS','LEVY','LEVYU','LEVYW',
'LFUS','LFVN','LGCY','LGCYO','LGCYP','LGIH','LGND','LHCG','LIME','LINC','LINE','LION','LIOX','LIQD','LIVE','LJPC','LKFN','LKQ','LLEX','LLNW',
'LLTC','LMAT','LMBS','LMCA','LMCB','LMCK','LMIA','LMNR','LMNS','LMNX','LMOS','LMRK','LNBB','LNCE','LNCO','LNDC','LOAN','LOCM','LOCO','LOGI',
'LOGM','LOJN','LONG','LOOK','LOPE','LORL','LOXO','LPCN','LPHI','LPLA','LPNT','LPSB','LPSN','LPTH','LPTN','LQDT','LRAD','LRCX','LSBK','LSCC',
'LSTR','LTBR','LTRE','LTRPA','LTRPB','LTRX','LTXB','LULU','LUNA','LVNTA','LVNTB','LWAY','LXRX','LYTS','MACK','MAG','MAGS','MAMS','MANH','MANT',
'MAR','MARA','MARK','MARPS','MASI','MAT','MATR','MATW','MAYS','MBCN','MBFI','MBFIP','MBII','MBLX','MBRG','MBSD','MBTF','MBUU','MBVT','MBWM',
'MCBC','MCBK','MCEP','MCGC','MCHP','MCHX','MCOX','MCRI','MCRL','MCUR','MDAS','MDCA','MDCO','MDIV','MDLZ','MDM','MDRX','MDSO','MDSY','MDVN',
'MDVXU','MDWD','MDXG','MEET','MEIL','MEILW','MEILZ','MEIP','MELA','MELI','MELR','MEMP','MENT','MEOH','MERC','MERU','METR','MFI','MFLX','MFNC',
'MFRI','MFRM','MFSF','MGCD','MGEE','MGI','MGIC','MGLN','MGNX','MGPI','MGRC','MGYR','MHGC','MHLD','MHLDO','MICT','MICTW','MIDD','MIFI','MIK',
'MIND','MINI','MITK','MITL','MKSI','MKTO','MKTX','MLAB','MLHR','MLNK','MLNX','MLVF','MMAC','MMLP','MMSI','MMYT','MNDL','MNDO','MNGA','MNKD',
'MNOV','MNRK','MNRO','MNST','MNTA','MNTX','MOBI','MOBL','MOCO','MOFG','MOKO','MOLG','MOMO','MORN','MOSY','MPAA','MPB','MPEL','MPET','MPWR',
'MRCC','MRCY','MRD','MRGE','MRKT','MRLN','MRNS','MRTN','MRTX','MRVC','MRVL','MSBF','MSCC','MSEX','MSFG','MSFT','MSG','MSLI','MSON','MSTR',
'MTBC','MTEX','MTGE','MTGEP','MTLS','MTRX','MTSC','MTSI','MTSL','MTSN','MU','MULT','MVIS','MWIV','MXIM','MXWL','MYGN','MYL','MYOS','MYRG',
'MZOR','NAII','NAME','NANO','NATH','NATI','NATL','NATR','NAUH','NAVG','NAVI','NBBC','NBIX','NBN','NBS','NBTB','NBTF','NCIT','NCLH','NCMI',
'NCTY','NDAQ','NDLS','NDRM','NDSN','NECB','NEO','NEOG','NEON','NEOT','NEPT','NERV','NETE','NEWP','NEWS','NEWT','NFBK','NFEC','NFLX','NGHC',
'NGHCP','NHTB','NICE','NICK','NILE','NKSH','NKTR','NLNK','NLST','NMIH','NMRX','NNBR','NPBC','NPSP','NRCIA','NRCIB','NRIM','NRX','NSEC','NSIT',
'NSPH','NSSC','NSTG','NSYS','NTAP','NTCT','NTES','NTGR','NTIC','NTK','NTLS','NTRI','NTRS','NTRSP','NTWK','NUAN','NURO','NUTR','NUVA','NVAX',
'NVCN','NVDA','NVDQ','NVEC','NVEE','NVEEW','NVFY','NVGN','NVMI','NVSL','NWBI','NWBO','NWBOW','NWFL','NWLI','NWPX','NWS','NWSA','NXPI','NXST',
'NXTD','NXTDW','NXTM','NYMT','NYMTP','NYMX','NYNY','OBAS','OBCI','OCC','OCFC','OCLR','OCLS','OCRX','OCUL','ODFL','ODP','OFED','OFIX','OFLX',
'OFS','OGXI','OHAI','OHGI','OHRP','OIIM','OKSB','OLBK','OLED','OMAB','OMCL','OMED','OMER','OMEX','ONB','ONCY','ONEQ','ONFC','ONNN','ONTX',
'ONTY','ONVI','OPB','OPHC','OPHT','OPOF','OPTT','OPXA','ORBC','ORBK','OREX','ORIG','ORIT','ORLY','ORMP','ORPN','ORRF','OSBC','OSBCP','OSHC',
'OSIR','OSIS','OSM','OSN','OSTK','OSUR','OTEL','OTEX','OTIC','OTIV','OTTR','OUTR','OVAS','OVBC','OVLY','OVTI','OXBR','OXBRW','OXFD','OXGN',
'OXLC','OXLCN','OXLCO','OXLCP','OZRK','PAAS','PACB','PACW','PAGG','PAHC','PANL','PARN','PATIV','PATK','PAYX','PBCP','PBCT','PBHC','PBIB','PBIP',
'PBMD','PBPB','PBSK','PCAR','PCBK','PCCC','PCH','PCLN','PCMI','PCO','PCOM','PCRX','PCTI','PCTY','PCYC','PCYG','PCYO','PDBC','PDCE','PDCO',
'PDEX','PDFS','PDII','PDLI','PEBK','PEBO','PEGA','PEGI','PEIX','PENN','PENX','PEOP','PERF','PERI','PERY','PESI','PETM','PETS','PETX','PFBC',
'PFBI','PFBX','PFIE','PFIN','PFIS','PFLT','PFMT','PFPT','PFSW','PGC','PGNX','PGTI','PHII','PHIIK','PHMD','PICO','PIH','PINC','PKBK','PKOH',
'PKT','PLAB','PLAY','PLBC','PLCE','PLCM','PLKI','PLMT','PLNR','PLPC','PLPM','PLTM','PLUG','PLUS','PLXS','PMBC','PMCS','PMD','PME','PMFG',
'PNBK','PNFP','PNNT','PNQI','PNRA','PNRG','PNTR','PODD','POOL','POPE','POWI','POWL','POZN','PPBI','PPC','PPHM','PPHMP','PPSI','PRAA','PRAH',
'PRAN','PRCP','PRFT','PRFZ','PRGN','PRGNL','PRGS','PRGX','PRIM','PRKR','PRLS','PRMW','PROV','PRPH','PRQR','PRSC','PRSS','PRTA','PRTK','PRTO',
'PRTS','PRXI','PRXL','PSAU','PSBH','PSCC','PSCD','PSCE','PSCF','PSCH','PSCI','PSCM','PSCT','PSCU','PSDV','PSEC','PSEM','PSIX','PSMT','PSTB',
'PSTI','PSTR','PSUN','PTBI','PTBIW','PTC','PTCT','PTEN','PTIE','PTLA','PTNR','PTNT','PTRY','PTSI','PTX','PULB','PVTB','PVTBP','PWOD','PWRD',
'PWX','PXLW','PZZA','QABA','QADA','QADB','QAT','QBAK','QCCO','QCLN','QCOM','QCRH','QDEL','QGEN','QINC','QIWI','QKLS','QLGC','QLIK','QLTI',
'QLTY','QLYS','QNST','QQEW','QQQ','QQQC','QQQX','QQXT','QRHC','QRVO','QSII','QTEC','QTNT','QTNTW','QTWW','QUIK','QUMU','QUNR','QURE','QVCA',
'QVCB','QYLD','RADA','RAIL','RAND','RARE','RAVE','RAVN','RBCAA','RBCN','RBPAA','RCII','RCKY','RCMT','RCON','RCPI','RCPT','RDCM','RDEN','RDHL',
'RDI','RDIB','RDNT','RDUS','RDVY','RDWR','RECN','REDF','REFR','REGI','REGN','REIS','RELL','RELV','REMY','RENT','REPH','RESN','REXI','REXX',
'RFIL','RGCO','RGDO','RGDX','RGEN','RGLD','RGLS','RGSE','RIBT','RIBTW','RICK','RIGL','RITT','RITTW','RIVR','RJET','RLJE','RLOC','RLOG','RLYP',
'RMBS','RMCF','RMGN','RMTI','RNA','RNET','RNST','RNWK','ROBO','ROCK','ROIA','ROIAK','ROIC','ROIQ','ROIQU','ROIQW','ROKA','ROLL','ROSE','ROSG',
'ROST','ROVI','ROYL','RP','RPRX','RPRXW','RPRXZ','RPTP','RPXC','RRD','RRGB','RRST','RSTI','RSYS','RTGN','RTIX','RTK','RTRX','RUSHA','RUSHB',
'RUTH','RVBD','RVLT','RVNC','RVSB','RWLK','RXDX','RXII','RYAAY','SAAS','SABR','SAEX','SAFM','SAFT','SAGE','SAIA','SAJA','SAL','SALE','SALM',
'SAMG','SANM','SANW','SANWZ','SAPE','SASR','SATS','SAVE','SBAC','SBBX','SBCF','SBCP','SBFG','SBGI','SBLK','SBLKL','SBNY','SBNYW','SBRA','SBRAP',
'SBSA','SBSI','SBUX','SCAI','SCHL','SCHN','SCLN','SCMP','SCOK','SCON','SCOR','SCSC','SCSS','SCTY','SCVL','SCYX','SEAC','SEED','SEIC','SEMI',
'SENEA','SENEB','SEV','SFBC','SFBS','SFLY','SFM','SFNC','SFST','SFXE','SGBK','SGC','SGEN','SGI','SGMA','SGMO','SGMS','SGNL','SGNT','SGOC',
'SGRP','SGYP','SGYPU','SGYPW','SHBI','SHEN','SHIP','SHLD','SHLDW','SHLM','SHLO','SHOO','SHOR','SHOS','SHPG','SIAL','SIBC','SIEB','SIEN','SIFI',
'SIFY','SIGA','SIGI','SIGM','SILC','SIMG','SIMO','SINA','SINO','SIRI','SIRO','SIVB','SIVBO','SIXD','SKBI','SKIS','SKOR','SKUL','SKYS','SKYW',
'SKYY','SLAB','SLCT','SLGN','SLM','SLMAP','SLMBP','SLP','SLRC','SLTC','SLVO','SLXP','SMAC','SMACR','SMACU','SMBC','SMCI','SMED','SMIT','SMLR',
'SMMF','SMPL','SMRT','SMSI','SMT','SMTC','SMTP','SMTX','SNAK','SNBC','SNC','SNCR','SNDK','SNFCA','SNHY','SNMX','SNPS','SNSS','SNTA','SOCB',
'SOCL','SODA','SOFO','SOHO','SOHOL','SOHOM','SOHU','SONA','SONC','SONS','SORL','SOXX','SP','SPAN','SPAR','SPCB','SPDC','SPEX','SPHS','SPIL',
'SPKE','SPLK','SPLS','SPNC','SPNS','SPOK','SPPI','SPPR','SPPRO','SPPRP','SPRO','SPRT','SPSC','SPTN','SPU','SPWH','SPWR','SQBG','SQBK','SQI',
'SQNM','SQQQ','SRCE','SRCL','SRDX','SREV','SRNE','SRPT','SRSC','SSB','SSBI','SSFN','SSH','SSNC','SSRG','SSRI','SSYS','STAA','STB','STBA',
'STBZ','STCK','STEM','STFC','STKL','STLD','STLY','STML','STMP','STNR','STPP','STRA','STRL','STRM','STRN','STRS','STRT','STRZA','STRZB','STX',
'STXS','SUBK','SUMR','SUNS','SUPN','SURG','SUSQ','SUTR','SVA','SVBI','SVVC','SWHC','SWIR','SWKS','SWSH','SYBT','SYKE','SYMC','SYMX','SYNA',
'SYNC','SYNL','SYNT','SYPR','SYRX','SYUT','SZMK','SZYM','TACT','TAIT','TAPR','TASR','TAST','TATT','TAX','TAXI','TAYD','TBBK','TBIO','TBK',
'TBNK','TBPH','TCBI','TCBIL','TCBIP','TCBIW','TCBK','TCCO','TCFC','TCPC','TCRD','TCX','TDIV','TEAR','TECD','TECH','TECU','TEDU','TENX','TERP',
'TESO','TESS','TFM','TFSC','TFSCR','TFSCU','TFSCW','TFSL','TGA','TGE','TGEN','TGLS','TGTX','THFF','THLD','THOR','THRM','THRX','THST','THTI',
'TICC','TIGR','TILE','TINY','TIPT','TISA','TITN','TIVO','TKAI','TKMR','TLF','TLMR','TLOG','TNAV','TNDM','TNGO','TNXP','TOPS','TORM','TOUR',
'TOWN','TQQQ','TRAK','TRCB','TRCH','TREE','TRGT','TRIB','TRIL','TRIP','TRIV','TRMB','TRMK','TRNS','TRNX','TROV','TROVU','TROVW','TROW','TRS',
'TRST','TRTL','TRTLU','TRTLW','TRUE','TRVN','TSBK','TSC','TSCO','TSEM','TSLA','TSRA','TSRE','TSRI','TSRO','TST','TSYS','TTEC','TTEK','TTGT',
'TTHI','TTMI','TTOO','TTPH','TTS','TTWO','TUBE','TUES','TUSA','TVIX','TVIZ','TWER','TWIN','TWMC','TWOU','TXN','TXRH','TYPE','TZOO','UACL',
'UAE','UBCP','UBFO','UBIC','UBNK','UBNT','UBOH','UBSH','UBSI','UCBA','UCBI','UCFC','UCTT','UDF','UEIC','UEPS','UFCS','UFPI','UFPT','UG',
'UGLD','UHAL','UIHC','ULBI','ULTA','ULTI','ULTR','UMBF','UMPQ','UNAM','UNB','UNFI','UNIS','UNTD','UNTY','UNXL','UPI','UPIP','UPLD','URBN',
'URRE','USAK','USAP','USAT','USATP','USBI','USCR','USEG','USLM','USLV','USMD','USTR','UTEK','UTHR','UTIW','UTMD','UTSI','UVSP','VA','VALU',
'VALX','VASC','VBFC','VBIV','VBLT','VBND','VBTX','VCEL','VCIT','VCLT','VCSH','VCYT','VDSI','VECO','VGGL','VGIT','VGLT','VGSH','VIA','VIAB',
'VIAS','VICL','VICR','VIDE','VIDI','VIEW','VIIX','VIIZ','VIMC','VIP','VIRC','VISN','VIVO','VLCCF','VLGEA','VLTC','VLYWW','VMBS','VNDA','VNET',
'VNOM','VNQI','VNR','VNRAP','VNRBP','VNRCP','VOD','VOLC','VONE','VONG','VONV','VOXX','VPCO','VRA','VRML','VRNG','VRNGW','VRNS','VRNT','VRSK',
'VRSN','VRTA','VRTB','VRTS','VRTU','VRTX','VSAR','VSAT','VSCI','VSCP','VSEC','VSTM','VTAE','VTHR','VTIP','VTL','VTNR','VTSS','VTWG','VTWO',
'VTWV','VUSE','VVUS','VWOB','VWR','VXUS','VYFC','WABC','WAFD','WAFDW','WASH','WATT','WAVX','WAYN','WB','WBA','WBB','WBKC','WBMD','WDC',
'WDFC','WEBK','WEN','WERN','WETF','WEYS','WFBI','WFD','WFM','WGBS','WHF','WHFBL','WHLM','WHLR','WHLRP','WHLRW','WIBC','WIFI','WILC','WILN',
'WIN','WINA','WIRE','WIX','WLB','WLBPZ','WLDN','WLFC','WLRH','WLRHU','WLRHW','WMAR','WMGI','WMGIZ','WOOD','WOOF','WPCS','WPPGY','WPRT','WRES',
'WRLD','WSBC','WSBF','WSCI','WSFS','WSFSL','WSTC','WSTG','WSTL','WTBA','WTFC','WTFCW','WTSL','WVFC','WVVI','WWD','WWWW','WYNN','XBKS','XCRA',
'XENE','XENT','XGTI','XGTIW','XIV','XLNX','XLRN','XNCR','XNET','XNPT','XOMA','XONE','XOOM','XPLR','XRAY','XTLB','XXIA','YDIV','YDLE','YHOO',
'YNDX','YOD','YORW','YPRO','YRCW','YY','Z','ZAGG','ZAZA','ZBRA','ZEUS','ZFGN','ZGNX','ZHNE','ZINC','ZION','ZIONW','ZIONZ','ZIOP','ZIV',
'ZIXI','ZLTQ','ZN','ZNGA','ZSPH','ZU','ZUMZ',


 'JBS_ETFS',
  'DIA','SPY','QQQ','VXX','GLD',  'SLV','TBT','TLT','USO','IWM',  'XLK','XLF','EEM', 'IEF', 'GBTC',

  'JBS_WATCHLIST',
  'SPCE','SBUX','LULU','RCL','SNAP','ETSY','EBAY','PTON','U','UBER','ROKU','FB','TSLA', 'ALB', 'NKLA' ,'MRNS','AAL','DAL','UAL','JBLU','LUV','RCL','AMGN','AMRN','NVAX','SRNE','CANN', 'GWPH', 'PFE','IMMU','N', 'X', 'BA', 'ZM', 'FARO','TTWO','EA','ATVI','LVS', 'WYNN','MGM', 'BYND','SPOT','ADT','NVDA','AMD',
  'L','K','KO','MCD','YUM','GS','BAC','C','WFC','JPM','AXP','V','T','HAL','PBR','XOM', 
 

'END_OF_MASTERLIST' );// EOF CSVs   note : 6 dummy tags 'DOW30'...



// ***************** TEST  *****************


$stocksList = array(

  // DOW

'MMM','AXP','AAPL','BA','CAT','CVX','CSCO','KO','DOW','XOM','GS','HD','INTC','IBM','JNJ','JPM','MCD','MRK','MSFT','NKE',
'PFE','PG','TRV','UTX','UNH','VZ','V','WBA','WMT','DIS',

//$stocksList_snp = array(
'MMM','AOS','ABT','ABBV','ABMD','ACN','ATVI','ADBE','AAP','AMD','AES','AFL','A','APD','AKAM','ALK','ALB','ARE','ALXN','ALGN',
'ALLE','LNT','ALL','GOOGL','GOOG','MO','AMZN','AMCR','AEE','AAL','AEP','AXP','AIG','AMT','AWK','AMP','ABC','AME','AMGN','APH',
'ADI','ANSS','ANTM','AON','APA','AIV','AAPL','AMAT','APTV','ADM','ANET','AJG','AIZ','T','ATO','ADSK','ADP','AZO','AVB','AVY',
'BKR','BLL','BAC','BAX','BDX','BRK.B','BBY','BIO','BIIB','BLK','BA','BKNG','BWA','BXP','BSX','BMY','AVGO','BR','BF.B','CHRW',
'COG','CDNS','CPB','COF','CAH','KMX','CCL','CARR','CAT','CBOE','CBRE','CDW','CE','CNC','CNP','CTL','CERN','CF','SCHW','CHTR',
'CVX','CMG','CB','CHD','CI','CINF','CTAS','CSCO','C','CFG','CTXS','CME','CMS','KO','CTSH','CL','CMCSA','CMA','CAG','CXO',
'COP','ED','STZ','CPRT','GLW','CTVA','COST','COTY','CCI','CSX','CMI','CVS','DHI','DHR','DRI','DVA','DE','DAL','XRAY','DVN',
'DXCM','FANG','DLR','DFS','DISCA','DISCK','DISH','DG','DLTR','D','DPZ','DOV','DOW','DTE','DUK','DRE','DD','DXC','ETFC','EMN',
'ETN','EBAY','ECL','EIX','EW','EA','EMR','ETR','EOG','EFX','EQIX','EQR','ESS','EL','RE','EVRG','ES','EXC','EXPE','EXPD',
'EXR','XOM','FFIV','FB','FAST','FRT','FDX','FIS','FITB','FRC','FE','FISV','FLT','FLIR','FLS','FMC','F','FTNT','FTV','FBHS',
'FOXA','FOX','BEN','FCX','GPS','GRMN','IT','GD','GE','GIS','GM','GPC','GILD','GPN','GL','GS','GWW','HRB','HAL','HBI',
'HIG','HAS','HCA','PEAK','HSIC','HES','HPE','HLT','HFC','HOLX','HD','HON','HRL','HST','HWM','HPQ','HUM','HBAN','HII','IEX',
'IDXX','INFO','ITW','ILMN','INCY','IR','INTC','ICE','IBM','IFF','IP','IPG','INTU','ISRG','IVZ','IPGP','IQV','IRM','JBHT','JKHY',
'J','SJM','JNJ','JCI','JPM','JNPR','KSU','K','KEY','KEYS','KMB','KIM','KMI','KLAC','KSS','KHC','KR','LB','LHX','LH',
'LRCX','LW','LVS','LEG','LDOS','LEN','LLY','LNC','LIN','LYV','LKQ','LMT','L','LOW','LYB','MTB','MRO','MPC','MKTX','MAR',
'MMC','MLM','MAS','MA','MXIM','MKC','MCD','MCK','MDT','MRK','MET','MTD','MGM','MCHP','MU','MSFT','MAA','MHK','TAP','MDLZ',
'MNST','MCO','MS','MSI','MSCI','MYL','NDAQ','NOV','NTAP','NFLX','NWL','NEM','NWSA','NWS','NEE','NLSN','NKE','NI','NBL','NSC',
'NTRS','NOC','NLOK','NCLH','NRG','NUE','NVDA','NVR','ORLY','OXY','ODFL','OMC','OKE','ORCL','OTIS','PCAR','PKG','PH','PAYX','PAYC',
'PYPL','PNR','PBCT','PEP','PKI','PRGO','PFE','PM','PSX','PNW','PXD','PNC','PPG','PPL','PFG','PG','PGR','PLD','PRU','PEG',
'PSA','PHM','PVH','QRVO','QCOM','PWR','DGX','RL','RJF','RTX','O','REG','REGN','RF','RSG','RMD','RHI','ROK','ROL','ROP',
'ROST','RCL','SPGI','CRM','SBAC','SLB','STX','SEE','SRE','NOW','SHW','SPG','SWKS','SLG','SNA','SO','LUV','SWK','SBUX','STT',
'STE','SYK','SIVB','SYF','SNPS','SYY','TMUS','TROW','TTWO','TPR','TGT','TEL','FTI','TDY','TFX','TXN','TXT','BK','CLX','COO',
'HSY','MOS','TRV','DIS','TMO','TIF','TJX','TSCO','TT','TDG','TFC','TWTR','TYL','TSN','USB','UDR','ULTA','UAA','UA','UNP',
'UAL','UNH','UPS','URI','UHS','UNM','VLO','VAR','VTR','VRSN','VRSK','VZ','VRTX','VFC','VIAC','V','VNO','VMC','WRB','WAB',
'WBA','WMT','WM','WAT','WEC','WFC','WELL','WST','WDC','WU','WRK','WY','WHR','WMB','WLTW','WYNN','XEL','XRX','XLNX','XYL',
'YUM','ZBRA','ZBH','ZION','ZTS',
'DUMMYSTOCK' );


// ########################################################################################

$slcnt = count ( $stocksList );

// ########################################################################################  END Dow + SnP + NASDAQ3000 == MASTER LIST












 
$symboljb =  $sym ;   //"nil"  ; 
    
$symbolsInDB      = ">>_";
$symbolsInDBCount=0;

$symbolsNOTInDB = "!!_" ;
$symbolsNOTInDBCount=0;


   if($msgs==1) {
    // echo "<br /><br />] ATTEMPTING TO CONTACT the ITRADERPRO  JH_MySql server...<br />] PDT = ". date("h:i:sa"). " on ".  date("Y-m-d") ;
    echo "<br /><br />] ATTEMPTING TO CONTACT the ITRADERPRO  JH_MySql server...<br />] PDT = ". date("h:i:s.u"). " on ".  date("Y-m-d") ;

    echo "<br />########################################################################################";
    //echo "<br />] CHECKING THE ARRAY: ". "$". "stockList[ $slcnt ]==";
    echo "<br />";
  }
    //print_r ($stocksList);
    // echo "<br />";
    // echo "<br />########################################################################################";
    // echo "<br />";
 


    $con = mysqli_connect("localhost", "itraderp_jb_jackabeejohn", "jackabee66", "itraderp_jb_jackabee_Users1");
    if (!$con) die('Could not connect to itraderp***kabee_Users1: ' . mysqli_error($con));
    mysqli_select_db($con, "itraderp_jb_jackabee_Users1") or die ("DB select failed - " . mysqli_error($con));


   if($msgs==1) {

    echo "<br />] MySql Connection Good!  <br />"; //"] StockList to Process: ";

   echo "<br />";

    echo "<br />########################################################################################";

    echo "<br />";
    echo "<br />";
}


$ro=0;
$p=0;
// for($p=0;$p<$slcnt;$p++){
 //   echo $p. "]".$stocksList[$p]."__";
   // $symboljb      = $stocksList[$p]  ;


	 $symboljbUpper = strtoupper( $symboljb ); 
   $tickerFound = 0;

$query5  = "SELECT * FROM symbolIndex   WHERE  ticker LIKE '$symboljbUpper' limit 1";
$result5 = mysqli_query($con, $query5); // or die("query failed ($query5) - " . mysql_error());  

          $j = 0;
          $id=-1;
          while($row = mysqli_fetch_array($result5))
          {
              $data_id                 = $row['id'];

              $data_symbolTable         = $row['symbolTable'];

               $data_dateStart         = $row['dateStart'];
               $data_dateEnd           = $row['dateEnd'];

               $data_fidStart         = $row['fidStart'];
               $data_fidEnd           = $row['fidEnd'];

               $data_numCandles       = $row['numCandles'];
        
              $foo = $data_numCandles  / 252;
               $data_numYears =   number_format((float)$foo, 2, '.', '');  // Outputs -> 105.00

             // $data_numYears =  $data_numCandles  / 252;

              $data_datetimepop         = $row['modtimestamp'] ; //. "_". $row['timepopulated']. " PDT";
              $data_datetimepop1        = $data_datetimepop; //$row['datepopulated']. "_". $row['timepopulated'] ;
              
              if($j==0){
                  $id     = $data_id;
                  //$tStamp = $data_timestamp;
                  //echo "  FOUND userName: $toUserNamesCheck1  id=$id    $tSt amp\n\n";
              }
              $j++; 
          }//while

 $ro++;
 // if( ($ro%150)==0) echo "<br />] CHECKING .symbolIndex ". $ro.  " times.";



            if($id>0){ // we found at least 1 w/ same userName

                 if($msgs==1) echo "[". $symboljbUpper . "]  EXISTS. #CandlesREQUESTED==". $numCandlesReq. " #Candles in Dbase =". $data_numCandles ." (". $data_numYears ." years) SYMtable== ". $data_symbolTable. " dateStart,end== ". $data_symbolTable. " | ".$data_dateStart  .", ". $data_dateEnd."<br />";

                  // cap it
                  if($numCandlesReq  > $data_numCandles){ 
                     $numCandlesReq = $data_numCandles;
                  }


 echo "open,high,low,close,adjclose,volume,divcoeff,split". "\n";
                  // build mysql req str

// SELECT * FROM `symbolsA` WHERE ticker like 'DIS' order by candledate desc limit 10
/*
SELECT * FROM `symbolsA` WHERE ticker like 'dis' and `candledate` < '2020-09-15' order by candledate desc  limit 20
*/

          // $query6  = "SELECT * FROM ". $data_symbolTable ."  WHERE  ticker LIKE '$symboljbUpper' ORDER BY  candledate desc limit ". $numCandlesReq;

          $query6  = "SELECT * FROM ". $data_symbolTable ."  WHERE  ticker LIKE '$symboljbUpper' and `candledate` < '".  $dstart ."' ORDER BY  candledate desc limit ". $numCandlesReq ;

          $result6 = mysqli_query($con, $query6); // or die("query failed ($query5) - " . mysql_error());  
   if($msgs==1)     echo  "<br />] after mysqli_query  query6==". $query6 ."<br />";
          $j1 = 0;
          $id1=-1;
          while($row = mysqli_fetch_array($result6))
          {
            // echo "<br />". $j1." " . $row['open'] .",".  $row['high'].",".  $row['low'] .",".  $row['close'] .",".  $row['volume'] .",".  $row['divcoeff'].",".  $row['split'] ."," ;
          //  echo  $row['candledate'] .",".$row['open'] .",".  $row['high'].",".  $row['low'] .",".  $row['close'] .",".  $row['volume'] .",".  $row['divcoeff'].",".  $row['split'] ."<br />";
           if($msgs==0)    echo  $row['candledate'] .",". f4($row['open']) .",".  f4($row['high']).",".  f4($row['low']) .",". f4( $row['close'] ) .",". f4( $row['close'] ) .",".  $row['volume'] .",".  f4($row['divcoeff']).",".  f4($row['split']) ;

           if( $j1 < ($numCandlesReq-1))   echo "\n";
   




                  if($msgs==1)     echo  "<br />". $j1. "]  ". $row['candledate'] .",". f4($row['open']) .",".  f4($row['high']).",".  f4($row['low']) .",". f4( $row['close'] ) .",". f4( $row['close'] ) .",".  $row['volume'] .",".  f4($row['divcoeff']).",".  f4($row['split']) ."\n";

            // CHECK ADJUSTED CLOSE

            $j1++;
          }




                  /// execute mysql


                  // loop & echo data







            }else{ 

                  if($msgs==1) echo "[". $symboljbUpper . "] DOES NOT EXISTS.";
              echo "!NoHistoricalData". "\n";

                 }




// }// for p   
// //  **************************************************************************************** LOOP HERE

 if($msgs==1){ echo "<br />";  echo "<br />";  echo "<br />";  echo "<br />";
}
//echo "] Searched $slcnt stocks.  Looped thru $p stocks - found $symbolsInDBCount symbols in Dbase!  See SYMBOLS NOT FOUND below.  <br />Found these: ". $symbolsInDB;


//  echo "] NUM SYMBOLS NOT FOUND: [". ($symbolsNOTInDBCount - 6) ."]  HERE:  ". $symbolsNOTInDB;
  if($msgs==1){ echo "<br />";  echo "<br />";
}






  if($msgs==1) echo "<br />";
  if($msgs==1) echo "<br />";

 
   if($msgs==1)  echo "******************  EXITING... ******************************  <br />] PDT = ". date("h:i:sa"). " on ".  date("Y-m-d") ."<br />";

	if($msgs==1) echo "<br />] Closing MySql DB... ";

    mysqli_close($con);
    unset($con );




	if($msgs==1){
    echo "<br /><br />] END RUNTIME== PDT = ". date("h:i:s.u"). " on ".  date("Y-m-d") ;

   echo "<br />] DB Closed Successfully. Bye for now JB.<br /><br />EOF.";
}




  // echo "\n";



///*************** EOcode

function f4( $fvar ){
                 return   ( number_format((float)$fvar, 4, '.', '')   );  // Outputs -> 105.00

}

?>

