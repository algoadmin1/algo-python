

const canvas 	   = document.querySelector("canvas");
const c 		   = canvas.getContext("2d");

canvas.width        = innerWidth
canvas.height       = innerHeight

// const canvas.width =   innerWidth;
// const canvas.height =  innerHeight;

// var     gBGcol = 'rgba(40,40,40,0.05)' ;
var     gBGcol = 'rgba(0,0,40,0.05)' ;



            var   gVersStr="3.0";



var pMax =128
let particles

const velocityXmult = 19
const velocityYmult =12


const mouse={
	x: innerWidth/2,
	y: innerHeight/2
}

// const colors = ['#2185c5', '#7ecefd', '#fff6e5', '#FF7F66' ];

/*
function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          // x: (evt.clientX - rect.left) * (1/gInitScaleX),
          // y: (evt.clientY - rect.top) * (1/gInitScaleY)
          x: (evt.clientX - rect.left), //* (1/gInitScaleX),
          y: (evt.clientY - rect.top)  //* (1/gInitScaleY)
        };
        // usage:  var mousePos = getMousePos(canvasGlobal, event);
        //         var message = 'Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);

      }
      */

function getMousePos0(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
        // usage:  var mousePos = getMousePos(canvasGlobal, event);
        //         var message = 'Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);

}


function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return { 
          x: (evt.clientX - rect.left),  
          y: (evt.clientY - rect.top)   
        };
        // usage:  var mousePos = getMousePos(canvasGlobal, event);
        //         var message = 'Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);

      }

	var gAlertStr = "none";
// EVENT LIST.
addEventListener('click',(event) => { 
     
    var mousePos = getMousePos(canvas, event);
 
    let eventClientx = mousePos.x; 
    let eventClienty = mousePos.y;   

    mouse.x =eventClientx;        // mou se.x = event.clientX    
    mouse.y =eventClienty;       // mouse.y = event.clientY
 
    

    console.log(event)


    const particleAngle =pMax
    const angleIncrement= ( Math.PI * 2 )/ particleAngle  

    for(let i=0;i<pMax;i++){
          particles.push(      new Particle( mouse.x, mouse.y, 6 , RandomColor(), 1.0, 
            // {   x: 1.0,
            //     y: 1.0
            {   x: Math.cos(angleIncrement * i) * Math.random(),
                y: Math.sin(angleIncrement * i) * Math.random()
            } )     )
    }
    
     // console.log(particles);
 })

addEventListener('mousemove',(event) => { 

  var mousePos = getMousePos(canvas, event);
 
      let eventClientx = mousePos.x; //adjustClientX( event.pageX );
      let eventClienty = mousePos.y;  //adjustClientY( event.pageY );


    mouse.x =eventClientx
    mouse.y =eventClienty
    
    
    })

addEventListener('resize',() => { 
    canvas.width        = innerWidth
    canvas.height       = innerHeight

    init()
    })





// addEventListener('mouseup', (event) => {
//      gMouseDown=0;
//      gMouseUp=1;
//      clickNdrag =0;

//     if(gConsoleEvents==1) console.log( event);



// // JMB2022-05-06
//    var mousePos = getMousePos(canvasGlobal, event);
//         // var message = 'Mouse position: ' + mousePos.x.toFixed(1) + ',' + mousePos.y.toFixed(1);

//       let eventClientx = mousePos.x; //adjustClientX( event.pageX );
//       let eventClienty = mousePos.y;  //adjustClientY( event.pageY );

        
//     let rc = RandomColorC();
//     // DrawCrosshairShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
//     // DrawCrosshairLong(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
//     // DrawCrosshairShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );
    

//     // if(gDrawEarningsAll!=1)
//           //   DrawCrosshairHorizontalShort(gLastMousemoveX, gLastMousemoveY, rc, {x: gStartChartX , y:0 , w: canvasGlobal.width , h: canvasGlobal.height} );


  
// })






let nstr="";
function drawXYcoords(x,y){
	getLocalTime();
     nstr= "(" +x.toFixed(0).toString()  + "," + y.toFixed(0).toString() +") " ;


     c.fillStyle='#44ff44' ;   
     c.font = "24px Arial" ;    
     c.fillText(gAlertStr+"_"+nstr, x, y+100);


     nstr=  gDate_datefullstr +" "+gDate_timefullstr + " PDT";
     c.fillStyle='#aedead' ;   
     c.font = "28px Arial" ;    
     c.fillText( nstr, x, y+130);
     

      c.fillStyle='#4477de' ; 
      c.font = "36px Arial" ;  
       
       let cw1= canvas.width ;
       let ch1= canvas.height;
       nstr= "[<---" +cw1.toString()  + " x " + ch1.toString() +"--->] v" +gVersStr ;
     
     c.fillText( nstr, x, y+200);

     c.fillStyle='#44ef84' ; 
      c.font = "26px Arial" ;  
     c.fillText( gPromptStr, x, y+260);

}
 
/*
other users' sample CLI's: MidJourney
======================================

CLASSIFICATIONS:

 - epic scene
 - character portrait, male female, animal
 - specific artist style
 - objects i.e. wine glass, fruit, weapons


time and existence ending
the end of time and existence, hyper realistic, 8k, --ar 16:9
huge cityscape from bird view, 8K, highly detailed --ar 16:9
end of world, hyper realistic, 8k
destruction,martian,glint,mosque,islamic,
kingdom of zero

demon barlowe
entrance to ethereal realm, rendered in unreal engine, central composition, symmetrical composition

future , world war , purple sun


ancient temple covered in magma, with gold gates, volumetric light, volumetric fog, unreal engine, photorealistic, 8k --uplight

Riyadh in the future
dark angel, broken heart, twisted oak, moon glow, white raven, perspective, ornate, hd, fantasy

fairy tale forest with mystical creatures, misty, colorfull, 8k realistic detailed, --ar 16:9 

dark angel, broken heart, twisted oak, moon glow, white raven, perspective, ornate, hd, fantasy
The future according to the dreams of robots. Hyperreal

thailand  +train +elephant +spinning tricycle  +manblack +4k +beautiful woman

a modeling shoot with a beautiful african girl in a lush green meadow with a distant unicorn, hyper realistic,8k, --ar 16:9

Rapunzel, tangled, lights, boat, purple, beautiful, animation
Void Monster , creative, hyper realistic, dramatic, colorful 

 indigo orchid, fantasy, antique bones, midnight, violet sun, hd, embers, dying star, crescent moon

like home depot but for pasta
hyperrealistic painting of an attractive gorgeous girl with tiny bikini on a beautiful beach with a pirate shipwreck in the distance , purple and white clouds sky, 8k, --ar 16:9 
hyperrealistic painting of a girl showing her attractive body
hyperrealistic painting of an attractive gorgeous girl with short clothes
black cat with colourful peacock tail sitting, unreal engine
ghost dancing under the stars, purple, gray,

zombie orange cat, cinematic
cutest creature made from roses on meadow, realistic photo, 4k

very ugly kitten realistic
Metal fantasy amulets with colored center crystals, Octane render, Unreal Engine

le dernier arbre vivant sur terre mis sous cloche dans un hangar militaire relier par plein de cables

A green sea turtle in a jersey dunking a basketball like Michael Jordan, shot from below, tilted frame, 27°, extreme long shot, dutch angle, high detail, dramatic backlighting, 4k

world beautiful girl dancing in rain with smile clearly, hyper realistic, unreal render, 4k, render, ultra detailed
hyperrealisitc painting of a goddess girl
dead space + dark wizard + white walker + head + grin + ghost eyes

medieval fantasy city castle mountain river ultra 16:9
futuristic Trex armor super hero cyan pastel pink hyper realistic
boy and girl sitting on table, crowd, detailed , realistic , Smoky, mist, rainy , starry night 

An eldritch abomination in the style of H.R. Giger, realistic, cinematic

the most horrifying thing to humans, terrifying, scary, dire, fearsome, dread, ghastly, amazing, tremendous, eerie, 8k hyper realistic, eldritch, enitity
Aryan beautiful girl in the German Wehrmacht 

a photo of 8k ultra realistic hindu priest, full body, intricate purple and blue neon armor with yellow kavi, long hair ornate, cinematic lighting, trending on artstation, 4k, hyperrealistic, focused, high details, unreal engine 5, cinematic, trisulam flame

A beautiful greek female godess  in a silver seethrough dress eating grapes in a golden temple, render, ultra realistic, photo realistic -- ar 16:9

cocktail,brain,creative
Fantasy knight ready to fight with plasma axe, octane render, unreal engine 

FinalFantasy cat sword crystal
realistic red eye crying , render — ar 19:6
hyperrealistic painting of a man with sadness and poverty

throgmar, god of the dwarfs, smith of all anvils, watcher over the flame, master of blacksmiths, lord under the mountain

ronin samurai in a dark traditional armor closeup staged on a dark charcoal cyberpunk context ::subject on the left with blurred background and soft bokeh ::realistic + ultra detailed + high definition + octane render + unreal engine + rule of thirds ::muted dark colors + red + black + cream highlights --wallpaper

A man with Raven wings and purple and gold lights shinning behind him and a portal of shinning swirl of colors in front of him.

a two way white road to heaven, gothic white godess girl with blue flower dress with silver sparkly halo, purple and white clouds, brilliant stars, big red door , dreamy, gothic, fantasy, ultra realistic --hd --ar 16:9
A beautiful greek female godess  in a silver seethrough dress eating grapes in a golden temple, render, ultra realistic, photo realistic -- ar 16:9

wooden face jinnah hyper realestic 8k smiling portrait

photographer , monster , red , weapons , human , dark , 8k — ar 16:9 — hd

the entrance to the afterlife, hyper realistic, 8k

narcissistic ex girlfriend. Revenge, vibrant detailed hyperrealistic

sunflower and there is a Butterfly on it with "rafal" name on it, art back ground

fantasy city in pink magic sphere, night, pixar, sky

super star destroyer  flying over cyberpunk hell on earth ultra realistic --ar 16:9 --q 2 --wallpaper

--in the kingdom of Arda Telperiom the silver and Laurelin the gold stand in the middle ,Inter glow, vray, hyperrealistic , 4k



*/


////////////////////// const aiSentenceGenerator =1;
// BANNED WORDS: voluptous, infested, bloody, bloodied, hot girl,
//
//
// CONSIDERED OVERUSED ARTISTS:
//
//   dali, van gogh, giger, rembrandnt, kindake, mumford, aivazovsky, beksinski
//
//

const aiSentenceGenerator =1;

// init adj
const words0 = [    "beautiful", "shiny", "ugly", "run down", "disgusting", "average",  "gorgeous",
                    "insane", "peaceful", "evil", "porcelin","goddess-like","melting","timid","aggressive",
                    "overweight","intelligent","satanic","angelic"
];

// object
const words1 = [    "beautiful woman","warrior","african woman","alien","dog","lion","shark","jack russell", "rhino","dinosaur",
                    "girl", "monk", "ninja","wolf","bear","shark","businessman" ,"giesha","young girl", "old man","arabic warrior" ,"pitbull","great dane","horse",
                      "god",  "godess", "diety","crusader","small frog", "black female","astronaut",
                    "temple", "cathedral", "hut", "alien outpost", "city streets", "hacker","samurai",
                    "super car","concept car", "archangel","warrior god","powerlifter", "rap star"
];

// adj environment
const words2 = [  "dark","wet", "gooey", "dusty", "microscopic", "mysterious", "concept art","venomous",
                    "distopian", "ultra detailed","cinematic", "portrait", "hyper realistic",
                     "hyper realistic painting", "oil painting"
];

// ambience; setting
const words3 = [    "cyberpunk", "steampunk", "ancient", "futuristic", "alien", "mech",  "roman","fantasy",
                    "medieval", "matrix", "lovecraft", "pantheon", "ultra realistic",
                    "neo classic","beach", "mountains", "sea" , "dreamland"
];

// conflict or event
const words4 = [  "in battle","in world war 3","in hell","in heaven", "in outer space", "on mars","mountains",
                  "meadow","pasture","field","ocean","room","with guns","with swords"

];
const words5 = [  "burning","bubbling","on fire","flooded with water", "dry",
                    "in caustic acid", "smokey", "blue tones","red tones", "green tones",
                    "in jelly", "cinematic"
];

// art style
const words99 = [  "pre-raphaelites style", "H.R. Giger style", "salvador dali style", "victorian style",
                     "van gogh style", "michaelangelo style",
                    "comic style", "vatican style", "hip hop style", "los angeles style", "studio ghibli style",
                    "water color style", "claude monet style","mona lisa style","impressionism","minimalism",
                    "Sandro botticelli style", "botero style", "norman mailer style", "ralph mcquarrie style",
                    "GIOTTO DI BONDONE style","DIEGO VELÁZQUEZ style", "Leonardo da Vinci style",
                    "Gustave Courbet style","Peter Paul Rubens style","Paul Cezanne style",
                    "Pablo Picasso style","Rembrandt style","CEZANNE style",
                    " style","Edgar Degas style","Auguste Renoir style",
                    "Gustave Courbet style","Francisco Goya style",

                    "KANDINSKY style","CARAVAGGIO style","VAN EYCK style",
                    "TURNER style","DURER style","GOYA style",
                    "MANET style","GAUGUIN style","RAPHAEL style",
                    "POLLOCK style","EL GRECO style","MATISSE style",
                    "BACON style", "TITIAN style", "MUNCH style", "BASQUIAT style",

                    "RUBENS style","VERMEER style","MIRO style","MASACCIO style","ARTEMISIA style","PIERO style",
                    "DELACROIX style","KLIMT style","POUSSIN style"," style","COURBET style","MONDRIAN style",
                    "UCCELLO style","blake style","FRIEDRICH style","FRIDA KAHLO style","MALEVICH style",
                    "HOMER style",

                    "ROTHKO style","SAVILLE style","MANTEGNA style","CHAGALL style","HOPPER style",
                    "HANS HOLBEIN style",
                    "degas style","SEURAT style","WATTEAU style","DE KOONING style","HOCKNEY style","ERNST style",
                    "CONSTABLE style","GIORGIONE style","JOHNS style","TINTORETTO style","BOCCIONI style","DUCCIO style",
                     "VAN DER WEYDEN style","BOSCH style","GIORGIONE style","SIMONE MARTINI style","GORKY style",

                     "FRANZ MARC style","HOGARTH style","MORISOT style","HOGARTH style","BRAQUE style",
                     "WHISTLER style","SCHIELE style","ROSSETTI style","HALS style","LORRAIN style",
                     "LICHTENSTEIN style","OKEEFFE style","BANKSY style","BOUGUEREAU style",
                     "MOREAU style", "fortnite style"

                     // " style"," style"," style"," style"," style",
                     // " style"," style"," style"," style"," style",

// https://theartwolf.com/most-important-painters/
];

//default format, last const str to go into the ai Prompt
const lastwords = "  4k --ar 16:9 ";   //  "8k",


var gPromptStr="";

const sentenceMax=100;
function rnd( x ){ return( Math.floor(Math.random() * x) ); }
function rndword(  arr ){
        let l0= arr.length;
        let r= rnd(l0);
        return( arr[r] );
}
function outputAI(){
    let catstr="";
    let i=0;
    for(i=0;i<sentenceMax;i++){
        catstr= rndword(words0)+" "+rndword(words1)+" "+rndword(words2)+" "+rndword(words3)+" "+
                rndword(words4)+" "+rndword(words5)+" ";  
        // 'in ___ style' only 66%
        if(rnd(100)<66) catstr +=  rndword(words99)+" "+lastwords;
         console.log(catstr);
         gPromptStr=catstr;
    }
}
addEventListener('mousedown',(event) => { 
    var mousePos = getMousePos(canvas, event);
    let eventClientx = mousePos.x; 
    let eventClienty = mousePos.y;   
    mouse.x =eventClientx;        // mous e.x = event.clientX    
    mouse.y =eventClienty;       // mouse.y = event.clientY
	gAlertStr  =  checkAlerts();
    // drawXYcoords( mouse.x, mouse.y);

    outputAI();
        drawXYcoords( mouse.x, mouse.y);

})







const gravity = 0.01
const friction = 0.99 
const alphaChange = 0.005 

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
        c.fillStyle=this.color  // 'red' ; //RandomColor(); //
        c.fill()
        c.closePath()

        c.restore()

     }
     update(){
        this.draw()
        this.velocity.x *= friction
        this.velocity.y += gravity
        this.alpha      -= alphaChange
        this.x += this.velocity.x * velocityXmult  // ( Math.random() * velocityXmult ) + velocityXmult*0.5
        this.y += this.velocity.y * velocityYmult  // ( Math.random() * velocityYmult ) + velocityYmult*0.5

     }

}

////////////////////////////////////////////////////  code init(), animate ()
//
//
//      c.fillStyle = 'rgba(0,0,0,0.05)'
//
//                      = `hsl(  ${Math.random()*360} , 50%, 50% )`  
//




/*
getUTCDate()	Same as getDate(), but returns the UTC date
getUTCDay()	Same as getDay(), but returns the UTC day
getUTCFullYear()	Same as getFullYear(), but returns the UTC year
getUTCHours()	Same as getHours(), but returns the UTC hour
getUTCMilliseconds()	Same as getMilliseconds(), but returns the UTC milliseconds
getUTCMinutes()	Same as getMinutes(), but returns the UTC minutes
getUTCMonth()	Same as getMonth(), but returns the UTC month
getUTCSeconds()	Same as getSeconds(), but returns the UTC seconds
*/

let     gDate_datefullstr;
let     gDate_timefullstr;
let	    gDate_year    ;

let		gDate_month   ;
let		gDate_monthStr   ;

let		gDate_date   ;
let		gDate_day    ;
let		gDate_dayStr    ;

let		gDate_hour   ; 
let		gDate_minute   ; 
let		gDate_seconds ;

var daysofweek = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday" ];
var months     = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 	


var dailyAlerts = [
				// sun
				//  dummy
				"Dumbday", "Saturday", 

				"1442",  "firstreversal",

				"1440",  "secondreversal",

				"Monday", 

				"1435",

				"Tuesday", 
				
				"Wednesday",

				"Thursday",

				"Friday",
				 

				// sat
				//  dummy
				];
var dailyAlertsLen = dailyAlerts.length;

function checkAlerts(){
	var i;
	var istr ="no Alerts.";

	getLocalDateTime();

	for(i=0; i< dailyAlertsLen;  i++){
		if( dailyAlerts[i]==gDate_day ){
			return( dailyAlerts[i+1] + " "+ dailyAlerts[i+2]  ) ;

		}

	}

	return(istr);

}


function getLocalTime(){
	var d = new Date();
	gDate_hour    = d.getHours(); 
	gDate_minute  = d.getMinutes(); 
	gDate_seconds = d.getSeconds();
	gDate_timefullstr = gDate_hour.toString()+":"+gDate_minute.toString() +":"+ gDate_seconds.toString();
}
function getLocalDate(){
	var d = new Date();
	gDate_year   = d.getFullYear();
	gDate_month  = d.getMonth();

	if(gDate_month<0 || gDate_month>11 ) gDate_month=0;
	gDate_monthStr = months[ gDate_month ] ;

	gDate_date   = d.getDate();
	gDate_day    = d.getDay();
	if(gDate_day<0 || gDate_day>6 ) gDate_day=0;
	gDate_dayStr = daysofweek[ gDate_day] ;
	gDate_datefullstr = gDate_monthStr+" " +gDate_year.toString()+"-"+(gDate_month+1).toString() +"-"+gDate_date.toString()+"  "+gDate_dayStr ;
}

function getLocalDateTime(){
	
	getLocalDate();
	getLocalTime();

}

// let particles
function init(){
    particles=[]
	getLocalDateTime();

}


function drawBorder(borderWidth, borderCol){


        
    c.lineWidth = borderWidth;
    c.strokeStyle = borderCol; 

    c.moveTo(0,0 );  
    c.lineTo( canvas.width, 0 );  

    c.stroke();
    c.lineTo( canvas.width, canvas.height); 

    c.stroke();
    c.lineTo(  2, canvas.height);  

    c.stroke();
    c.lineTo( 2, 0 );  

}
    



//animation loop
function animate(){
    requestAnimationFrame(animate)
    //c.fillRect(0,0, canvas.width, canvas.height)

    // c.fillStyle = 'rgba(0,0,0,0.05)' 
    c.fillStyle =  gBGcol ; //'rgba(40,40,40,0.05)' 
    c.fillRect(0,0, canvas.width, canvas.height)
    


    particles.forEach( (particle, i) => {
        if(particle.alpha >0){
                particle.update()

            }else{
                 particles.splice(i, 1)   // remove array item [i] for 1 item(s)

            }

    })

    drawXYcoords( mouse.x, mouse.y);
     drawBorder( 8, "#eedf11"); 

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





/// ********************************************************
init()
animate()




/*

requestAnimationFrame

*/

//////////////////////////////////////////////////////////////////////
// JMB 2020-11-27
// from candleglobals.js
/*
//JMB 2020-11-27
class CandlestickObj{
    constructor(  idx, sym, symtype, corpname , udate, utime,  uday,
                  open, high, low, close, volume, p, p3, splitcoeff, divcoeff,
                  buysell, dojitype, dojinum , hilo, volrange,
                   mvavg50, mvavg100, mvavg200, mvavg500 ,mvavg1000 , 
                  gaprange, gapstart, rvol, vwap,
                  canvasx, canvasy, canvasw, canvash ){

        this.idx        =idx
        this.sym        =sym
        this.symtype    =symtype    // ie stock crypto options futures
        this.corpname   =corpname
        this.udate      =udate
        this.utime      =utime
        this.uday       = uday  // mon tue fri etc

        this.open       =open
        this.high       =high
        this.low        =low
        this.close      =close
        this.volume     =volume
        this.p          =p
        this.p3         =p3
        this.splitcoeff =splitcoeff
        this.divcoeff   =divcoeff
            
         this.buysell   = buysell
         this.dojitype    = dojitype
         this.dojinum    = dojinum
         this.hilo      = hilo
         this.volrange  = volrange

         this.mvavg50  = mvavg50
         this.mvavg100 = mvavg100
         this.mvavg200 = mvavg200
         this.mvavg500 = mvavg500 
         this.mvavg1000= mvavg1000 

         this.gaprange   = gaprange           // ie +12.50 = gap up from  // or -9.50 = game DOWN from 
         this.gapstart   = gapstart           //             gapstart of $100.00  = $112.50   // = 90.50
         this.rvol       = rvol
         this.vwap       = vwap

         this.canvasx       = canvasx
         this.canvasy       = canvasy
         this.canvasw       = canvasw
         this.canvash       = canvash



    }
}
    
var pMax0= max;
//     gravity = gravitySt;
//     const particleAngle =pMax0
//     const angleIncrement= ( Math.PI * 2 )/ particleAngle  
//     for(let i=0;i<pMax0;i++){
//           particles.push(      new Particle( mouse.x, mouse.y, 6 , RandomColorP(), 1.0,    //'grey', 1.0, 
//             {   x: Math.cos(angleIncrement * i) * Math.random(), y: Math.sin(angleIncrement * i) * Math.random()
//             } )     )
//     }//FOR

*/

















