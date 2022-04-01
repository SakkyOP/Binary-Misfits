
var loader = document.getElementById('loader');
var body = document.getElementById('body');
var aboutgame = document.getElementById('gamecard-z');
var back = document.getElementById('backtotop');

back.style.display = "none";
aboutgame.style.display = "none";

window.addEventListener("load", function() { setTimeout(function(){
    back.style.display = "flex";
    aboutgame.style.display = "flex";
    loader.style.display = "none";
    body.style.overflow = "auto";
},2000);
});

window.addEventListener("resize", ()=>{
    if(window.innerWidth < 991){
        aboutgame.style.display = "none";
    }
    else{
        aboutgame.style.display = "flex";
    }
});