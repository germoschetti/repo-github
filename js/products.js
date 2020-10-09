//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_COST = "MinMax";
const ORDER_DESC_BY_COST = "MaxMin";
const ORDER_BY_PROD_SOLD = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLD) {
        result = array.sort(function (a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if (aSold > bSold) { return -1; }
            if (aSold < bSold) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProducts() {
    var content = "";

    for (let i = 0; i < currentProductsArray.length; i++) {
        let category = currentProductsArray[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(category.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(category.cost) <= maxCost))) {

               
            content += `
        <a href="product-info.html" class="list-group-item list-group-item-action " >
        <div class="row">
        <div class="col-3">
            <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ category.name + `</h4>
                <small class="text-muted">` + category.soldCount + ` Sold </small>
            </div>
            <p class="mb-1">` + category.description + `</p>
            <p class="mb-1">` + category.cost + ` USD </p>
        </div>
    </div>
    </a>
        `
            document.getElementById("products").innerHTML = content
        }


    }
    if (content == '') {
        content += `
        <div class="alert-danger p-3 rounded my-2"> No se ha encontrado ningun producto con ese indice de busqueda!</div>
    `
        document.getElementById("products").innerHTML = content
    }
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProducts();



}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("asc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("desc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCost").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProducts();
    });
})


document.getElementById("rangeFilterCost").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
        minCost = parseInt(minCost);
    }
    else {
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
        maxCost = parseInt(maxCost);
    }
    else {
        maxCost = undefined;
    }

    showProducts();
});

// Probando buscador en tiempo real


const formulario = document.querySelector('#formulario');
var datos = [];

function filtrar() {
    contenido = '';
    const texto = formulario.value.toLowerCase();
    for (producto of datos) {
        let nombre = producto.name.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
            if(sessionStorage.getItem('google')){
            let url = new URL("https://germoschetti.github.io/repo-github/product-info.html" + "?id=" + producto.name);
            contenido += `
    <a href="${url}"  class="list-group-item list-group-item-action">
    <div class="row">
    <div class="col-3">
    <img src=" ${producto.imgSrc}" alt="` + producto.description + `" class="img-thumbnail"> 
    </div>
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
        <h4 class="mb-1">`+ producto.name + `</h4>
        <small class="text-muted">` + producto.soldCount + ` Sold </small>
    </div>
    <p class="mb-1">` + producto.description + `</p>
    <p class="mb-1">` + producto.cost + ` USD </p>
    </div>
    </div>
    </a>
    `
    document.getElementById("products").innerHTML = contenido

}else{
    let url = new URL("file:///D:/Users/Germ%C3%A1n/Desktop/German/Programacion/Sitios%20Web/OBLIGATORIO/repositorio/repo-github/product-info.html" + "?id=" + producto.name);
    contenido += `
<a href="${url}"  class="list-group-item list-group-item-action">
<div class="row">
<div class="col-3">
<img src=" ${producto.imgSrc}" alt="` + producto.description + `" class="img-thumbnail"> 
</div>
<div class="col">
<div class="d-flex w-100 justify-content-between">
<h4 class="mb-1">`+ producto.name + `</h4>
<small class="text-muted">` + producto.soldCount + ` Sold </small>
</div>
<p class="mb-1">` + producto.description + `</p>
<p class="mb-1">` + producto.cost + ` USD </p>
</div>
</div>
</a>
`

}

document.getElementById("products").innerHTML = contenido
        }

        

    }

    if (contenido == '') {
        document.getElementById("products").innerHTML = ''
        contenido += `
        <div class="alert-danger p-3 rounded my-2"> No se ha encontrado ningun producto con ese indice de busqueda!</div>
`
        document.getElementById("products").innerHTML = contenido
    }
}

formulario.addEventListener('keyup', filtrar)




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            datos = resultObj.data;
            //Muestro las categorías ordenadas
            filtrar(datos)
        }
    });
});