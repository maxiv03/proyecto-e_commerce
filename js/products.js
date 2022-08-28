//dirección para obtener el listado en formato json:

let identificadorCat = localStorage.getItem("catID")
const LIST_URL = `https://japceibal.github.io/emercado-api/cats_products/${identificadorCat}.json`;


fetch(LIST_URL)
.then(res => res.json() )
.then(data => {
    let htmlContentToAppend = "";

    for(product of data.products){ 
        
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +`</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
    }
    document.getElementById("product-container").innerHTML = htmlContentToAppend; 
})