const $container = document.querySelector('.container');
const $box1 = document.querySelector('.box1');
const $box2 = document.querySelector('.box2');
const $null = document.querySelector('.null');
const $boxContainer = document.getElementById('box-container');

const gap = $container.offsetHeight/3;

window.onscroll = (e) => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    let windowBottomY = window.scrollY + windowHeight;
    const containerHeight = $container.offsetHeight;
    const containerWidth = $container.offsetWidth;
    
    let boxLocation = $box1.getBoundingClientRect();
    console.log(boxLocation.y);

    x = windowBottomY - $null.offsetHeight - gap;
    if(boxLocation.y < (windowHeight-$box1.offsetHeight)/2){
        $box1.style.transform = `translateX(-${x}px)`;
        $box2.style.transform = `translateX(${x}px)`;
    }
    if(boxLocation.y > $box1.offsetHeight - gap ){
        
    }
    
}