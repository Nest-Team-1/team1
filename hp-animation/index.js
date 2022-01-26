const $container = document.querySelector('.container');
const $box1 = document.querySelector('.box1');
const $box2 = document.querySelector('.box2');
const $null = document.querySelector('.null');
const $boxContainer = document.getElementById('box-container');


const gap = $container.offsetHeight/3;
$box1.style.opacity = `0`
$box2.style.opacity = `0`
window.onscroll = (e) => {
    const windowHeight = window.innerHeight;
    const windowBottomY = window.scrollY + windowHeight;
    
    if(windowBottomY > $null.offsetHeight + gap/2){
        opacity = windowBottomY - ($null.offsetHeight + gap/2);
        $box1.style.opacity = `0.${opacity}`;
        $box2.style.opacity = `0.${opacity}`;
        
        if(opacity > 90){
            $box1.style.opacity = `1`;
            $box2.style.opacity = `1`;
        }
        } else if(windowBottomY < $null.offsetHeight) {
            $box1.style.opacity = `0`;
            $box2.style.opacity = `0`;
        }
    
    const fixedY = windowHeight + windowHeight/2 + $box1.offsetHeight/2
    if(windowBottomY > fixedY){
        $boxContainer.style.position = 'fixed';
        $boxContainer.style.top = '35vh';
    }else{
        $boxContainer.style.position = 'inherit';
    }
    const boxMover = () => {
        if(windowBottomY > $box1.offsetHeight + $null.offsetHeight + gap && windowBottomY < $container.offsetWidth){
            $box1.style.transform = `translateX(-${x*(window.innerWidth/window.innerHeight )}px)`;
            $box2.style.transform = `translateX(${x*(window.innerWidth/window.innerHeight )}px)`;
        }     
        if(windowBottomY < $box1.offsetHeight + $null.offsetHeight + gap){
            $box1.style.transform = `translateX(0px)`;
            $box2.style.transform = `translateX(0px)`;
        }   
    }
    let calcBoxX = $box1.getBoundingClientRect();
    let x = windowBottomY - ($box1.offsetHeight + $null.offsetHeight + gap);  
    boxMover(); 
}
