

const canvas 	   = document.querySelector("canvas");
const c 		   = canvas.getContext("2d");

canvas.width        = innerWidth
canvas.height       = innerHeight

// const canvas.width =   innerWidth;
// const canvas.height =  innerHeight;

// var     gBGcol = 'rgba(40,40,40,0.05)' ;
var     gBGcol = 'rgba(0,0,40,0.05)' ;


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
       nstr= "[<---" +cw1.toString()  + "," + ch1.toString() +"--->] " ;
     
     c.fillText( nstr, x, y+200);

     

}



addEventListener('mousedown',(event) => { 
    
    var mousePos = getMousePos(canvas, event);
 
    let eventClientx = mousePos.x; 
    let eventClienty = mousePos.y;   

    mouse.x =eventClientx;        // mous e.x = event.clientX    
    mouse.y =eventClienty;       // mouse.y = event.clientY
 
	gAlertStr  =  checkAlerts();
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

















