// index.js
//
//        black ops entertainment craps 
//
//        written by john botti under under pLandemic lockdown October 14th thru Oct 30th
//
//
// var c 			 = document.getElementById("myCanvas");
const canvas 	 = document.querySelector("canvas");
const c 		   = canvas.getContext("2d");

canvas.width        = innerWidth
canvas.height       = innerHeight

const gVersionNum= "v3.6"
var gDebugMode=0;
var gSFX=1;
let gCountdownStopper=1;

const gBASEServerStr = 'https://itraderpro.co/game/';
let gPOSTServerStr  ;

var gServerStr ='';
var gBetMasterIdstr ='';
var gBetMasterId =-1;

let playerBets;

var gTimerBarMultiplierStart = 0.95  ;  // 0.0650; // .25
var gTimerBarMultiplier = gTimerBarMultiplierStart; //0.125; // .25

var gPlayerChipColor = RandomColor();// "#ee22ff";

var gButtonNumClicked=-1;
var gRound= 14;
var n; //event listener # times
var gPlayerUserIDstr="jb";
var gPlayerUserIDNumstr="13";

// pixel offset across to the right, down from 0,0 upper left Canvas
var gGameLogStr="";
var gLastEvent="0[Init],";
var gLastEventButtonStr="";
var gCrapsTableX = 0;					//  x,y  off for table pos
var gCrapsTableY = 100;

var gCrapsButtonX =70;
var gCrapsButtonY =150; 
var gCrapsButtonRad =29 ; //40; 

var gFirstTime=0; 
var gPlayerChipsStart=1800;
var gPlayerChips =gPlayerChipsStart; //000;
var gHouseChips =0; //000;
var gChipAlpha = 1.0;

var gButColOff= "#6933cc";//"#33ff8a"; //"#d4f5f5"; //"#aa3322";
var gButColOn = "#22aa33";

var bOff = 4;
var bOffStr="";//"[Off]";
var gTableXOff = 890;

// INIT'd VARs
var thepointIs="OFF";
var longestStreak=0;
var longestTo7Streak=0;
var thisStreak=0;
var to7Streak=0;
var gPointsMade=0;
var gSevenOuts=0;
var gDiceThrown=0;
var gSecondsElapsed=0;

var gChipRadius = 13;

var dice1X = 680;
var dice1Y = 104;
var dice2X = 798;
var dice2Y = dice1Y;
var dicescale = 0.385;              //  SCALE

//v
//

var ThePointLocationXAdder=450;
var ThePointLocations = [
                      0,0, 
                      0,0, 
                      0,0, 
                      0,0, 

                      177,122,   // 4
                      221,122, 
                      266,122,   // 6

                       0,0,    // 7

                      312,122,   // 8
                      358,122, 
                      402,122,    // 10

                       0,0,     //  11  & 12
                       0,0

            ];

// BUG HERE
var gPointPcts = [
//                 ie  5.5%(2)
                      0.00, 0.00,  
                      0.0277, 0.0555, 0.08333,0.1111,
                      0.1388, 
                      0.1666,   // 7 %
                      0.1388,
                      0.1111, 0.08333,0.0555,0.0277


                ];

// buttons on top

var bTexts= [
                    "SHAKE DICE",
                    "SHOOT DICE",
                     "       $",  //$ must be in this poisiotn [2] in 0... array

                    " =",     // status button
                    " -",   // you have

                    "undo",
                    "auto",
                    "Casino Server: OFF, "+gVersionNum,
                    " || ",
                    " sfx ",

                ];

var numButtons = bTexts.length;
var bRects = [
                      10,10, 180,60,
                     202,10, 180,60, 

                     390,10, 158,60,        //  denom button

                     700,10+30, 320,28,      /// orangestatus upper right


                     100,108, 260,40,       // You have: 

                     554,10, 80,60,        //  UNDO button    


                     374 ,500, 54,60,      // auto button
                     
                     700,10, 320,28,   /// server button - enter casino

                     640,10, 55,30,        //  || PAuse button    
                     640,40, 55,30,        //  sfx button    

                ];

var bClickStatus = [
                       0,0,  0, 0,   0 ,  0,  0,0,0,0
                ];
//   ****** 8  BUTTONS ala bRects
 


var multiplayerRects = [

                        4,120, 74,50,   
                        4,170, 74,50,   
                        4,220, 74,50,   
                        4,270, 74,50,

                        4,320, 74,60,


                        80 -0,350, 72,100,
                        160-2,350, 72,100,
                        240-4,350, 72,100,
                        320-10,350, 72,100,



                     570+ 80 -0,350,  72,100,
                     564+ 160-2,350,  72,100,
                     562+ 240-4,350,  72,100,
                     562+ 320-10,350, 72,100,

  
                      950,320, 70,60,  

                      950,270, 70,50,   
                      950,220, 70,50,   
                      950,170, 70,50,   
                      950,120, 70,50,   

                ];

var multiplayerRectsLen = multiplayerRects.length ;



//  move up top
//
var gTableBetNames = [
                          "DON'T PASS",      // 0
                          "DON'T COME",
                          "2 Snakeeyes",
                          "3 Craps",
                          "FOUR Placed",

                          "FIVE Placed",               // 5
                          "SIX Placed",
                          "COME",
                          "EIGHT Placed",
                          "FIELD",

                          "TEN Placed",                 // 10
                          "11 Yo 11",
                          "12 Midnight",
                          "PASS Line",               // 13
                          "Behind PASS Line",

                          "SEVEN",               //15
                          "ANY CRAPS",
                          "E-C",
                          "ALL SMALL",
                          "NOTHING AT ALL",

                          "ALL TALL",                 //20
                          "HOP BET TOP",
                          "HOP BET BOTTOM",
                          "BIG 6-8",              // 23
                          "HARD 4",                 //24 ,26 28 30 == hardways


                          "5-STAR",             //25
                          "HARD 6",
                          "na",
                          "HARD 8",
                          "na",

                          "HARD 10",        // 30
                          "HORN HI YO",     //31
                          "na",
                          "na",
                          "na",

];

var gTableBetNamesLen = gTableBetNames.length;

/*
// leftllHOriz lower PASSLINE
                      80,350, 300,35,   50,  13, 1.0, 0.0 ,

// hard 6,10,8,4
                      432,210, 80,40-4,   50,   26, 10.0, 1 ,
                      515,210, 80,40-4,   50,   30,  8.0, 1 ,
                      432,250, 80,40-4,   50,   28, 10.0, 1 ,
                      515,250, 80,40-4,   50,   24,  8.0, 1 ,

// HHiYo = horn hi yo, all 5 2,3,12,11,11
                     488+6,290+26, 46, 30,   46,   31, 31.0, 0.0 ,
*/

var gTableAutoBets= [
                    80+150,  350 +16,  // 300,35,     LL Passline

                    20+432,  25+ 210,   // Hard 6
                    20+515,  25+ 210,   // h10

                    20+432,  25+ 250,    //h8
                    20+515,  25+ 250,    //h4
                
                    23+488+6, 15+  290+26,  // Horn Hi Yo



                      104+(276/2),230,  // 276,50,   // come

                      100+(280/2),262+25,  //  280,50,  // field


];

var gTableAutoBetsLen =  gTableAutoBets.length;

var gTableBetXYWHoffset = 8;
var gTableBetXYWH= [
//                    x,   y,  w,  h,    rad, id, payout, HardwayYes

// come
                      104,206, 276,50,   50,  7, 1.0, 0.0 ,
// field
                      100,262, 280,50,   50,  9, 1.0, 0.0 ,
//dont pass
                      154,315, 226,30,   50,  0, 1.0, 0.0 ,

// leftllHOriz lower PASSLINE
                      80,350, 300,35,   50,  13, 1.0, 0.0 ,
// leftllHOriz lower BEHIND-PASSLINE
                      80,386, 300,70,   50,  14, 1.0, 0.0 ,

// LEFT BIG 6-8 
                      90,315, 50,30,   50,  23, 1.0, 0.0 ,


// leftlVertical PASSLINE
                       45,120, 34,260,   50,  13, 1.0, 0.0 ,
// leftlVertical BEHIND-PASSLINE
                       11,120, 34,260,   50,  14, 1.0, 0.0 ,

// leftlVertical  DONT PASS 
                       84,120, 18,130,   50,  0, 1.0, 0.0 ,


// LEFT DONT COME BAR                       
                      106,118, 40,84,   50,  1, 2.0, 0.0, 

// 4..10 points LEFT SIDE TABLE  est X pos, change...
                      149,118, 44,84,   50,   4, 2.0, 0.0 ,
                      194,118, 44,84,   50,   5, 1.5, 0.0 ,
                      244,118, 44,84,   50,   6, 1.2, 0.0 ,

                      290,118, 44,84,   50,   8, 1.2, 0.0 ,
                      334,118, 44,84,   50,   9, 1.5, 0.0 ,
                      380,118, 44,84,   50,  10, 2.0, 0.0 ,


// HOP BET TOP
                       430 ,118, 165,38,   50,  21, 31.0, 0.0, 

// HOP BET BOTTOM
                       430 ,118+38, 165,26,   50,  22, 16.0, 0.0, 

// ALL SMALL, 
                        376,20, 80,90,   50,  18, 35.0, 0.0, 
// ALL OR NOTHING AT ALL
                    82+376,20, 110,90,   50,  19, 176.0, 0.0, 
// ALL TALL
                    194+ 376,20, 80,90,   50,  20, 35.0, 0.0, 


//  LEFT E-C                      
                      384,224, 44,170,   50,  17, 2.0, 0.0 ,

  /// (((((((((((((((((((  CENTER BETS ))))))))))))))))))))))))))))))))))))))
// SEVEN 5-1
                       430 ,190, 165,15,   50,  15, 5.0, 0.0, 


// hard 6,10,8,4
                      432,210, 80,40-4,   50,   26, 10.0, 1 ,
                      515,210, 80,40-4,   50,   30,  8.0, 1 ,
                      432,250, 80,40-4,   50,   28, 10.0, 1 ,
                      515,250, 80,40-4,   50,   24,  8.0, 1 ,


// HHiYo = horn hi yo, all 5 2,3,12,11,11
                      488+6,290+26, 46, 30,  50, 31, 31.0, 0.0 ,


// HORN HI YO: CW ORDER:  3, 2, 12, 11, 11
                     432,290-2, 54,40-4,   50,   3, 16.0, 0.0 ,
                     488,290-2, 54,40-4,   50,   2, 31.0, 0.0 ,
                     545,290-2, 54,40-4,   50,  12, 31.0, 0.0 ,

                      432,330-2, 80,40-4,   50,   11, 16.0, 0.0 ,
                      515,330-2, 80,40-4,   50,   11, 16.0, 0.0 ,

// 5-STAR Sponsored Bet 15-1 on a 2, 3, 4, 10 or 12 !!!
                       434 ,392, 160,76,   50,  25, 15.0, 0.0, 

// ANY CRAP 8-1
                       430 ,370, 165,15,   50,  16, 8.0, 0.0, 

 /// (((((((((((((((((((  CENTER BETS )))))))))))))))))))
// + 450
// tablecoll
// 4..10 points right SIDE TABLE  est X pos, change...
                      460 +144,118, 44,84,   50,   4, 2.0, 0.0 ,
                      460 +189,118, 44,84,   50,   5, 1.5, 0.0 ,
                      460 +239,118, 44,84,   50,   6, 1.2, 0.0 ,

                       454+289,118, 44,84,   50,   8, 1.2, 0.0 ,
                       450+339,118, 40,84,   50,   9, 1.5, 0.0 ,
                       450+385,118, 40,84,   50,  10, 2.0, 0.0, 
// RIGHT DONT COME BAR                       
                     44+450+385,118, 40,84,   50,  1, 2.0, 0.0, 

// RIGHT E-C
                       450+150,224, 44,170,      50,  17, 2.0, 0.0 ,

/// RIGHT SIDE
// come
                    92+460+100,204, 270,56,   50,  7, 1.0, 0.0 ,
// field
                    92+460+100,262, 270,50,   50,  9, 1.0, 0.0 ,
//dont pass
                     460+192 ,315, 230,30,   50,  0, 1.0, 0.0 ,

// RIGHTlOWERHOriz lower PASSLINE
                    100+  450+100,350, 300,35,   50,  13, 1.0, 0.0 ,
// RIGHTlOWERHOriz lower BEHIND-PASSLINE
                       100+  450+100,386, 290,70,   50,  14, 1.0, 0.0 ,

// LEFT BIG 6-8 
                      90+796,315, 50,30,   50,  23, 1.0, 0.0 ,
// RIGHT Vertical PASSLINE
                          940+10,120, 34,260,   50,  13, 1.0, 0.0 ,
// RIGHT Vertical BEHIND-PASSLINE
                          940+48,120, 28,260,   50,  14, 1.0, 0.0 ,

// RIGHT Vertical  DONT PASS 
                      846+ 84,120, 18,130,   50,  0, 1.0, 0.0 ,


                      ];
                      
var gTableBetXYWHlen = gTableBetXYWH.length;




// ####################################################################
//
//
//  $$$$$$$$$$$$$$$$$ CHIP DENOMS 
//
//
var gChipDenominations = [
                       1,5,10,25,100
                       ,500
                       ,1000,5000
                       ,10000,100000   
                ];
                
var gChipDenominationsColors = [
//                  white $1     red $5    orng$10   green$25  blk $100
                   //  "#efefef","#dc122a","#fc8519","#19fc41","#0f1210"
                     "#efefef","#dc122a","#1936fc","#22fe34","#0f1210"
//                  purple 500  violet 1k  FFFF00 5k  pink 10k  aqua 100k 
                     ,"#ce19fc",
                      "#33ffff","#FFFF00" 
                      ,"#d789d7","#590995"

                      //,"#f2fc3d"
                     //,"#590995","#1936fc","#d789d7","#f2fc3d"   //"#23ee93"
                ];

var gChipIndex =0;
var gChipIndexLen = gChipDenominations.length;




// needs to be array
var    mySound;
var    mySound_chips1  ;
var    mySound_chips2 ;
var    mySound_chips3 ;

var    mySound_chips4 ;
var    mySound_chips5 ;

var    mySound_crowd ;
var    mySound_dice0 ;
var    mySound_winsong ;


var      sfx_2 ; // = new sound("mp3/sfx_2.mp3");
var      sfx_2a; // = new sound("mp3/sfx_2a.mp3");
var      sfx_3 ; // = new sound("mp3/sfx_3.mp3");
var      sfx_3a; // = new sound("mp3/sfx_3.mp3");
var      sfx_4;//   = new sound("mp3/numbers/sfx_4.mp3");
var     sfx_4a ;//  = new sound("mp3/numbers/sfx_4hard.mp3");

var     sfx_5 ; // = new sound("mp3/sfx_5.mp3");
var      sfx_5a; //= new sound("mp3/sfx_5a.mp3");

var      sfx_6 ; // = new sound("mp3/sfx_6.mp3");
var      sfx_6a; // = new sound("mp3/sfx_6a.mp3");

var      sfx_7 ; // = new sound("mp3/sfx_7.mp3");
var      sfx_7a; // = new sound("mp3/sfx_7a.mp3");
    
var      sfx_8  ; //= new sound("mp3/sfx_8.mp3");
var      sfx_8a ; //= new sound("mp3/sfx_8a.mp3");

var      sfx_9  ; //= new sound("mp3/sfx_9.mp3");
var      sfx_9a ; //= new sound("mp3/sfx_9.mp3");

var      sfx_10 ; //= new sound("mp3/sfx_10.mp3");
var      sfx_10a; //= new sound("mp3/sfx_10a.mp3");

var      sfx_11 ; //= new sound("mp3/sfx_11.mp3");
var      sfx_11a; //= new sound("mp3/sfx_11a.mp3");
var      sfx_12 ; //= new sound("mp3/sfx_12.mp3");
var      sfx_12a;  
var      sfx_13;
var      sfx_13a;
var      sfx_14;
var      sfx_14a;
var     sfx_15;
var     sfx_15a;

var     sfx_button1;
var     sfx_button2;
var     sfx_charge1;
var     sfx_charge2;
var     sfx_explosion;

const imgdice1 = new Image();
imgdice1.src = "imgcraps/dice1.png";

const imgdice2 = new Image();
imgdice2.src = "imgcraps/dice2.png";

const imgdice3 = new Image();
imgdice3.src = "imgcraps/dice3.png";

const imgdice4 = new Image();
imgdice4.src = "imgcraps/dice4.png";

const imgdice5 = new Image();
imgdice5.src = "imgcraps/dice5.png";

const imgdice6 = new Image();
imgdice6.src = "imgcraps/dice6.png";


///  depricate
// 180x144 patch.jpg

const imgpatch = new Image();
imgpatch.src = "imgcraps/patch.jpg";


const imgcleanpoints = new Image();
imgcleanpoints.src = "imgcraps/cleanpoints.jpg";


const imglogo = new Image();
imglogo.src = "imgcraps/jackabee.png";  // 196x141

// const imglogo = new Image();
// imglogo.src = "imgcraps/logo0.png";  // 301x281  jackabee0.png

const imglogo1 = new Image();
imglogo1.src = "imgcraps/logo1.png";  // 196x141



 var countdownStart=1000;
 var countdown =1000;
 var countdownH=400;

 
var countDownDate = new Date("Oct 23, 2020 01:00:00").getTime();



const img = new Image()
img.src = "crapstable.jpg"
// img.src = "crapstable2.jpg"

img.onload = () => {
//  (image, sx, sy, sWidth, sHeight,  dx, dy, dWidth, dHeight, )
    ;// c.draw Image(img, 0, 0, 2044,941,   100,100, 1022,470)
    // c.fillStyle = 'rgba(0,0,0,0.05)' 
    // c.fillRect(0,0, canvas.width, canvas.height)
   
     // c.drawImage(img, 0, 0,  2044,941,  gCrapsTableX, gCrapsTableY, 1024,512)
     c.drawImage(img, 0, 0,  2044,941,  gCrapsTableX,gCrapsTableY, 1024,512)

     var crapsbutton1 = new CrapsButton( gCrapsTableX+ 10 + 50, gCrapsTableY + 50,gCrapsButtonRad,'black',1 );
     crapsbutton1.draw();
     var crapsbutton1a = new CrapsButton( gCrapsTableX+20 + 50+gTableXOff, gCrapsTableY  + 50,gCrapsButtonRad,'black',1 );
     crapsbutton1a.draw();

     initTableBets(0);
     DrawDenomButton();
initParticles();
     //DrawTable();

}
 

//?/
function UndoAllBets(){

	  playerBets.forEach( (bet, i) => {
          if(!(bet.masterId==13 && PointIsOff!="OFF")){
				var chipval = bet.chipvalue;
         	
				  gPlayerChips += chipval; //playerBets[l].chipvalue;
				  gHouseChips -= chipval; 

              playerBets.splice( i, 1);
          }
      })
          
}//fn

function UndoLastBet(){
	
   var l= playerBets.length-1;
  var chipval =playerBets[l].chipvalue;
	  
	 if(  playerBets[l].masterId == 13  && thepointIs!="OFF"){
	 	while(l>=0 &&  playerBets[l].masterId == 13 ){
	 			l--;
	 		}//while
		}
if(l>=0){
  gPlayerChips += chipval; //playerBets[l].chipvalue;
  gHouseChips -= chipval; 

  playerBets.splice(l,1);
  DrawTable();
  AddCountdownTime(0.450);
  return(l);
 }else AddCountdownTime(0.2);

}//fn

//  horn bets and 5-STAR, HOP BETS etc
function RemoveAllOneRollBets(){

// Remove Horn Hi Yo...
  RemoveBet(2);
  RemoveBet(3);
  RemoveBet(11);
  RemoveBet(12);

// Remove HHYo
  RemoveBet(31);

// Remove 5-STAR
  RemoveBet(25);

// Remove Field
  RemoveBet(9);

// 21 , 22 hop bets
  RemoveBet(21);
  RemoveBet(22);







}

function RemoveBet(betID){

        playerBets.forEach( (bet, i) => {
          if(betID == bet.masterId){
              playerBets.splice( i, 1);
          }
          

        })//forEach

        DrawTable();
}

function DrawActiveBets(){

        playerBets.forEach( (bet, i) => {

           var playerchip = new Chip(bet.chipx, bet.chipy, gChipRadius, bet.chipcolor ,1, gChipAlpha, gPlayerChipColor );
           playerchip.draw();


        })//forEach

}

function DrawTable(){

     c.drawImage(img, 0, 0,  2044,941,  gCrapsTableX,gCrapsTableY, 1024,512);

     DrawCrapsButton();
     RenderDice();

     DrawActiveBets();
    drawTopButtons();

    // draw user logo0 Lower Left
    //   c.drawImage(imglogo, 0, 0, 196,141, gCrapsTableX-20,    512-114+gCrapsTableY, (196*0.8), (141* 0.8) );  
    // // draw user logo1 Lower Right
    //   c.drawImage(imglogo1,0, 0, 256,227, 930+ gCrapsTableX, 512-92+gCrapsTableY, (256*0.4), (227* 0.4) );  

}//fn


class CrapsButton{
    constructor(x,y, radius, color, velocity){
        this.x =x
        this.y =y
        this.radius=radius
        this.color= color 
        this.velocity=velocity 
     }
    draw(){


        c.beginPath()
        c.arc(this.x, this.y, this.radius+3, 0, Math.PI*2, false) 
        c.fillStyle='black';
        c.fill()

        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false) 
        c.fillStyle='white';//RandomColor(); //this.color
        c.fill()

        c.beginPath()
        c.arc(this.x, this.y, this.radius*0.90, 
            0, Math.PI*2, false) 
        c.fillStyle=this.color
        c.fill()


        if(this.color=='white'){

             c.font = "28px Arial";
             c.fillStyle='black';

             c.fillText( "ON", this.x-(this.radius*0.720) , this.y+9  );

         }else{  //black
             c.font = "20px Arial";
             c.fillStyle='white';
             // if(thepointIs=="10")  c.fillText( thepointIs, this.x-(this.radius*0.70) , this.y+7  );
             //    else   c.fillText( thepointIs, this.x-(this.radius*0.60) , this.y+7  );
            c.fillText( thepointIs, this.x-(this.radius*0.660) , this.y+7  );

            var xd = this.x-(this.radius*0.860) ;
            if (xd<300){
             c.font = "14px Arial";
             c.fillStyle='yellow';
            c.fillText( "- ALL BETS OFF ON THE COME OUT -", 388, this.y-30  );
              }

         }

        // c.fillText( thepointIs, this.x-(this.radius*0.50) , this.y+7  );
   

    }

}


// 
function CheckForTableBet(x3,y3){

var tableBetNum=-1;

    var s;
    var x2,y2,w2,h2;

    for(s=0;s<gTableBetXYWHlen;s+=gTableBetXYWHoffset){
        x2 = gTableBetXYWH[ s + 0 ] + gCrapsTableX;
        y2 = gTableBetXYWH[ s + 1 ] + gCrapsTableY;
        w2 = gTableBetXYWH[ s + 2 ];
        h2 = gTableBetXYWH[ s + 3 ];

        if(x3 > x2  &&  x3<(x2+w2) &&
        	 y3 > y2  &&  y3<(y2+h2)
           ){
        	// inside  box hit
        	tableBetNum = s/gTableBetXYWHoffset;
        	return(tableBetNum);

        }//if


	}//for

	return(tableBetNum);

}//fn


function initTableBets(debugOnOff){

    var s;
    var x2,y2,w2,h2;
    var colstr0='red';

    playerBets=[]


    for(s=0;s<gTableBetXYWHlen;s+=gTableBetXYWHoffset){
        x2 = gTableBetXYWH[ s + 0 ] + gCrapsTableX;
        y2 = gTableBetXYWH[ s + 1 ] + gCrapsTableY;
        w2 = gTableBetXYWH[ s + 2 ];
        h2 = gTableBetXYWH[ s + 3 ];

//     constructor(x,y,radius, w,h, colorOn , colorOff,colorText, jText ,
//             jAlpha, rndCorner, pxStr){
if(colstr0=='red') colstr0='orange';
  else if(colstr0=='orange') colstr0='blue';
  else if(colstr0=='blue') colstr0='cyan';
    else colstr0='red';

 var jbBut1 = new jButtonRound(      x2 ,
                                     y2 ,
                                      2,
                                      w2 ,
                                      h2 ,
                                  //    'green',  'red',  'white',
                                      'green', colstr0,  'white',
                                      " ",
                                      0.38, 2.0, "20", " "

            );
 
  if(   gDebugMode==1  || debugOnOff==1 ){

       jbBut1.draw()
  
  }//if
  

    }//for


}



function DrawMultiPlayerTableSpots( ){

    var s;
    var k, a ;
    var x2,y2,w2,h2;
    var colstr0='cyan';
 
//  multiplayerRects
    for( s=0;s<multiplayerRectsLen;s+= 4 ){
      a=s/4; a++;
        x2 = multiplayerRects[ s + 0 ] + gCrapsTableX;
        y2 = multiplayerRects[ s + 1 ] + gCrapsTableY;
        w2 = multiplayerRects[ s + 2 ];
        h2 = multiplayerRects[ s + 3 ];


      if(colstr0=='cyan') colstr0='white';
        else if(colstr0=='white') colstr0='grey';
        else if(colstr0=='grey') colstr0='blue';
          else colstr0='cyan';

 var jbBut1 = new jButtonRound(      x2 ,
                                     y2 ,
                                      2,
                                      w2 ,
                                      h2 ,
                                       'green', colstr0,  'white',
                                      "[p"+a.toString()+"]",
                                      0.38, 2.0, "20", ""

            );
 

       jbBut1.draw()
  
  
  

    }//for


}


function DrawTableBets(debugOnOff){

    var s;
    var x2,y2,w2,h2;
    var colstr0='red';
 

    for(s=0;s<gTableBetXYWHlen;s+=gTableBetXYWHoffset){
        x2 = gTableBetXYWH[ s + 0 ] + gCrapsTableX;
        y2 = gTableBetXYWH[ s + 1 ] + gCrapsTableY;
        w2 = gTableBetXYWH[ s + 2 ];
        h2 = gTableBetXYWH[ s + 3 ];

//     constructor(x,y,radius, w,h, colorOn , colorOff,colorText, jText ,
//             jAlpha, rndCorner, pxStr){
if(colstr0=='red') colstr0='orange';
  else if(colstr0=='orange') colstr0='blue';
  else if(colstr0=='blue') colstr0='cyan';
    else colstr0='red';

 var jbBut1 = new jButtonRound(      x2 ,
                                     y2 ,
                                      2,
                                      w2 ,
                                      h2 ,
                                  //    'green',  'red',  'white',
                                      'green', colstr0,  'white',
                                      " ",
                                      0.38, 2.0, "20", " "

            );
 
  if(   gDebugMode==1  || debugOnOff==1 ){

       jbBut1.draw()
  
  }//if
  

    }//for


}




class TableBet{
    constructor( x,y, w,h,   radius,     betValue, payOn,payOff,

                 betInactive, betIdstr,  masterId,
                
                 playerIdstr, chipx, chipy, chipvalue, hrdwy, chipcolor){

        this.x =x
        this.y =y
        this.w =w
        this.h =h
        this.radius=radius

        this.betValue=betValue
        this.payOn=payOn
        this.payOff=payOff

        this.betInactive= betInactive 
        this.betIdstr=betIdstr
        this.masterId=masterId

        this.playerIdstr=playerIdstr
        this.chipx=chipx
        this.chipy=chipy
        this.chipvalue=chipvalue
        this.hrdwy=hrdwy

        this.chipcolor=chipcolor


     }
    draw(){


        c.beginPath()
        c.arc(this.x, this.y, this.radius+3, 0, Math.PI*2, false) 
        c.fillStyle='black';
        c.fill()
 

        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false) 
        c.fillStyle='white';//RandomColor(); //this.color
        c.fill()

        c.beginPath()
        c.arc(this.x, this.y, this.radius*0.90, 
            0, Math.PI*2, false) 
         c.fillStyle=this.color
        c.fill()

 
         c.fillStyle='red'
        c.font = "24px Arial";
        c.fillText( this.betIdstr, this.x-(this.radius*0.50) , this.y+7  );
   

    }

}

 

class Chip{
    constructor(x,y, radius, color, velocity, alpha, color2){
        this.x =x
        this.y =y
        this.radius=radius
        this.color= color 
        this.velocity=velocity 
        this.alpha=alpha
        this.color2= color2
 
    }
    draw(){
  c.save()
  c.globalAlpha  = this.alpha

        c.beginPath()
        c.arc(this.x, this.y, this.radius+2, 0, Math.PI*2, false) 
        c.fillStyle='black';
        c.fill()

        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false) 
        // c.fillStyle=RandomColor();  
        c.fillStyle=this.color
 
        c.fill()

        c.beginPath()
        // c.arc(this.x, this.y, this.radius*.38, 
        c.arc(this.x, this.y, this.radius*.33, 
            0, Math.PI*2, false) 
        // c.fillStyle= RandomColor(); 
        c.fillStyle=this.color2;//'grey' //this.color

        c.fill()
  c.restore()


    }
}

 
class Projectile{
    constructor(x,y, radius, color, velocity){
        this.x =x
        this.y =y
        this.radius=radius
        this.color= color 
        this.velocity=velocity 
    }
    draw(){ 
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false) 
        c.fillStyle=RandomColor(); //this.color
        c.fill()

        c.beginPath()
        c.arc(this.x, this.y, this.radius*.12, 
            0, Math.PI*2, false) 
        // c.fillStyle= RandomColor(); 
        c.fillStyle=this.color

        c.fill()

// ************************************************************

     var offx = -30;
     var offy = -20;
// rect and yellow xy text
     c.fillStyle = "#223399";         
        c.globalAlpha = 0.350; 

     c.fillRect(this.x+2+offx, this.y-36+offy   ,    112, 32 );
     c.globalAlpha = 1.0; 

         c.fillStyle='yellow'
     c.font = "24px Arial";
     // c.fillText( (this.x).toString() , this.x, this.y );
     c.fillText( ""+(this.x).toString()+","+ (this.y).toString(), this.x+7+offx, this.y-14+offy );
   

    }

}



class ThePoint{
	constructor(x,y, radius, color){
		this.x =x
		this.y =y
		this.radius=radius
		this.color=color 
 	}
    draw(){

    	c.beginPath()
    	c.arc(this.x, this.y, this.radius, 
    		0, Math.PI*2, false) 
    	c.fillStyle=this.color
    	c.fill()

    	c.beginPath()
    	c.arc(this.x, this.y, this.radius*.85, 
    		0, Math.PI*2, false) 
    	c.fillStyle='orange'
    	c.fill()

    }
}

var n=0;
var buttonNumClicked = -1;

const x= canvas.width/2
const y= canvas.height/2

const thepoint = new ThePoint(x, 20 ,35,'white' )
//const thepoint = new ThePoint(x, y*1.5 ,44,'white' )

// init
//
// old 
// c.drawImage(img, 300, 300);
 
///thepoint.draw()


function DiceShake(){

        var jdice1,  jdice2;
        var bOff4=4;
        jdice1 = RandomNum(6)+1; 
        jdice2 = RandomNum(6)+1; 
        PlayRandomSFX('diceshake');

        var i=3;
        var jbBut = new jButtonRound(     bRects[  (i*bOff4) + 0 ] ,
                                      bRects[  (i*bOff4) + 1 ] ,
                                       gRound,
                                      bRects[  (i*bOff4) + 2 ] ,
                                      bRects[  (i*bOff4) + 3 ] ,
                                      'green',  'red',  'white',
                                      jdice1.toString()+" "+ jdice2.toString(),     
                                    1.0, 1.0 , "24", "/"
            );

    jbBut.draw();

}

function PlayRandomSFX(type){
    var jrnd=RandomNum( 3 );

    switch(type){
            case 'diceshake':
               if(jrnd<2) mySound_dice1.play();
                 else if(jrnd<1)  mySound_dice0.play();
                        else  mySound_dice2.play();
            break;
            case 'diceland':
                if(jrnd<2) mySound_diceland1.play();
                    else  mySound_diceland0.play();
               
            break;

    }

}
//
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
//  returns random # 0..num
//
function RandomNum( num ){
   return(   Math.floor(Math.random()*num)   ) ; 
}
function RandomColor(){
    var rstr = "#";
    var rrnd=0;

//  ie  #  + #0a   build color str
    rrnd = RandomNum(256);
    rstr = rstr + rrnd.toString(16);
//  #0af3
    rrnd = RandomNum(256);
    rstr = rstr + rrnd.toString(16);
//  #0af343
    rrnd = RandomNum(256);
    rstr = rstr + rrnd.toString(16);
    
    return( rstr );
}

var jcnt0=0;

var gdice1=1;
var gdice2=1;
var DiceTotal=1;


function drawDice(xx , yy, sc, diceval ){

	xx+=gCrapsTableX;
	yy+=gCrapsTableY - 100;

    switch(diceval){

        case 1: c.drawImage(imgdice1, 0, 0, 256,256, xx,yy, (256*sc), (256*sc) );  break;
        case 2: c.drawImage(imgdice2, 0, 0, 256,256, xx,yy, (256*sc), (256*sc) );  break;
        case 3: c.drawImage(imgdice3, 0, 0, 256,256, xx,yy, (256*sc), (256*sc) );  break;
        case 4: c.drawImage(imgdice4, 0, 0, 256,256, xx,yy, (256*sc), (256*sc) );  break;
        case 5: c.drawImage(imgdice5, 0, 0, 256,256, xx,yy, (256*sc), (256*sc) );  break;
        case 6: c.drawImage(imgdice6, 0, 0, 256,256, xx,yy, (256*sc), (256*sc) );  break;
         

    }

}

function  PlayNewTurnSFX(dice1,dice2){

    var dicetotal = dice1+dice2;
    var hardway = 0;

 
    if(dice1==dice2) hardway = dicetotal;  
        else hardway = 0;

    switch(dicetotal){
        case 2:
            sfx_2.play();
        break;

        case  3:
            sfx_3.play();
         break;
        case  4:
         if(hardway==0){ sfx_4.play(); }else{ sfx_4a.play(); }
         break;

        case  5:
            sfx_5.play();

         break;
        case  6:
         if(hardway==0){ sfx_6.play(); }else{ sfx_6a.play(); }
         break;

        case  7:
            sfx_7.play();        
         break;
        case  8:
         if(hardway==0){ sfx_8.play(); }else{ sfx_8a.play(); }
         break;

        case  9:
         sfx_9.play();    // 7 on the comeout pay the line

         break;
        case  10:
         if(hardway==0){ sfx_10.play(); }else{ sfx_10a.play(); }
         break;

        case  11:
            sfx_11.play();    // 7 on the comeout pay the line

         break;
        case  12:
         if( RandomNum(2) >= 1) sfx_12.play();
           else sfx_12a.play();
         break; 
         case  13:
         if( RandomNum(1) == 0) sfx_13.play();
           else sfx_13a.play();
         break;


        case  14:
             sfx_7a.play();    // 7 on the comeout pay the line
         break;

        case  15:
             sfx_15.play();  // made the point
         break;

        case  17:
             sfx_15a.play();  // the pointis
         break;

         case 81:
            sfx_button1.play();
         break;
         case 82:
            sfx_button2.play();
         break; 

        // case 71:
        //     sfx_charge1.play();
        //  break;
        //  case 72:
        //     sfx_charge2.play();
        //  break; 

         case 90:
            sfx_explosion.play();
         break;
         case 100:
         	mySound_winsong.play();
         	break;
    }    

}//fn

function PayTable(tstr){
          LogGameEvent(tstr,0,( (gdice1+gdice2).toString()+"["+gdice1.toString()+","+ gdice2.toString()+"]" ) ) ;

    if (gDebugMode==1) console.log("] PAY TABLE on Event: {" +tstr+"}");
}


function LogGameEvent(evstr, amt, betIdstr){
     gLastEventButtonStr = gPlayerUserIDstr+" +"+gDiceThrown.toString()+"x, "+ evstr+" "+betIdstr+" $"+amt.toString() ;
     gLastEvent ="{"+gPlayerUserIDNumstr+"_"+gPlayerUserIDstr+"}#"+gDiceThrown.toString()+"|"+ evstr+"_"+betIdstr+"$"+amt.toString()+",";
     gGameLogStr =gGameLogStr+gLastEvent ;

 if (gDebugMode==1) console.log("] GAMELOG: {"+gGameLogStr +"}");
}


function PointIsOff(){

                thepointIs="OFF";
                LogGameEvent('ptOFF',0,thepointIs);

              thisStreak=0;

                to7Streak=0;  // unused depricate...

                 var crapsbutton1 = new CrapsButton(gCrapsTableX+ 10 + 50,gCrapsTableY + 50,gCrapsButtonRad,'black',1 );
                 crapsbutton1.draw();

                 var crapsbutton2 = new CrapsButton(gCrapsTableX+20 + 50+ gTableXOff,gCrapsTableY + 50,gCrapsButtonRad,'black',1 );
                 crapsbutton2.draw();

}

function DrawPatchOver(){

        c.drawImage(imgpatch, 0, 0, 180,144, 70 -10        -(gCrapsButtonRad*1.1)+gCrapsTableX, 50+gCrapsTableY-(gCrapsButtonRad*1.1), (180*0.50), (144* 0.50) );  
        c.drawImage(imgpatch, 0, 0, 180,144, 70+ gTableXOff-(gCrapsButtonRad*1.1)+gCrapsTableX, 50+gCrapsTableY-(gCrapsButtonRad*1.1), (180*0.50), (144* 0.50) );  

// 
}

function DrawCrapsButton(){

  var DiceTotal0; //= gdice1+gdice2;


           if(thepointIs!="OFF"){
                 //  crapsbutton placement here*
                 DiceTotal0 = Number(thepointIs);

                 var trX = ThePointLocations[  2 * DiceTotal0 ]  + gCrapsTableX ;
                 var trY = ThePointLocations[ (2 * DiceTotal0 )+1 ] + gCrapsTableY;

                 var crapsbutton1 = new CrapsButton(trX, trY, gCrapsButtonRad,'white',1 )
                 crapsbutton1.draw()
                 var crapsbutton2 = new CrapsButton(trX + ThePointLocationXAdder , trY, gCrapsButtonRad,'white',1 )
                 crapsbutton2.draw()

                 DrawPatchOver();

               }else{

                 var crapsbutton1 = new CrapsButton(gCrapsTableX+ 10 + 50,gCrapsTableY + 50,gCrapsButtonRad,'black',1 );
                 crapsbutton1.draw();

                 var crapsbutton2 = new CrapsButton(gCrapsTableX+20 + 50+ gTableXOff,gCrapsTableY + 50,gCrapsButtonRad,'black',1 );
                 crapsbutton2.draw();     

               }
               
}//fn

function AddCountdownTime(floatnum){


    countdown+= countdownStart * floatnum;
    if(countdown > countdownStart) countdown= countdownStart ;

}

function RemovePlayerBets(){
// check 1st for come bets, don't pass etc.

   playerBets.splice(0, playerBets.length);

}

function CheckForNoPassLineBet(){
 var nopassLINE = 1;
 // assume no pass line bet placed
            playerBets.forEach( (bet, i) => {
               if( bet.masterId == 13){    
					nopassLINE = 0;
               }
              
              })

            return(nopassLINE);

}


var gVcheat=0;
function RollDice(vcheat)
{

     gdice1= 1+ RandomNum(6);
     gdice2= 1+ RandomNum(6);
     if(vcheat>100){
      gdice1 = 6;
      gdice2 = 6;

     }
}
//
// ***************************
// ********         **********
// ********   Dice  **********
// ********   Land  **********
// ********         **********
// ***************************
//
function DiceLand(){
    var bOff4 =4; 
    var hardway1= 0;
    var tmppct="";

    AddCountdownTime(0.25);

    gDiceThrown++;

    if( CheckForNoPassLineBet()==1 ){
    	PlaceAutoBetNew("passline");
    }

    RollDice(gVcheat);
     // gdice1= 1+ RandomNum(6);
     // gdice2= 1+ RandomNum(6);
     DiceTotal   = gdice1+gdice2;

     if(gdice1==gdice2 && gdice1!=1 && gdice1!=6) hardway1= DiceTotal;

       LogGameEvent("di=",0,( (gdice1+gdice2).toString()+"["+gdice1.toString()+","+ gdice2.toString()+"]" ) ) ;
 

     // drawDice(670,100,0.435, gdice1   );
     // drawDice(798,100,0.435, gdice2   );

     PlayRandomSFX('diceland');

     ProcessBets();

     if (thepointIs=="OFF") {
        // coming out ! sfx

             PlayNewTurnSFX(6,7 );  // 13== comin out/ new shooter

             if(DiceTotal==7){
                PlayNewTurnSFX(7,7 );    // pay comeout line
                PayTable("7comeout");
      // LogGameEvent("7payLine",0,( (gdice1+gdice2).toString()+"["+gdice1.toString()+","+ gdice2.toString()+"]" ) ) ;

             }else if(DiceTotal==11){
                PlayNewTurnSFX(6,5 );    // pay comeout line
                PayTable("11comeout");

             }else if(DiceTotal==12){
                PlayNewTurnSFX(6,6 );    // pay comeout line

             }else if( DiceTotal!=2  &&  DiceTotal!=3 ){
                thepointIs= DiceTotal.toString();
               // PlayNewTurnSFX(9,8);    // 17== the pointIS
        
                 PlayNewTurnSFX(gdice1,gdice2);
       LogGameEvent("PtON=",0,( (gdice1+gdice2).toString()+"["+gdice1.toString()+","+ gdice2.toString()+"]" ) ) ;


              DrawCrapsButton(); 
               

             }

//***************************** POINT ON
     // point_IS ON       
     }else{

 
//***************************** 7 is  ROLLED
         if(DiceTotal==7){
            // if(longestTo7Streak<to7Streak)  longestTo7Streak = to7Streak ;
            if(thisStreak > longestTo7Streak) { 
                longestTo7Streak= thisStreak;
                LogGameEvent("To7StreakBroken",0,( (gdice1+gdice2).toString()+"["+gdice1.toString()+","+ gdice2.toString()+"]" ) ) ;

            }
            c.drawImage(img, 0, 0,  2044,941,  gCrapsTableX,gCrapsTableY, 1024,512);
 
            RenderDice();

             PointIsOff();
             PayTable("7out");
             PlayNewTurnSFX(gdice1,gdice2);
  //           thisStreak=0;
             gSevenOuts++;

             RemovePlayerBets();

            }else thisStreak++;


//***************************** THE POINT_IS MADE / ROLLED
        if( DiceTotal.toString()==thepointIs ){
            if(thisStreak > longestStreak){
               longestStreak= thisStreak;
                LogGameEvent("PtStreakBroken",0,( (gdice1+gdice2).toString()+"["+gdice1.toString()+","+ gdice2.toString()+"]" ) ) ;
            }

          LogGameEvent("Pt"+thepointIs+"Made",0,( thepointIs ) ) ;

          c.drawImage(imgcleanpoints, 0, 0, 1175,510, 32+70+ gCrapsTableX, 2+ 50+gCrapsTableY, (1175*0.6650), (510* 0.6650) );  

            PayTable("point");
             PointIsOff();

             DrawTable();

            PlayNewTurnSFX(7,8);    // made the point
             gPointsMade++;
//thisStreak=0;

            }else {
                PlayNewTurnSFX(gdice1,gdice2);

            }
            

        }// else point is ON
 



    tmppct=" ";

if(thepointIs!="OFF") tmppct= ", "+(100*gPointPcts[DiceTotal]).toFixed(1)+"%";

   
    DrawPlayerCash();

 
     RenderDice();


}//fn

function RenderDice(){

     drawDice(dice1X,dice1Y,dicescale*.9, gdice1   );
     drawDice(dice2X-30,dice2Y,dicescale*.9, gdice2   );

     drawDice( gCrapsTableX+110, gCrapsTableY+ 55,dicescale*.33, gdice1   );
     drawDice(gCrapsTableX+ 148, gCrapsTableY+ 55,dicescale*.33, gdice2   );

     // drawDice(dice1X,dice1Y,dicescale, gdice1   );
     // drawDice(dice2X,dice2Y,dicescale, gdice2   );

     // drawDice(670,100,0.435, gdice1   );
     // drawDice(798,100,0.435, gdice2   );
}


function IncDenomination1(denomInc) {
       AddCountdownTime(0.20);  // give em 10% more bar

     // gChipIndex++; 
     gChipIndex+=denomInc;   // ie + 1  or +  -1
    if(gChipIndex >= gChipIndexLen) gChipIndex=0;  // clamp to max
    if(gChipIndex <0 ) gChipIndex=gChipIndexLen-1;  // clamp to max
 
      const chip1 = new Chip(gTableXOff*0.54 ,38,18,gChipDenominationsColors[ gChipIndex ],1, gChipAlpha, gPlayerChipColor )
       chip1.draw()

switch(gChipIndex){
    case 0:
    case 2:
        mySound_chips5.play();
    break;

    case 1:
    case 3:
        mySound_chips4.play();
    break;

    case 4:
    case 6:
        mySound_chips3.play();
    break;

    case 5:
    case 7:
        mySound_chips1.play();
    break;

    case 8:
    case 9:
        mySound_chips2.play();
    break;


  }//sw

}     


function ShowDenomination() {
  var xxx = bRects[2 * 4 + 0] +30;    // ie idx 2 * 4 off  
         const chip1 = new Chip(xxx ,38,18,gChipDenominationsColors[ gChipIndex ],1, gChipAlpha, gPlayerChipColor )
        chip1.draw()
           

}
function PlayChipsSFX(jnum){

        switch(jnum){
           case 0: mySound_chips1.play();  break;
           case 1: mySound_chips2.play();  break;
           case 2: mySound_chips3.play();  break;
           case 3: mySound_chips4.play();  break;
           case 4: mySound_chips5.play();  break;
        }
}

function Aux(){
      UndoLastBet();

}

var         gChat=0;  // flag
var         gHelp=0;  // flag
 var gChatYoff=25;  
var gChatYtop=189;
var gChatYbottom=420;
var         gChatY=gChatYtop+ gChatYbottom;

function DrawChatText(chatStr, chatcol, chatx){

    c.fillStyle= 'black' ;   
     c.font = "20px Arial";
      c.fillText( chatStr,  chatx+1,  gChatY-6 +1);
      // c.fillText( chatStr,  chatx+2,  gChatY-6 +2);

    c.fillStyle= chatcol ;   
     //c.font = "24px Arial";
      c.fillText( chatStr,  chatx,  gChatY-6);

      gChatY -= gChatYoff;
      if(gChatY<gChatYtop ){
        gChatY= gChatYtop+ gChatYbottom;
      }

}

function DrawHelpWindow(xoff){

 gChatY= gChatYtop+ gChatYbottom;

     c.fillStyle = "#ddddff";         
    c.globalAlpha = 0.650; 

     c.fillRect(xoff+ 0,gChatYtop  ,    320, 420 );
     c.globalAlpha = 1.0; 
     var cstr = 'black'
      DrawChatText("   ", cstr, xoff+ 12);
      DrawChatText("  h   help", cstr, xoff+ 12);
      DrawChatText("  u   undo bet", cstr, xoff+ 12);
      DrawChatText("  c   chat window", cstr, xoff+ 12);
      DrawChatText("  -   decrease bet size", cstr, xoff+ 12);
      DrawChatText("  =   increase bet size", cstr, xoff+ 12);
	  DrawChatText("          hornHiYo + Field + COME", cstr, xoff+ 12);

      DrawChatText("  '   auto bet: 4 hardways +", cstr, xoff+ 12);
      DrawChatText("  D   Draw bet collision boxes", cstr, xoff+ 12);
      DrawChatText("  P   Player table positions", cstr, xoff+ 12);

      DrawChatText(" ", cstr,xoff+ 12);
      DrawChatText("  /   shake dice", cstr, xoff+ 12);
      DrawChatText("return   roll dice", cstr, xoff+ 12);
      DrawChatText(" ", cstr, xoff+ 12);
      DrawChatText(" ", cstr, xoff+ 12);
           cstr = 'blue'

      DrawChatText(" ******** HELP MENU ******** ", cstr, xoff+ 12);
     
}

function DrawChatWindow(xoff){
        gChatY= gChatYtop+ gChatYbottom;

     c.fillStyle = "#ddddff";         
    c.globalAlpha = 0.550; 

     c.fillRect(xoff+ 0,gChatYtop  ,    320, 420 );
     c.globalAlpha = 1.0; 

      DrawChatText(gPlayerUserIDstr+": chat line 1  LA Dodgers !", RandomColor(), xoff+ 12);
      DrawChatText(gPlayerUserIDstr+": chat line 2  Biden 2020", RandomColor(), xoff+ 12);
      DrawChatText(gPlayerUserIDstr+": chat line 3 ssssupp!", RandomColor(), xoff+ 12);
      DrawChatText(gPlayerUserIDstr+": hello all 4", RandomColor(), xoff+ 12);
      DrawChatText(gPlayerUserIDstr+": chat line 5", RandomColor(), xoff+ 12);
      DrawChatText(gPlayerUserIDstr+": chat line 6 && & yo Ted", RandomColor(), xoff+ 12);
      DrawChatText(gPlayerUserIDstr+": chat line 7th chat entered", RandomColor(), xoff+ 12);
      DrawChatText(gPlayerUserIDstr+": chat line 8th chat entered", RandomColor(), xoff+ 12);
      DrawChatText(gPlayerUserIDstr+": chat line 9th chat entered", RandomColor(), xoff+ 12);
      DrawChatText(gPlayerUserIDstr+": chat line 10th chat entered", RandomColor(), xoff+ 12);
      DrawChatText(gPlayerUserIDstr+": chat line 11th chat go Lakers!", RandomColor(), xoff+ 12);

    // c.fillStyle=RandomColor();// 'yellow'
    //  c.font = "20px Arial";
    //   c.fillText( "chat line 1",          xoff+12,430 );
    //   c.fillText( "chat line 2",          xoff+12,410 );
    //   c.fillText( "chat line 3 ehhelelo", xoff+12,390 );
    //   c.fillText( "chat line 4 nicez!", xoff+12,370 );
    //   c.fillText( "chat line 5 Al-0 in da house", xoff+12,350 );
    //   c.fillText( "chat line 6 yo Ted !", xoff+12,330 );
    //   c.fillText( "chat line 7 ssup !", xoff+12,310 );
   
}
function RenderChatWindow(offOn){
  if(offOn==0){
    DrawTable();
  }else if(offOn==2){
    
        DrawTable();

    DrawChatWindow(1024-320);
  }else if(offOn==1){
        DrawTable();
    DrawChatWindow(0);

  }else if(offOn==10){
        DrawTable();

    DrawHelpWindow(1024-512 - (320/4) );
  }

}
function ChatHandler(){
      if(gChat==0){
        gChat=1; gHelp = 0;
      }else if(gChat==1){
        gChat=2; gHelp = 0;
      }else{
        gChat=0;
      }
     RenderChatWindow(gChat);

}
function HelpHandler(){
	if(gHelp==0){
        gHelp=1;
      }else gHelp = 0;

     RenderChatWindow( (gHelp*10) );   // send in a 0 or 10


}


addEventListener( "keydown", (doKeyDown ) => {
   
  //console.log(doKeyDown);

  if(doKeyDown.key == "Enter"){
      DiceLand();
  	}else if(doKeyDown.key == "/"){
     	 DiceShake();
      }else if( doKeyDown.key=="D"){
          DrawTableBets(1);
           //
      }else if( doKeyDown.key=="P"){
          DrawMultiPlayerTableSpots();
           //
      }else if( doKeyDown.key=="r"){
           DrawTable();

      }else if( doKeyDown.key=="=" ||  doKeyDown.key=="+"  ){
           IncDenomination1(1);
           DrawDenomButton();
      }else if( doKeyDown.key=="-"){
           IncDenomination1(-1);
           DrawDenomButton();

      }else if( doKeyDown.key=="u"){
         UndoLastBet();   //UndoAllBets();

      }else if( doKeyDown.key=="U"){
         UndoAllBets();

      }else if( doKeyDown.key == "'"){
        
         PlaceAutoBetNew('normal8');     
         
      }else if( doKeyDown.key == "c"){
        
         ChatHandler();     
         
      }else if( doKeyDown.key == "h" || doKeyDown.key == "H" || doKeyDown.key == "?"  ){
        
         HelpHandler();     
         
      }


      // else if(doKeyDown.key=="a"  ){
      //   gVcheat=101;
      // }else if(doKeyDown.key=="z"  ){
      //   gVcheat=0;
      // }




})

var gIncXModulo=0;
var gIncYModulo=0;
var gIncModulo=5;
var gIncModulo1=21;

var gIncModuloAdder=3;


function PlaceAutoBetNew( typeStr  ){
let xaddr,yaddr;  var i,x,y;
    gIncXModulo+=gIncModuloAdder; 
    gIncYModulo++;
      gIncModulo1= (gTableAutoBetsLen/2)-1;  //modulo offset from len of autobets
      xaddr = (gIncXModulo%gIncModulo1)-8;
      yaddr = (gIncYModulo%gIncModulo1);

if(typeStr=="passline"){
			i= 2*  0;
 			x= xaddr+  gCrapsTableX+   gTableAutoBets[ i +0 ]; 
            y= yaddr+   gCrapsTableY+  gTableAutoBets[ i +1 ]; 
          PlacePlayerBet(x,y);

}else if(typeStr!="moveComeBet"){
      for(i=0;i<gTableAutoBetsLen;i+=2){
          x= xaddr+  gCrapsTableX+   gTableAutoBets[ i +0 ]; 
          y= yaddr+   gCrapsTableY+  gTableAutoBets[ i +1 ]; 
          PlacePlayerBet(x,y);
      }//for
  }else if(typeStr=="moveComeBet"){
     	 i = (gdice1+gdice2 )*2;
          x= xaddr+  gCrapsTableX+   ThePointLocations[ i +0 ]; 
          y= yaddr+50+gCrapsTableY+  ThePointLocations[ i +1 ]; 
          PlacePlayerBet(x,y);
      //}//for
  

  }//if


}//fn

function PlaceAutoBet(masterIDtocheck){
 return;

var ii=0; var s=0;
var mid, xx,yy,ww,hh;
var betfound=0;

 
//  + gCrapsTableX;
// var gTableBetXYWHoffset = 8;
// var gTableBetXYWH= [ +0,  +1,  2,  3,    4,   5,   6,     7
//                       x,   y,  w,  h,    rad, id, payout, HardwayYes

	//for(ii=0;ii<gTableBetXYWHlen;ii+=gTableBetXYWHoffset){
	ii=0;
	while(ii<gTableBetXYWHlen && betfound==0){
		s = ii/gTableBetXYWHoffset;

  		mid = gTableBetXYWH= [s + 5];
  		if( mid == masterIDtocheck ){
			// console.log('mID='+mid);

			PlacePlayerBet(  gCrapsTableX+ gTableBetXYWH[s+0]+ (gTableBetXYWH[s+2]/2), 
							         gCrapsTableY + gTableBetXYWH[s+1]+ (gTableBetXYWH[s+3]/2) );

			console.log('mID='+mid);

			betfound=1;
  			// autobet*

  		}

  		ii+=gTableBetXYWHoffset;
	}//while
}

//
//				EVENT LISt.'s'
//
addEventListener('click', (event) => {
	//console.log(event)
	var xx = event.clientX
	var yy = event.clientY


    // global
 	 n++; 

  

    var bclicked = GetButtonNumClicked(xx,yy);
//gButtonNumClicked
//var jrnd= RandomNum( 3 );
    if(bclicked==-1 && yy > gCrapsTableY){

//PLACE CHIPS HERE
         PlacePlayerBet(xx,yy);
         
           
    }else{
        switch(bclicked){
            case 0: DiceShake(); break;
           case 1:  DiceLand();  break;   // throw dice
            case 2: ShowDenomination(); break;
           // case 2: if(countdown<(countdownStart-25)) countdown+=25;  break;
           case 3:
			;
            break;
           case 4:   
                SpawnFireworks('fireworks', 200, .5);

           break;
           case 5:
                         Aux();
             // if (gTimerBarMultiplier == gTimerBarMultiplierStart)  gTimerBarMultiplier = 0.025;
             //  else gTimerBarMultiplier = 0.125;
            break;
         	case 7:
          		 GetCasinoServerDataPrep();
            break;

          case 8:  
          			if(gCountdownStopper ==1 )  gCountdownStopper=0;
          			    else gCountdownStopper=1;
          break;

          case 9:   /// sfx button
            	if(gSFX==1)  gSFX=0;
          			else if(gSFX==0) gSFX=1;
          break;

            }
        }
     

  }

)// addEventListener


    // create player bet in array by pushing
    // 
    //  constructor( x,y, w,h, 
    //  
    //                radius,  betValue, payOn,payOff,  
    //
    //                betInactive, betIdstr,  masterId,
    //                          
    //                playerIdstr, chipx, chipy, 
    //
    //                chipvalue, hrdwy){
    //
    // 
// var gTableBetXYWH= [
//                    x,   y,  w,  h,    rad, id, payout, HardwayYes
/*

playerBets .pu sh(new TableBet(gTableBetXYWH[s+0], gTableBetXYWH[s+1], gTableBetXYWH[ s + 2], gTableBetXYWH[ s + 3],

                        gChipRadius, gTableBetXYWH[s+5], betodds, 0.0,  

                             0, gTableBetNames[betidx], betidx ,

      "{"+gPlayerUserIDNumstr+"|"+ gPlayerUserIDstr +"}",xx1, yy1, 

        gChipDenominations[ gChipIndex ],  gTableBetXYWH[ s + 7] ));

*/

function ReturnPlayerIDandNameStr(){
  return(      "{"+gPlayerUserIDNumstr+"|"+ gPlayerUserIDstr +"}"    ); 
}
function StartLerp(){
  ;  // reserved
}
function ProcessCOMEBet(idx){ //,  diRolled){
   // StartLerp();    // future anim of chips etc
  // 1. splice, remove idx of this come bet

    playerBets.splice(idx,1);
  // 2. to get here gdice1+gdice2 = { 4,5,6, 8,9,10 }
  //    PLACE new bet at (x,y)
   console.log("ProcessCOMEBet(), just rolled:" + (gdice1+gdice2) );
  // just make sure a 2, 3, or 12 was not rolled when COME bet is placed... 
  //             in that case the bet is removed, and not put up on the come bets...
  // OLD-->  // if( (gdice1+gdice2) !=12  && (gdice1+gdice2 !=2)  && (gdice1+gdice2 !=3)  &&  (gdice1+gdice2 !=5)  ){}
      PlaceAutoBetNew("moveComeBet");

   

   
  
}
function ComputePayoutAndPay( amtBet, betPayoutRatio){
  var paylogstr0 ="";
  var paylogstr ="";
  var paylogstr1 ="";


  // var moneyOwed= (amtBet * betPayoutRatio) - amtBet;
  var moneyOwed= (amtBet * betPayoutRatio); // - amtBet;

  gPlayerChips += moneyOwed;
  gHouseChips -=moneyOwed;

 
 paylogstr0 = "["+gdice1.toString()+","+gdice2.toString() +"]"+gPlayerUserIDstr+ " PAID $"+formatNumber( moneyOwed ).toString() +" for a $"+formatNumber( amtBet).toString()+ " " + gTableBetNames[gBet_ID] ;
 paylogstr = "PAID "+gPlayerUserIDstr +" $"+formatNumber( moneyOwed ).toString() +" for a $"+ formatNumber( amtBet).toString()+ " " + gTableBetNames[gBet_ID] ;
 paylogstr1 =ReturnPlayerIDandNameStr()+ "["+gdice1.toString()+","+gdice2.toString() +"]"+ " PAID $"+moneyOwed.toString() +" for a $"+ amtBet.toString()+ " " + gTableBetNames[gBet_ID] ;


 ShootFireworks(0);
 // var numFireworks = 0;

 // if(gdice1==gdice2) numFireworks = 200
 // if(gdice1==gdice2 && gidce1==6) numFireworks = 400
 // if(gdice1==gdice2 && gidce1==1) numFireworks = 300
 // if(gdice1+gdice2 ==11) numFireworks = 400
 // if(gdice1+gdice2 ==3) numFireworks = 300
   
 //   if(numFireworks>0 ) SpawnFi reworks('fireworks', numFireworks, 10)
  
console.log(paylogstr);

  UpdateBetButton( paylogstr );

  LogGameEvent(paylogstr1 , moneyOwed,"payout") ;

 //return(moneyOwed);

}//fn 

function startParticles(){
                   sillycnt =0;
                  animateParticles();
}

function   ShootFireworks(numF){
 var numFireworks = numF;

 if(gdice1==gdice2) numFireworks = 150
 if(gdice1==gdice2 && gdice1==6) numFireworks = 250
 if(gdice1==gdice2 && gdice1==1) numFireworks = 220
 if(gdice1+gdice2 ==11) numFireworks = 260
 if(gdice1+gdice2 ==3) numFireworks = 200
   
   if(numFireworks>0 ){ 
      SpawnFireworks('fireworks', numFireworks, 10)
      startParticles();
    }
  
}//fn

function ProcessBets(  ){

var pointOn=1;
var hardway=0; 
var diceRolled=0; 

// check current, global dice - check for Hardway
    if(gdice1 == gdice2      && gdice1>1       && gdice1<6  ) hardway=1;

    diceRolled = gdice1 + gdice2;

    if(thepointIs=="OFF"){
      pointOn=0;  // point off

    }else{
          pointOn = Number(thepointIs);

    }
    console.log('Pt, diceRolled='+thepointIs+','+diceRolled)  ;

// loop for WHEN POINT IS ON...
// loop for WHEN POINT IS ON...
// loop for WHEN POINT IS ON...
// loop for WHEN POINT IS ON...
      if(thepointIs!="OFF"){


            playerBets.forEach( (bet, i) => {
               gBet_ID = bet.masterId;    // for use in fn ComputePayoutAndPay(a,b) above
                

// PASS LINE & BEHIND PASS LINE
                if(  (pointOn==diceRolled)  &&  ( bet.masterId==13 ||  bet.masterId==14  )   ){
                     ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                     ShootFireworks(300);

                }



               switch(diceRolled){
                    case 2:
                      RemoveBet(7);
                      if(bet.masterId==2 || bet.masterId==25 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                          else if( bet.masterId==9){
                              ComputePayoutAndPay( bet.chipvalue, bet.payOn * 2 );  // field pays 2x on 2, 12
                          
                          }else if(bet.masterId==31 ){
                                           SpawnFireworks('fireworks', 200, .5);
										PlayNewTurnSFX(100,0);
                                        // hhyo 2
                                        //     - divide bet.chipvalue  / 5  , and payout 31-1 
                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             }  

                    break;

                    case  3:
                      RemoveBet(7);

                      if( bet.masterId==3 || bet.masterId==9   || bet.masterId==25 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                          else if(bet.masterId==31 ){
                                        // hhyo 3
                                        //     - divide bet.chipvalue  / 5  , and payout 16-1 
                               				PlayNewTurnSFX(100,0);
                                                    SpawnFireworks('fireworks', 100, .5);

                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             } 
                    break;

                    case  4:
                      if(bet.masterId==7) ProcessCOMEBet(i); //, diceRolled);

                      RemoveAllOneRollBets();
                      if(gdice1!=gdice2 )  RemoveBet( 24 ) ;  // easy so remove hardways

                      if(bet.masterId==4 ||  bet.masterId==9 || bet.masterId==25 ){           
                         ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                      }else if( hardway==1  && bet.masterId==24 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    break;

                    case  5:
                      if(bet.masterId==7) ProcessCOMEBet(i); //,, diceRolled);
                        RemoveAllOneRollBets();
                        if(bet.masterId==5 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    break;

                    case  6:
                      if(bet.masterId==7) ProcessCOMEBet(i); //,, diceRolled);
                      RemoveAllOneRollBets();
                      if(gdice1!=gdice2 )  RemoveBet( 26 ) ;  // easy so remove hardways

                      if(bet.masterId==6 || bet.masterId==23){   // 23== BIG 68        
                             ComputePayoutAndPay( bet.chipvalue, bet.payOn );
 
                          }else if( hardway==1  && bet.masterId==26 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                      
                    break;
                    
                    case  7:
                          RemoveAllOneRollBets();
                        if(bet.masterId==7 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    break;
                    
                    case  8: 
                      if(bet.masterId==7) ProcessCOMEBet(i); //,, diceRolled);
                      RemoveAllOneRollBets();
                      if(gdice1!=gdice2 )  RemoveBet( 28 ) ;  // easy so remove hardways

                        if(bet.masterId==8 ||   bet.masterId==23 ){          
                            ComputePayoutAndPay( bet.chipvalue, bet.payOn );
  
                          }else if( hardway==1  && bet.masterId==28 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    break;

                    case  9:
                      if(bet.masterId==7) ProcessCOMEBet(i); //,, diceRolled);
                        RemoveAllOneRollBets();

                        if(bet.masterId==9 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    break;

                    case 10:
                      if(bet.masterId==7) ProcessCOMEBet(i); //,, diceRolled);
                        RemoveAllOneRollBets();

                        if(gdice1!=gdice2 )  RemoveBet( 30 ) ;  // easy so remove hardways

                        if(bet.masterId==10 || bet.masterId==9 || bet.masterId==25  ){          
                             ComputePayoutAndPay( bet.chipvalue, bet.payOn );
 
                          }else if( hardway==1  && bet.masterId==30 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    break;

                    case 11:
                          if(bet.masterId==11 || bet.masterId==9)  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                            else    if(bet.masterId==31 ){
                                        // hhyo 11
                                        //     - divide bet.chipvalue  / 5 * 2 , and payout 16*2 to 1, or 32-1 
                                 				PlayNewTurnSFX(100,0);
                                                  SpawnFireworks('fireworks', 500, 0.75);

                                          ComputePayoutAndPay( (bet.chipvalue / 5 )*2 ,  32  );
                                             }
                    break;

                    case 12:
                       RemoveBet(7);
                       if(bet.masterId==12 || bet.masterId==25 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                          else  if( bet.masterId==9){
                              ComputePayoutAndPay( bet.chipvalue, bet.payOn * 2 )
                          } else    if(bet.masterId==31 ){
                                        // hhyo 12
                                        //     - divide bet.chipvalue  / 5  , and payout 31-1 
                              				PlayNewTurnSFX(100,0);
        			                        SpawnFireworks('fireworks', 900, .5);

                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             }// else  if( bet.masterId==31){}  //hhyo 12

                    break;


                   //   if (bet ==1){

                   //      gPlayerChips = gPlayerChips + (amtbet * payoutRatio) - amtbet ;

                   // }
                }//sw

            })// forEach



//  ############################################## POINT IS OFF !!!!
//  ############################################## POINT IS OFF !!!!
//  ############################################## POINT IS OFF !!!!
          }else {   // POINT IS  OFF !
              

          playerBets.forEach( (bet, i) => {
               // if(bet.masterId = idToProcess){}else{}
            
               // bet.payOn;
               // bet.chipvalue;

               gBet_ID = bet.masterId;    // for use in fn ComputePayoutAndPay(a,b) above
                
               // POINT IS OFF !!!
                switch(diceRolled){
                    case 2:
                       RemoveBet(7);
                        if(bet.masterId==2 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                           else if(bet.masterId==31 ){
                                        // hhyo 2
                                        //     - divide bet.chipvalue  / 5  , and payout 31-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             }   
                         RemoveBet(13);           
                    break;

                    case  3:
                        RemoveBet(13);           

                       RemoveBet(7);
                       if(bet.masterId==3  )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                          else if(bet.masterId==31 ){
                                        // hhyo 3
                                        //     - divide bet.chipvalue  / 5  , and payout 16-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             } 
                    break;

                    case 4:
                    case 5:
                    case 6:
                    case 8:
                    case 9:
                    case 10:
                           RemoveAllOneRollBets();

                    break;
                    // case  4:
                    //   if(bet.masterId==4 ||  bet.masterId==9){          // 4 easy, 4 hard or FIELD
                    //      ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    //   }else if( hardway==1  && bet.masterId==24 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    // break;

                    // case  5:
                    //     if(bet.masterId==5 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    // break;

                    // case  6:
                    //   if(bet.masterId==6 || bet.masterId==23){   // 23== BIG 68        
                    //          ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    //       }else if( hardway==1  && bet.masterId==26 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                      
                    // break;
                    
                    case  7:
                      RemoveAllOneRollBets();
                        //POINT OFF - PAY COME BET PAY LINE BUT NOT BEHIND THE LINE
                        if(bet.masterId==7 || bet.masterId==13    )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    break;
                    
                    // case  8: 
                    //     if(bet.masterId==8 ||   bet.masterId==23 ){          
                    //          ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    //       }else if( hardway==1  && bet.masterId==28 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    // break;

                    // case  9:
                    //     if(bet.masterId==9 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    // break;

                    // case 10:
                    //  if(bet.masterId==10 || bet.masterId==9 ){          
                    //          ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    //       }else if( hardway==1  && bet.masterId==30 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    // break;

                    case 11:
                          if(bet.masterId==11 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                            else    if(bet.masterId==31 ){
                                        // hhyo 11
                                        //     - divide bet.chipvalue  / 5 * 2 , and payout 16*2 to 1, or 32-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 )*2 ,  32  );
                                             }
                    break;

                    case 12:
                        RemoveBet(7);
                         if(bet.masterId==12 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                          else     if(bet.masterId==31 ){
                                        // hhyo 12
                                        //     - divide bet.chipvalue  / 5  , and payout 31-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             }// else  if( bet.masterId==31){}  //hhyo 12

                        RemoveBet(13);           

                    break;
                    
                    // case  13:
                    //     if( bet.masterId==13  )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    // break;

                   //   if (bet ==1){

                   //      gPlayerChips = gPlayerChips + (amtbet * payoutRatio) - amtbet ;

                   // }
                }//sw

            })// forEach



          }



}//fn



// old
function ProcessBets1(  ){

var pointOn=1;
var hardway=0; 
var diceRolled=0; 

// check current, global dice - check for Hardway
    if(gdice1 == gdice2   && gdice1 >1   && gdice1 <6  ) hardway=1;

      diceRolled = gdice1 + gdice2;

    if(thepointIs=="OFF"){
      // diceRolled = gdice1 + gdice2;
      pointOn=0;  // point off

    }else{
     ; // diceRolled  = Number(thepointIs);

    }
    console.log('Pt, diceRolled='+thepointIs+','+diceRolled)  ;

// loop for WHEN POINT IS ON...
          if(thepointIs!="OFF"){

               playerBets.forEach( (bet, i) => {
               // if(bet.masterId = idToProcess){}else{}
            
               // bet.payOn;
               // bet.chipvalue;

               gBet_ID = bet.masterId;    // for use in fn ComputePayoutAndPay(a,b) above
                
                switch(diceRolled){
                    case 2:
                      if(bet.masterId==2 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                          else if( bet.masterId==9){
                              ComputePayoutAndPay( bet.chipvalue, bet.payOn * 2 );  // field pays 2x on 2, 12
                          }else if(bet.masterId==31 ){
                                        // hhyo 2
                                        //     - divide bet.chipvalue  / 5  , and payout 31-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             }              
                    break;

                    case  3:
                        if(bet.masterId==3 || bet.masterId==9)  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                          else if(bet.masterId==31 ){
                                        // hhyo 3
                                        //     - divide bet.chipvalue  / 5  , and payout 16-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             } 
                    break;

                    case  4:
                      RemoveAllOneRollBets();
                      if(bet.masterId==4 ||  bet.masterId==9){          // 4 easy, 4 hard or FIELD
                         ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                         RemoveBet( 24 ) ;  // easy 4, remove hardways

                      }else if( hardway==1  && bet.masterId==24 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    break;

                    case  5:
                         RemoveAllOneRollBets();

                        if(bet.masterId==5 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    break;

                    case  6:
                       RemoveAllOneRollBets();

                      if(bet.masterId==6 || bet.masterId==23){   // 23== BIG 68        
                             ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                              RemoveBet( 26 ) ;  // easy , remove hardways

                          }else if( hardway==1  && bet.masterId==26 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                      
                    break;
                    
                    case  7:
                          RemoveAllOneRollBets();

                    break;
                    
                    case  8: 
                          RemoveAllOneRollBets();

                        if(bet.masterId==8 ||   bet.masterId==23 ){          
                             ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                            RemoveBet( 28 ) ;  // easy , remove hardways

                          }else if( hardway==1  && bet.masterId==28 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    break;

                    case  9:
                       RemoveAllOneRollBets();

                        if(bet.masterId==9 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    break;

                    case 10:
                           RemoveAllOneRollBets();

                     if(bet.masterId==10 || bet.masterId==9 ){          
                             ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                             RemoveBet( 30 ) ;  // easy , remove hardways

                          }else if( hardway==1  && bet.masterId==30 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    break;

                    case 11:
                          if(bet.masterId==11 || bet.masterId==9)  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                            else    if(bet.masterId==31 ){
                                        // hhyo 11
                                        //     - divide bet.chipvalue  / 5 * 2 , and payout 16*2 to 1, or 32-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 )*2 ,  32  );
                                             }
                    break;

                    case 12:
                        if(bet.masterId==12 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                          else  if( bet.masterId==9){
                              ComputePayoutAndPay( bet.chipvalue, bet.payOn * 2 )
                          } else    if(bet.masterId==31 ){
                                        // hhyo 12
                                        //     - divide bet.chipvalue  / 5  , and payout 31-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             }// else  if( bet.masterId==31){}  //hhyo 12

                    break;

                    // case  13:
                    //     if( bet.masterId==13  )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    // break;

                   //   if (bet ==1){

                   //      gPlayerChips = gPlayerChips + (amtbet * payoutRatio) - amtbet ;

                   // }
                }//sw

            })// forEach



//  ####################################################### POINT IS OFF !!!!
          }else {   // POINT IS  OFF !
              

          playerBets.forEach( (bet, i) => {
               // if(bet.masterId = idToProcess){}else{}
            
               // bet.payOn;
               // bet.chipvalue;

               gBet_ID = bet.masterId;    // for use in fn ComputePayoutAndPay(a,b) above
                
                switch(diceRolled){
                    case 2:
                      if(bet.masterId==2 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                           else if(bet.masterId==31 ){
                                        // hhyo 2
                                        //     - divide bet.chipvalue  / 5  , and payout 31-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             }              
                    break;

                    case  3:
                        if(bet.masterId==3  )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                          else if(bet.masterId==31 ){
                                        // hhyo 3
                                        //     - divide bet.chipvalue  / 5  , and payout 16-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             } 
                    break;

                    case 4:
                    case 5:
                    case 6:
                    case 8:
                    case 9:
                    case 10:
                           RemoveAllOneRollBets();

                    break;
                    // case  4:
                    //   if(bet.masterId==4 ||  bet.masterId==9){          // 4 easy, 4 hard or FIELD
                    //      ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    //   }else if( hardway==1  && bet.masterId==24 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    // break;

                    // case  5:
                    //     if(bet.masterId==5 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    // break;

                    // case  6:
                    //   if(bet.masterId==6 || bet.masterId==23){   // 23== BIG 68        
                    //          ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    //       }else if( hardway==1  && bet.masterId==26 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                      
                    // break;
                    
                    case  7:
                      RemoveAllOneRollBets();

                        if(bet.masterId==7 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    break;
                    
                    // case  8: 
                    //     if(bet.masterId==8 ||   bet.masterId==23 ){          
                    //          ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    //       }else if( hardway==1  && bet.masterId==28 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    // break;

                    // case  9:
                    //     if(bet.masterId==9 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    // break;

                    // case 10:
                    //  if(bet.masterId==10 || bet.masterId==9 ){          
                    //          ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    //       }else if( hardway==1  && bet.masterId==30 ) ComputePayoutAndPay( bet.chipvalue, bet.payOn );

                    // break;

                    case 11:
                          if(bet.masterId==11 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                            else    if(bet.masterId==31 ){
                                        // hhyo 11
                                        //     - divide bet.chipvalue  / 5 * 2 , and payout 16*2 to 1, or 32-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 )*2 ,  32  );
                                             }
                    break;

                    case 12:
                        if(bet.masterId==12 )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                          else     if(bet.masterId==31 ){
                                        // hhyo 12
                                        //     - divide bet.chipvalue  / 5  , and payout 31-1 
                                        //
                                          ComputePayoutAndPay( (bet.chipvalue / 5 ) ,  bet.payOn );
                                             }// else  if( bet.masterId==31){}  //hhyo 12

                    break;
                    
                    // case  13:
                    //     if( bet.masterId==13  )  ComputePayoutAndPay( bet.chipvalue, bet.payOn );
                    // break;

                   //   if (bet ==1){

                   //      gPlayerChips = gPlayerChips + (amtbet * payoutRatio) - amtbet ;

                   // }
                }//sw

            })// forEach



          }



}//fn


function UpdateBetButton(argstr) {

    var i=3; var bOff4=4;

    var jbBut = new jButtonRound(     bRects[  (i*bOff4) + 0 ] ,
                                      bRects[  (i*bOff4) + 1 ] ,
                                       gRound,
                                      bRects[  (i*bOff4) + 2 ] ,
                                      bRects[  (i*bOff4) + 3 ] ,
                                      'green',  'orange',  'black',
                                     // gdice1.toString()+" "+ gdice2.toString()+" "+argstr,     
                                        argstr,     
                                    1.0, 1.0 , "18", " "
            );

    jbBut.draw();

}//fn

/*


gServerStr = 13,jb,0,80,350,300,35,13,13,1,0,0,PASS Line,13,{13|jb},230,470,5,0,#dc122a,13,jb,1,494,316,46,30,13,31,31,0,0,HORN HI YO,31,{13|jb},517,431,10,0,#1936fc,
13,jb,2,515,250,80,36,13,24,8,0,0,HARD 4,24,{13|jb},561,367,10,1,#1936fc,13,jb,3,80,350,300,35,13,13,1,0,0,PASS Line,13,{13|jb},225,467,10,0,#1936fc,13,jb,4,432,210,80,36,13,26,10,0,0,HARD 6,26,{13|jb},447,336,10,1,#1936fc,
13,jb,5,515,210,80,36,13,30,8,0,0,HARD 10,30,{13|jb},530,336,10,1,#1936fc,13,jb,6,432,250,80,36,13,28,10,0,0,HARD 8,28,{13|jb},447,376,10,1,#1936fc,13,jb,7,515,250,80,36,13,24,8,0,0,HARD 4,24,{13|jb},530,376,10,1,#1936fc,13,jb,8,494,316,46,30,13,31,31,0,0,HORN HI YO,31,{13|jb},512,432,10,0,#1936fc,13,jb,9,104,206,276,50,13,7,1,0,0,COME,7,{13|jb},237,331,10,0,#1936fc,13,jb,10,100,262,280,50,13,9,1,0,0,FIELD,9,{13|jb},235,388,10,0,#1936fc,13,jb,11,100,262,280,50,13,9,1,0,0,FIELD,9,{13|jb},310,406,25,0,#22fe34,13,jb,12,80,350,300,35,13,13,1,0,0,PASS Line,13,{13|jb},309,459,25,0,#22fe34,13,jb,13,434,392,160,76,13,25,15,0,0,5-STAR,25,{13|jb},479,516,25,0,#22fe34,13,jb,14,80,350,300,35,13,13,1,0,0,PASS Line,13,{13|jb},228,468,25,0,#22fe34,13,jb,15,432,210,80,36,13,26,10,0,0,HARD 6,26,{13|jb},450,337,25,1,#22fe34,13,jb,16,515,210,80,36,13,30,8,0,0,HARD 10,30,{13|jb},533,337,25,1,#22fe34,13,jb,17,432,250,80,36,13,28,10,0,0,HARD 8,28,{13|jb},450,377,25,1,#22fe34,13,jb,18,515,250,80,36,13,24,8,0,0,HARD 4,24,{13|jb},533,377,25,1,#22fe34,13,jb,19,494,316,46,30,13,31,31,0,0,HORN HI YO,31,{13|jb},515,433,25,0,#22fe34,13,jb,20,104,206,276,50,13,7,1,0,0,COME,7,{13|jb},240,332,25,0,#22fe34,13,jb,21,100,262,280,50,13,9,1,0,0,FIELD,9,{13|jb},238,389,25,0,#22fe34,13,jb,22,430,370,165,15,13,16,8,0,0,ANY CRAPS,16,{13|jb},522,480,25,0,#22fe34,13,jb,23,80,350,300,35,13,13,1,0,0,PASS Line,13,{13|jb},224,469,25,0,#22fe34,13,jb,24,432,210,80,36,13,26,10,0,0,HARD 6,26,{13|jb},446,338,25,1,#22fe34,13,jb,25,515,210,80,36,13,30,8,0,0,HARD 10,30,{13|jb},529,338,25,1,#22fe34,13,jb,26,432,250,80,36,13,28,10,0,0,HARD 8,28,{13|jb},446,378,25,1,#22fe34,13,jb,27,515,250,80,36,13,24,8,0,0,HARD 4,24,{13|jb},529,378,25,1,#22fe34,13,jb,28,494,316,46,30,13,31,31,0,0,HORN HI YO,31,{13|jb},511,434,25,0,#22fe34,13,jb,29,104,206,276,50,13,7,1,0,0,COME,7,{13|jb},236,333,25,0,#22fe34,13,jb,30,100,262,280,50,13,9,1,0,0,FIELD,9,{13|jb},234,390,25,0,#22fe34,13,jb,31,430,190,165,15,13,15,5,0,0,SEVEN,15,{13|jb},483,299,25,0,#22fe34,13,jb,32,290,118,44,84,13,8,1.2,0,0,EIGHT Placed,8,{13|jb},325,280,100,0,#0f1210,13,jb,33,80,386,300,70,13,14,1,0,0,Behind PASS Line,14,{13|jb},305,508,100,0,#0f1210,13,jb,34,432,328,80,36,13,11,16,0,0,11 Yo 11,11,{13|jb},466,445,100,0,#0f1210,13,jb,35,545,288,54,36,13,12,31,0,0,12 Midnight,12,{13|jb},583,420,1000,0,#33ffff,13,jb,36,104,206,276,50,13,7,1,0,0,COME,7,{13|jb},330,345,1000,0,#33ffff,13,jb,37,80,386,300,70,13,14,1,0,0,Behind PASS Line,14,{13|jb},241,519,5000,0,#FFFF00,13,jb,38,380,118,44,84,13,10,2,0,0,TEN Placed,10,{13|jb},399,276,5000,0,#FFFF00,13,jb,39,380,118,44,84,13,10,2,0,0,TEN Placed,10,{13|jb},395,277,5000,0,#FFFF00,
13,jb,40,380,118,44,84,13,10,2,0,0,TEN Placed,10,{13|jb},398,278,5000,0,#FFFF00,13,jb,41,380,118,44,84,13,10,2,0,0,TEN Placed,10,{13|jb},394,272,5000,0,#FFFF00,

*/

// note this string is concat'd each time a new playerbet is placed, & mirrors the class here

function PrepBetForServer(  x,y,w,h,rad, betId, oddsOn, oddsOff,  n0, betNameStr, betidx ,
		     				pIDstr, xx1, yy1,   denom ,   betHrd ,  denomColorStr ) {


gBetMasterId++;
gBetMasterIdstr = gPlayerUserIDNumstr  +","+gPlayerUserIDstr  +","+ gBetMasterId.toString() ;

		gServerStr +=  gBetMasterIdstr +","+

						x.toString() +","+
						y.toString() +","+
						w.toString() +","+
						h.toString() +","+
						rad.toString() +","+
						betId.toString() +","+
						oddsOn.toString() +","+
						oddsOff.toString() +","+
						n0.toString() +","+
						betNameStr +","+
						betidx.toString() +","+
						pIDstr  +","+
						xx1.toString() +","+
						yy1.toString() +","+
						denom.toString() +","+
						betHrd.toString() +","+
						denomColorStr +",";


						console.log( "gServerStr = "+gServerStr );

}//fn




function PlacePlayerBet(xx1,yy1){
 
	var tstr="";
	var tablebetNo=-1;
	var s=0; 
  var betidx=20;
  var betodds=1.0;
  var hardstr="";
  var betstr0="Nil"; 
  var jrnd=0;
  var x3,y3,w3,h3;

	tablebetNo = CheckForTableBet(xx1,yy1);
if( tablebetNo>=0){

// clamp here for 0 chips blowout...  or < chipSize
        var playerchip = new Chip(xx1,yy1, gChipRadius, gChipDenominationsColors[ gChipIndex ],1, gChipAlpha, gPlayerChipColor )
        playerchip.draw()

        jcnt0++;
        jrnd= jcnt0 %5;
        PlayChipsSFX(jrnd);
    AddCountdownTime(0.10);  // give em 10% more bar

		s = tablebetNo* gTableBetXYWHoffset;

    betidx = gTableBetXYWH[ s + 5 ];
    betodds =  gTableBetXYWH[ s + 6 ];

    if( betidx< gTableBetNamesLen && betidx>=0  ) {
      betstr0= gTableBetNames[betidx] +", pays "+ betodds.toString()+":1" ;
    }

    if(gTableBetXYWH[ s + 7] == 1.0 ) hardstr="Hard"; 
    tstr ="betID_" +gTableBetXYWH[ s + 5].toString()+"_" +betstr0;


    // create player bet in array by pushing
    // 
    //  constructor( x,y, w,h, 
    //  
    //                radius,  betValue, payOn,payOff,  
    //
    //                betInactive, betIdstr,  masterId,
    //                          
    //                playerIdstr, chipx, chipy, 
    //
    //                chipvalue, hrdwy){
    //
    // 
// var gTableBetXYWH= [
//                    x,   y,  w,  h,    rad, id, payout, HardwayYes
 

 PrepBetForServer(   gTableBetXYWH[s+0], gTableBetXYWH[s+1], 
					gTableBetXYWH[ s + 2], gTableBetXYWH[ s + 3],

                    gChipRadius, gTableBetXYWH[s+5], betodds, 0.0,  

                    0, gTableBetNames[betidx], betidx ,

     				 "{"+gPlayerUserIDNumstr+"|"+ gPlayerUserIDstr +"}",xx1, yy1, 

   				     gChipDenominations[ gChipIndex ],  gTableBetXYWH[ s + 7] , gChipDenominationsColors[ gChipIndex ] ) ;



playerBets.push(new TableBet(gTableBetXYWH[s+0], gTableBetXYWH[s+1], gTableBetXYWH[ s + 2], gTableBetXYWH[ s + 3],

                        gChipRadius, gTableBetXYWH[s+5], betodds, 0.0,  

                             0, gTableBetNames[betidx], betidx ,

      "{"+gPlayerUserIDNumstr+"|"+ gPlayerUserIDstr +"}",xx1, yy1, 

        gChipDenominations[ gChipIndex ],  gTableBetXYWH[ s + 7] , gChipDenominationsColors[ gChipIndex ] ) );


console.log(  playerBets);

    

         // LogGameEvent(tstr,gChipDenominations[ gChipIndex ],( (gdice1+gdice2).toString()+"Rolled_("+xx1.toString()+","+ yy1.toString()+")," ) ) ;
          LogGameEvent(tstr,gChipDenominations[ gChipIndex ],"betplaced") ;
          UpdateBetButton("$"+formatNumber( gChipDenominations[ gChipIndex ]).toString()+" "+ betstr0 );

	}else  UpdateBetButton( gdice1.toString()+","+ gdice2.toString());
// if table bet VALID

           gPlayerChips -= gChipDenominations[ gChipIndex ];
           gHouseChips +=gChipDenominations[ gChipIndex ];
  

}



class jButtonRound {
    constructor(x,y,radius, w,h, colorOn , colorOff,colorText, jText , jAlpha, rndCorner, pxStr, keystr){
        this.x =x
        this.y =y 
        this.radius =radius
        this.w =w
        this.h =h 
        this.colorOn =colorOn 
        this.colorOff=colorOff
        this.colorText=colorText
        this.jText   =jText

        this.jAlpha   =jAlpha
        this.rndCorner   =rndCorner
        this.pxStr = pxStr
        this.keystr = keystr

    }

    draw(){ 

    var rect = [20, 20, 300, 300],
    cr = 25;            // corner radius

    cr     = this.radius;
    rect[0]= this.x;
    rect[1]= this.y;
    rect[2]= this.w;
    rect[3]= this.h;

// if(this.rndCorner){}
//
//

    var pi = Math.PI,       // cache it here to make code more readable
    x1 = rect[0],       // cache points
    y1 = rect[1],
    x2 = rect[2] + x1,
    y2 = rect[3] + y1;

// create a rounded rectangle path
    c.beginPath();

    c.arc(x1 + cr, y1 + cr, cr, pi, 1.5 * pi);  // upper left corner
    c.arc(x2 - cr, y1 + cr, cr, 1.5 * pi, 0);   // upper right corner
    c.arc(x2 - cr, y2 - cr, cr, 0, 0.5 * pi);   // lower right corner
    c.arc(x1 + cr, y2 - cr, cr, 0.5 * pi, pi);  // lower left corner

    c.closePath();
    c.globalAlpha =this.jAlpha; // 0.50; 

    c.fillStyle=this.colorOff;
    c.fill()

    c.stroke();
    c.globalAlpha = 1.0; 


        c.beginPath()
        c.arc(this.x-25, this.y-25, this.radius/4, 0, Math.PI*2, false) 
        c.fillStyle=this.colorOn ; //Off
        c.fill()

         // c.Rect(  (this.x-this.radius), (this.-(0.5625*this.radius)), 192    , 108);
        // c.strokeRect(  (this.x-this.radius), (this.-(0.5625*this.radius)), 192   , 108);

        // c.fillStyle =this.colorOff ; // colorOn; //"#fa00a0";
        // c.strokeRect(this.x+2, this.y-28   ,    192/2       , 108/2); //this.x-25, this.y-25   ,    500 ,500 );
      
        // c.fillStyle = "#8899aa"; 
        // c.globalAlpha = 0.50; 
        // c.fillRect(this.x+2, this.y-28   ,    192/2     , 108/2 );
        // c.globalAlpha = 1.0; 

        //c.fillRect(this.x+2, this.y-28   ,    192/.8      , 108/2 );
    
// ctx.strokeRect(20, 20, 150, 100);
 
     //     c.fillStyle='orange'
        // c.font = "42px Arial";
        // c.fillText( "jButton active."+"..",  7,  14 );
   

        c.fillStyle=this.colorText ; //'yellow'
        c.font = this.pxStr +"px Arial";   //"24px
        if(this.pxStr=="")  c.font ="24px Arial";
        // c.fillText( (this.x).toString() , this.x, this.y );
        c.fillText( this.jText, this.x+this.radius*0.8, this.y+(0.65* this.h ) );
   

      if(this.keystr!=""){
         c.fillStyle=this.colorText ; 
         c.font ="18px Arial";
         c.fillText( this.keystr, this.x+this.radius*0.6, this.y+ 0  +(0.695* this.h ) );
   
      }



    }

}



function DrawPlayerChipStack(){
  ;
}
function DrawPlayerCash(){
     var i=4; var bOff4 =4; 
     var colstr = 'white'; 
     var tcolstr = 'black';


  DrawPlayerChipStack();
  
     if(gPlayerChips<0){
       colstr = 'red';
       tcolstr = 'white';

     }

     if(gPlayerChips>gPlayerChipsStart){
      colstr = 'black';
       tcolstr = 'white';
      } 




    var jbBut = new jButtonRound(     bRects[  (i*bOff4) + 0 ] +gCrapsTableX,
                                      bRects[  (i*bOff4) + 1 ] +gCrapsTableY-100,
                                       gRound,
                                      bRects[  (i*bOff4) + 2 ] ,
                                      bRects[  (i*bOff4) + 3 ] ,
                                      'green', colstr , tcolstr,
                                     // ( "Poi nt is "+ thepointIs+"  "+(100*gPointPcts[DiceTotal]).toFixed(1)+"%"),     
                                //     ( "Point: ["+ thepointIs+"]"+tmppct ), //"  "+(100*gPointPcts[DiceTotal]).toFixed(1)+"%"),     
                                     ( "You have: $"+ formatNumber( gPlayerChips ) ), //"  "+(100*gPointPcts[DiceTotal]).toFixed(1)+"%"),     
                                    1.0, 1.0, "22", " "
            );

    jbBut.draw();


    // auto button
    i=6;
      jbBut = new jButtonRound(     bRects[  (i*bOff4) + 0 ] +gCrapsTableX,
                                      bRects[  (i*bOff4) + 1 ] +gCrapsTableY-100,
                                       gRound,
                                      bRects[  (i*bOff4) + 2 ] ,
                                      bRects[  (i*bOff4) + 3 ] ,
                                      'grey', 'red','white',
                                     // ( "Poi nt is "+ thepointIs+"  "+(100*gPointPcts[DiceTotal]).toFixed(1)+"%"),     
                                //     ( "Point: ["+ thepointIs+"]"+tmppct ), //"  "+(100*gPointPcts[DiceTotal]).toFixed(1)+"%"),     
                                       "auto",    
                                    1.0, 1.0, "18", "'"
            );

    jbBut.draw();
}


/// old

function DrawPlayerCash1(){


     var i=4; var bOff4 =4; var colstr = 'white';
     if(gPlayerChips<0) colstr = 'red';

    var jbBut = new jButtonRound(     bRects[  (i*bOff4) + 0 ] +gCrapsTableX,
                                      bRects[  (i*bOff4) + 1 ] +gCrapsTableY-100,
                                       gRound,
                                      bRects[  (i*bOff4) + 2 ] ,
                                      bRects[  (i*bOff4) + 3 ] ,
                                      'green', colstr ,  'black',
                                     // ( "Poi nt is "+ thepointIs+"  "+(100*gPointPcts[DiceTotal]).toFixed(1)+"%"),     
                                //     ( "Point: ["+ thepointIs+"]"+tmppct ), //"  "+(100*gPointPcts[DiceTotal]).toFixed(1)+"%"),     
                                     ( "You have: $"+ gPlayerChips.toString() ), //"  "+(100*gPointPcts[DiceTotal]).toFixed(1)+"%"),     
                                    1.0, 1.0, "22", " "
            );

    jbBut.draw();
}


function DrawDenomButton( ){
 var i, bOff4=4;
 
 var tmpstr=" ";
 var tmpcol=gButColOn;
 var tmpcoloff = gButColOff;
 var txtcol = 'white';
 
                   txtcol='white';
                    i=2; 
                     tmpstr =      gChipDenominations[ gChipIndex ].toString();
                    tmpcol = 'white'; 
                    tmpcoloff = "#dcdcdc";
                    txtcol = 'black';
                 

 
           
                var jbBut = new jButtonRound(        bRects[  (i*bOff4) + 0 ] ,
                                      bRects[  (i*bOff4) + 1 ] ,
                                       gRound,
                                      bRects[  (i*bOff4) + 2 ] ,
                                      bRects[  (i*bOff4) + 3 ] ,
                                      'green',  tmpcol, txtcol,
                                       bTexts[ i ] + formatNumber(tmpstr),             
                                    1.0, 1.0, "24", "- ="
            );
                jbBut.draw();
                ShowDenomination();

}// fn


function GetButtonNumClicked(xu,yu){
var i, bOff4=4;

gButtonNumClicked=-1;   // indicate not clicked within button # 0..n

 var tmpstr=" ";
 var tmpcol=gButColOn;
 var tmpcoloff = gButColOff;
 var txtcol = 'white';

//  var bRects = [   10,10, 180,60,

     for(i=0;i<numButtons;i++){
      
        if(  ( xu >=    bRects[ (i*bOff4) + 0 ] )                              &&
             ( xu <=    bRects[ (i*bOff4) + 0 ] + bRects[ (i*bOff4) + 2 ]   )  &&

             ( yu >=    bRects[ (i*bOff4) + 1 ] )                              &&
             ( yu <=    bRects[ (i*bOff4) + 1 ] + bRects[ (i*bOff4) + 3 ]   )) {

            gButtonNumClicked=i;

            txtcol='white';
                                    // check for denom button =[2]

                if (i==2) { 
                    IncDenomination1(1);
                    //tmpstr ="         $"+      gChipDenominations[ gChipIndex ].toString();
                    tmpstr =  formatNumber(    gChipDenominations[ gChipIndex ].toString()  );
                    tmpcol = 'white';//    gChipDenominationsColors[ gChipIndex ];
                    tmpcoloff = "#fefefe";
                    txtcol = 'black';
                  //  tmpcoloff = gChipDenominationsColors[ gChipIndex ];
                     // AddCountdownTime(0.20);  // give em 10% more bar

                }

                if(i==4) {  //player's $
                  // sillycnt =0;
                  // animateParticles();
                  startParticles();
                  PlayNewTurnSFX(90,0);
                }

                  if(i==6) {   // auto 
                  
                      PlaceAutoBetNew('normal8');

                    }



            if(bClickStatus[i]==0){
                bClickStatus[i]=1;

           
                var jbBut = new jButtonRound(        bRects[  (i*bOff4) + 0 ] ,
                                      bRects[  (i*bOff4) + 1 ] ,
                                       gRound,
                                      bRects[  (i*bOff4) + 2 ] ,
                                      bRects[  (i*bOff4) + 3 ] ,
                                      'green',  tmpcol, txtcol,
                                      // 'green',  gButColOn,  'white',
                                      bTexts[ i ]+ tmpstr,           // "but#"+gButtonNumClicked.toString() 
                                    1.0, 1.0, "24", ""
            );

        }else{
            bClickStatus[i]=0;
                var jbBut = new jButtonRound(        bRects[  (i*bOff4) + 0 ] ,
                                      bRects[  (i*bOff4) + 1 ] ,
                                      gRound,
                                      bRects[  (i*bOff4) + 2 ] ,
                                      bRects[  (i*bOff4) + 3 ] ,
                                    //  'green', gButColOff,  'white',
                                      'green', tmpcoloff,  txtcol,
                                          bTexts[ i ]+ tmpstr,           // "but#"+gButtonNumClicked.toString() 

                                      // bTexts[ i ]+bOffStr ,
                                      1.0, 1.0, "24",""
          

            );

        }
 
        jbBut.draw()
         
        return(i);
        }//if


    }//for

    return(gButtonNumClicked);

}//fn



function drawTopButtons(){
var i=2,bOff4=4;  
    
var x0= 12, y0=24, w0=170, h0=50;

 

     for(i=0;i<numButtons;i++){
        var jbBut = new jButtonRound( bRects[  (i*bOff4) + 0 ] ,
                                      bRects[  (i*bOff4) + 1 ] ,
                                      gRound,
                                      bRects[  (i*bOff4) + 2 ] ,
                                      bRects[  (i*bOff4) + 3 ] ,
                                      'green',  gButColOff,  'white',
                                      bTexts[ i ]+bOffStr,
                                       1.0, 1.0, "24", ""

            );
 
        jbBut.draw()
 
        }//for

    // added
    //UpdateBetButton( "Let's Play some Craps! "); // Table Refreshed.");
    UpdateBetButton( gLastEventButtonStr  ); //"Let's Play some Craps! "); // Table Refreshed.");
    DrawDenomButton();

}// fn

function MainGame(){
    drawTopButtons();
    startSound();
    gameLoop(1000);
}



//*****************************
//*****************************
//*****************************
//
//
         MainGame();
//
//
//*****************************
//*****************************


    // Run myfunc every second
var myfunc = setInterval( function() {

    var now = new Date().getTime();
    var timeleft = countDownDate - now;
   
   	if(gCountdownStopper==1) countdown-=4;

    if (countdown>25) gameLoop(countdown);
        else {
            DiceLand();
            countdown=countdownStart;
                }
// }, (1000 * 0.05) );   // 0.25 1000= 1 sec
  }, (1000 *gTimerBarMultiplier) );   // 0.25 1000= 1 sec
//


function gameLoop(barlen) {
 
 if(barlen<26){
    
  return;
 }  


   var p;
   var colstr; 
   var tstr = gdice1.toString()+ "  "+ gdice2.toString();
   var streakstr=" [CurStreak/Max="+thisStreak.toString()+ "/"+longestStreak.toString()+ 
                 "], [To7Streak="+longestTo7Streak.toString()+ "], [PtsMade="+gPointsMade+
                   "], [7-Outs="+gSevenOuts+"] [7s/Pts="+(( gSevenOuts/gPointsMade ).toFixed(1).toString())+"], [DiThrown="+gDiceThrown+"], House= +/-:$"+formatNumber(gHouseChips ).toString()+", UR Chips: "+formatNumber( gPlayerChips).toString() ;

  var barLong  = new jButtonRound(4,74,10, 1000,   24,  'green',  'cyan',  'white', " " , 1.0, 1.0, "24" , "" ); 
  var barShort ;

   if(barlen<250) barShort = new jButtonRound(4,74,10, barlen ,24,  'green',  'red',  'black', streakstr , 1.0, 1.0 , "14", "" );
 	else if(barlen<500) barShort = new jButtonRound(4,74,10, barlen ,24,  'green',  'orange',  'black', streakstr , 1.0, 1.0 , "14", "" );
		else if(barlen<800) barShort = new jButtonRound(4,74,10, barlen ,24,  'green',  'yellow',  'black', streakstr , 1.0, 1.0 , "14", "" );
		else               barShort = new jButtonRound(4,74,10, barlen ,24,  'green',  'white',  'black', streakstr , 1.0, 1.0 , "14", "" );



    barLong.draw();
    barShort.draw();
 

    DrawPlayerCash();

    // if(gFirstTime==0){
    //      mySound_crowd.play();
    //      gFirstTime=1;
    // }

}




function startSound() {

    mySound_chips1 = new sound("mp3/chips0.mp3");
    mySound_chips2 = new sound("mp3/chips1.mp3");
    mySound_chips3 = new sound("mp3/chips2.mp3");
    mySound_chips4 = new sound("mp3/chips3.mp3");
    mySound_chips5 = new sound("mp3/chips4.mp3");

    mySound_crowd = new sound("mp3/crowd.mp3");

    mySound_dice0 = new sound("mp3/dice.mp3");
    mySound_dice1 = new sound("mp3/dicelong0.mp3");
    mySound_dice2 = new sound("mp3/dicelong1.mp3");

    mySound_diceland0 = new sound("mp3/diceland0.mp3");
    mySound_diceland1 = new sound("mp3/diceland1.mp3");


     sfx_2  = new sound("mp3/numbers/sfx_2.mp3");
    // sfx_2a = new sound("mp3/sfx_2a.mp3");
    sfx_3  = new sound("mp3/numbers/sfx_3.mp3");
    // sfx_3a = new sound("mp3/sfx_3.mp3");

    sfx_4   = new sound("mp3/numbers/sfx_4.mp3");
    sfx_4a  = new sound("mp3/numbers/sfx_4hard.mp3");

     sfx_5  = new sound("mp3/numbers/sfx_5.mp3");
    // sfx_5a = new sound("mp3/sfx_5a.mp3");
     sfx_6  = new sound("mp3/numbers/sfx_6.mp3");
     sfx_6a = new sound("mp3/numbers/sfx_6hard.mp3");

   sfx_7     = new sound("mp3/numbers/sfx_7out.mp3");
   sfx_7a    = new sound("mp3/numbers/sfx_7payline.mp3");

      sfx_8  = new sound("mp3/numbers/sfx_8.mp3");
      sfx_8a = new sound("mp3/numbers/sfx_8hard.mp3");

    sfx_9  = new sound("mp3/numbers/sfx_9.mp3");
 
      sfx_10 = new sound("mp3/numbers/sfx_10.mp3");
      sfx_10a= new sound("mp3/numbers/sfx_10hard.mp3");

      sfx_11 = new sound("mp3/numbers/sfx_11.mp3");

     sfx_12a = new sound("mp3/numbers/sfx_12.mp3");
    sfx_12= new sound("mp3/numbers/sfx_12mid.mp3");

    sfx_13 = new sound("mp3/numbers/sfx_comingout.mp3");
    sfx_13a = new sound("mp3/numbers/sfx_newshooter.mp3");

    // sfx_14 = new sound("mp3/numbers/sfx_madepoint.mp3");
    // sfx_14a = new sound("mp3/numbers/sfx_thepointis.mp3");

    sfx_15 = new sound("mp3/numbers/sfx_madepoint.mp3");
    sfx_15a = new sound("mp3/numbers/sfx_thepointis.mp3");


    sfx_explosion = new sound("mp3/bomb.mp3");
    sfx_button1 = new sound("mp3/button1.mp3");
    sfx_button2 = new sound("mp3/button2.mp3");
    sfx_charge1 = new sound("mp3/recharge1.mp3");
    sfx_charge2 = new sound("mp3/recharge2.mp3");

    mySound_winsong = new sound("mp3/winsong.mp3");
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
		if(gSFX==1)    this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

let particles
const velocityXmult = 35
const velocityYmult =32
var gravitySt = 0.005
var gravity = gravitySt
const friction = 0.99 
const alphaChange = 0.010  //0.005 
const mouse={
  x: innerWidth/2,
  y: innerHeight/2
}
function SpawnFireworks(typestr, max, grEpsilon){
  //  gravity *= grEpsilon;
    var pMax0= max;
    gravity = gravitySt;
    const particleAngle =pMax0
    const angleIncrement= ( Math.PI * 2 )/ particleAngle  
    for(let i=0;i<pMax0;i++){
          particles.push(      new Particle( mouse.x, mouse.y, 6 , RandomColorP(), 1.0,    //'grey', 1.0, 
            {   x: Math.cos(angleIncrement * i) * Math.random(), y: Math.sin(angleIncrement * i) * Math.random()
            } )     )
    }//FOR
}//fn
// addEventListener('click',(event) => {    
//     mouse.x = event.clientX 
//     mouse.y = event.clientY
//     SpawnFireworks('fireworks',mouse.x, (mouse.y/canvas.width/4) )
//  })
addEventListener('mousemove',(event) => { 
    mouse.x = event.clientX 
    mouse.y = event.clientY
})
addEventListener('resize',() => { 
    canvas.width        = innerWidth
    canvas.height       = innerHeight
    initParticles(); DrawTable(); 
})
class Particle{
    constructor(x,y, radius, color, a, velocity){
        this.x =x
        this.y =y
        this.radius=radius
        this.color= color 
        this.alpha= a 
        this.velocity = velocity 
    }
    draw(){
        c.save()
            c.globalAlpha  = this.alpha
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false) 
            c.fillStyle=this.color   
            c.fill()
            c.closePath()
        c.restore()
     }
     update(){
        this.draw()
        this.velocity.x *= friction
        this.velocity.y += gravity
        this.alpha      -= alphaChange
        this.x += this.velocity.x * velocityXmult  
        this.y += this.velocity.y * velocityYmult  
     }
}
function initParticles(){
    particles=[]
}
let sillycnt =0
function animateParticles(){
  if(sillycnt++ <400 ){
    requestAnimationFrame(animateParticles)
    c.fillStyle = 'rgba(0,0,0,0.05)' 
    c.fillRect(0,0, canvas.width, canvas.height)
   // sillycnt++; 
    if(sillycnt%10==0) DrawTable();
    particles.forEach( (particle, i) => {
        if(particle.alpha >0){                particle.update() }else{
                 particles.splice(i, 1)    
            }
    })
  }else{
    c.fillStyle = 'rgba(1,1,1,0.05)' 
    c.fillRect(0,0, canvas.width, canvas.height)

        }
}//fn
function RandomNumP( num ){
   return(   Math.floor(Math.random()*num)   ) ; 
}
function RandomColorP(){
    var rstr = "#";
    var rrnd=0;
    rrnd = RandomNumP(256);
    rstr = rstr + rrnd.toString(16);
    rrnd = RandomNumP(256);
    rstr = rstr + rrnd.toString(16);
    rrnd = RandomNumP(256);
    rstr = rstr + rrnd.toString(16);
    return( rstr );
}
// ********************************************* 
//initParticles()
// animateParticles()

 /********************************************
 
GetCasinoServerData:  2020-10-28  50
index.js:3477 GetCasinoServerData: after http.send() 
index.js:3480 HTTP: in ready callback...
index.js:3485 ] num lines = 1
index.js:3503 response not ready..  
index.js:3480 HTTP: in ready callback...
index.js:3485 ] num lines = 8
index.js:3488 ] first line: <br />
index.js:3489 ] second line: <b>Notice</b>:  Undefined index: post_query in <b>/home1/itraderp/public_html/game/SendCrapsBetData.php</b> on line <b>19</b><br />
index.js:3503 response not ready..  
index.js:3480 HTTP: in ready callback...
index.js:3485 ] num lines = 8
index.js:3488 ] first line: <br />
index.js:3489 ] second line: <b>Notice</b>:  Undefined index: post_query in <b>/home1/itraderp/public_html/game/SendCrapsBetData.php</b> on line <b>19</b><br />
index.js:3495 GetCasinoServerData: The request has been completed successfully!
index.js:3509 <br />
<b>Notice</b>:  Undefined index: post_query in <b>/home1/itraderp/public_html/game/SendCrapsBetData.php</b> on line <b>19</b><br />
] searchQuery =  .<br /> 
<br />
<b>Notice</b>:  Undefined offset: 1 in <b>/home1/itraderp/public_html/game/SendCrapsBetData.php</b> on line <b>39</b><br />
<br />
<b>Notice</b>:  Undefined offset: 2 in <b>/home1/itraderp/public_html/game/SendCrapsBetData.php</b> on line <b>41</b><br />

index.js:3514 first char: <
index.js:3522 END OF GetCasinoServerData[] 
index.js:3595 4FinishedWithHTTPrequest:GetCasinoServerData_DONE
index.js:2095 Pt, diceRolled=8,7
index.js:2046 PAID jb $1,000 for a $1,000 COME
 */  


var gGET_TableStr='AAPL';
var gCasinoMsgs =1;

//  GetCasinoServerData("2020-10-28", 50, 4);
//
///
function GetCasinoServerDataPrep(){
 GetCasinoServerData("2020-10-28", 50, 4);
}
function GetCasinoServerData(dateStart, numCandles, requestNum)
{
  console.log("GetCasinoServerData:  " + dateStart + "  " + numCandles);
    const Http = new XMLHttpRequest();

// gPOSTServerStr  +  gBASEServerStr = 'https://itraderpro.co/'
    //const urlcsv = 'https://itraderpro.co/getdailydata.php?sym=' + gGET_TableStr + 

    const urlcsv = gBASEServerStr + 'SendCrapsBetData.php' ; //?sym=' + gGET_TableStr + 
 
gPOSTServerStr= "CRAPS,"+ gServerStr ;

    // Http.open("GET", urlcsv);
    // Http.send();
    Http.open("POST", urlcsv);
    Http.send(gPOSTServerStr);

    console.log ("GetCasinoServerData: after http.send() ");

    Http.onreadystatechange = (e) => {
        console.log ("HTTP: in ready callback...");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        console.log("] num lines = " + numLines);
        if (numLines > 1)
        {
          console.log ("] first line: " + lines[0]);
          console.log ("] second line: " + lines[1]);
        }

        if(Http.readyState === XMLHttpRequest.DONE) {
        var status = Http.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          console.log ("GetCasinoServerData: The request has been completed successfully!");
        } else {
          console.log("GetCasinoServerData - oh no! status = " + status);
          return;
        }
    }
    else
    {
      console.log("response not ready..  ");
      return;
    }

    //log the whole response.
    if (gCasinoMsgs > 0)
          console.log(Http.responseText);

        // if only 2 lines we have no ticker data
        if (numLines > 1)
        {
            console.log ("first char: " + Http.responseText.substring(0,1) );

          if (lines[0].substring(0,1) == "!")
          {
            console.log("No CasinoServerData Data - clearing gTickerExists");
           }
        }

    console.log("END OF GetCasinoServerData[] ");

  /// THIS TRIGGERS END OF  ASYNC CALL  
    FinishedWithHTTPrequest(requestNum, "GetCasinoServerData_DONE");
    
    }// end ready state change
}

function GetCasinoServerDataOld(dateStart, numCandles, requestNum)
{
  console.log("GetCasinoServerData:  " + dateStart + "  " + numCandles);
    const Http = new XMLHttpRequest();

    const urlcsv = 'https://itraderpro.co/getdailydata.php?sym=' + gGET_TableStr + 
      '&ds=' + dateStart + '&num= ' + numCandles.toString() + '&msgs=0';

    Http.open("GET", urlcsv);
    Http.send();

    console.log ("GetCasinoServerData: after http.send() ");

    Http.onreadystatechange = (e) => {
        console.log ("HTTP: in ready callback...");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        console.log("] num lines = " + numLines);
        if (numLines > 1)
        {
          console.log ("] first line: " + lines[0]);
          console.log ("] second line: " + lines[1]);
        }

        if(Http.readyState === XMLHttpRequest.DONE) {
        var status = Http.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          console.log ("GetCasinoServerData: The request has been completed successfully!");
        } else {
          console.log("GetCasinoServerData - oh no! status = " + status);
          return;
        }
    }
    else
    {
      console.log("response not ready..  ");
      return;
    }

    //log the whole response.
    if (gCasinoMsgs > 0)
          console.log(Http.responseText);

        // if only 2 lines we have no ticker data
        if (numLines > 1)
        {
            console.log ("first char: " + Http.responseText.substring(0,1) );

          if (lines[0].substring(0,1) == "!")
          {
            console.log("No CasinoServerData Data - clearing gTickerExists");
           }
        }

    console.log("END OF GetCasinoServerData[] ");

  /// THIS TRIGGERS END OF  ASYNC CALL  
    FinishedWithHTTPrequest(requestNum, "GetCasinoServerData_DONE");
    
    }// end ready state change
}

function         FinishedWithHTTPrequest(requestNum, msgstr){
      console.log( requestNum + "FinishedWithHTTPrequest:"+ msgstr);
//  set variables, call RENDER Code, etc.
}






/// EOF








/*


var mySound;

function startGame() {
    mySound = new sound("bounce.mp3");
//    myGameArea.start();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}








<audio id="myAudio" controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio><br>

<button onclick="enableLoop()" type="button">Enable loop</button>
<button onclick="disableLoop()" type="button">Disable loop</button>
<button onclick="checkLoop()" type="button">Check loop status</button>

<script>
var x = document.getElementById("myAudio");

function enableLoop() { 
  x.loop = true;
  x.load();
} 

function disableLoop() { 
  x.loop = false;
  x.load();
} 

function checkLoop() { 
  alert(x.loop);
} 
</script> 




/// old button

class jButton {
    constructor(xCenter,yCenter,radius, w,h, colorOn , colorOff, jText ){//, jAlpha, rndCorner){
        this.x =xCenter
        this.y =yCenter 
        this.radius =radius
        this.w =w
        this.h =h 
        this.colorOn =colorOn 
        this.colorOff=colorOff
        this.jText   =jText
    }

    draw(){

        c.beginPath()
        c.arc(this.x-25, this.y-25, this.radius/4, 0, Math.PI*2, false) 
        c.fillStyle=this.colorOff
        c.fill()

         // c.Rect(  (this.x-this.radius), (this.-(0.5625*this.radius)), 192    , 108);
        // c.strokeRect(  (this.x-this.radius), (this.-(0.5625*this.radius)), 192   , 108);

        c.fillStyle =this.colorOff ; // colorOn; //"#fa00a0";
        c.strokeRect(this.x+2, this.y-28   ,    192/2       , 108/2); //this.x-25, this.y-25   ,    500 ,500 );
      
        c.fillStyle = "#8899aa"; 
        c.globalAlpha = 0.50; 
        c.fillRect(this.x+2, this.y-28   ,    192/2     , 108/2 );
        c.globalAlpha = 1.0; 

        //c.fillRect(this.x+2, this.y-28   ,    192/.8      , 108/2 );
    
// ctx.strokeRect(20, 20, 150, 100);
 
     //     c.fillStyle='orange'
        // c.font = "42px Arial";
        // c.fillText( "jButton active."+"..",  7,  14 );
   

        c.fillStyle=this.colorOn ; //'yellow'
        c.font = "16px Arial";
        // c.fillText( (this.x).toString() , this.x, this.y );
        c.fillText( this.jText  , this.x+this.radius, this.y-0 );
   

 



    }

}


<p id="demo"></p>

<script>
// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
</script>



var countDownDate = new Date("Jul 25, 2021 16:37:52").getTime();

    // Run myfunc every second
    var myfunc = setInterval(function() {

    var now = new Date().getTime();
    var timeleft = countDownDate - now;
        
}, 1000);




<script>
var fruits = ["Banana", "Orange", "Apple", "Mango"];
document.getElementById("demo").innerHTML = fruits;

function myFunction() {
  fruits.push("Kiwi");
  document.getElementById("demo").innerHTML = fruits;
}
</script>


//timeout
const start = Date.now();

console.log('starting timer...');
// expected output: starting timer...

setTimeout(() => {
  const millis = Date.now() - start;

  console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
  // expected output: seconds elapsed = 2
}, 2000);



var canvas = document.getElementById("canvas_1");
canvas.addEventListener( "keydown", doKeyDown, true);


function doKeyDown(e) {

alert( e.keyCode )

}
W = 87
S = 83
D = 68

With these key codes, then, we can write a series of IF Statements for each key:

if ( e.keyCode == 87 ) {
}

if ( e.keyCode == 83 ) {
}

if ( e.keyCode == 65 ) {
}

if ( e.keyCode == 68 ) {
}
////////////////////////////////
 



// 
function GetHistoricalCandles(dateStart, numCandles)
{
  console.log("GetHistoricalCandles:  " + dateStart + "  " + numCandles);
    const Http = new XMLHttpRequest();

    const urlcsv = 'https://itraderpro.co/getdailydata.php?sym=' + gGET_SymbolStr + 
      '&ds=' + dateStart + '&num= ' + numCandles.toString() + '&msgs=0';

    Http.open("GET", urlcsv);
    Http.send();

    console.log ("GetHistoricalCandles: after http.send() ");

    Http.onreadystatechange = (e) => {
        console.log ("HTTP: in ready callback");

        var lines = Http.responseText.split("\n");
        var numLines = lines.length;

        console.log("num lines = " + numLines);
        if (numLines > 1)
        {
          console.log ("first line: " + lines[0]);
          console.log ("second line: " + lines[1]);
        }

        if(Http.readyState === XMLHttpRequest.DONE) {
        var status = Http.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          console.log ("GetHistoricalCandles: The request has been completed successfully!");
        } else {
          console.log("GetHistoricalCandles - oh no! status = " + status);
          return;
        }
    }
    else
    {
      //console.log("response not ready..  ");
      return;
    }

    //log the whole response.
    if (gLogs > 0)
          console.log(Http.responseText);

        // if only 2 lines we have no ticker data
        if (numLines > 1)
        {
          console.log ("first char: " + Http.responseText.substring(0,1) );

          if (lines[0].substring(0,1) == "!")
          {
            console.log("No Historical Data - clearing gTickerExists");
            gTickerExists = 0;
          }
        }

        if (gTickerExists == 1)
        {

          var i,j;
          var entry = 0;

          j = 0;
          for (i = numLines-2; i > 0; i--) {

            // data from CSV
           // var timestamp,op,high,low,cl,adjusted_close,volume,dividend_amount,split_coefficient;

            //data for Candles
            //'6.97','7.11','6.93','7.04','43517662','2020-08-14','7.07','7.16','Fri','F','10','11','12','13','58.39','15_*286',

            var elems = lines[i].split(",");
            var numElems = elems.length;

            var timestamp = elems[0];
            var op = elems[1];
            var high = elems[2];
            var low = elems[3];
            var cl = elems[4];
            var adjClose = elems[5];
            var vol = elems[6];
   
   //JMB 2020-10-09
            var divamt = elems[7];
            var splitcoef = elems[8];
 
          if( Number(splitcoef) != 1.0 ) gSplitDetected =1;


           // entry = j * 16;   // candlesOffset
            entry = j *   candlesOffset;
            CandlesFromHistorical[ entry] = op;  
            CandlesFromHistorical[ entry + 1] = high;  
            CandlesFromHistorical[ entry + 2] = low;  
            CandlesFromHistorical[ entry + 3] = cl;  
            CandlesFromHistorical[ entry + 4] = vol; // dummy ??
            CandlesFromHistorical[ entry + 5] = timestamp;
            CandlesFromHistorical[ entry + 6] = '7.07';
            CandlesFromHistorical[ entry + 7] = '7.16';
            CandlesFromHistorical[ entry + 8] = 'Fri';         // get day of week from date
            CandlesFromHistorical[ entry + 9] = gGET_SymbolStr;
            CandlesFromHistorical[ entry + 10] = '10';
            CandlesFromHistorical[ entry + 11] = '11';
            CandlesFromHistorical[ entry + 12] = '12';
            CandlesFromHistorical[ entry + 13] = '13';
            CandlesFromHistorical[ entry + 14] = '58.39';
            CandlesFromHistorical[ entry + 15] = splitcoef ;//'15_*286';

           // if (entry < 5 * 16) // candlesOffset
            if (entry < 5 *  candlesOffset )
//              console.log ("CandlesFromHistorical[" + entry + "] : " +  CandlesFromHistorical[ entry] + " " + 
              console.log ("CandlesFromHistorical[" + entry + "] : " + CandlesFromHistorical[ entry + 5] + " ohlc split " +   CandlesFromHistorical[ entry] + " " + 
                  CandlesFromHistorical[ entry + 1]   + " " + 
                  CandlesFromHistorical[ entry + 2] + " " +  
                  CandlesFromHistorical[ entry + 3] + " " +  
                  CandlesFromHistorical[ entry + 15]) ;   // splitcoef
            j++;
          }

    }
    console.log("CandlesFromHistorical[]: gSplitDetected ="+ gSplitDetected);
        RenderAllData();
    }// end ready state change
}



*/
 

