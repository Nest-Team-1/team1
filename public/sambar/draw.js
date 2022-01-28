const $signUp = document.getElementById('signup')
const $log = document.getElementById('login')
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
//window location change
const $sambar = document.getElementById('sambar');
const $formulas = document.getElementById('formulas');
const $forum = document.getElementById('forum');
const $start = document.getElementById('start');


const $linear = document.getElementById('linear')
const $kwadrat = document.getElementById('kwadrat')
const $maxmin = document.getElementById('maxmin')
const $oddeven = document.getElementById('oddeven')
const $inserse = document.getElementById('inverse')
const $register = document.getElementById('signup')
const $login = document.getElementById('login');
const $logo = document.querySelector('.logo');
$logo.onclick = () => {
    window.location = '../Homepage/index.html'
}

$login.onclick = () => {
    window.location = '../login/index.html'
}
$register.onclick = () => {
    window.location = '../register/index.html'
}
$inserse.onclick = () => {
    window.location = '../inverseFunction/reverse-function.html'
}
$oddeven.onclick = () => {
    window.location = '../oddEvenFunction/index.html'
}
$maxmin.onclick = () => {
    window.location = '../maxMinFunction/index.html'
}
$kwadrat.onclick = () => {
    window.location = '../kwadratFunction/kwadrat_function.html'
}
$linear.onclick = () => {
    window.location = '../linearFunction/linear_function.html'
}



$sambar.onclick = () => {
    window.location = "../sambar/draw.html";
}
$formulas.onclick = () => {
    window.location = '../formulas/index.html';
}
$forum.onclick = () => {
    window.location = '../forum/index.html';
}
$start.onclick = () => {
    console.log('dsd');
    window.location = '../whatIsFunction/what_is_function.html';
}
const $myDivRight = document.querySelector('.mydiv-right');
let flag;
seeDiv = () => {
    console.log('doen...');
    if (flag) {
        flag = false;
        const $settingContainer = document.querySelector('.setting-container');
        const $navImg = $myDivRight.querySelector('.nav-img');
        $navImg.removeChild($settingContainer);
    } else {
        flag = true;
        const $navImg = $myDivRight.querySelector('.nav-img');
        const div = document.createElement('div');
        div.classList.add('setting-container', 'flex', 'column');
        $navImg.append(div);
        const $settingContainer = document.querySelector('.setting-container');
        const html = `<div class="profile-setting flex-1 nav-set-link">Profile Settings</div>
        <div class="logout flex-1 nav-set-link"> Log Out</div>`;
        $settingContainer.innerHTML = html;
    }
}

firebase.auth().onAuthStateChanged((user) => {
    const divImg = document.createElement('div');
    const divUsername = document.createElement('div');
    const divReg = document.createElement('div');
    const divLogin = document.createElement('div');
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        $myDivRight.removeChild($signUp);
        $myDivRight.removeChild($log);

        const htmlnavImg = `<div class="margin-left nav-img" onclick="seeDiv()"></div>`;
        // const divnavImg = document.createElement('div');
        // divImg.classList.add('nav-img'); 
        $myDivRight.innerHTML = htmlnavImg;
        const $navImg = $myDivRight.querySelector('.nav-img');
        // $navImg.innerHTML = htmlnavImg; 
        $navImg.style.backgroundImage = `url('${user.photoURL}')`;

        // const divUsername = document.createElement('div');
        divUsername.classList.add('flex', 'just-center', 'align-center', 'margin-left', 'nav-username');
        $myDivRight.append(divUsername);
        const $navUsername = $myDivRight.querySelector('.nav-username');
        $navUsername.innerText = user.displayName;

        // ...
    } else {
        if ($myDivRight.getElementById('login')) {
            console.log('login');
        } else {
            const $navImg = $myDivRight.querySelector('.nav-img');
            $myDivRight.removeChild($navImg);
            const $navUsername = $myDivRight.querySelector('.nav-username');
            $myDivRight.removeChild($navUsername);

            divReg.classList.add('margin-left', 'register');
            divReg.innerHTML = 'Бүртгүүлэх';
            $myDivRight.append(divReg);

            divLogin.classList.add('margin-left', 'login');
            divLogin.innerHTML = 'Нэвтрэх';
            $myDivRight.append(divLogin);
            location.replace('./index.html');
        }
        // User is signed out
        // ...
    }
});