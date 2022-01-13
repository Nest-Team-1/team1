const $blocks = document.querySelectorAll('.block');
// const $sticky = document.querySelector('.sticky');
const $penCont = document.querySelector('.penCont');
const $ab = document.querySelector('.about');

const TOP_GAP = 250;

window.onscroll = (e) => {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
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
    // if (windowBottomY - windowHeight / 2 - fixedParentY >= -windowHeight && window.scrollY < windowHeight * 1.3) {;
    if (windowBottomY - windowHeight / 2 - fixedParentY >= -windowHeight && windowBottomY - windowHeight / 2 - fixedParentY < windowWidth * 0.4) {;
        console.log(windowBottomY - windowHeight / 2 - fixedParentY);
        const a = windowBottomY - windowHeight / 2 - fixedParentY;
        const $left = $penCont.querySelector('.left');
        const $right = $penCont.querySelector('.right');
        // $left.style.transform = `rotateZ( -${a}deg)`
        $left.style.transform = `translateX(-${a}px)`;
        $right.style.transform = `translateX(${a}px)`;
        // $ab.style.fontSize = `${window.scrollY / 50}px`
        // if (windowBottomY - windowHeight / 2 - fixedParentY < windowWidth * 0.4) {
        //     $penCont.classList.add('fixed');
        // } else {
        //     $penCont.classList.remove('fixed');
        // }
    }
}