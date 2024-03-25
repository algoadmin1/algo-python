<?php


	$i=0;
	$j=-1;
	$iMax= 8 * 1024;
	$imodulo = 256;

	echo "var gPixelArrayStatic =[ <br />";

	for ($i=0 ;  $i< $iMax  ;  $i++){


		if($i % $imodulo ==0){
			echo "<br /> //  i=". $i. " <br />" ;
		}
		echo $j. "," ;

	}//for

	echo "<br />  ]; <br />";


?>