let identificadorCat = localStorage.getItem("catID")
const PRODUCTS_LIST_URL = `https://japceibal.github.io/emercado-api/cats_products/${identificadorCat}.json`;
const ORDER_ASC_BY_COST = "CostUp";
const ORDER_DESC_BY_COST = "CostDown";
const ORDER_BY_SOLD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

                htmlContentToAppend += `        
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                <h4>`+ product.name + `- `+ product.currency + ` `+ product.cost +`</h4> 
                                <p> `+ product.description +`</p> 
                                </div>
                                <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                            </div>
        
                        </div>
                    </div>
                </div>
                `
            }
            document.getElementById('product-container').innerHTML = htmlContentToAppend;
        }

        document.getElementById("product-container").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            document.getElementById('catNameContainer').innerHTML = resultObj.data.catName;
            showProductsList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });
    

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });
    
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});

// fetch(PRODUCT_LIST_URL)
// .then(res => res.json() )
// .then(data => {
//     let htmlContentToAppend = '';
//     document.getElementById('catNameContainer').innerHTML = data.catName;
//     for(product of data.products){ 
        
//         htmlContentToAppend += `        
//         <div class="list-group-item list-group-item-action">
//             <div class="row">
//                 <div class="col-3">
//                     <img src="` + product.image + `" alt="product image" class="img-thumbnail">
//                 </div>
//                 <div class="col">
//                     <div class="d-flex w-100 justify-content-between">
//                         <div class="mb-1">
//                         <h4>`+ product.name +`</h4> 
//                         <p> `+ product.description +`</p> 
//                         </div>
//                         <small class="text-muted">` + product.soldCount + ` vendidos</small> 
//                     </div>

//                 </div>
//             </div>
//         </div>
//         `
//     }
//     document.getElementById('product-container').innerHTML = htmlContentToAppend; 
// })
