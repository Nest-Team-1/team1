const $blocks = document.querySelectorAll('.block');
// const $sticky = document.querySelector('.sticky');
const $haha = document.querySelector('.haha');

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

    const fixedParentY = $haha.closest('.block').offsetTop;
    console.log('blockY:' + fixedParentY, 'windowScroll:' + window.scrollY, 'wH: ' + windowHeight);
    if (windowBottomY - windowHeight / 2 - window.scrollY) {;
        console.log(windowBottomY - windowHeight / 2 - window.scrollY);
        const a = windowBottomY - windowHeight / 2 - fixedParentY;
        const $left = $haha.querySelector('.left');
        const $right = $haha.querySelector('.right');
        $left.style.transform = `translateX(-${a}px)`;
        $right.style.transform = `translateX(${a}px)`;
        if (window.scrollY > fixedParentY) {
            $haha.classList.add('fixed');
        } else {
            $haha.classList.remove('fixed');
        }
    }
}