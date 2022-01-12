const $container = document.querySelector('.container');
const $box1 = document.querySelector('.box1');
const $box2 = document.querySelector('.box2');
const $null = document.querySelector('.null');


const gap = 250;
var timer;

window.onscroll = (e) => {
    if(timer){ clearTimeout(timer)}
    const windowHeight = window.innerHeight;
    var timer = setTimeout( () => { 
        const windowBottomY = window.scrollY + windowHeight;
        console.log(windowBottomY);
        const calcWithBottomY = windowBottomY - gap;
        if(calcWithBottomY > $container.offsetTop){
            $container.classList.add('active');
        }else{
            $container.classList.remove('active');
        }
        if(windowBottomY > $box1.offsetHeight + $null.offsetHeight + gap){
            const x = windowBottomY - ($box1.offsetHeight + $null.offsetHeight + gap);
            $box1.style.transform = `translateX(-${x}px)`
            $box2.style.transform = `translateX(${x}px)`
        }} , 50)


    
}


