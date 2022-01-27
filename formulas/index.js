const $box = document.querySelectorAll('.box');

const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => {
       console.log(`hello`);
       entry.target.classList.toggle("show" , entry.isIntersecting)
   });
},{
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


const $linear=document.getElementById('linear')
const $kwadrat=document.getElementById('kwadrat')
const $maxmin=document.getElementById('maxmin')
const $oddeven=document.getElementById('oddeven')
const $inserse=document.getElementById('inverse')
const $register=document.getElementById('signup')
const $login=document.getElementById('login')

$login.onclick=()=>{
    window.location='../login/index.html'
}
$register.onclick=()=>{
    window.location='../register/index.html'
}
$inserse.onclick=()=>{
    window.location='../inversefunction/reverse-function.html'
}
$oddeven.onclick=()=>{
    window.location='../oddevenfunction/index.html'
}
$maxmin.onclick=()=>{
    window.location='../maxminfunction/index.html'
}
$kwadrat.onclick=()=>{
    window.location='../kwadratfunction/kwadrat_function.html'
}
$linear.onclick=()=>{
    window.location= '../linearfunction/linear_function.html'
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


