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
const calcMaxMin = () => {
    ox = -b / (2 * a);
    maxVal = parseInt($max.value);
    minVal = parseInt($min.value);

    if (a > 0) {
        max1 = a * maxVal * maxVal + b * maxVal + c;
        max2 = a * minVal * minVal + b * minVal + c;
        if (max1 > max2) {
            max = max1;
            min = max2;
        } else {
            max = max2;
            min = max1;
        }
        if (minVal < ox < maxVal) {
            min = a * (-b / (2 * a)) * (-b / (2 * a)) + b * (-b / (2 * a)) + c;
        }
    }
    if (a < 0) {
        min1 = a * maxVal * maxVal + b * maxVal + c;
        min2 = a * minVal * minVal + b * minVal + c;
        if (min1 < min2) {
            min = min1;
            max = min2;
        } else {
            min = min2;
            max = min1;
        }
        if (minVal < ox < maxVal) {
            max = a * (-b / (2 * a)) * (-b / (2 * a)) + b * (-b / (2 * a)) + c;
        }
    }
    return [max, min];
}

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
        ctx.fillText(i, xCenter + i * xScale - 3, yCenter - 8)
    }
    for (i = 1; i <= 30; i++) {
        ctx.moveTo(xCenter - i * xScale, yCenter + 5);
        ctx.lineTo(xCenter - i * xScale, yCenter - 5);
        ctx.fillText(-i, xCenter - i * xScale - 6, yCenter - 8);
    }
    ctx.stroke();


    // draw ticks of 1 unit (=4pixels) along y axis
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (i = 0; i <= 200; i = i + 10) {
        ctx.moveTo(xCenter - 5, yCenter + i * yScale);
        ctx.lineTo(xCenter + 5, yCenter + i * yScale);
        ctx.fillText(-i, xCenter + 5 + 5, yCenter + i * yScale + 3);

    }
    for (i = 0; i <= 200; i = i + 10) {
        ctx.moveTo(xCenter - 5, yCenter - i * yScale);
        ctx.lineTo(xCenter + 5, yCenter - i * yScale);
        ctx.fillText(i, xCenter + 5 + 5, yCenter - i * yScale + 3)

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
    console.log(maxValue , minValue);

    $maxValue.innerText = `ХИУ = ${Math.round(maxValue)}`
    $minValue.innerText = `ХБУ = ${Math.round(minValue)}`
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

    // calculate function y = x^2 from x = -3 to x = 3

    for (i = 0; i <= width + 1; i++) {
        x[i] = xCenter - i;
        xx = x[i] / xScale;
        y[i] = -yScale * Math.pow(xx, 2);

    }


}

//window.location
const $signUp = document.getElementById('signup')
const $log = document.getElementById('login')
const $hicheel = document.getElementById('hicheel');
const $sambar = document.getElementById('sambar');
const $formulas = document.getElementById('formulas');
const $forum = document.getElementById('forum');
const $previous = document.getElementById('previous');
const $next = document.getElementById('next');
const $problems = document.getElementById('problems');
const $exam = document.querySelector('.exam');
const $container = document.querySelector('.container');
const $logo = document.querySelector('.logo');
$exam.style.display = 'none';

const $linear = document.getElementById('linear')
const $kwadrat = document.getElementById('kwadrat')
const $maxmin = document.getElementById('maxmin')
const $oddeven = document.getElementById('oddeven')
const $inserse = document.getElementById('inverse')
const $register = document.getElementById('signup')
const $login = document.getElementById('login')
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


$logo.onclick = () => {
    window.location = '../Homepage/index.html'
}

$problems.onclick = () => {
    examBtn();
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
    window.location = '../oddEvenFunction/index.html';
}
$previous.onclick = () => {
    window.location = '../kwadratFunction/kwadrat_function.html';
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


//login
const $myDivRight = document.querySelector('.mydiv-right');
let flag;
seeDiv = () => {
    if(flag){
        flag = false;
        const $settingContainer = document.querySelector('.setting-container');
        const $navImg = $myDivRight.querySelector('.nav-img');
        $navImg.removeChild($settingContainer);
    }
    else{
        flag = true;
        const $navImg = $myDivRight.querySelector('.nav-img');
        const div = document.createElement('div');
        div.classList.add('setting-container', 'flex', 'column' );
        $navImg.append(div);
        const $settingContainer = document.querySelector('.setting-container'); 
        const html = `<div class="profile-setting flex-1 nav-set-link" onclick=profilePage()> Profile Settings </div>
        <div class="logout flex-1 nav-set-link" onclick = signOut()> Log Out</div>`;
        $settingContainer.innerHTML = html;
    }
}

profilePage = ()=>{
    window.location = '../profile/index.html';
}

signOut = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location = '../login/index.html';
      }).catch((error) => {
        // An error happened.
      });
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
        if($myDivRight.getElementById('login')){
            console.log('login');
        }
        else{
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