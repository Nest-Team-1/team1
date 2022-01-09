const $blocks = document.querySelectorAll('.block');
// const $sticky = document.querySelector('.sticky');
const $penCont = document.querySelector('.penCont');
const $ab = document.querySelector('.about');

const TOP_GAP = 250;
const windowHeight = window.innerHeight;

window.onscroll = (e) => {
    const windowBottomY = window.scrollY + windowHeight;
    const calcWindowBottomY = windowBottomY - TOP_GAP;

    for (const $block of $blocks) {
        if (calcWindowBottomY > $block.offsetTop) {
            $block.classList.add('active');
        } else {
            $block.classList.remove('active');
        }
    }

    const fixedParentY = $penCont.closest('.block').offsetTop;
    console.log('blockY:' + fixedParentY, 'windowScroll:' + window.scrollY, 'wH: ' + windowHeight);
    if (windowBottomY - windowHeight / 2 - fixedParentY >= -windowHeight && window.scrollY < windowHeight * 1.3) {;
        console.log(windowBottomY - windowHeight / 2 - fixedParentY);
        const a = windowBottomY - windowHeight / 2 - fixedParentY;
        const $left = $penCont.querySelector('.left');
        const $right = $penCont.querySelector('.right');
        $left.style.transform = `translateX(-${a}px)`;
        $right.style.transform = `translateX(${a}px)`;
        // $ab.style.fontSize = `${window.scrollY / 50}px`
        // if (window.scrollY > fixedParentY) {
        //     $penCont.classList.add('fixed');
        // } else {
        //     $penCont.classList.remove('fixed');
        // }
    }
}