var modelo = [];
const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString)
const product = urlParams.get('id')
 

function productsInfo() {
for(var h = 0; h < modelo.length; h++){
    var producto = modelo[h]
    
    if(product == producto.name){
    var contenido = "";
    contenido += `
            <div class = "container-fluid p-5">
            
                <div class="row col-md-12">
                            <div class="col-md-6 p-5" style="height: 600px" >
                                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                <div class="carousel-item active ">
                                    <img class="d-block w-100" src="${producto.images[0]}" alt="First slide">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="${producto.images[1]}" alt="Second slide">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="${producto.images[2]}" alt="Third slide">
                                </div>
                                <div class="carousel-item">
                                <img class="d-block w-100" src="${producto.images[3]}" alt="Third slide">
                            </div>
                            <div class="carousel-item">
                            <img class="d-block w-100" src="${producto.images[4]}" alt="Third slide">
                            </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                                </a>
                                                              
                            </div> 
                            </div>
                            <div class="col-md-5 p-4"> 
                            <div ><h1>${producto.name}</h1></div>
                                <div class="row p-2">
                                    <h3> ${producto.currency}${producto.cost}</h3>
                                    
                                </div></br>
                                <div class=""><button type="button" class="btn btn-dark btn-lg p-2"> Agregar al carrito</button></div>
                                </br>
                                <div><p  style="font-size = 15%;"> ${producto.description} </p></div>
                                
                    </div>     
            </div>
        `
    }
}
    document.getElementById("info").innerHTML = contenido
}

//COMENTARIOS DESDE JSON 
//ARREGLAR PUNTUACION CON ESTRELLAS 
var comentarios = [];
function mostrarComent() {
    contenido = '';
    for (var i = 0; i < comentarios.length; i++) {
        var coment = comentarios[i]
        contenido += `
       
        <div class = " container p-2 list-group-item list-group-item-action>
                <div class=" row  "> 
                	 <div class=" row col-md-12 " style="height: 20px">
                         <div class="h-25 d-inline-block col-md-10 m-0"> <h6><strong>${coment.user}</strong></h6> </div>
                         <div><p>${coment.dateTime}</p></div>
                     </div>
                     <div id="${coment.user}" class = ' comentJson '>
                     </div>
                    <p class="parrafo pt-2">${coment.description}</p>
        </div>
            
        </div>
        
    `
        document.getElementById("coment").innerHTML = contenido

        var puntos = document.getElementsByClassName('comentJson');
        for (var j = 0; j < puntos.length; j++) {

            if (j <= (puntos.length)) {
                var punto = comentarios[j]
                for (var k = 0; k < punto.score; k++) {

                    var span = document.createElement('span');
                    puntos[j].appendChild(span);
                    span.className = 'fa fa-star checked';
                }
            }
        }
    }
}

//PUNTUACION CON ESTRELLAS DE CAJA DE COMENTARIOS

function calificar(num) {
    var star = document.getElementsByName('calificar')
    for (var j = 0; j < star.length; j++) {
        if (j < num) {
            star[j].className = "fa fa-star checked"
        } else {
            star[j].className = "fa fa-star"
        }

    }
    document.getElementById('score').value = num
}

//VALIDACION DE CAMPOS DE COMENTARIOS

function validarComents() {
    var date = new Date();
    var textarea = document.getElementById("textarea").value;
    var errorTxt = document.getElementById("error");
    var score = document.getElementById("score").value
    var errorScore = document.getElementById('errorScore')
    errorTxt.innerHTML = '';
    errorScore.innerHTML = '';

    if ((textarea == "") || (score == "")) {
        if (textarea == '') {
            errorTxt.innerHTML += "Debe escribir algo en la caja de comentario"
            errorTxt.className = " my-2 alert-danger p-2 rounded "
        } else {
            errorTxt.innerHTML = ""
            errorTxt.className = ""
        }
        if (score == "") {
            errorScore.innerHTML += "Debe seleccionar una calificacón para el producto"
            errorScore.className = "my-0 alert-danger p-1 rounded"
        } else {
            errorScore.innerHTML = ""
            errorScore.className = ""
        }
    } else {
        if(sessionStorage.getItem("google")){
        var usuario = sessionStorage.getItem("google")
        //var nameUser = usuario.indexOf("@")
        //var name = usuario.slice(0,nameUser);
        errorScore.className = ""
        errorTxt.innerHTML += ` <strong>${usuario}</strong> ` + " su comentario se ha enviado con éxito"
        errorTxt.className = " my-2 alert-success p-2 rounded"
        setTimeout(function(){  
             errorTxt.innerHTML = "";
            errorTxt.className = ""; 
     }, 2500)
        
       
        var content = '';
        content +=
            `
            <div class = " container p-2 list-group-item list-group-item-action>
            <div class=" row  "> 
                 <div class=" row col-md-12 " style="height: 20px">
                     <div class="h-25 d-inline-block col-md-10 m-0"> <h6><strong>${usuario}</strong></h6> </div>
                     <div><p> ${ date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}</p></div>
                 </div>
                 <div id="${coment.user}" class = 'comentario'>
                 </div>
                <p class="parrafo pt-2">${textarea}</p>
    </div>
        
    </div>


    `
    document.getElementById("coment").innerHTML += content
        }else{
            var usuariolocal = sessionStorage.getItem("Usuario")
            //var nameUser = usuario.indexOf("@")
            //var name = usuario.slice(0,nameUser);
            errorScore.className = ""
            errorTxt.innerHTML += ` <strong>${usuariolocal}</strong> ` + " su comentario se ha enviado con éxito"
            errorTxt.className = " my-2 alert-success p-2 rounded"
            setTimeout(function(){  
                 errorTxt.innerHTML = "";
                errorTxt.className = ""; 
         }, 2500)
            
           
            var content = '';
            content +=
                `
                <div class = " container p-2 list-group-item list-group-item-action>
                <div class=" row  "> 
                     <div class=" row col-md-12 " style="height: 20px">
                         <div class="h-25 d-inline-block col-md-10 m-0"> <h6><strong>${usuariolocal}</strong></h6> </div>
                         <div><p> ${ date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}</p></div>
                     </div>
                     <div id="${coment.user}" class = 'comentario'>
                     </div>
                    <p class="parrafo pt-2">${textarea}</p>
        </div>
            
        </div>
    
    
        `
        document.getElementById("coment").innerHTML += content

        }
    

        // AGREGAR ESTRELLAS A COMENTARIOS
        if (textarea != '' || score !== '') {
            var array = document.getElementsByClassName('comentario');
            for (var j = 0; j < array.length; j++) {

                if (j + 1 == (array.length)) {
                    for (var k = 0; k < score; k++) {

                        var span = document.createElement('span');
                        array[j].appendChild(span);
                        span.className = 'fa fa-star checked';
                    }
                }
            }
        }
    }
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTOSSS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            modelo = resultObj.data;
            //Muestro las categorías ordenadas
            productsInfo(modelo)
        }
    });
});

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            //Muestro las categorías ordenadas
            mostrarComent(comentarios)
        }
    });
});



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

/*var d = new Date();
alert(d.getDate()+ '/' + d.getMonth() + '/'+ d.getFullYear()+' '+d.getHours()+':'+ d.getMinutes())*/