const section = document.querySelector('section');

const options = {
  threshold:0  
};

const observer = new IntersectionObserver(
    function(entries , observer){
        entries.forEach(entry => {
            console.log(entry);
        });
} , options);

observer.observe(section);