
var loader = document.getElementById('loader');
var body = document.getElementById('body');
var btn = document.getElementById('backbtn');

console.log(btn);

window.addEventListener("load", function() { setTimeout(function(){
    btn.style.display= "flex";
    loader.style.display = "none";
    body.style.overflow = "auto";
},2000);
});