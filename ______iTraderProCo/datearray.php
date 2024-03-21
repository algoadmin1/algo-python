<?php
    
ini_set('display_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set('America/Los_Angeles');
  
 
    
 
    
    
//     $alphaSet = "abcdefghijklmnopqrstuvwxyz0123456789*$@#!_-+";
//     $aSetCnt  = strlen( $alphaSet );
    
//     $strBR= "\n";

    
     

//     echo "<br /> hello programmer, here comes your date array...<br /><br />".  $alphaSet. "<br /><br />". $aSetCnt ;



// // Print the array from getdate()
// print_r(getdate(2592000));
// echo "<br><br>";

// Return date/time info of a timestamp; then format the output
//$mydate=getdate(date("U"));
// seconds since jan 1, 1970  == timestamp

$secondsInADay     = ( 60 * 60 * 24);   // 86400
$secondsInAYear    = $secondsInADay * 365.25 ;
$secondsInADecade  = $secondsInAYear * 10 ;
$secondsInACentury = $secondsInAYear * 100;

//echo "var dateArray = {<br />";
echo "var dateArray = [<br />";

$istart =1420156800; //= 1546387200; //= 631238400; // =  315619200; //=0;    // =1420156800 2015                   
//  0 = jan 1, 1970,   315619200 == jan 1 1980  ,1990-01-01=[631238400]  ,, 2019-01-01=1546387200

$iend   = $secondsInADecade*7; //*8 ;  // go out to 80 years +1970 = 2050  //=$secondsInACentury;

$j=0;
for($i=$istart ;  $i<$iend  ; $i+=$secondsInADay ){
 
    $mydate=getdate($i);

    $mymonth = "$mydate[mon]";
    if($mymonth<10) $mymonth= "0". "$mydate[mon]";

    $myday  = "$mydate[mday]";
    if($myday<10) $myday= "0". "$mydate[mday]";

    $myweekday = "$mydate[weekday]";
      $myweekday =  substr(  $myweekday , 0,3);

    $dayofyear="$mydate[yday]";
    $dayofyear++;

    $unxdateAlt    =  "d"."$mydate[year]". "_".  "$mymonth". "_". $myday;   // "$mydate[mday]" ;   // 2019-12-13
    $unxdate       =  "$mydate[year]". "-".  "$mymonth". "-". $myday;   // "$mydate[mday]" ;   // 2019-12-13
    $unxdateNoYear =                         "$mymonth". "-". $myday;   // "$mydate[mday]" ;   // 12-13


    if( $unxdateNoYear=="01-01"  || $unxdateNoYear=="04-01"  || $unxdateNoYear=="07-01"  || $unxdateNoYear=="10-01"   ){
      $j=1;

    }

    $holidaystr="*";
    if( $unxdateNoYear=="12-31" )  $holidaystr="New Years Eve";
    if( $unxdateNoYear=="01-01" )  $holidaystr="!New Years Day";
    if( $unxdateNoYear=="12-24" )  $holidaystr="Christmas Eve";
    if( $unxdateNoYear=="12-25" )  $holidaystr="!Christmas Day";
    if( $unxdateNoYear=="07-04" )  $holidaystr="!Independence Day";
    if( $unxdateNoYear=="02-14" )  $holidaystr="Valentines Day";
    if( $unxdateNoYear=="03-17" )  $holidaystr="St. Patricks Day";
    if( $unxdateNoYear=="10-31" )  $holidaystr="Halloween";
    if( $unxdateNoYear=="11-11" )  $holidaystr="Veterans Day";
    if( $unxdateNoYear=="12-13" )  $holidaystr="Programmer Johns Day";

    $yr = "$mydate[year]";

    $holidayDay = date("m-d",strtotime($yr."-01 third monday"));   //mlk day
    if( $unxdateNoYear==$holidayDay )  $holidaystr="!MLK Day";
    
    $holidayDay = date("m-d",strtotime($yr."-02 third monday"));   //mlk day
    if( $unxdateNoYear==$holidayDay )  $holidaystr="!Presidents Day";

     $holidayDay = date("m-d",strtotime($yr."-05 last monday"));   //memorial day
    if( $unxdateNoYear==$holidayDay )  $holidaystr="!Memorial Day";

      $holidayDay = date("m-d",strtotime($yr."-09 first monday"));   
    if( $unxdateNoYear==$holidayDay )  $holidaystr="!Labor Day";
 
      $holidayDay = date("m-d",strtotime($yr."-11 fourth thursday"));   
    if( $unxdateNoYear==$holidayDay )  $holidaystr="!Thanksgiving Day";

      $holidayDay = date("m-d",strtotime($yr."-05 second sunday"));   
    if( $unxdateNoYear==$holidayDay )  $holidaystr="Mothers Day";

      $holidayDay = date("m-d",strtotime($yr."-06 third sunday"));   
    if( $unxdateNoYear==$holidayDay )  $holidaystr="Fathers Day";

      $holidayDay = date("m-d",strtotime($yr."-10 second monday"));   
    if( $unxdateNoYear==$holidayDay )  $holidaystr="Columbus Day";

      $easterDays = easter_days($yr); // # days after March 21st
      $goodFridayDays = $easterDays-2 ;  

       $holidayDay = date("m-d",strtotime("+$easterDays days",mktime(1,1,1,3,21,$yr)));
      if( $unxdateNoYear==$holidayDay )   $holidaystr="Easter" ;

       $holidayDay = date("m-d",strtotime("+$goodFridayDays days",mktime(1,1,1,3,21,$yr)));
      if( $unxdateNoYear==$holidayDay )   $holidaystr="!Good Friday" ;







    if( $unxdateNoYear=="01-01" ){
       $secstr = "// $i";
     }else{
       $secstr = ""; // $i;

     }



    $dstr =  "'". $unxdate. "'". " , ".  "'". $j. "_". $dayofyear."_".  $myweekday. "_". $holidaystr.   "'". ", ". $secstr; 
    //$dstr =  '"'. $unxdate. '"'. " , ".  '"'. $j. "_". $dayofyear."_".  $myweekday. "_". $holidaystr.    '"'. ", ". $secstr; 
   // $dstr =  $unxdateAlt. " : ".  '"'. $j. "_". $dayofyear."_".  $myweekday. "_". $holidaystr.    '"'. ", "; 
   
   // echo "$mydate[weekday], $mydate[month] $mydate[mday], $mydate[year]  [$i]  ===== ". $dstr. "<br />";
    // echo  " [$i] = ". $dstr. "<br />";
   // echo  "   [$i] = ". $dstr. "<br />";
    
    echo   $dstr .  "<br />";
    /// for debug   echo   $dstr. "[".$holidayDay."]".  "<br />";

    // $j=$i*-1;
    // $mydate=getdate($j);

    //     echo "$mydate[weekday], $mydate[month] $mydate[mday], $mydate[year]   [$j]<br />";

    $j++;
     


}
echo "<br />    ];  // end of dateArray <br /> ";
//echo "<br />    };  // end of dateArray <br /> ";


/*

<script>
// Create an object:
var person = {
  firstName: "John",
  lastName : "Doe",
  id     :  5566
};
// Display some data from the object:
document.getElementById("demo").innerHTML =
person["firstName"] + " " + person["id"];
</script>


Wednesday, Jan. 1 — New Year's Day ****
Monday, Jan. 20 — Martin Luther King Jr. Day ****
Monday, Feb. 17 — Presidents' Day ****

Friday, April 10 — Good Friday
Monday, May 25 — Memorial Day ****

Friday, July 3 — Observance of July 4, Independence Day, which occurs on a Saturday ****
Monday, Sept. 7 — Labor Day ****
Thursday, Nov. 26 — Thanksgiving Day ****

Friday, Dec. 25 — Christmas Day ****



javascript assoc array:


var arr = { "one": 1, "two": 2, "three": 3 }; 
 we want

 var dateArray = { 
                  // key      :   dayOfQtr_dayOfWeek_holiday? == *=nil, ~tradingAlmanacDay, !MktHoliday
                   "2019-12-13": "74_Fri_*", 
                   "2019-12-14": "75_Sat_*", 
                   "2019-12-15": "76_Sun_*", 
                   ...
                   "2019-12-25": "86_Fri_!Christmas",
                 };

// LINK: http://www.neilbittner.com/us-holiday-date-function-php/

function getHolidays($year){
  $fixed_holidays = array(
    $year.'-01-01' => 'New Year\'s Day',
    $year.'-02-02' => 'Groundhog Day',
    $year.'-02-12' => 'Lincoln\'s Birthday',
    $year.'-02-14' => 'Valentine\'s Day',
    $year.'-03-17' => 'St. Patrick\'s Day',
    $year.'-04-01' => 'April Fool\'s Day',
    $year.'-04-22' => 'Earth Day',
    $year.'-06-14' => 'Flag Day',
    $year.'-07-04' => 'Independence Day',
    $year.'-09-11' => 'Patriot Day',
    $year.'-10-16' => 'Bosses\' Day',
    $year.'-10-31' => 'Halloween',
    $year.'-11-01' => 'All Saints\' Day',
    $year.'-11-11' => 'Veterans Day',
    $year.'-12-24' => 'Christmas Eve',
    $year.'-12-25' => 'Christmas Day',
    $year.'-12-26' => 'Kwanzaa',
    $year.'-12-31' => 'New Year\'s Eve',
  );
 
  $holidays = $fixed_holidays;
  // Martin Luther King Jr. Day (Third Monday in January)
  $holidayDay = date("Y-m-d",strtotime($year."-01 third monday"));
  $holidays[$holidayDay] = 'Martin Luther King Jr. Day';

  // Presidents' Day (Third Monday in February)
  $holidayDay = date("Y-m-d",strtotime($year."-02 third monday"));
  $holidays[$holidayDay] = 'Presidents\' Day';

  // Mother's Day (Second Sunday in May)
  $holidayDay = date("Y-m-d",strtotime($year."-05 second sunday"));
  $holidays[$holidayDay] = 'Mother\'s Day';

  // Memorial Day (Last Monday in May)
  $holidayDay = date("Y-m-d",strtotime($year."-06-01 last monday"));
  $holidays[$holidayDay] = 'Memorial Day';

  // Father's Day (Third Sunday in June)
  $holidayDay = date("Y-m-d",strtotime($year."-06 third sunday"));
  $holidays[$holidayDay] = 'Father\'s Day';

  // Labor Day (First Monday in September)
  $holidayDay = date("Y-m-d",strtotime($year."-09 first monday"));
  $holidays[$holidayDay] = 'Labor Day';

  // Columbus Day (Second Monday in October)
  $holidayDay = date("Y-m-d",strtotime($year."-10 second monday"));
  $holidays[$holidayDay] = 'Columbus Day';

  // Thanksgiving Day (Fourth Thursday in November)
  $holidayDay = date("Y-m-d",strtotime($year."-11 fourth thursday"));
  $holidays[$holidayDay] = 'Thanksgiving Day';
 
  // Easter holidays
  $easterDays = easter_days($year); // # days after March 21st
  $easterDate = date("Y-m-d",strtotime("+$easterDays days",mktime(1,1,1,3,21,$year)));
  $holidays[$easterDate] = 'Easter';
 
  return $holidays;
}


<?php
$holidays = getHolidays(2014);
foreach($holidays as $date => $holiday){
  print("$holiday: $date<br />");
}
?>
*/

?>




 
