//VALIDACION DE CAMPOS CON BOTON
function validar() {
   var i = document.getElementById("user").value;
   var contenido = "";
   if (i == "" || i == null || i.includes("@") == false) {

      contenido += `
            <p class = "pError"> Debe ingresa un correo </p>
            `
      document.getElementById("errorU").innerHTML = contenido
      return false
   } if (i.length < 8) {
      contenido += `
            <p class = "pError"> Debe contener 8 caracteres como minimo </p>
            `
      document.getElementById("errorU").innerHTML = contenido
      return false
   }
   else {
      contenido += `
            <p><p>
            `
      document.getElementById("errorU").innerHTML = contenido;
   }
   var j = document.getElementById("pass").value;
   var contenido2 = "";
   if (j == "" || j == null) {

      contenido2 += `
        <p class="pError">Debe ingresar una contraseña </p>
        `
      document.getElementById("errorP").innerHTML = contenido2;
      return false;
   }
   return true
}

function enviar() {
   var user = document.getElementById("user").value
   if (validar() == false) {
      validar();
   } else {
      sessionStorage.setItem("Usuario", user)
      location.href = "index.html"
   }
}

//FUNCION QUE IMPRIME NOMBRE DE USUARIO
document.addEventListener('DOMContentLoaded', () => {
   content1 = "";
   if (sessionStorage.getItem("Usuario")) {
      content1 += `
          <img src ="img/usuario2.gif" width = 19px>
             ${sessionStorage.getItem("Usuario")}

             `
      document.getElementsByClassName("usuario")[0].innerHTML = content1
      return true
   } 
});


function onSignIn(googleUser) {
   var profile = googleUser.getBasicProfile();
   sessionStorage.setItem("google", getName())
   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
   console.log('Name: ' + profile.getName());
   console.log('Image URL: ' + profile.getImageUrl());
   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
   var id_token = googleUser . getAuthResponse (). id_token ;
   console.log(id_token)
   window.location.href = "index.html";
      
 }

 function signOut() {
   var auth2 = gapi.auth2.getAuthInstance();
   auth2.signOut().then(function () {
     console.log('User signed out.');
     sessionStorage.clear();
   });
 }

var salir = document.getElementById("salir")
salir.addEventListener('click', function(e){
   sessionStorage.clear();
})



 

