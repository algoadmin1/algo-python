<?php

// RigElection.php - for demonstration purposes only.

ini_set('display_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set('America/New_York');

// include 'standardfunctions.php';
$blue = "Blue";
$red = "Red";

if(isset( $_GET['blue'] )){
    $blue = $_GET['blue'] ;
}else{
    $blue = "Blue";
}

if(isset( $_GET['red'] )){
       $red = $_GET['red'] ;
   }else{
       $red = "Red";
   }  

function RigElectionforBlue($blueVotes, $redVotes) {
    echo "<br />";
    echo "<br />The Blue Party has $blueVotes Votes.";
    echo "<br />";
    echo "<br />The Red Party has $redVotes Votes.";
    echo "<br />";
    echo "<br />Who will win with greater Votes?";
    echo "<br /><br />";

    // Adjust blue votes to ensure a win if red votes are higher (Chat's Comment!)
    if ($redVotes >= $blueVotes) {
        $blueVotes += ($redVotes - $blueVotes) * (1 + (float)rand() / getrandmax());
    }
    $ElectoralTotal=535;
    $blueVotes = (int)$blueVotes;
    $redVotes = (int)$redVotes;

    if($blueVotes+$redVotes > $ElectoralTotal ){ 
        $blueVotes= $ElectoralTotal-190; $redVotes=$ElectoralTotal-$blueVotes; 
    }
    // Return the winner
    return $blueVotes > $redVotes ? "The Blue Party wins with $blueVotes to Red's $redVotes Votes." :
                                    "Red Wins $redVotes to Blue's $blueVotes.";
}
// Output will always be "Blue Wins !!  X to Y Electoral Votes"
echo RigElectionforBlue($blue, $red);   

?>