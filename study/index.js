var canvas = document.getElementById("canvasShapes");
var ctx = canvas.getContext("2d");

//Define x and y scales
var xScale = 30;
var yScale = 20;
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
        ctx.lineTo(xCenter + i * xScale, yCenter - 5);
    }
    for (i = 1; i <= 30; i++) {
        ctx.moveTo(xCenter - i * xScale, yCenter + 5);
        ctx.lineTo(xCenter - i * xScale, yCenter - 5);
    }
    ctx.stroke();


    // draw ticks of 1 unit (=50pixels) along y axis
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 1; i <= 20; i++) {
        ctx.moveTo(xCenter - 5, yCenter + i * yScale);
        ctx.lineTo(xCenter + 5, yCenter + i * yScale);
    }
    for (i = 1; i <= 20; i++) {
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
const $max = document.getElementById('max');
const $min = document.getElementById('min');

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
    b = parseInt($range2.value);
    c = parseInt($range3.value);
    return rangeChange();
}
$range2.onchange = (e) => {
    a = parseInt($range1.value);
    b = parseInt(e.target.value);
    c = parseInt($range3.value);
    return rangeChange();
}
$range3.onchange = (e) => {
    a = parseInt($range1.value);
    b = parseInt($range2.value);
    c = parseInt(e.target.value);
    return rangeChange();
}

rangeChange = () => {

    // calculate function y = x^2 from x = -3 to x = 3
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawAxis();
    ctx.restore();
    for (i = 0; i <= width + 1; i++) {
        x[i] = a * (xCenter - i) ;
        xx = x[i] / xScale;
        y[i] = -a * yScale * xx * xx + (-yScale*b*xx)+(-yScale*c);
    }

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 0; i <= canvas.width; i++) {
        ctx.moveTo(x[i], y[i]);
        ctx.lineTo(x[i + 1], y[i + 1]);
    }
    ctx.stroke();
    const $showFunc = document.querySelector('.showfunc');
    $showFunc.innerHTML = `y = ${a}x^2 +${b}x + ${c}`;
}

$max.onchange = (e) => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawAxis();
    ctx.restore();
    let g = [];
    let h = [];
    z = parseInt(e.target.value);
    console.log(z);
    for(i = 0 ; i <= canvas.height/2 ; i++){
        g[i] = z*xScale;
        h[i] = i*yScale - canvas.height/2;
    }

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for(i = 0 ; i <= canvas.height ; i++){
        ctx.moveTo(g[i] , h[i]);
        ctx.lineTo(g[i+2] , h[i + 2]);
    }
    ctx.stroke();
}







