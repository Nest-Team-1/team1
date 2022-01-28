const $signUp = document.getElementById('signup')
const $log = document.getElementById('login')

const $box = document.querySelectorAll('.box');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(`hello`);
        entry.target.classList.toggle("show", entry.isIntersecting)
    });
}, {
    threshold: .1,

});

$box.forEach(box => {
    observer.observe(box);
});
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