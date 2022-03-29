var hamburger = document.getElementById('hamburger');
var navUL = document.getElementById('nav-ul-mobile');
var mobile = document.getElementById('mobile');
var close = document.getElementById('close');
var body = document.getElementById('body');

hamburger.addEventListener('click', () => {
    body.style.overflow = "hidden";
    navUL.classList.toggle('show');
    mobile.classList.toggle('show');
});

close.addEventListener('click' , ()=> {
    navUL.classList.toggle('show');
    mobile.classList.toggle('show');
    body.style.overflow = "auto";
});

