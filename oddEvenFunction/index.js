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
const $hicheel = document.getElementById('hicheel');
const $sambar = document.getElementById('sambar');
const $formulas = document.getElementById('formulas');
const $forum = document.getElementById('forum');
const $previous = document.getElementById('previous');
const $next = document.getElementById('next');
const $exam = document.querySelector('.exam');
const $container = document.querySelector('.container');
const $problems = document.getElementById('problems');
const $linear = document.getElementById('linear')
const $kwadrat = document.getElementById('kwadrat')
const $maxmin = document.getElementById('maxmin')
const $oddeven = document.getElementById('oddeven')
const $inserse = document.getElementById('inverse')
const $register = document.getElementById('signup')
const $login = document.getElementById('login');
const $start = document.getElementById('start')
const $logo = document.querySelector('.logo');
$exam.style.display = 'none';
$logo.onclick = () => {
    window.location = '../Homepage/index.html'
}


$start.onclick = () => {
    window.location = '../whatIsFunction/what_is_function.html'
}
$login.onclick = () => {
    window.location = '../login/index.html'
}
$register.onclick = () => {
    window.location = '../register/index.html'
}
$inserse.onclick = () => {
    window.location = '../inversefunction/reverse-function.html'
}
$oddeven.onclick = () => {
    window.location = '../oddevenfunction/index.html'
}
$maxmin.onclick = () => {
    window.location = '../maxminfunction/index.html'
}
$kwadrat.onclick = () => {
    window.location = '../kwadratfunction/kwadrat_function.html'
}
$linear.onclick = () => {
    window.location = '../linearfunction/linear_function.html'
}
$sambar.onclick = () => {
    window.location = '../sambar/draw.html';
}
$formulas.onclick = () => {
    window.location = '../formulas/index.html';
}
$forum.onclick = () => {
    window.location = '../forum/index.html';
}
$next.onclick = () => {
    window.location = '../inverseFunction/reverse-function.html';
}
$previous.onclick = () => {
    window.location = '../maxMinFunction/index.html';
}

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

const $signUp = document.getElementById('signup')
const $log = document.getElementById('login')

// Navigation Login
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

