//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function editar() {
  var name = $('#nombre').val()
  var lastName = $('#apellido').val();
  var sex = $('#sexo').val();
  var mail = $('#email').val();
  var edad = $('#edad').val();
  var cel = $('#cel').val();
  var err = document.getElementById('infoErr');
  var obj = []
  obj = localStorage.getItem('Usuario');
  var personalInformation = [{
    name: name,
    lastName: lastName,
    sex: sex,
    mail: mail,
    edad: edad,
    cel: cel
  }];

  localStorage.setItem('persona', JSON.stringify(personalInformation))
  var myInformation = JSON.parse(localStorage.getItem('persona'))
  if( name == '' && lastName == '' && sex == '' && mail == '' && edad == '' && cel == '' ){
    
    err.style.display = 'block'
    err.innerHTML = 'Debe completar por lo menos un campo'
    err.className = 'col row justify-content-start alert-danger p-2 pl-3 rounded';
  }
    else{
    err.style.display = 'none'
  imprimir(myInformation)
  $('#modal').modal('hide');

}


  if (localStorage.getItem('imgData')) {
    var dataImage = localStorage.getItem('imgData');
    bannerImg = document.getElementById('perfilImg');
    bannerImg.src = "data:image/png;base64," + dataImage;
  }

}


function imprimir(obj) {

  content = '';
  if (obj == null) {
    content += `
      <div>
      <div class=" container my-5 "><h2 class="col row justify-content-center">Mi perfil</h2></div>
        <div class="container col-lg-8 col-md-8 col-sm-12 rounded shadow" style="border: 1px solid #ccc;">
          <h4 class="row justify-content-center pt-5 pb-3">Información personal</h4>
          <br>

          <div class="row justify-content-center mb-4">
    <div class="col-lg-2 col-sm-5 col-md-3 ">
            <img class="rounded" id='perfilImg' src="img/perfil.jpg" data-toggle="modal" data-target="#modalImg"  width="100%" style="border: 1px solid; cursor: pointer;" alt="perfil">
           </div>
          </div>
        <hr>

        <div class="col-9 ml-auto row justify-content-center editProfile">
        <div class="col-lg-6 col-md-6 col-sm-12" > <p>Usuario</p> </div>
        <div class="col-lg-6 col-md-6 col-sm-12"><p>${localStorage.getItem('Usuario')}</p></div>
        </div>
   
        <hr>

        <div class="col-9 ml-auto row justify-content-center editProfile">
        <div class="col-lg-6 col-md-6 col-sm-12" > <p>Nombre</p> </div>
        <div class="col-lg-6 col-md-6 col-sm-12"><p>-----</p></div>
        </div>
   
        <hr>

        <div class="col-9 ml-auto row justify-content-center editProfile">
        <div class="col-lg-6 col-md-6 col-sm-12"> <p>Apellido</p></div>
        <div class="col-lg-6 col-md-6 col-sm-12"> <p>-----</p></div>
        </div>

        <hr>

        <div class="col-9 ml-auto row justify-content-center editProfile">
        <div class="col-lg-6  col-md-6 col-sm-12"> <p>Edad</p></div>
        <div class="col-lg-6 col-md-6 col-sm-12"> <p>-----</p></div>
        </div>
      <hr>
        
        <div class="col-9 ml-auto row justify-content-center editProfile">
          <div class="col-lg-6 col-md-6 col-sm-12"> <p>Sexo</p></div>
          <div class="col-lg-6 col-md-6 col-sm-12 "> <p>-----</p></div>
        
        </div>

        <hr>
    
        <div class="col-9 ml-auto row justify-content-center editProfile">
          <div class="col-lg-6 col-md-6 col-sm-12"> <p>Celular</p></div>
          <div class="col-lg-6 col-md-6 col-sm-12"> <p>-----</p></div>
        </div>
        
        <hr>

        <div class="col-9 ml-auto row justify-content-center editProfile">
          <div class="col-lg-6  col-md-6 col-sm-12"> <p>E-mail</p></div>
          <div class="col-lg-6 col-md-6 col-sm-12"> <p>-----</p></div>
        </div>
        
        <hr>
        <button type="button" class="btn btn-outline-success col-lg-12 my-2 p-3" data-toggle="modal" data-target = "#modal">Editar Informacion personal</button>
      </div>
    
    </div>
  `
    document.getElementById('contenidoP').innerHTML = content;
  } else {
    for (let i = 0; i < obj.length; i++) {
      var data = obj[i];

      content += `
        <div>
        <div class=" container my-5 "><h2 class="col row justify-content-center">Mi perfil</h2></div>
    
    
          <div class="container col-lg-8 col-md-8 col-sm-12 rounded shadow" style="border: 1px solid #ccc;">
         
            <h4 class="row justify-content-center pt-5 pb-3">Información personal</h4>
            <br>
         

          <div class="row justify-content-center">
          <div class="col-lg-2 col-sm-5 col-md-3 ">
                  <img class="rounded" id='perfilImg' src="img/perfil.jpg" width="100%" data-toggle="modal" data-target="#modalImg" style="border: 1px solid; cursor: pointer;" alt="perfil">
                 </div>
                </div>
    <hr>

    <div class="col-9 ml-auto row justify-content-center editProfile">
    <div class="col-lg-6 col-md-6 col-sm-12" > <p>Usuario</p> </div>
    <div class="col-lg-6 col-md-6 col-sm-12"><p>${localStorage.getItem('Usuario')}</p></div>
    </div>

    <hr>

          <div class="col-9 ml-auto row justify-content-center editProfile">
           <div class="col-lg-6 col-md-6 col-sm-12" > <p>Nombre</p> </div>
           <div class="col-lg-6 col-md-6 col-sm-12"><p>${data.name}</p></div>
          </div>

          <hr>
    
          <div class="col-9 ml-auto row justify-content-center editProfile">
           <div class="col-lg-6 col-md-6 col-sm-12"> <p>Apellido</p></div>
           <div class="col-lg-6 col-md-6 col-sm-12"> <p>${data.lastName}</p></div>
          </div>
    
           <hr>

           <div class="col-9 ml-auto row justify-content-center editProfile">
            <div class="col-lg-6 col-md-6 col-sm-12"> <p>Edad</p></div>
            <div class="col-lg-6 col-md-6 col-sm-12 "> <p>${data.edad}</p></div>
           
          </div>
    
           <hr>
           
           <div class="col-9 ml-auto row justify-content-center editProfile">
            <div class="col-lg-6 col-md-6 col-sm-12"> <p>Sexo</p></div>
            <div class="col-lg-6 col-md-6 col-sm-12 "> <p>${data.sex}</p></div>
           
          </div>
    
           <hr>
      
           <div class="col-9 ml-auto row justify-content-center editProfile">
            <div class="col-lg-6 col-md-6 col-sm-12"> <p>Celular</p></div>
            <div class="col-lg-6 col-md-6 col-sm-12"> <p>${data.cel}</p></div>
           </div>
          
           <hr>
    
           <div class="col-9 ml-auto row justify-content-center editProfile">
            <div class="col-lg-6  col-md-6 col-sm-12"> <p>E-mail</p></div>
            <div class="col-lg-6 col-md-6 col-sm-12"> <p>${data.mail}</p></div>
           </div>
          
           <hr>
           <button type="button" class="btn btn-outline-success col-lg-12 my-2 p-3" data-toggle="modal" data-target = "#modal">Editar Informacion personal</button>
        </div>
       
      </div>
      `
      let name = document.getElementById('nombre');
      let lastName = document.getElementById('apellido');
      let sex = document.getElementById('sex');
      let mail = document.getElementById('email');
      let edad = document.getElementById('edad');
      let cel = document.getElementById('cel');
    
      name.setAttribute('value', data.name);
      lastName.setAttribute('value', data.lastName);
      sex.setAttribute('value', data.sex);
      mail.setAttribute('value', data.mail);
      edad.setAttribute('value', data.edad);
      cel.setAttribute('value', data.cel);
    
    }

    document.getElementById('contenidoP').innerHTML = content;
  
  }
}

function validation(){
  if( name != '' && lastName != '' && sex != '' && mail != '' && edad != '' && cel != ''){
    imprint(obj)
  }else{
    alert('Debe completar al menos un campo');
  }
}


// CARGAR IMAGEN
function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        // Render thumbnail.
        var span = document.createElement('span');
        span.innerHTML = ['<img id="imgload" class="thumb" src="', e.target.result,
          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(span, null);
      };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);



function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width; canvas.height = img.height;
  var ctx = canvas.getContext("2d"); ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function guardar() {
  bannerImage = document.getElementById('imgload');
  imgData = getBase64Image(bannerImage);
  localStorage.setItem("imgData", imgData);
  var dataImage = localStorage.getItem('imgData');
  bannerImg = document.getElementById('perfilImg');
  bannerImg.src = "data:image/png;base64," + dataImage;
  showSpinner();
  $('#modalImg').hide();

  location.reload();
}

// MOSTRAR IMAGEN 

document.addEventListener("DOMContentLoaded", function (e) {

  imprimir(JSON.parse(localStorage.getItem('persona')))

  if (localStorage.getItem('imgData')) {
    var dataImage = localStorage.getItem('imgData');
    bannerImg = document.getElementById('perfilImg');
    bannerImg.src = "data:image/png;base64," + dataImage;
  }

});