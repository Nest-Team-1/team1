const $container = document.querySelector('.container');
const $box1 = document.querySelector('.box1');
const $box2 = document.querySelector('.box2');
const $null = document.querySelector('.null');
const $boxContainer = document.getElementById('box-container');


const gap = 250;

window.onscroll = (e) => {
    const windowHeight = window.innerHeight;
    const windowBottomY = window.scrollY + windowHeight;
    console.log(windowBottomY);
    
    const fixedY = windowHeight + windowHeight/2 + $box1.offsetHeight/2
    if(windowBottomY > fixedY){
        console.log(`fixed`);
        $boxContainer.style.position = 'fixed';
        $boxContainer.style.top = '30vh'
    }else{
        $boxContainer.style.position = 'inherit'
    }
    const boxMover = () => {
        if(windowBottomY > $box1.offsetHeight + $null.offsetHeight + gap){
            $box1.style.transform = `translateX(-${x}px)`
            $box2.style.transform = `translateX(${x}px)`
        }        
        else{
            $box1.style.transform = `translateX(0px)`
            $box2.style.transform = `translateX(0px)`
        }   
    }
    let calcBoxX = $box1.getBoundingClientRect();
    console.log(calcBoxX.left);
    let x = windowBottomY - ($box1.offsetHeight + $null.offsetHeight + gap);  
    boxMover();   
  
}

