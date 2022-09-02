//avance 01/09, uso localStorage y DOM manipulation para agregar el mail del usuario a un nav bar vacío en la página de inicio
let userMailBar = document.getElementById('userMail');
let userMail = localStorage.getItem('userMail');
userMailBar.innerHTML = `${userMail}`
localStorage.removeItem('userMail');
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});