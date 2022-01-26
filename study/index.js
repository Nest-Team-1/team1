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
        ctx.fillText(-i ,xCenter - i  * xScale - 6, yCenter - 8 );
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

//range
const $range1 = document.getElementById('range1');
const $range2 = document.getElementById('range2');
const $range3 = document.getElementById('range3');
const $max = document.getElementById('max');
const $min = document.getElementById('min');

let a;
let b;
let c;
let maxMin;
let maxValue;
let minValue;


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
    c = parseInt(e.target.value)
    return rangeChange();
}

$maxValue = document.querySelector('.max');
$minValue = document.querySelector('.min');
rangeChange = () => {

    // calculate function y = x^2 from x = -3 to x = 3
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawAxis();
    ctx.restore();
    drawMax();
    drawMin();
   

    for (i = 0; i <= width + 1; i++) {
        x[i] = a * (xCenter - i);
        xx = x[i] / xScale;
        y[i] = -a * yScale * xx * xx + (-yScale * b * xx) + (-yScale * c);
    }

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 0; i <= canvas.width; i++) {
        ctx.moveTo(x[i], y[i]);
        ctx.lineTo(x[i + 1], y[i + 1]);
    }
    ctx.stroke();
    showFunc();
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    
    maxMin = calcMaxMin();
    maxValue = maxMin[0];
    minValue = maxMin[1];

    $maxValue.innerText = `ХИУ = ${Math.floor(maxValue)}`
    $minValue.innerText = `ХБУ = ${Math.floor(minValue)}`
}



const drawMax = () => {

    let g = [];
    let h = [];
    z = parseInt($max.value);

    for (i = 0; i <= canvas.height / 2; i++) {
        g[i] = z * xScale;
        h[i] = i * yScale - canvas.height / 2;
    }

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 0; i <= canvas.height; i++) {
        ctx.moveTo(g[i], h[i]);
        ctx.lineTo(g[i + 2], h[i + 2]);
    }
    ctx.stroke();
}

$max.onchange = (e) => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawAxis();
    ctx.restore();

    drawMax();
    drawMin();
    rangeChange();

}

const drawMin = () => {
    let g = [];
    let h = [];
    z = parseInt($min.value);

    for (i = 0; i <= canvas.height / 2; i++) {
        g[i] = z * xScale;
        h[i] = i * yScale - canvas.height / 2;
    }

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 0; i <= canvas.height; i++) {
        ctx.moveTo(g[i], h[i]);
        ctx.lineTo(g[i + 2], h[i + 2]);
    }
    ctx.stroke();
}

$min.onchange = (e) => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawAxis();
    ctx.restore();
    
    drawMin();
    drawMax();
    rangeChange();
}

showFunc = () => {
    //show function calc
    const $showFunc = document.querySelector('.showfunc');

    if (b > 0 && c > 0) {
        $showFunc.innerHTML = `y = ${a}x^2 +${b}x + ${c}`;
    }
    if (b < 0 && c > 0) {
        $showFunc.innerHTML = `y = ${a}x^2 ${b}x + ${c}`;
    }
    if (b > 0 && c < 0) {
        $showFunc.innerHTML = `y = ${a}x^2 + ${b}x  ${c}`;
    }
    if (b < 0 && c < 0) {
        $showFunc.innerHTML = `y = ${a}x^2  ${b}x  ${c}`;
    }
    if (b === 0 && c > 0) {
        $showFunc.innerHTML = `y = ${a}x^2 + ${c}`;
    }
    if (b === 0 && c < 0) {
        $showFunc.innerHTML = `y = ${a}x^2  ${c}`;
    }
    if (b > 0 && c === 0) {
        $showFunc.innerHTML = `y = ${a}x^2 + ${b}x`;
    }
    if (b < 0 && c === 0) {
        $showFunc.innerHTML = `y = ${a}x^2  ${b}x`;
    }
    if (b === 0 & c === 0) {
        $showFunc.innerHTML = `y = ${a}x^2`;
    }
}

const calcMaxMin= () => {
    ox = -b/(2*a);
    maxVal = parseInt($max.value);
    minVal = parseInt($min.value);
    
    if(a>0){
        max1 = a*maxVal*maxVal + b*maxVal + c;
        max2 = a*minVal*minVal + b*minVal + c;
        if(max1 > max2){
            max = max1;
            min = max2;
        } else {
            max = max2;
            min = max1;
        }
        if(minVal < ox < maxVal){
            min = a*(-b/(2*a))*(-b/(2*a)) + b*(-b/(2*a))+c;
        }
    }
    if(a<0){
        min1 = a*maxVal*maxVal + b*maxVal + c;
        min2 = a*minVal*minVal + b*minVal + c;
        if(min1 < min2){
            min = min1;
            max = min2;
        }else {
            min = min2;
            max = min1;
        }
        if(minVal < ox < maxVal){
            max = a*(-b/(2*a))*(-b/(2*a)) + b*(-b/(2*a))+c;
        }
    }
    return [max, min];
}



   
    






