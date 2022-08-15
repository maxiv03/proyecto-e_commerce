//dirección para obtener el listado en formato json:
const LIST_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";


fetch(LIST_URL)
.then(res => res.json() )
.then(data => {
    let htmlContentToAppend = "";

    for(auto of data.products){ 
        
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + auto.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ auto.name +`</h4> 
                        <p> `+ auto.description +`</p> 
                        </div>
                        <small class="text-muted">` + auto.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
    }
    document.getElementById("container-autos").innerHTML = htmlContentToAppend; 
})