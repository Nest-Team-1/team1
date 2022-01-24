var canvas = document.getElementById("canvasShapes");
var ctx = canvas.getContext("2d");

//Define x and y scales
var xScale = 50;
var yScale = 50;

// width and height of canvas in pixels
var width = 815;
var height = 483;

// coordinates of center of canvas in pixels
var xCenter = width / 2;
var yCenter = height / 2;

drawAxis = () => {

    // draw axes
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = 2;

    // draw x axis
    ctx.moveTo(0, yCenter);
    ctx.lineTo(width, yCenter);

    // draw y axis
    ctx.moveTo(xCenter, 0);
    ctx.lineTo(xCenter, height);
    ctx.stroke();

    // draw ticks of 1 unit (=100pixels) along x axis
    ctx.strokeStyle = "grey";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 1; i <= 8; i++) {
        ctx.moveTo(xCenter + i * xScale, yCenter + 5);
        ctx.lineTo(xCenter + i * xScale, yCenter - 5);
    }
    for (i = 1; i <= 8; i++) {
        ctx.moveTo(xCenter - i * xScale, yCenter + 5);
        ctx.lineTo(xCenter - i * xScale, yCenter - 5);
    }
    ctx.stroke();


    // draw ticks of 1 unit (=50pixels) along y axis
    ctx.strokeStyle = "grey";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 1; i <= 4; i++) {
        ctx.moveTo(xCenter - 5, yCenter + i * yScale);
        ctx.lineTo(xCenter + 5, yCenter + i * yScale);
    }
    for (i = 1; i <= 4; i++) {
        ctx.moveTo(xCenter - 5, yCenter - i * yScale);
        ctx.lineTo(xCenter + 5, yCenter - i * yScale);
    }
    ctx.stroke();
}
drawAxis();

//range
const $range1 = document.getElementById('range1');
const $range2 = document.getElementById('range2');
const $range3 = document.getElementById('range3');

let a;
let b;
let c;

// graph function
ctx.translate(xCenter, yCenter);
var y = [];
var x = [];
var xx;

$range1.onchange = (e) => {
    
    a = parseInt(e.target.value);
    console.log(a);
    return rangeChange();

}

rangeChange = () => {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    drawAxis();
    for (i = 0; i <= width + 1; i++) {
        x[i] = a * (xCenter - i);
        xx = x[i] / xScale;
        y[i] = -a * yScale * xx * xx;
    }

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 0; i <= canvas.width; i++) {
        ctx.moveTo(x[i], y[i]);
        ctx.lineTo(x[i + 1], y[i + 1]);
    }
    ctx.stroke();
}

$range2.onchange = (e) => {
    b = e.target.value;
}
$range3.onchange = (e) => {
    c = e.target.value;
}





// calculate function y = x^2 from x = -3 to x = 3
