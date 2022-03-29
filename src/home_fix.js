var hamburger = document.getElementById('hamburger');
var navUL = document.getElementById('nav-ul-mobile');
var mobile = document.getElementById('mobile');
var close = document.getElementById('close');

hamburger.addEventListener('click', () => {
    navUL.classList.toggle('show');
    mobile.classList.toggle('show');
});

close.addEventListener('click' , ()=> {
    navUL.classList.toggle('show');
    mobile.classList.toggle('show');
});

