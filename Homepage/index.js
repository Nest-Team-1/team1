const $nav = document.querySelector('.top-navigation');
const $ball = document.querySelector('.ball');
const $pen = document.querySelector('.pen');
const $lamp = document.querySelector('.lamp');
const $book = document.querySelector('.book');
const $usage = document.querySelector('.usage');
const $study = document.querySelector('.study');
const $plant = document.querySelector('.plant');
const $rocket = document.querySelector('.rocket');
const $spin = document.querySelector('.spin');

const gap = 250;

window.onscroll = (e) => {
    if(window.scrollY > $nav.offsetHeight && window.scrollY < $usage.offsetHeight + gap){
        x = window.scrollY - $nav.offsetHeight;
        
        $book.style.transform = `translateY(${-x}px)`
        $pen.style.transform = `translateY(${x}px)`
        $ball.style.transform = `translateX(${-x}px)`
        $lamp.style.transform = `translate(${x}px)`
    }    
    if(window.scrollY > $study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight){
        x = window.scrollY - ($study.offsetHeight + $nav.offsetHeight + $usage.offsetHeight);
        console.log(x);
        $plant.style.transform = `translateX(${x}px)`;
        $rocket.style.transform = `translateY(${-x}px)`;
        $spin.style.transform = `rotate(${x}deg)`;
    }
}