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
     // sessionStorage.setItem("Usuario", user)
      localStorage.setItem("Usuario", user);
      location.href = "index.html"
   }
}

//FUNCION QUE IMPRIME NOMBRE DE USUARIO

document.addEventListener('DOMContentLoaded', () => {
   content1 = "";
   if (localStorage.getItem("Usuario")) {
      content1 += `
          <img src ="img/usuario2.gif" width = 19px>
            ${localStorage.getItem("Usuario")}
             `
      document.getElementsByClassName("usuario")[0].innerHTML = content1
      return true
   }  else if (localStorage.getItem("google")){
      content1 += `
            <img src ="img/usuario2.gif" width = 19px>
             ${localStorage.getItem("google")}
            
      `
      document.getElementsByClassName("usuario")[0].innerHTML = content1
   }
});


function onSignIn(googleUser) {

   // Useful data for your client-side scripts:
   var profile = googleUser.getBasicProfile();
   console.log("ID: " + profile.getId()); // Don't send this directly to your server!
   console.log('Given Name: ' + profile.getGivenName());
   console.log('Family Name: ' + profile.getFamilyName());
   console.log("Image URL: " + profile.getImageUrl());
   console.log("Email: " + profile.getEmail());

   // The ID token you need to pass to your backend:
   var id_token = googleUser.getAuthResponse().id_token;
   console.log("ID Token: " + id_token);

   localStorage.setItem('google', profile.getGivenName())
   location.href = "index.html"

}








