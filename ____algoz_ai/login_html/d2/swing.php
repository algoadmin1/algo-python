<?php

$br = "<br />";

$dems_init = 226;
$reps_init = 219;

$swingStates = [ 'NV', 'AZ', 'WI',   'MI', 'GA', 'NC',   'PA'  ];
$swingVotes  = [  '6', '11', '10',   '15', '16', '16',   '19'  ];

$idx =0; 

$MaxSwingStates=7;
$dems_cnt = $dems_init;
$reps_cnt = $reps_init;

echo "START: Dems: ". $dems_init.  " Reps: ". $reps_init .  $br.  $br.  $br ;

for($i=0;$i<$MaxSwingStates;$i++){
   
   echo  $swingStates[$i]. "=". $swingVotes[$i].  $br;

   $votes = intval( $swingVotes[$i]  );

   $dems_cnt+= $votes ;
   $reps_cnt+= $votes ;

   echo $i. ": Dems: ". $dems_cnt.  ",  Reps: ". $reps_cnt .  $br ;


//    echo $i. ": Dems: ". $dems_cnt.  ",  Reps: ". $reps_cnt .  $br ;


}


?>