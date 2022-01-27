var canvas = document.getElementById("canvasShapes");
var ctx = canvas.getContext("2d");

//Define x and y scales
var xScale = 40;
var yScale = 4;
canvas.height = document.querySelector('.graphic').offsetHeight;
canvas.width = document.querySelector('.graphic').offsetWidth;
// width and height of canvas in pixels
var width = canvas.width;
var height = canvas.height;

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
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 1; i <= 30; i++) {
        ctx.moveTo(xCenter + i * xScale, yCenter + 5);
        ctx.lineTo(xCenter + i * xScale , yCenter - 5);
        ctx.fillText(i ,xCenter + i  * xScale - 3, yCenter - 8 )
    }
    for (i = 1; i <= 30; i++) {
        ctx.moveTo(xCenter - i * xScale, yCenter + 5);
        ctx.lineTo(xCenter - i * xScale, yCenter - 5);
        ctx.fillText(-i ,xCenter - i  * xScale - 6, yCenter - 8 )
    }
    ctx.stroke();


    // draw ticks of 1 unit (=4pixels) along y axis
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 0; i <= 200; i = i + 10) {
        ctx.moveTo(xCenter - 5, yCenter + i * yScale);
        ctx.lineTo(xCenter + 5, yCenter + i * yScale);
        ctx.fillText(-i , xCenter + 5 + 5, yCenter + i * yScale + 3);
        
    }
    for (i = 0; i <= 200; i = i + 10) {
        ctx.moveTo(xCenter - 5, yCenter - i * yScale);
        ctx.lineTo(xCenter + 5, yCenter - i * yScale);
        ctx.fillText(i , xCenter + 5 + 5, yCenter - i * yScale + 3)

    }
    ctx.stroke();
}
drawAxis();

const $range1 = document.getElementById('range1');
const $range2 = document.getElementById('range2');
const $range3 = document.getElementById('range3');
const $a = document.querySelector('.a');
const $exam = document.querySelector('.exam');
const $container = document.querySelector('.container');
const $problems = document.getElementById('problems')
$exam.style.display = 'none';

let a;
let b;
let c;

$range1.onchange = (e) => {
    a = parseInt(e.target.value);
    $a.innerText = a;

    return drawGraphic();
}

const examBtn = () => {
    console.log('hh');
    $exam.style.display = "flex";
    $container.style.opacity = '0.1';
}
const con = closeBtn = () => {
    $exam.style.display = "none";
    $container.style.opacity = "1"
}
$problems.onclick = () => {
    examBtn();
}
// graph function

ctx.translate(xCenter, yCenter);
drawGraphic = () => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawAxis();
  
    ctx.restore();
   
   
    var y = [];
    var x = [];
    var xx;

    for (i = 0; i <= width + 1; i++) {
        x[i] = a*(xCenter - i);
        xx = x[i] / xScale;
        y[i] = -a*yScale*xx*xx*xx;
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


