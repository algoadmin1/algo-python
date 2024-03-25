<?php

/** 
                    by John Botti 09.30.2022 
       userkeycheck.php - adapted from: userNewsignup.php    Version __________    - w/ NEW geobytes.com ___                   ver 5.4
//                                                                                 - with returning unique user ID #
* .php - Unity to SQL Database Connection
**/

//Setting up Error Reporting Level
ini_set('display_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set("America/New_York");
$nyTime = date("h:i:sa"). " on ".  date("Y-m-d") ;
date_default_timezone_set("America/Los_Angeles");
$laTime = date("h:i:sa"). " on ".  date("Y-m-d") ;

ob_implicit_flush(1);

set_time_limit(0);

$msgs =0;

$sym="";
$dstart="";
$dend="";
$useremail0 ="nil";

$numCandlesReq = 200;  

$NUM_TO_INSERT =100;

// NOTE **** IF EMAIL IS nil then it will insert $NUM_TO_INSERT keys...


         // if(isset( $_GET['msgs'] )){
         //        $msgs = $_GET['msgs'] ;
         //    }else{
         //        $msgs =0 ;
         //    }
         //   if($msgs==1)  echo "<br />] msgs= $msgs <br />";



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




        $uemail = "nil";

        if(isset( $_GET['uemail'] )){
                $uemail = $_GET['uemail'] ;
            }else{
                $uemail = "nil";
            }

        $useremail0 = strtolower($uemail);


        if($msgs==1) {
                    echo "] useremail0 = ". $useremail0 ;
                    echo "<br />";
                    }




        // if(isset( $_GET['ds'] )){
        //         $dstart = $_GET['ds'] ;
        //     }else{
        //         $dstart = "2020-10-01"; //09-30";
        //     }
         
        //    if($msgs==1) echo "] ds = ". $dstart ;


        // if(isset( $_GET['de'] )){
        //         $dend = $_GET['de'] ;
        //     }else{
        //         $dend = "2019-01-01";
        //     }
         
        //     if($msgs==1) {

        //     echo "] de = ". $dend ;

        // echo "<br />";
        // }

        if(isset( $_GET['num'] )){
                $numCandlesReq = $_GET['num'] ;
            }else{
                $numCandlesReq = 200;  
            }
         
           if($msgs==1) {
            echo "] numCandlesReq = ". $numCandlesReq ;

        echo "<br />";
        }




// $stocksList = array( 'MMM','AXP','AAPL','BA','CAT','CVX','CSCO','KO','DOW','XOM','GS','HD','INTC','IBM','JNJ','JPM','MCD','MRK','MSFT','NKE'); 


$verNo="2.1 u.k.i !";
$last_id ="";

  
   if($msgs==1) {
    echo "] Reached Server... vers. $verNo <br />] The Time in New York is $nyTime, this system is running on PDT: $laTime ... <br />";
    echo "<br />] ticker == $sym ...";
    echo "<br />] Connecting...";
    
    echo "<br /><br />] ATTEMPTING TO CONTACT the ITRADERPRO MySql server...<br />] PDT = ". date("h:i:s.u"). " on ".  date("Y-m-d") ;
    echo "<br />########################################################################################";
    echo "<br />";
    }
 
    $con = mysqli_connect("localhost", "itraderp_jb_jackabeejohn", "jackabee66", "itraderp_jb_jackabee_Users1");
    if (!$con) die('Could not connect to itraderp***kabee_UsXXXZ: ' . mysqli_error($con));
    mysqli_select_db($con, "itraderp_jb_jackabee_Users1") or die ("DB select failed - " . mysqli_error($con));


   if($msgs==1) {
    echo "<br />] MySql Connection Good!  <br />"; //"] StockList to Process: ";
    echo "<br />########################################################################################";
    echo "<br />";
    echo "<br />";
    }


$ro=0;
$p=0; 


$useremail='nil';
$userkey='nil'; 
$usersalt='nil';
$userIP='nil';
$paidlevel='nil';
$paidamount='nil';
$paiduntildate='nil';

$paiddate='nil';
$paidtime='nil';

 


    $allchars       = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $allchars_len   = strlen($allchars);   // ie 10+26+26 == 62
    $allchars_len1  =  $allchars_len-1;   // 61

    $keylength  = 8;  
    $keylength2 = 4;  
    


$MaxToInsert = $NUM_TO_INSERT ; // =100;




 


        //  check email  input var: $useremail0


        $query5 = "SELECT * FROM userkeys      WHERE    useremail LIKE '$useremail0' LIMIT 1";
        $result5 = mysqli_query($con, $query5); 
         
        $j = 0;
        $id=-1;
        $ukey="";
        $usalt="";
        $ustamp="";

        while($row = mysqli_fetch_array($result5))
        {
            $data_id                   = $row['id'];
            $data_key                  = $row['userkey'];
            $data_salt                 = $row['usersalt'];
            $data_timestamp            = $row['timestamp'];
            
            if($j==0)
            {
                $id    = $data_id;
                $ukey  = $data_key ;  
                $usalt = $data_salt ;  
                $ustamp = $data_timestamp;
                //echo "  FOUND userName: $toUserNamesCheck1  id=$id pwd=$pwd   $tStamp\n\n";
            }
            $j++;
            
        }//while


         if($id>0){
            echo "EMAILFOUND,$useremail0,$data_id,$data_key,$data_salt,$data_timestamp,EOF";


         }else{
            echo "EMAILNOTFOUND,$useremail0,nil,nil,nil,1910-10-10,EOF";

         }


 



 

    if($msgs==1) echo "<br />";
    if($msgs==1)  echo "******************  EXITING... ******************************  <br />] PDT = ". date("h:i:sa"). " on ".  date("Y-m-d") ."<br />";
	if($msgs==1) echo "<br />] Closing MySql DB... ";

    mysqli_close($con);
    unset($con );




	if($msgs==1){
       echo "<br /><br />] END RUNTIME== PDT = ". date("h:i:s.u"). " on ".  date("Y-m-d") ;
       echo "<br />] DB Closed Successfully. Bye for now JB.<br /><br />EOF.";
    }


 
// SELECT * FROM `userkeys` WHERE useremail='nil' limit 1;
    // SELECT * FROM `userkeys` WHERE useremail LIKE 'johnbotti2013@gmail.com'
/*


$userValid=0;

$passwordSHA1 = sha1($searchQuery1);
$lowerEmail = strtolower($searchQuery0);

$username0  =" ";
$username0  = strtok($lowerEmail, "@");          // $username0 = jbotti   from jbotti@laskdj.com

$email0 = $lowerEmail;          // $toUserNamesCheck1


if($msgs==1) echo "pwd==". $passwordSHA1. " ". $lowerEmail. " ,  username0==". $username0. ", ". date("h:i:sa"). " on ".  date("Y-m-d"). ".<br />";


// | aiemail       | varchar(256) | NO   |     | NULL              |                |

$query5 = "SELECT * FROM users      WHERE    aiemail LIKE '$lowerEmail'";


// DOS 05.21.15
$result5 = mysqli_query($con, $query5); // or die("query failed ($query5) - " . mysql_error());
 
$j = 0;
$id=-1;
$pwd="";
$tStamp="";

while($row = mysqli_fetch_array($result5))
{
    $data_id                   = $row['id'];
    $data_pwd                  = $row['pwd'];
    $data_timeStamp            = $row['timeStamp'];
    
    if($j==0)
    {
        $id = $data_id;
        $pwd = $data_pwd;  // careful here - unused?  clean up
        $tStamp = $data_timeStamp;
        //echo "  FOUND userName: $toUserNamesCheck1  id=$id pwd=$pwd   $tStamp\n\n";
    }
    $j++;
    
}//while

 //  PASSWORD MATCH !   userName: john,  id=3, pwd= ,so1314==,so1314
if($id>0)  // we found at least 1 w/ same userName
{
  
if($msgs==1)  echo "This Email Exists! $id, $pwd, $tStamp <br />] Getting Session ID for Secure Access, $username0...<br /> <br />] Exiting... {54} <br />";
    $last_id ="userID== $id, no data inserted... ";
  
}else{
     // echo "  No User Found - We DO NOT MATCH THAT USER EMAIL [ $lowerEmail ]!!!  - Aborting -   <br />";
  
if($msgs==1)   echo "  No User Found - We HAVE NO MATCH FOR USER's EMAIL[ $lowerEmail ]  - INSERTing...<br />";

// for now use NO USE EXIST LOGIN --> === REGISTER TEST USERS *****
 $insertStr = "INSERT INTO users (id,  userName,  pwd,   email, aiUsername, aiemail, timeStamp)   VALUES  ('NULL' ,     '$username0' ,'$passwordSHA1',   '$email0',  '$searchQuery2', '$email0',     CURRENT_TIMESTAMP)";

        // DOS 05.21.15
        $resultJB1 = mysqli_query($con, $insertStr); 
        $last_id = mysqli_insert_id($con);

$userValid=1;

 // $insertStr = "INSERT INTO users (id,  userName,  pwd,   email, IPaddress, lon, lat, alt, instagram_id, city, state, country, gender, device, signupTime, timeStamp )  VALUES ( 'NULL' ,  '$username0' ,  '$passwordSHA1',   '$email0', '$IPaddress', '$IPlong', '$IPlat', '$altInit', '$instagramName', '$city', '$state', '$country',  '$gender',  '$device',  '$signupTime',    CURRENT_TIMESTAMP )";
      

 }//else
*/

///************************************************ EOcode
///************************************************ EOcode
///************************************************ EOcode
///************************************************ EOcode


function rndstringAlphaNumeric($slen) {
       $bytes = substr(str_shuffle('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'),1,$slen);
       return $bytes ;
}



function rndstring($slen) {
// gener's something like 1d9a6ed0aa342400325b

$bytes = random_bytes($slen);
echo "'". bin2hex($bytes) . "',";
    // echo "<br />";

 // return (bin2hex($bytes));
}




function f4( $fvar ){
                 return   ( number_format((float)$fvar, 4, '.', '')   );  // Outputs -> 105.00

}


 
// SELECT * FROM `userkeys` WHERE useremail='nil' limit 1;
    // SELECT * FROM `userkeys` WHERE useremail LIKE 'johnbotti2013@gmail.com'
/*


$userValid=0;

$passwordSHA1 = sha1($searchQuery1);
$lowerEmail = strtolower($searchQuery0);

$username0  =" ";
$username0  = strtok($lowerEmail, "@");          // $username0 = jbotti   from jbotti@laskdj.com

$email0 = $lowerEmail;          // $toUserNamesCheck1


if($msgs==1) echo "pwd==". $passwordSHA1. " ". $lowerEmail. " ,  username0==". $username0. ", ". date("h:i:sa"). " on ".  date("Y-m-d"). ".<br />";


// | aiemail       | varchar(256) | NO   |     | NULL              |                |

$query5 = "SELECT * FROM users      WHERE    aiemail LIKE '$lowerEmail'";


// DOS 05.21.15
$result5 = mysqli_query($con, $query5); // or die("query failed ($query5) - " . mysql_error());
 
$j = 0;
$id=-1;
$pwd="";
$tStamp="";

while($row = mysqli_fetch_array($result5))
{
    $data_id                   = $row['id'];
    $data_pwd                  = $row['pwd'];
    $data_timeStamp            = $row['timeStamp'];
    
    if($j==0)
    {
        $id = $data_id;
        $pwd = $data_pwd;  // careful here - unused?  clean up
        $tStamp = $data_timeStamp;
        //echo "  FOUND userName: $toUserNamesCheck1  id=$id pwd=$pwd   $tStamp\n\n";
    }
    $j++;
    
}//while

 //  PASSWORD MATCH !   userName: john,  id=3, pwd= ,so1314==,so1314
if($id>0)  // we found at least 1 w/ same userName
{
  
if($msgs==1)  echo "This Email Exists! $id, $pwd, $tStamp <br />] Getting Session ID for Secure Access, $username0...<br /> <br />] Exiting... {54} <br />";
    $last_id ="userID== $id, no data inserted... ";
  
}else{
     // echo "  No User Found - We DO NOT MATCH THAT USER EMAIL [ $lowerEmail ]!!!  - Aborting -   <br />";
  
if($msgs==1)   echo "  No User Found - We HAVE NO MATCH FOR USER's EMAIL[ $lowerEmail ]  - INSERTing...<br />";

// for now use NO USE EXIST LOGIN --> === REGISTER TEST USERS *****
 $insertStr = "INSERT INTO users (id,  userName,  pwd,   email, aiUsername, aiemail, timeStamp)   VALUES  ('NULL' ,     '$username0' ,'$passwordSHA1',   '$email0',  '$searchQuery2', '$email0',     CURRENT_TIMESTAMP)";

        // DOS 05.21.15
        $resultJB1 = mysqli_query($con, $insertStr); 
        $last_id = mysqli_insert_id($con);

$userValid=1;

 // $insertStr = "INSERT INTO users (id,  userName,  pwd,   email, IPaddress, lon, lat, alt, instagram_id, city, state, country, gender, device, signupTime, timeStamp )  VALUES ( 'NULL' ,  '$username0' ,  '$passwordSHA1',   '$email0', '$IPaddress', '$IPlong', '$IPlat', '$altInit', '$instagramName', '$city', '$state', '$country',  '$gender',  '$device',  '$signupTime',    CURRENT_TIMESTAMP )";
      

 }//else
*/
/*

https://itraderpro.co/av/userkeyinsert.php?uemail=johnbotti2013@gmail.com

] sym = QQQ
] useremail0 = johnbotti2013@gmail.com
] numCandlesReq = 200
] Reached Server... vers. 2.1 u.k.i !
] The Time in New York is 11:04:59pm on 2022-09-30, this system is running on PDT: 08:04:59pm on 2022-09-30 ...

] ticker == QQQ ...
] Connecting...

] ATTEMPTING TO CONTACT the ITRADERPRO MySql server...
] PDT = 08:04:59.000000 on 2022-09-30
########################################################################################

] MySql Connection Good!

########################################################################################

] email johnbotti2013@gmail.com found 2025 , U0xKHSby , 53012251 , 2022-09-30 20:01:54

****************** EXITING... ******************************
] PDT = 08:04:59pm on 2022-09-30

] Closing MySql DB...

] END RUNTIME== PDT = 08:04:59.000000 on 2022-09-30
] DB Closed Successfully. Bye for now JB.

EOF.





] sym = QQQ
] ds = 2020-10-01] de = 2019-01-01
] numCandlesReq = 200
] Reached Server... vers. 2.1 u.k.i !
] The Time in New York is 10:02:06pm on 2022-09-30, this system is running on PDT: 07:02:06pm on 2022-09-30 ...

] ticker == QQQ ...
] Connecting...

] ATTEMPTING TO CONTACT the ITRADERPRO MySql server...
] PDT = 07:02:06.000000 on 2022-09-30
########################################################################################

] MySql Connection Good!

########################################################################################

Inserting... [XWwtCiqn], (alt =ogfB ), userSALT = fdcc15e7
Inserting... [xGGWlIVv], (alt =XyU8 ), userSALT = a327d07b
Inserting... [vi6zN5A4], (alt =nT1Q ), userSALT = 8a31cacf
Inserting... [YM4ZxogD], (alt =PvYI ), userSALT = f711256f
Inserting... [ykvTReCq], (alt =7VhM ), userSALT = 22f97b32
Inserting... [jMJVnM1B], (alt =cs9Y ), userSALT = ec2c5828
Inserting... [dWcawQnj], (alt =Csit ), userSALT = edb3cdb4
Inserting... [P3wewTy6], (alt =QC7v ), userSALT = f01c3bf7
Inserting... [7FDTWYLs], (alt =f3nB ), userSALT = 70a9dd42
Inserting... [8cOHootk], (alt =oqy8 ), userSALT = 06787587
Inserting... [xHpmv2PC], (alt =GVBO ), userSALT = 79c3276b
Inserting... [FyLwfVNY], (alt =S0JV ), userSALT = 892ceace
Inserting... [w8h4QZDh], (alt =Dvmn ), userSALT = bac091a9
Inserting... [MOP39ZHJ], (alt =3FD0 ), userSALT = 78adcce9
Inserting... [M4R6bSeV], (alt =Hb4L ), userSALT = 82da5726
Inserting... [dZsb8rds], (alt =bYPi ), userSALT = 38b822ac
Inserting... [AJTcby6r], (alt =y6be ), userSALT = 68c099ce
Inserting... [LmhiqXMU], (alt =PGiU ), userSALT = 4e3feb12
Inserting... [6jdYHp6W], (alt =WX8B ), userSALT = 6c7b19d7
Inserting... [USWFwteo], (alt =s9l4 ), userSALT = ed6a035a
Inserting... [X5mmUSPu], (alt =4vzf ), userSALT = 4b7b9526
Inserting... [0pYwlmMT], (alt =VytJ ), userSALT = 0408f82c
Inserting... [wIdlXXCL], (alt =b8H5 ), userSALT = ef8ef1a5
Inserting... [AnTZyv8N], (alt =dOgX ), userSALT = 26644286
Inserting... [QTahHaMX], (alt =DUjy ), userSALT = b9a58578
Inserting... [r4jjkImw], (alt =RHS6 ), userSALT = 07d5d9b1
Inserting... [P5APt4RR], (alt =MNWk ), userSALT = b43e88b4
Inserting... [6TJidKcm], (alt =sCRg ), userSALT = bb5d2da5
Inserting... [1NIKUx7k], (alt =P5Oe ), userSALT = db137aa3
Inserting... [likLtX0n], (alt =dDsA ), userSALT = 65ebf9d1
Inserting... [KFrnaMkC], (alt =GmO2 ), userSALT = 76cf5ef8
Inserting... [z7h1kXMI], (alt =PmYL ), userSALT = 8ea07f0a
Inserting... [WL1m0Zii], (alt =LOjk ), userSALT = 7c667ddf
Inserting... [uR2q6eAH], (alt =zLuF ), userSALT = 29d0405e
Inserting... [6wNn17V8], (alt =5pND ), userSALT = 81787e73
Inserting... [x3XPvbty], (alt =czlh ), userSALT = e15d810b
Inserting... [rbliEfUW], (alt =8WpU ), userSALT = 33c5ba80
Inserting... [Z0veJWZv], (alt =Dk4n ), userSALT = 15c13350
Inserting... [VfyZzWjc], (alt =3TFe ), userSALT = 1e219256
Inserting... [1VBcg3c6], (alt =Hf2J ), userSALT = 400f0614
Inserting... [dE5haedL], (alt =wjpg ), userSALT = 8c5c6e1b
Inserting... [uO21BmyX], (alt =8CoZ ), userSALT = a11e2e76
Inserting... [sR326cR8], (alt =zmwZ ), userSALT = 0ba262ea
Inserting... [3AwfnKZh], (alt =f2DC ), userSALT = f6d3515e
Inserting... [3pkFM1di], (alt =uZ2p ), userSALT = e9d1a057
Inserting... [OixOz5hD], (alt =1LiO ), userSALT = 745d52a7
Inserting... [SBInlyzQ], (alt =aVyb ), userSALT = 1fcab886
Inserting... [mSpjWNnh], (alt =Dku9 ), userSALT = 8d4b170b
Inserting... [i5MEPErO], (alt =3POp ), userSALT = 404effaa
Inserting... [dJMsHjYP], (alt =7n4o ), userSALT = 11736410
Inserting... [1mltLIuE], (alt =o7Ry ), userSALT = 6faff659
Inserting... [mMfsPE96], (alt =v2Ep ), userSALT = e80c86c3
Inserting... [lw99BEKv], (alt =DtFV ), userSALT = ed5c6df6
Inserting... [DPCRbM7J], (alt =dcyU ), userSALT = 8414e982
Inserting... [QdLt6DQT], (alt =Oe9I ), userSALT = f33ded67
Inserting... [5Wfhv6F3], (alt =8Nsh ), userSALT = 775abfd0
Inserting... [FTC3jMWL], (alt =RGfV ), userSALT = c9e18d93
Inserting... [p050IVjm], (alt =GH6L ), userSALT = bdef5267
Inserting... [TeIyzk6Y], (alt =GoT8 ), userSALT = 2c2d8294
Inserting... [EMTViOfF], (alt =RLWM ), userSALT = 65fb3552
Inserting... [R3gTDRAd], (alt =2Cvt ), userSALT = 52f1b176
Inserting... [mwNdL6qf], (alt =IwMo ), userSALT = 8dc0bb27
Inserting... [SvdLD4o5], (alt =gTYb ), userSALT = 6774e7f9
Inserting... [SmbSU1gv], (alt =G4UM ), userSALT = cbacb046
Inserting... [9SJHQrdY], (alt =BZMl ), userSALT = f05c3a3d
Inserting... [UfXsdcsG], (alt =8fJn ), userSALT = 99157284
Inserting... [FCpHZY9a], (alt =0dE4 ), userSALT = 91e19ac9
Inserting... [w1rPZ37F], (alt =LUvV ), userSALT = 1fdd5641
Inserting... [lHucdDHW], (alt =yOjg ), userSALT = ce3b95d4
Inserting... [biJqxj2b], (alt =KJaQ ), userSALT = a669a0e5
Inserting... [nSHBUwwn], (alt =1NqO ), userSALT = b3cd7b32
Inserting... [L6tsNAU1], (alt =4jAC ), userSALT = fdcf72bc
*/
?>


