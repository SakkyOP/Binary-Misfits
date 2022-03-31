

export default function responsiveCanvas(canvas){
    
    // window.addEventListener("load",()=>{
    //     if (document.body.scrollWidth <= 1024 || document.body.scrollHeight <= 567 ){
    //         canvas.setAttribute("width","450");
    //         canvas.setAttribute("height","800");
            
    //     } else {
    //         canvas.setAttribute("width","800");
    //         canvas.setAttribute("height","450");
    //     }
    // });

    window.addEventListener("resize",()=>{
        if (document.body.scrollWidth <= 1024 || document.body.scrollHeight <= 567 ){
            canvas.setAttribute("width","450");
            canvas.setAttribute("height","800");
            
        } else {
            canvas.setAttribute("width","800");
            canvas.setAttribute("height","450");
        }
    });

    if (document.body.scrollWidth <= 1024 || document.body.scrollHeight <= 567 ){
        canvas.setAttribute("width","450");
        canvas.setAttribute("height","800");
        
    } else {
        canvas.setAttribute("width","800");
        canvas.setAttribute("height","450");
    }
}