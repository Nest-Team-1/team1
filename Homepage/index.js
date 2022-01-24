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
        if($bulb.style.opacity > 0.9){
            console.log(`bye`);
        }
    }

}