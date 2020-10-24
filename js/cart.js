var article = []
var cartContenido = "";

// CARGAR Y MOSTRAR CARRITO JSON

function cart() {
    var art = article.articles
    for (var i = 0; i < art.length; i++) {
        var cartArticle = art[i];

        cartContenido += `
        
        <a href="#" class="list-group-item list-group-item-action p-4  shadow-sm p-3 mb-5 bg-white rounded " id= "${cartArticle.name}" style='display:block' >
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
                <input id='ulala' class="form-control cantidad" type="number" placeholder="1" value = "${cartArticle.count}"  min = '1' onkeyup = 'subtotal( this.value, ${cartArticle.unitCost}, ${i}, "` + cartArticle.currency + `")' onchange = 'subtotal( this.value, ${cartArticle.unitCost}, ${i}, "` + cartArticle.currency + `")' >
              </div> 
            <p class="col my-auto row justify-content-center total" name ='${cartArticle.currency}' > </p>
            
            <button class="bg-white " style='border: none' onclick = 'borrar("` + cartArticle.name + `"); subtotal( this.value, ${cartArticle.unitCost}, ${i}, "` + cartArticle.currency + `") ' >
            <i class="fa fa-trash p-2" aria-hidden="true" style='color : #B90A1F'   ></i>
              </button>
            </div>   
                  
        </div>
    </div>
    </a>
 `
        arrays(cartArticle.count, cartArticle.unitCost, cartArticle.currency);
    }

    document.getElementById('cart').innerHTML += cartContenido;
    document.getElementById('cart').innerHTML += `<button class="btn btn-primary my-2" type='submite' onclick="navegation() "> Confirmar Compra </button>`;

    pintarResultado(array);
}

function borrar(producto) {
    document.getElementById(producto).style.display = 'none';
}


var array = [];
var arrayDolar = [];
var arrayPesos = [];
// FUNCION QUE CALCULA EL TOTAL UNITARIO Y LO AGREGA A UNA LISTA, EJECUTA FUNCIONES DE COTIZACION

function arrays(cantidad, precio, currency) {
    var result = cantidad * precio
    array.push(result)
    pasaraDolares(result, currency)
    pasaraPesos(result, currency)

}

//PASO CADA PRECIO A DOLARES

var sumaDolares = 0;
function pasaraDolares(precio, currency) {
    if (currency == 'UYU') {
        var convertir = precio / 40
        arrayDolar.push(convertir);
    } else {
        arrayDolar.push(precio)
        for (var i = 0; i < arrayDolar.length; i++) {
            sumaDolares += arrayDolar[i]
        }
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

function subtotal(cantidad, precio, i,) {
    var parrafo = document.getElementsByClassName('total');
    var result = cantidad * precio
    parrafo[i].innerHTML = result
    parrafo[i].setAttribute('value', result);
    var arrayusd = document.getElementsByName("USD");
    var arrayuyu = document.getElementsByName("UYU");

    for (var j = 0; j < arrayuyu.length; j++) {
        var cotizarAusd = arrayuyu[j]
        var resultUsd = parseInt(cotizarAusd.innerHTML) / 40
        if (arrayusd.length !== 0) {
            for (var k = 0; k < arrayusd.length; k++) {
                document.getElementById('subtotalUSD').innerHTML = parseInt(arrayusd[k].innerHTML) + resultUsd
            }
        }
    }

    for (var l = 0; l < arrayusd.length; l++) {
        var cotizarAuyu = arrayusd[l];
        var resultUyu = parseInt(cotizarAuyu.innerHTML) * 40;
        for (var m = 0; m < arrayuyu.length; m++) {
            document.getElementById('subtotalUYU').innerHTML = parseInt(arrayuyu[m].innerHTML) + resultUyu
        }
    }
}

//PINTAR EL RESULTADO DEL SUBTOTAL DE CADA PRODUCTO 
function pintarResultado(array) {
    var parrafoUnitario = document.getElementsByClassName('total');
    for (var i = 0; i < array.length; i++) {
        parrafoUnitario[i].innerHTML = array[i]
        parrafoUnitario[i].setAttribute('value', array[i])
    }
}

//FUNCIONES PARA NAVEGAR, ENTRE CARRITO, METODOS DE ENVIO Y METODO DE PAGO

function volverCarrito() {
    document.getElementById('nav1').className = 'checked'
    document.getElementById('nav2').className = 'mx-5'
    $('#envioForm').hide();
    $('#cart').show();
}
function navegation() {
    let cart = document.getElementById('subtotalUYU').innerHTML;
    if(cart == '0'){
        alert("No hay productos en su carrito")
    }else{
    $('#cart').hide();
    $('#envioForm').show();
    document.getElementById('nav1').className = ''
    document.getElementById('nav2').className = 'mx-5 checked'
}
}

function volverEnvio() {
    $('#pagoDiv').hide();
    $('#envioForm').show();
    document.getElementById('nav2').className = 'checked mx-5'
    document.getElementById('nav3').className = 'none'
}


//VALIDACION DE METODO DE ENVIO;

function validarEnvio() {
    var departamento = document.getElementById('departamento').value;
    var envio = document.getElementById('envioType').value;
    var ciudad = document.getElementById('ciudad').value;
    var direccion = document.getElementById('direccionCompleta').value;
    var postal = document.getElementById('postal').value;

    if (departamento == 0 || envio == 0 || ciudad == '' || direccion == '' || postal == 0) {

        document.getElementById('errorEnvio').innerHTML = 'Para continuar, debe completar todos los campos'
        document.getElementById('errorEnvio').className = "alert-danger rounded p-2"
    } else {
        document.getElementById('errorEnvio').innerHTML = ''
        document.getElementById('errorEnvio').className = ''
        $('#pagoDiv').show();
        $('#envioForm').hide();
        document.getElementById('nav2').className = 'mx-5'
        document.getElementById('nav3').className = 'checked'


    }
}


//CALCULAR EL COSTO DE ENVIO 

function costoEnvio() {
    var costo_envio = document.getElementById('envioType').value;
    var tipo_envio = document.getElementById('costoEnvio');
    var totalPesos = document.getElementById('subtotalUYU');
    var totalDolares = document.getElementById('subtotalUSD');

    if (!costo_envio || costo_envio == 0) {
        document.getElementById('costoTotal').innerHTML = totalPesos.innerHTML
        document.getElementById('costoTotalUSD').innerHTML = totalDolares.innerHTML
    }
    if (costo_envio == 1) {
        document.getElementById('costoTotal').innerHTML = parseInt(totalPesos.innerHTML) * 1.05
        document.getElementById('costoTotalUSD').innerHTML = parseInt(totalDolares.innerHTML) * 1.05
        tipo_envio.innerHTML = 'Standard (12 a 15 dias)'
    } else if (costo_envio == 2) {
        document.getElementById('costoTotal').innerHTML = parseInt(totalPesos.innerHTML) * 1.07
        document.getElementById('costoTotalUSD').innerHTML = parseInt(totalDolares.innerHTML) * 1.07
        tipo_envio.innerHTML = 'Express (5 a 8 dias)'
    }
    else if (costo_envio == 3) {
        document.getElementById('costoTotal').innerHTML = parseInt(totalPesos.innerHTML) * 1.15
        document.getElementById('costoTotalUSD').innerHTML = parseInt(totalDolares.innerHTML) * 1.15
        tipo_envio.innerHTML = 'Premium (2 a 5 dias)'
    }
}

//VALIDACION DE METODOS DE PAGO
function validarDebito() {
    let card = document.getElementById('numberCardDebito').value;
    let vencMonth = document.getElementById('vencMonthDebito').value;
    let vencYear = document.getElementById('vencYearDebito').value;
    let name = document.getElementById('nameTitularDebito').value;
    let apellido = document.getElementById('apellidoTitularDebito').value;

    if (card == '' || vencMonth == '' || vencYear == '' || name == '' || apellido == '') {
        document.getElementById('errorDebito1').innerHTML = 'Debe completar todos los campos';
        document.getElementById('errorDebito1').className = ' col row justify-content-start alert-danger p-2 pl-3 rounded';
    } else {
        document.getElementById('metodoPago').innerHTML = `Metodo de pago seleccionado: <strong> Tarjeta de débito</strong>`;
        document.getElementById('metodoPago').className = 'alert-info p-3 rounded';
        $('#staticBackdropDebito').modal('hide');
        document.getElementById('errorDebito1').innerHTML = '';
        document.getElementById('errorDebito1').className = '';
        document.getElementById('errorCompra').innerHTML = ``;
        document.getElementById('errorCompra').className = '';

    }
}

function validarCredito() {
    let card = document.getElementById('numberCard').value;
    let vencMonth = document.getElementById('vencMonth').value;
    let vencYear = document.getElementById('vencYear').value;
    let name = document.getElementById('nameTitular').value;
    let apellido = document.getElementById('apellidoTitular').value;

    if (card == '' || vencMonth == '' || vencYear == '' || name == '' || apellido == '') {
        document.getElementById('errorCredito1').innerHTML = 'Debe completar todos los campos';
        document.getElementById('errorCredito1').className = ' col row justify-content-start alert-danger p-2 pl-3 rounded';
    } else {
        document.getElementById('metodoPago').innerHTML = `Metodo de pago seleccionado: <strong> Tarjeta de crédito</strong>`;
        document.getElementById('metodoPago').className = 'alert-info p-3 rounded';
        $('#staticBackdrop').modal('hide');
        document.getElementById('errorCredito1').innerHTML = '';
        document.getElementById('errorCredito1').className = '';
        document.getElementById('errorCompra').innerHTML = ``;
        document.getElementById('errorCompra').className = '';
    }
}

function validarTransferencia() {
    var card = document.getElementById('numberCardTransferencia').value;
    var vencMonth = document.getElementById('vencMonthTransferencia').value;
    var vencYear = document.getElementById('vencYearTransferencia').value;
    var name = document.getElementById('nameTitularTransferencia').value;
    var apellido = document.getElementById('apellidoTitularTransferencia').value;

    if (card == '' || vencMonth == '' || vencYear == '' || name == '' || apellido == '') {
        document.getElementById('errorTransferencia1').innerHTML = 'Debe completar todos los campos';
        document.getElementById('errorTransferencia1').className = ' col row justify-content-start alert-danger p-2 pl-3 rounded';
    } else {
        document.getElementById('metodoPago').innerHTML = `Metodo de pago seleccionado: <strong> Transferencia bancaria</strong>`;
        document.getElementById('metodoPago').className = 'alert-info p-3 rounded';
        document.getElementById('errorTransferencia1').innerHTML = '';
        document.getElementById('errorTransferencia1').className = '';
        $('#staticBackdropTransferencia').modal('hide');
        document.getElementById('errorCompra').innerHTML = ``;
        document.getElementById('errorCompra').className = '';
    }
}

//FINALIZAR COMPRA
function finalizarCompra() {
    let finalizar = document.getElementById('metodoPago').innerHTML
    if (finalizar == '') {
        document.getElementById('errorCompra').innerHTML = `<strong>Debe seleccionar un metodo de pago</strong>`;
        document.getElementById('errorCompra').className = 'alert-danger p-3 rounded row justify-content-center';

    } else {
        window.location = "index.html"
        alert(mensaje.msg);
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            article = resultObj.data;
            //Muestro las categorías ordenadas
            cart(article)
            // valid();
            $(document).ready(function () {
                $('#envioForm').hide();
                $('#pagoDiv').hide();
            });

        }
    });
});
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            mensaje = resultObj.data;
            //Muestro las categorías ordenadas
            console.log(mensaje.msg)
            $('#alertCompra').hide();
        }
    });
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
