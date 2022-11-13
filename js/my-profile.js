let inputUserMail = document.getElementById('e-mailUser');
let inputUserPrimerNombre = document.getElementById('primerNombreUser');
let inputUserSegundoNombre = document.getElementById('segundoNombreUser');
let inputUserPrimerApellido = document.getElementById('primerApellidoUser');
let inputUserSegundoApellido = document.getElementById('segundoApellidoUser');
let inputUserCelular = document.getElementById('celularUser');
let currentUserMail = localStorage.getItem('userMail');
let usersList = JSON.parse(localStorage.getItem('usersList'));
let currentUser = {
    primerNombre : "",
    segundoNombre : "",
    primerApellido : "",
    segundoApellido : "",
    eMail : currentUserMail,
    celular : "",
}

if(usersList.some(user => user.eMail == currentUserMail)){
    let user = usersList.find(user => user.eMail == currentUserMail);
    currentUser = user;
}

inputUserMail.value = currentUser.eMail;
inputUserPrimerNombre.value = currentUser.primerNombre;
inputUserSegundoNombre.value = currentUser.segundoNombre;
inputUserPrimerApellido.value = currentUser.primerApellido;
inputUserSegundoApellido.value = currentUser.segundoApellido;
inputUserCelular.value = currentUser.celular;

if(localStorage.getItem("usersList") == null){
    usersList = [];
} else{
    usersList = JSON.parse(localStorage.getItem("usersList"));
}



/* document.addEventListener("DOMContentLoaded", function(e){

    if(!(usersList.some(user => user.eMail == userToAdd.data.id))){
        usersList.push(userToAdd);
        localStorage.setItem('usersList', JSON.stringify(usersList));
    }

}) */

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            currentUser.primerNombre = document.getElementById('primerNombreUser').value;
            console.log(document.getElementById('primerNombreUser').value);
            currentUser.celular = document.getElementById('celularUser').value;
            currentUser.segundoNombre = document.getElementById('segundoNombreUser').value;
            currentUser.primerApellido = document.getElementById('primerApellidoUser').value;
            currentUser.segundoApellido = document.getElementById('segundoApellidoUser').value;
  
            form.classList.add('was-validated')
            if(!(usersList.some(user => user.eMail == currentUser.eMail))){
                usersList.push(currentUser);
                localStorage.setItem('usersList', JSON.stringify(usersList));
            } else {
                let indexToModify = usersList.findIndex(user => user.eMail == currentUser.eMail);
                usersList.splice(indexToModify, 1, currentUser);
                localStorage.setItem('usersList', JSON.stringify(usersList));
            }

        }, false)
      })
  })()