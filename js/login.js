let miFormulario = document.getElementById('mi-formulario');

miFormulario.addEventListener('submit', function(evento){
    let loginMail = document.getElementById('loginMail');
    let loginPassword = document.getElementById('loginPassword');
    evento.preventDefault();

    if ((loginMail.value).length > 0 && (loginPassword.value).length > 0) {
        evento.preventDefault();
        window.location.href = 'index.html';
        //avance 01/09, guardo en localStorage el mail del usuario para usar luego en la página inicial
        localStorage.setItem('userMail', `${loginMail.value}`);
    } else if (!((loginMail.value).length > 0) && !(loginPassword.value).length > 0){
        evento.preventDefault();
        document.getElementById("invalidMail").innerHTML = '<p style="color:red">Ingrese un mail por favor</p>';
        document.getElementById("invalidPassword").innerHTML = '<p style="color:red">Ingrese una contraseña por favor</p>';
    } else if (!(loginMail.value).length > 0){
        evento.preventDefault();
        document.getElementById("invalidMail").innerHTML = '<p style="color:red">Ingrese un mail por favor</p>';
        document.getElementById("invalidPassword").innerHTML = ''
    } else if (!(loginPassword.value).length > 0){
        evento.preventDefault();
        document.getElementById("invalidMail").innerHTML = ''
        document.getElementById("invalidPassword").innerHTML = '<p style="color:red">Ingrese una contraseña por favor</p>';
    }
});