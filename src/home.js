const hamburger = document.getElementById('hamburger');
const navUL = document.getElementById('nav-ul-mobile');
const mobile = document.getElementById('mobile');
const close = document.getElementById('close');

hamburger.addEventListener('click', () => {
    navUL.classList.toggle('show');
    mobile.classList.toggle('show');

});

close.addEventListener('click' , ()=> {
    navUL.classList.toggle('show');
    mobile.classList.toggle('show');
});

