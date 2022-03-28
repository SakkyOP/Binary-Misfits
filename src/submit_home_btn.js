var btn = document.getElementById('submit');
btn.style.cursor = "pointer";

btn.addEventListener('click', () => {
    alert("Thank You!");
    document.getElementById('home-email-field').value = '';
});