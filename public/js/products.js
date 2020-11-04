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

                if (location.href == 'http://localhost:3000/products.html') {
                    let url = new URL("http://localhost:3000/product-info.html" + "?id=" + category.name);
                    content += `
                    <div class="col-md-4">
                    <div class="py-3">
                    <a href="${url}" class="card mb-4 shadow-sm custom-card">
                      <img class="bd-placeholder-img card-img-top" src="${category.imgSrc}">
                      <h3 class="m-3" >${category.name} (122)</h3>
                      <h6>${category.currency}${category.cost}</h6>
                      <div class="card-body">
                        <p class="card-text" style="text-align:left">${category.description}</p>
                      </div>
                    </a>
                  </div>
                  </div>
            `
                        document.getElementById("products1").innerHTML = content
    
                }

           else if (location == 'https://germoschetti.github.io/repo-github/public/products.html') {
                let url = new URL("https://germoschetti.github.io/repo-github/public/product-info.html" + "?id=" + category.name);

                content += `
                <div class="col-md-4">
                <div class="py-3">
                <a href="${url}" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="${category.imgSrc}">
                  <h3 class="m-3" >${category.name} (122)</h3>
                  <h6>${category.currency}${category.cost}</h6>
                  <div class="card-body">
                    <p class="card-text" style="text-align:left">${category.description}</p>
                  </div>
                </a>
              </div>
              </div>
        `
                document.getElementById("products1").innerHTML = content
            } 
            else {
                let url = new URL("file:///D:/Users/Germ%C3%A1n/Desktop/German/Programacion/Sitios%20Web/OBLIGATORIO/repositorio/repo-github/product-info.html" + "?id=" + category.name);
                content += `
                <div class="col-md-4">
                <div class="py-3">
                <a href="${url}" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="${category.imgSrc}">
                  <h3 class="m-3" >${category.name}</h3>
                  <h6>${category.currency}${category.cost}</h6>
                  <div class="card-body">
                    <p class="card-text" style="text-align:left">${category.description}</p>
                  </div>
                </a>
              </div>
              </div>
        `
                document.getElementById("products1").innerHTML = content
            }
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
    var location = window.location.href;
    contenido = '';
    const texto = formulario.value.toLowerCase();
    for (producto of datos) {
        let nombre = producto.name.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {

            if (location == 'http://localhost:3000/products.html') {
                let url = new URL("http://localhost:3000/product-info.html" + "?id=" + producto.name);
                contenido += `
                <div class="col-md-4">
                <div class="py-3">
                <a href="${url}" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="${producto.imgSrc}">
                  <h3 class="m-3" >${producto.name}</h3>
                  <h6>${producto.currency}${producto.cost}</h6>
                  <div class="card-body">
                    <p class="card-text" style="text-align:left">${producto.description}</p>
                  </div>
                </a>
              </div>
              </div>
        `
                    document.getElementById("products1").innerHTML = contenido

            }
          else  if (location == 'https://germoschetti.github.io/repo-github/public/products.html') {
                let url = new URL("https://germoschetti.github.io/repo-github/public/product-info.html" + "?id=" + producto.name);
                contenido += `
                <div class="col-md-4">
                <div class="py-3">
                <a href="${url}" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="${producto.imgSrc}">
                  <h3 class="m-3" >${producto.name}</h3>
                  <h6>${producto.currency}${producto.cost}</h6>
                  <div class="card-body">
                    <p class="card-text" style="text-align:left">${producto.description}</p>
                  </div>
                </a>
              </div>
              </div>
        `
                document.getElementById("products1").innerHTML = contenido

            } else {
                let url = new URL("file:///D:/Users/Germ%C3%A1n/Desktop/German/Programacion/Sitios%20Web/OBLIGATORIO/repositorio/repo-github/product-info.html" + "?id=" + producto.name);
                contenido += `
                <div class="col-md-4">
                <div class="py-3">
                <a href="${url}" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="${producto.imgSrc}">
                  <h3 class="m-3" >${producto.name}</h3>
                  <h6>${producto.currency}${producto.cost}</h6>
                  <div class="card-body">
                    <p class="card-text" style="text-align:left">${producto.description}</p>
                  </div>
                </a>
              </div>
              </div>
        `

            }

            document.getElementById("products1").innerHTML = contenido
        }



    }

    if (contenido == '') {
        document.getElementById("products1").innerHTML = ''
        contenido += `
        <div class="alert-danger p-3 rounded my-2"> No se ha encontrado ningun producto con ese indice de busqueda!</div>
`
        document.getElementById("products1").innerHTML = contenido
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