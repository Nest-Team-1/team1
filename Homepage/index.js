const $nav = document.querySelector('.top-navigation');
const $ball = document.querySelector('.ball');
const $pen = document.querySelector('.pen');
const $lamp = document.querySelector('.lamp');
const $book = document.querySelector('.book');
const $usage = document.querySelector('.usage');
const $purpose = document.querySelector('.purpose')
const $study = document.querySelector('.study');
const $spin1 = document.querySelector('.spin1');
const $spin2 = document.querySelector('.spin2');
const $spin3 = document.querySelector('.spin3');
const $spin4 = document.querySelector('.spin4');
const $file1 = document.querySelector('.file1');
const $file2 = document.querySelector('.file2');
const $vector1 = document.querySelector('.vector1');
const $vector2 = document.querySelector('.vector2');
const $vector3 = document.querySelector('.vector3');
const $vector4 = document.querySelector('.vector4');
const $bulb = document.querySelector('.yellow-bulb');

const gap = 250;
window.onscroll = (e) => {
    if(window.scrollY > $nav.offsetHeight  && window.scrollY < $usage.offsetHeight + gap){
        x = window.scrollY - $nav.offsetHeight;
        
        $book.style.transform = `translateY(${-x}px)`
        $pen.style.transform = `translateY(${x}px)`
        $ball.style.transform = `translateX(${-x}px)`
        $lamp.style.transform = `translate(${x}px)`
    }    
    if(window.scrollY > $study.offsetHeight + $nav.offsetHeight){
        x = window.scrollY - ($study.offsetHeight + $nav.offsetHeight);  

        $spin1.style.transform = `rotate(${x}deg)`;
        $spin2.style.transform = `rotate(${-x}deg)`;
        $spin3.style.transform = `rotate(${x}deg)`;
        $spin4.style.transform = `rotate(${-x}deg)`;
    }
    if(window.scrollY > $study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight){
        y = window.scrollY - ($study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight);  
        $file1.style.transform = `translateX(${y}px)`;
        $file2.style.transform = `translateX(${-y}px)`;
    }

    if(window.scrollY > $study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + 30 && window.scrollY < $study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + $study.offsetHeight*2/7){
        z = window.scrollY - ($study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + 30);
        $vector1.style.transform = `translateY(${z}px)`;
    }
    if(window.scrollY > $study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + 60 && window.scrollY < $study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + $study.offsetHeight*2/7 + 30){
        q = window.scrollY - ($study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + 60);
        $vector2.style.transform = `translateY(${q}px)`;
    }
    if(window.scrollY > $study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + 90 && window.scrollY < $study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + $study.offsetHeight*2/7 + 60){
        w = window.scrollY - ($study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + 90);
        $vector3.style.transform = `translateY(${w}px)`;
    }
    if(window.scrollY > $study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + 120 && window.scrollY < $study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + $study.offsetHeight*2/7 + 90){
        e = window.scrollY - ($study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight + 120);
        $vector4.style.transform = `translateY(${e}px)`;
    }
    if(window.scrollY > $study.offsetHeight*2 + $nav.offsetHeight + $usage.offsetHeight + $purpose.offsetHeight/3){
        r = window.scrollY - ($study.offsetHeight*2 + $nav.offsetHeight + $usage.offsetHeight + $purpose.offsetHeight/3);

        console.log(parseInt(r/12 + 10));
        $bulb.style.opacity = `0.${parseInt(r/12 + 10)}`;

        console.log(r/8);
        $bulb.style.opacity = `0.${r/12 + 10}`;

        if($bulb.style.opacity > 0.9){
            console.log(`bye`);
        }
    }

}


//window location change
const $sambar = document.getElementById('sambar'); 
const $formulas = document.getElementById('formulas');
const $forum = document.getElementById('forum');
const $start = document.getElementById('start');
var $start1=document.querySelector('.start')
const $negdeh = document.getElementById('negdeh');
const $harah = document.getElementById('harah');


const $linear=document.getElementById('linear')
const $kwadrat=document.getElementById('kwadrat')
const $maxmin=document.getElementById('maxmin')
const $oddeven=document.getElementById('oddeven')
const $inserse=document.getElementById('inverse')
const $signUp=document.getElementById('signup')
const $log=document.getElementById('login')

$log.onclick=()=>{
    window.location='../login/index.html'
}
$signUp.onclick=()=>{
    window.location='../login/index.html'
}
$inserse.onclick=()=>{
    checkUser();
    window.location='../inversefunction/reverse-function.html'
}
$oddeven.onclick=()=>{
    checkUser();
    window.location='../oddevenfunction/index.html'
}
$maxmin.onclick=()=>{
    checkUser();
    window.location='../maxminfunction/index.html'
}
$kwadrat.onclick=()=>{
    checkUser();
    window.location='../kwadratfunction/kwadrat_function.html'
}
$linear.onclick=()=>{
    checkUser();
    window.location= '../linearfunction/linear_function.html'
}
const $hicheel = document.getElementById('hicheel');


$sambar.onclick = () => {
    console.log('sambar');
    window.location = "../sambar/draw.html"; 
}
$formulas.onclick = () => {
    window.location = '../formulas/index.html';
}
$forum.onclick = () => {
    checkUser();
    window.location = '../forum/index.html';
}
$start.onclick = () => {
    console.log('dsd');
    checkUser();
    window.location = '../whatIsFunction/what_is_function.html';
}
$start1.onclick=()=>{
    console.log('hi')
    window.location='../whatIsFunction/what_is_function.html';
}
$negdeh.onclick = () => {
    console.log('j');
    checkUser();
    window.location = '../forum/index.html';
}
$harah.onclick = () => {
    window.location = '../formulas/index.html';
}

// Navigation Login
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
        if(document.getElementById('login')){
            console.log('login');
        }
        else{
            const $navImg = document.querySelector('.nav-img');
            $myDivRight.removeChild($navImg);
            const $navUsername = document.querySelector('.nav-username');
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

  checkUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          // User is signed out
          alert('Энэ холбоос руу Нэвтэрсэн хэрэглэгчид орох боломжтой. Та эхлээд бүртгүүлнэ үү?');
          window.location = '../login/index.html';
          var uid = user.uid;
        }
      });
  }
