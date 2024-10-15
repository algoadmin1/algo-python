    // var canvasGlobal = document.getElementById("myCanvas");
    const c = document.getElementById("myCanvas");
    // const c = document.querySelector("canvas");
    // var ctx = c.getContext("2d");
    // Get the canvas and the 2D drawing context
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');


    // Get the toggle checkbox element and the label displaying the value
    const toggle = document.getElementById('theme-toggle');

    var canvasWidth  = c.width;
    var canvasHeight = c.height;

    var innerWidth0  = innerWidth;
    var innerHeight0 = innerHeight;


let dtstr      = "w,h= ["+ canvasWidth.toString()   +","+   canvasHeight.toString() +"]"  ;
// let dtstrWidth = ctx.measureText(dtstr).width+ 0;
let fsz = 24;
ctx.fillStyle = "#113edd";        
ctx.font =  fsz.toString()+ "px Arial";   // ctx.font = "bolder "+"124px Arial";
ctx.fillText( dtstr , 20, 20  );

ctx.fillStyle = "#902222"; 
ctx.fillRect(  40, 40,  800, 125   );

console.log("finished exec'ing charting.js:  ", dtstr );
  
 

function DrawLine(c, x, y, x1, y1, weight, color, style) {
        const ctx = c.getContext('2d');
        
        // Set line properties
        ctx.lineWidth = weight;
        ctx.strokeStyle = color;

        // Set line dash style if any
        if (style === 'dashed') {
            ctx.setLineDash([10, 5]); // 10px dash, 5px space
        } else if (style === 'dotted') {
            ctx.setLineDash([2, 4]);  // 2px dot, 4px space
        } else {
            ctx.setLineDash([]); // Solid line
        }

        // Begin drawing the line
        ctx.beginPath();
        ctx.moveTo(x, y); // Starting point
        ctx.lineTo(x1, y1); // Ending point
        ctx.stroke(); // Draw the line

        // Reset line dash to solid for future drawing
        ctx.setLineDash([]);
    }

function clearCanvasToColor(c, color) {
    const ctx = c.getContext('2d');
    
    // Set the fill color to the specified color
    ctx.fillStyle = color;
    
    // Clear the canvas by filling it with the color
    ctx.fillRect(0, 0, c.width, c.height);
}
// Function to resize canvas and redraw the rectangle
function resizeCanvas() {
    // Set canvas width and height to match the div's size
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    let val1 = updateToggleValue();
    if(val1==1){
        ctx.fillStyle = '#fefefe';
    }else{
        ctx.fillStyle = '#242424';
    }
    // Clear the canvas
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the rectangle dimensions 6px inside the canvas borders
    const rectWidth = canvas.width - 12; // 6px margin on both sides
    const rectHeight = canvas.height - 12; // 6px margin on both sides

    // Draw the rectangle
    ctx.beginPath();
    ctx.rect(6, 6, rectWidth, rectHeight);
    ctx.strokeStyle = 'blue'; //'black';
    ctx.lineWidth = 2;
    ctx.stroke();


    let dtstr      = "w,h= ["+ canvas.width.toString()   +","+   canvas.height.toString() +"]"  ;
    // let dtstrWidth = ctx.measureText(dtstr).width+ 0;
    let val0 = updateToggleValue();
    dtstr=dtstr+ val0.toString();


    let fsz = 24;
    ctx.fillStyle = "#113edd";        
    ctx.font =  fsz.toString()+ "px Arial";   // ctx.font = "bolder "+"124px Arial";
    ctx.fillText( dtstr , 40, 40  );

    DrawLine(canvas, 6, 6, rectWidth, rectHeight, 5, 'red', 'dotted' );   //'dashed');
    
}


// Function to update and display the value based on toggle position
function updateToggleValue() {
    // Assign 1 if the toggle is off (unchecked), 2 if it's on (checked)
    const value = toggle.checked ? 2 : 1;
    
    // Update the display value
    // toggleValue.textContent = 'Toggle Position: ' + value;
    // resizeCanvas();
    // Return the value for further use if needed
    return value;
}

// ################################################ END OF FUNCTIONS ################


// Resize the canvas when the window is resized
window.addEventListener('resize', resizeCanvas);
// Initial resize to set up the canvas
resizeCanvas();

// const toggleValue = document.getElementById('toggleValue');
// Add event listener to detect changes in the toggle button
toggle.addEventListener('change', updateToggleValue);
// Set the initial value on page load
updateToggleValue();

 
