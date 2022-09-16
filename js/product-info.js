let idProduct = localStorage.getItem("productID");
console.log(idProduct);
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${idProduct}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${idProduct}.json`;

// función para mostrar la información del producto
/* function showProductInfo(){
    let htmlContentToAppend = "";
    htmlContentToAppend += `        
                <div class="list-group-item">
                    <h1>${resultObj.name}</h1>
                </div>
                `;
    document.getElementById("container").innerHTML = htmlContentToAppend;
} */

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            let htmlImagesToAppend = ''
            for(let i = 0; i < resultObj.data.images.length; i++){
                htmlImagesToAppend +=`<div class="col-3">
                <img src="` + resultObj.data.images[i] + `" alt="product image" class="img-thumbnail">
            </div>`
            }

            let htmlContentToAppend = ``;
            htmlContentToAppend += `        
                <div style="margin-top:10px">
                    <h1>${resultObj.data.name}</h1><hr/>
                </div>
                <div>
                    <h5><b>Precio</b></h3>
                    <p>${resultObj.data.currency} ${resultObj.data.cost}</p>
                </div>
                <div>
                    <h5><b>Descripción</b></h3>
                    <p>${resultObj.data.description}</p>
                </div>
                <div>
                    <h5><b>Categoria</b></h3>
                    <p>${resultObj.data.category}</p>
                </div>
                <div>
                    <h5><b>Cantidad de vendidos</b></h3>
                    <p>${resultObj.data.soldCount}</p>
                </div>
                <div>
                    <h5><b>Imágenes ilustrativas</b></h3>
                    <div class="row">${htmlImagesToAppend}</div>
                </div>
                `;
            document.getElementById("product-info-container").innerHTML = htmlContentToAppend;
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            let htmlContentToAppend = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div style="margin-top:10px"><h2><b>Comentarios</b></h2></div>`;

            let htmlStarstoAppend = ''


            for(let i = 0; i < resultObj.data.length; i++){
                switch (resultObj.data[i].score){
                    case 1:
                        htmlStarstoAppend = `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>`;
                        break;
                    case 2:
                        htmlStarstoAppend = `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>`;
                        break;
                    case 3:
                        htmlStarstoAppend = `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star fa-star checked"></span>
                        <span class="fa fa-star fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>`;
                        break;
                    case 4:
                        htmlStarstoAppend = `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star fa-star checked"></span>
                        <span class="fa fa-star fa-star checked"></span>
                        <span class="fa fa-star fa-star checked"></span>
                        <span class="fa fa-star"></span>`;
                        break;
                    case 5:
                        htmlStarstoAppend = `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star fa-star checked"></span>
                        <span class="fa fa-star fa-star checked"></span>
                        <span class="fa fa-star fa-star checked"></span>
                        <span class="fa fa-star fa-star checked"></span>`;
                        break;
                }
                htmlContentToAppend +=`<div class="list-group-item">
                <p><b>${resultObj.data[i].user}</b> - ${resultObj.data[i].dateTime} - ${htmlStarstoAppend}</p>
                <p>${resultObj.data[i].description}</p>
            </div>`
            }
            document.getElementById("product-info-container").innerHTML += htmlContentToAppend;
        }
    })
})