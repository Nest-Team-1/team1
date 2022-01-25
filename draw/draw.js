let board = document.querySelector("#paint-canvas");
board.width = document.querySelector(".container").offsetWidth - 30;
board.height = document.querySelector(".container").offsetHeight - 65;
const paintCanvas = document.querySelector(".js-paint");
const context = paintCanvas.getContext("2d");
context.lineCap = "round";
const colorPicker = document.querySelector(".js-color-picker");
colorPicker.addEventListener("change", (event) => {
    context.strokeStyle = event.target.value;
});

const lineWidthRange = document.querySelector(".js-line-range");
const lineWidthLabel = document.querySelector(".js-range-value");

lineWidthRange.addEventListener("input", (event) => {
    const width = event.target.value;
    lineWidthLabel.innerHTML = width;
    context.lineWidth = width;
});

let x = 0,
    y = 0;
let isMouseDown = false;

const stopDrawing = () => {
    isMouseDown = false;
};

const getMousePositionOnCanvas = (event) => {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    const {
        offsetLeft,
        offsetTop
    } = event.target;

    const viewportOffset = event.target.getBoundingClientRect();
    const top = viewportOffset.top;
    const left = viewportOffset.left;

    const canvasX = clientX - left;
    const canvasY = clientY - top;

    return {
        x: canvasX,
        y: canvasY,
    };
};
const startDrawing = (event) => {
    isMouseDown = true;
    const pos = getMousePositionOnCanvas(event);
    x = pos.x;
    y = pos.y;
};
let isRubber = false;
const drawLine = (event) => {
    event.preventDefault();
    if (!isMouseDown) return;

    const pos = getMousePositionOnCanvas(event);
    if (isRubber) {
        context.clearRect(pos.x, pos.y, 25, 25);
    } else {

        const newX = pos.x;
        const newY = pos.y;

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(newX, newY);
        context.stroke();
        x = newX;
        y = newY;
    }
};
const clr = (clearBtn = () => {
    const $canva = document.getElementById("paint-canvas");
    const context = $canva.getContext("2d");
    context.clearRect(0, 0, $canva.width, $canva.height);
});
const crt = (rubberBtn = () => {
    isRubber = !isRubber;
    if (isRubber) {
        document.querySelector('.paint-canvas').style.cursor = `url("./Eraser.cur"), auto`;
        document.querySelector('.rub').innerText = 'pen';
    } else {
        document.querySelector('.paint-canvas').style.cursor = `url("./Batman Pen.cur"), auto`;
        document.querySelector('.rub').innerText = 'rubber';
    }
    const $canva = document.getElementById("paint-canvas");
    const context = $canva.getContext("2d");
})

paintCanvas.addEventListener("mousedown", startDrawing);
paintCanvas.addEventListener("mousemove", drawLine);
paintCanvas.addEventListener("mouseup", stopDrawing);
paintCanvas.addEventListener("mouseout", stopDrawing);

paintCanvas.addEventListener("touchstart", startDrawing);
paintCanvas.addEventListener("touchmove", drawLine);
paintCanvas.addEventListener("touchend", stopDrawing);
paintCanvas.addEventListener("touchcancel", stopDrawing);