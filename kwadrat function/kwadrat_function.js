let $a = document.querySelector("#a");
let $b = document.getElementById("b");
let $c = document.getElementById("c");
let $d = document.querySelector("#a1");
let $d1 = document.querySelector("#a2");
let $d2 = document.querySelector("#a3");
let $btn = document.getElementById("btn");
let $exam = document.querySelector('.exam');
let canva = document.querySelector('#myCanvas');
canva.width = document.querySelector('.graphic').offsetWidth;
canva.height = document.querySelector('.graphic').offsetHeight;
$d.innerText = "1";
$d1.innerText = "1";
$d2.innerText = "1";
$a.value = 1;
$b.value = 1;
$c.value = 1;

let a = 1;
let b = 1;
let c = 1;
$exam.style.display = "none"
document.querySelector("#a").onchange = (e) => {
    a = e.target.value;
    $d.innerText = e.target.value;
    // $range.innerText = $a.value;
    rangenChange();
};

document.querySelector("#b").onchange = (e) => {
    b = e.target.value;
    $d1.innerText = e.target.value;
    // $range1.innerText = $b.value;
    rangenChange();
};

document.querySelector("#c").onchange = (e) => {
    c = e.target.value;
    $d2.innerText = e.target.value;
    // $range2.innerText = $c.value;
    rangenChange();
};
const exam = examBtn = () => {
    $exam.style.display = "flex";
    $con.style.opacity = "0.1"
}
const clo = closeBtn = () => {
    $exam.style.display = "none";
    $con.style.opacity = "1"
}

function Graph(config) {
    // user defined properties
    this.canvas = document.getElementById(config.canvasId);
    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.unitsPerTick = config.unitsPerTick;

    // constants
    this.axisColor = "#000";
    this.font = "10pt Calibri";
    this.tickSize = 20;

    // relationships
    this.context = this.canvas.getContext("2d");
    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;
    this.unitX = this.canvas.width / this.rangeX;
    this.unitY = this.canvas.height / this.rangeY;
    this.centerY = Math.round(
        Math.abs(this.minY / this.rangeY) * this.canvas.height
    );
    this.centerX = Math.round(
        Math.abs(this.minX / this.rangeX) * this.canvas.width
    );
    this.iteration = (this.maxX - this.minX) / 1000;
    this.scaleX = this.canvas.width / this.rangeX;
    this.scaleY = this.canvas.height / this.rangeY;

    // draw x and y axis
    this.drawXAxis();
    this.drawYAxis();
}

Graph.prototype.drawXAxis = function() {
    let context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(0, this.centerY);
    context.lineTo(this.canvas.width, this.centerY);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    // draw tick marks
    let xPosIncrement = this.unitsPerTick * this.unitX;
    let xPos, unit;
    context.font = this.font;
    context.textAlign = "center";
    context.textBaseline = "top";

    // draw left tick marks
    xPos = this.centerX - xPosIncrement;
    unit = -1 * this.unitsPerTick;
    while (xPos > 0) {
        context.moveTo(xPos, this.centerY - this.tickSize / 2);
        context.lineTo(xPos, this.centerY + this.tickSize / 2);
        context.stroke();
        context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
        unit -= this.unitsPerTick;
        xPos = Math.round(xPos - xPosIncrement);
    }

    // draw right tick marks
    xPos = this.centerX + xPosIncrement;
    unit = this.unitsPerTick;
    while (xPos < this.canvas.width) {
        context.moveTo(xPos, this.centerY - this.tickSize / 2);
        context.lineTo(xPos, this.centerY + this.tickSize / 2);
        context.stroke();
        context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
        unit += this.unitsPerTick;
        xPos = Math.round(xPos + xPosIncrement);
    }
    context.restore();
};

Graph.prototype.drawYAxis = function() {
    let context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(this.centerX, 0);
    context.lineTo(this.centerX, this.canvas.height);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    // draw tick marks
    let yPosIncrement = this.unitsPerTick * this.unitY;
    let yPos, unit;
    context.font = this.font;
    context.textAlign = "right";
    context.textBaseline = "middle";

    // draw top tick marks
    yPos = this.centerY - yPosIncrement;
    unit = this.unitsPerTick;
    while (yPos > 0) {
        context.moveTo(this.centerX - this.tickSize / 2, yPos);
        context.lineTo(this.centerX + this.tickSize / 2, yPos);
        context.stroke();
        context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
        unit += this.unitsPerTick;
        yPos = Math.round(yPos - yPosIncrement);
    }

    // draw bottom tick marks
    yPos = this.centerY + yPosIncrement;
    unit = -1 * this.unitsPerTick;
    while (yPos < this.canvas.height) {
        context.moveTo(this.centerX - this.tickSize / 2, yPos);
        context.lineTo(this.centerX + this.tickSize / 2, yPos);
        context.stroke();
        context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
        unit -= this.unitsPerTick;
        yPos = Math.round(yPos + yPosIncrement);
    }
    context.restore();
};

Graph.prototype.drawEquation = function(equation, color, thickness) {
    let context = this.context;
    context.save();
    context.save();
    this.transformContext();

    context.beginPath();
    context.moveTo(this.minX, equation(this.minX));

    for (
        let x = this.minX + this.iteration; x <= this.maxX; x += this.iteration
    ) {
        context.lineTo(x, equation(x));
    }

    context.restore();
    context.lineJoin = "round";
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.stroke();
    context.restore();
};

Graph.prototype.transformContext = function() {
    let context = this.context;

    // move context to center of canvas
    this.context.translate(this.centerX, this.centerY);
    // this.context.translate(105, 0);

    /*
     * stretch grid to fit the canvas window, and
     * invert the y scale so that that increments
     * as you move upwards
     */
    context.scale(this.scaleX, -this.scaleY);
};

const myGraph = new Graph({
    canvasId: "myCanvas",
    minX: -10,
    minY: -10,
    maxX: 10,
    maxY: 10,
    unitsPerTick: 1,
});
myGraph.drawEquation(
    function(x) {
        return (
            parseInt($a.value) * x * x + parseInt($b.value) * x + parseInt($c.value)
            // (parseInt($a.value) * x + 1)/3; 
        );
    },
    "black",
    3
);
//end range oorchlohod zurah bga
const rangenChange = (value) => {
    const canva = document.getElementById("myCanvas");
    const context = canva.getContext("2d");
    context.clearRect(0, 0, canva.width, canva.height);
    myGraph.drawXAxis();
    myGraph.drawYAxis();
    myGraph.drawEquation(
        (x) => {
            return (
                parseInt($a.value) * x * x + parseInt($b.value) * x + parseInt($c.value)
            );
        },
        "black",
        3
    );

};