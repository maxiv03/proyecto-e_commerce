let idProduct = localStorage.getItem("productID");
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${idProduct}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${idProduct}.json`;

// avance en entrega 3, parte 1 y 2, de proyecto JAP
document.addEventListener("DOMContentLoaded", function(e){
    Promise.all([getJSONData(PRODUCT_INFO_URL), getJSONData(PRODUCT_INFO_COMMENTS_URL)]).then(function(resultObj){
        const productInfoObj = resultObj[0];
        const productCommentsObj = resultObj[1];
        if (productInfoObj.status === "ok"){
            let htmlImagesToAppend = '';
            for(let i = 0; i < productInfoObj.data.images.length; i++){
                htmlImagesToAppend +=`<div class="col-3">
                <img src="` + productInfoObj.data.images[i] + `" alt="product image" class="img-thumbnail">
            </div>`
            }

            let htmlContentToAppend = ``;
            htmlContentToAppend += `        
                <div style="margin-top:10px">
                    <h1 class="text-center">${productInfoObj.data.name}</h1><hr/>
                </div>
                <div class="position-relative">
                    <h5><b>Precio</b></h3>
                    <p>${productInfoObj.data.currency} ${productInfoObj.data.cost}</p>
                    <input type="button" id="btnAgregarAlCarrito" value="Agregar al carrito" class="btn btn-success position-absolute top-0 end-0">
                </div>
                <div>
                    <h5><b>Descripción</b></h3>
                    <p>${productInfoObj.data.description}</p>
                </div>
                <div>
                    <h5><b>Categoria</b></h3>
                    <p>${productInfoObj.data.category}</p>
                </div>
                <div>
                    <h5><b>Cantidad de vendidos</b></h3>
                    <p>${productInfoObj.data.soldCount}</p>
                </div>
                <div>
                    <h5><b>Imágenes ilustrativas</b></h3>
                    <div class="row">${htmlImagesToAppend}</div>
                </div>
                `;
            document.getElementById("product-info-container").innerHTML = htmlContentToAppend;
            //avance proyecto JAP entrega 1 parte 1.
            //En la misma página realizada en la entrega anterior con respecto a la información de un producto, muestra también los productos relacionados al mismo, incluyendo su nombre e imagen.

            let htmlRelatedProductsToAppend = `<div style="margin-top:10px"><h3><b>Productos relacionados</b></h3></div>`;
            for(let i = 0; i < productInfoObj.data.relatedProducts.length; i++){
                htmlRelatedProductsToAppend +=`<div id="${productInfoObj.data.relatedProducts[i].id}" class="col-3"><figure class="img-thumbnail">
                <img src="` + productInfoObj.data.relatedProducts[i].image + `" class="img-fluid" alt="product image">
                <figcaption class="text-center">${productInfoObj.data.relatedProducts[i].name}</figcaption>
                </figure>
            </div>`
            }
            document.getElementById("related_products").innerHTML = htmlRelatedProductsToAppend;
        }
            //avance proyecto JAP entrega 1 parte 1.
            //Al pulsar sobre uno de los productos relacionados, se debe actualizar la página, mostrando ahora la información de dicho producto.
            for(let i = 0; i < productInfoObj.data.relatedProducts.length; i++){
                let relatedProduct = productInfoObj.data.relatedProducts[i];
                document.getElementById(`${relatedProduct.id}`).addEventListener("click", function() {
                    localStorage.setItem("productID", relatedProduct.id);
                    window.location = "product-info.html"
                });
            }
            // comentarios del producto
        if (productCommentsObj.status === "ok"){
            let htmlContentToAppend = `<div style="margin-top:10px"><h3><b>Comentarios</b></h3></div>`;

            let htmlStarstoAppend = ''


            for(let i = 0; i < productCommentsObj.data.length; i++){
                switch (productCommentsObj.data[i].score){
                    case 1:
                        htmlStarstoAppend = `<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>`;
                        break;
                    case 2:
                        htmlStarstoAppend = `<span class="fa fa-star checked"></span><span class="fa fa-star fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>`;
                        break;
                    case 3:
                        htmlStarstoAppend = `<span class="fa fa-star checked"></span><span class="fa fa-star fa-star checked"></span><span class="fa fa-star fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>`;
                        break;
                    case 4:
                        htmlStarstoAppend = `<span class="fa fa-star checked"></span><span class="fa fa-star fa-star checked"></span><span class="fa fa-star fa-star checked"></span><span class="fa fa-star fa-star checked"></span><span class="fa fa-star"></span>`;
                        break;
                    case 5:
                        htmlStarstoAppend = `<span class="fa fa-star checked"></span><span class="fa fa-star fa-star checked"></span><span class="fa fa-star fa-star checked"></span><span class="fa fa-star fa-star checked"></span><span class="fa fa-star fa-star checked"></span>`;
                        break;
                }
                htmlContentToAppend +=`<div class="list-group-item">
                <p><b>${productCommentsObj.data[i].user}</b> - ${productCommentsObj.data[i].dateTime} - ${htmlStarstoAppend}</p>
                <p>${productCommentsObj.data[i].description}</p>
                </div>`
            }
            document.getElementById("product-info-container").innerHTML += htmlContentToAppend;
        }
        let btnAgregarAlCarrito = document.getElementById("btnAgregarAlCarrito");

        btnAgregarAlCarrito.addEventListener("click", function(){
            localStorage.setItem("productToCart", JSON.stringify(productInfoObj));
            window.location = "cart.html"
        })
    })
})