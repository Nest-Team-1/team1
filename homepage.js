const $backImg = document.querySelector('.container');

window.onscroll = (e) => {
    console.log(window.scrollY);
    $backImg.style.backgroundSize = `${100+window.scrollY}%`
        // $backImg.style.transform = `scale(${100+window.scrollY}%)`
        // $backImg.style.transform = `${50, 84}%`
        // transform-origin: 50% 84%;
}