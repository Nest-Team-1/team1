const $box = document.querySelectorAll('.box');

const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => {
       console.log(`hello`);
       entry.target.classList.toggle("show" , entry.isIntersecting)
   });
},{
    threshold: .1,
    
});

$box.forEach(box => {
    observer.observe(box);
});

