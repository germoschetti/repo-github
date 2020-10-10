var article = []
var cartContenido = "";

// CARGAR Y MOSTRAR CARRITO JSON

function cart() {
    var art = article.articles
    for (var i = 0; i < art.length; i++) {
        var cartArticle = art[i];

        cartContenido += `
        <a href="#" class="list-group-item list-group-item-action p-4  shadow-sm p-3 mb-5 bg-white rounded" >
        <div class="row my-auto">
        <div class="">
            <img src="` + cartArticle.src + `" alt="img" width ="40px" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between ">
                <h6 class="mb-1 col  my-auto">`+ cartArticle.name + `</h6>
                <div class="col"></div>
                <p class="mb-1 col ml-3  my-auto" >` + cartArticle.unitCost + ` ${cartArticle.currency} </p>
                 <div class="col-2">
                <input class="form-control cantidad" type="number" placeholder="1" value = "${cartArticle.count}" onkeyup = 'subtotal( this.value, ${cartArticle.unitCost}, ${i}, "` + cartArticle.currency + `")' onchange = 'subtotal( this.value, ${cartArticle.unitCost}, ${i}, "` + cartArticle.currency + `")' >
              </div> 
            <p class="col my-auto row justify-content-center total" name ='${cartArticle.currency}' > </p>
            </div>            
        </div>
    </div>
    </a>
 `
        arrays(cartArticle.count, cartArticle.unitCost, cartArticle.currency)
    }
    document.getElementById('cart').innerHTML += cartContenido;
    document.getElementById('cart').innerHTML += `<button class="btn btn-primary my-2" type='submite' onclick="navegation()"> Confirmar Compra </button>`;

    pintarResultado(array)
}



var array = [];
var arrayDolar = [];
var arrayPesos = [];
// FUNCION QUE CALCULA EL TOTAL UNITARIO Y LO AGREGA A UNA LISTA, EJECUTA FUNCIONES DE COTIZACION

function arrays(cantidad, precio, currency) {
    var result = cantidad * precio
    array.push(result)
    console.log(array)
    pasaraDolares(result, currency)
    pasaraPesos(result, currency)
}

//PASO TODO CADA PRECIO A DOLARES

var sumaDolares = 0;
function pasaraDolares(precio, currency) {
    if (currency == 'USD') {
        arrayDolar.push(precio)
    } else {
        var convertir = precio / 40
        arrayDolar.push(convertir);
    }
    for (var i = 0; i < arrayDolar.length; i++) {
        sumaDolares += arrayDolar[i]
    }
    document.getElementById('subtotalUSD').innerHTML = sumaDolares;
}

//PASO CADA PRECIO A PESOS y los sumo


var sumaPesos = 0;
function pasaraPesos(precio, currency) {
    if (currency == 'UYU') {
        arrayPesos.push(precio)
    } else {
        var convertir = precio * 40
        arrayPesos.push(convertir);
        for (var i = 0; i < arrayPesos.length; i++) {
            sumaPesos += arrayPesos[i]
        }

        document.getElementById('subtotalUYU').innerHTML = sumaPesos;
    }
}

// CALCULAR Y PINTAR EL PRECIO TOTAL DE CADA PRODUCTO EN BASE A LA CANTIDAD DE PRODUCTOS

function subtotal(cantidad, precio, i) {
    var parrafo = document.getElementsByClassName('total');
    var result = cantidad * precio
    parrafo[i].innerHTML = result
    parrafo[i].setAttribute('value', result)
    // sumar();
    document.getElementById('subtotalUYU').innerHTML = sumaPesos;
}


//PINTAR EL RESULTADO DEL SUBTOTAL DE TODO EL CARRITO
function pintarResultado(array) {
    var parrafoUnitario = document.getElementsByClassName('total');
    for (var i = 0; i < array.length; i++) {
        parrafoUnitario[i].innerHTML = array[i]
        parrafoUnitario[i].setAttribute('value', array[i])
    }
}


//VARIABLE CON EL CONTENIDO DE METODO DE ENVIO
var envioContent = '';
envioContent += `  
<form>
<div class="container "> 
<label for="departamento" class="col-3 mt-2"><strong>Departamento:</strong></label> 
<select name="departamento" id="departamento" style='heigt="5px"'>
  <option selected value="opciones">Seleccionar</option>
  <option value="Artigas">Artigas</option>
  <option value="Canelones">Canelones</option>
  <option value="Cerro Largo">Cerro Largo</option>
  <option value="Cerro Largo">Colonia</option>
  <option value="Cerro Largo">Durazno</option>
  <option value="Cerro Largo">Flores</option>
  <option value="Cerro Largo">Florida</option>
  <option value="Cerro Largo">Lavalleja</option>
  <option value="Cerro Largo">Maldonado</option>
  <option value="Cerro Largo">Montevideo</option>
  <option value="Cerro Largo">Paysandu</option>
  <option value="Cerro Largo">Río Negro</option>
  <option value="Cerro Largo">Rocha</option>
  <option value="Cerro Largo">Salto</option>
  <option value="Cerro Largo">San José</option>
  <option value="Cerro Largo">Soriano</option>
  <option value="Cerro Largo">Tacuarembo</option>
  <option value="Cerro Largo">Treinta y tres</option>
</select> <br>

<label for="envioType" class="col-3"><strong>Tipo de envío:</strong></label> 
<select name="envioType" id="envioType" style='heigt="5px"'>
  <option selected value="opciones">Seleccionar</option>
  <option value="estandar">Estándar</option>
  <option value="premium">Premium</option>
  <option value="gold">Gold</option>
</select> <br>

<label class="col-3 "for="ciudad"><strong>Ciudad:</strong></label>
<input type="text" class="mb-2" placeholder="Ciudad"> <br>

<label for="direccion" class="col-3"> <strong>Indica tu direccion:</strong></label> 
<input type="text" placeholder="Barrio"> <br>
<label class='col-3'></label>
<textarea class="col-3" name="direccion" id="" cols="30" rows="2" placeholder="Dirección completa"></textarea><br>
<br>
<label class="col-3" for="postal"><strong>Código postal:</strong></label>
<input type="number"><br>
<div class="row mt-4">
<button type="submite" class="btn btn-primary" onclick="navegationPago()">Confirmar metodo de envio</button>
<div class="col"></div>
<button type="submit" class="btn btn-danger w-2 row justify-content-end mr-3" onclick="volverCarrito()" >Volver al carrito</button>
</div>
</form>
`
//VARIABLE CON EL CONTENIDO DE METODO DE PAGO
var pagoContent = `
<div class="container mt-5"> 
<form>
<label class="col-3"><strong>Tú metodo de pago</strong></label>
<select name="metodoPago" id="metodoPago">
  <option value="0">Tarjeta de crédito o débito</option>
  <option value="1">Tramsferemcia bancaria</option>
</select><br>

<label for="numberCard" class="col-3"><strong>Numero de tarjeta</strong></label>
<input type="number" id="numberCard"><br>

<label class="col-3" for="vencMonth"><strong>Mes de caducidad</strong></label>
<input type="number" id="vencMonth"><br>

<label class="col-3" for="vencYear"><strong>Año de caducidad</strong></label>
<input type="number" id="vencYear"><br>
<label class="col-3" for="nameTitular"><strong>Nombre</strong></label>
<input type="text" id="nameTitular"><br>
<label class="col-3" for="apellidoTitular"><strong>Apellidos</strong></label>
<input type="text" name="apellidoTitular" id="apellidoTitular"><br>
<div class="row mt-4">
<button type="button" class="btn btn-primary col-2" onclick="finalizarCompra()">Finalizar Compra</button>
<div class="col"></div>
<button type="submit" class="btn btn-danger col-2 row justify-content-end mr-3" onclick="volverEnvio()">Volver</button>
</div>

</form>
</div>
`
var contenido = ` <div class="container row my-auto">
<p class="w-5 ml-5"></p>
<p class="col ml-5 my-auto">
  Producto
</p>
<p class="col ml-5 my-auto"></p>
<p class="col ml-2 my-auto">
  Precio unitario
</p>
<p class="col my-auto row justify-content-center">
  Cantidad
</p>
<p class="col mr-2 my-auto row justify-content-end ">
  Total
</p>
</div>
<hr />`


//FUNCIONES PARA NAVEGAR, ENTRE CARRITO, METODOS DE ENVIO Y METODO DE PAGO



function volverCarrito() {
    document.getElementById('nav1').className = 'checked'
    document.getElementById('nav2').className = 'mx-5'
    document.getElementById('envio').style.display = 'none'
    document.getElementById('carritoDetails').innerHTML = contenido
    document.getElementById('carritoDetails').innerHTML += cartContenido
    document.getElementById('carritoDetails').style.display = "block"
    document.getElementById('carritoDetails').innerHTML += `<button class="btn btn-primary my-2" type='submite' onclick="navegation()"> Confirmar Compra </button>`;
    pintarResultado(array)
}
function navegation() {
    document.getElementById('nav1').className = 'none'
    document.getElementById('envio').style.display = 'block'
    document.getElementById('nav2').className = 'mx-5 checked'
    document.getElementById('carritoDetails').innerHTML = envioContent
    document.getElementById('carritoDetails').style.display = "block"
}

function navegationPago() {
    document.getElementById('envio').style.display = 'none'
    document.getElementById('nav2').className = 'mx-5'
    document.getElementById('pago').style.display = 'block'
    document.getElementById('nav3').className = 'checked'
    document.getElementById('carritoDetails').innerHTML = pagoContent
    document.getElementById('carritoDetails').style.display = "block"
}

function finalizarCompra() {
    window.location = "index.html"
    alert("Su compra ha sido completada con éxito!")
}


function volverEnvio() {
    document.getElementById('pago').style.display = 'block'

    document.getElementById('nav2').className = 'checked mx-5'
    document.getElementById('nav3').className = 'none'
    document.getElementById('pago').style.display = 'none'
    document.getElementById('carritoDetails').innerHTML = envioContent
    document.getElementById('carritoDetails').style.display = "block"
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            article = resultObj.data;
            //Muestro las categorías ordenadas
            cart(article)

        }
    });
});
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
