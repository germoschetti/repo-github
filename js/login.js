
     function validar() {
        var i = document.getElementById("user").value;
        var contenido = "";
        if (i == "" || i == null || i.includes("@") == false ) {
  
            contenido+=`
            <p class = "pError">Debe ingresa un correo </p>
            `
            document.getElementById("errorU").innerHTML = contenido
            return false
         } else{
            contenido +=`
            <p><p>
            `
            document.getElementById("errorU").innerHTML = contenido;
         }

  
  
         var j = document.getElementById("pass").value;
         var contenido2 = "";
        if (j == "" || j == null ) {
  
        contenido2+=`
        <p class="pError">Debe ingresar una contraseña </p>
        `
        document.getElementById("errorP").innerHTML = contenido2;
        return false;
        } 
        return true
     }
        
        function enviar (){
            if(validar() == false) {
                 validar();
                  }else{
                sessionStorage.setItem("sesionIniciada", "true")
                location.href="index.html"          
              
            }
        }

        //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
 
});
