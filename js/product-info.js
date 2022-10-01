let idProduct = localStorage.getItem("productID");
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${idProduct}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${idProduct}.json`;

// avance en entrega 3, parte 1 y 2, de proyecto JAP
document.addEventListener("DOMContentLoaded", function(e){
    Promise.all([getJSONData(PRODUCT_INFO_URL), getJSONData(PRODUCT_INFO_COMMENTS_URL)]).then(function(resultObj){
        const productInfoObj = resultObj[0];
        const productCommentsObj = resultObj[1];
        if (productInfoObj.status === "ok"){
            let htmlImagesToAppend = ''
            for(let i = 0; i < productInfoObj.data.images.length; i++){
                htmlImagesToAppend +=`<div class="col-3">
                <img src="` + productInfoObj.data.images[i] + `" alt="product image" class="img-thumbnail">
            </div>`
            }

            let htmlContentToAppend = ``;
            htmlContentToAppend += `        
                <div style="margin-top:10px">
                    <h1>${productInfoObj.data.name}</h1><hr/>
                </div>
                <div>
                    <h5><b>Precio</b></h3>
                    <p>${productInfoObj.data.currency} ${productInfoObj.data.cost}</p>
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
        }

        if (productCommentsObj.status === "ok"){
            let htmlContentToAppend = `<div style="margin-top:10px"><h3><b>Comentarios</b></h2></div>`;

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
    })
// avance en entrega 3, parte 4, proyecto JAP 17/09
/*     const commentBox = document.getElementById('comment_box');
    const btnEnviar = document.getElementById('btn_enviar');
    btnEnviar.addEventListener('click', function(e){
        if(localStorage.getItem())
    }) */
})