
var submitButton = document.getElementById("contact-submit");

submitButton.addEventListener("click",event=>{
    let [nameBox,emailBox,subjectBox,messageBox] = document.getElementsByClassName("textbox");
    let obj = {
        name : nameBox.value,
        email : emailBox.value,
        subject : subjectBox.value,
        message : messageBox.value  
    }
    console.log(obj);
    [...document.getElementsByClassName("textbox")].forEach(element => {
        element.value = "";
    });
    alert("Thank you");
});