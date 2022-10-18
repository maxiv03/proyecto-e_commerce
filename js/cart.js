const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
// entrega 5, parte 1> uso la funcion getsondata para traer los datos de la API cart info
// uso un bucle for para darle formato html a cada articulo de la api. que en este caso es uno solo
// pero lo deje asi por si luego son mas
// dentro del bucle for tambien le doy un id al input de cantidad y al parrafo de subtotal para
// luego hacerlos interactuar en tiempo real con un eventlistener de tipo change
        let htmlCartItemsToAppend = ``;
        for(let i = 0; i < resultObj.data.articles.length; i++){
            htmlCartItemsToAppend +=`
            <tr>
                <td style="width:80px"><img style="width:90%; height:auto;" src="${resultObj.data.articles[i].image}"></td>
                <td>${resultObj.data.articles[i].name}</td>
                <td>${resultObj.data.articles[i].unitCost} ${resultObj.data.articles[i].currency}</td>
                <td><input style="width: 3em" min="0" max="100" type="number" value="1" id="c-${resultObj.data.articles[i].id}"></td>
                <td><b id="st-${resultObj.data.articles[i].id}">${resultObj.data.articles[i].unitCost} ${resultObj.data.articles[i].currency}</b></td>
            </tr>
          `;
        }
// entrega 5, parte 1> simplemente creo un formato html de tabla para mi pagina de carrito
// y dentro del cuerpo de la tabla agrego lo creado anteriormente para los items del carrito
// luego todo lo creado en formato html lo paso a cart.html en el div con id cart-container
        let htmlContentToAppend = `
        <div style="margin:10px">
            <h1 class="text-center">Carrito de compras</h1>
        </div>
        <h3>Artículos a comprar</h3>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${htmlCartItemsToAppend}
            </tbody>
        </table>
        `;
        document.getElementById("cart-container").innerHTML += htmlContentToAppend;
// entrega 5, parte 3> agrego un eventlistener de tipo change para hacer cambios en tiempo real en el subtotal
// usando el valor del input cantidad con id de articulo
        for(let i = 0; i < resultObj.data.articles.length; i++){
            const cantidad = document.getElementById(`c-${resultObj.data.articles[i].id}`);
            cantidad.addEventListener('change', (event) => {
                document.getElementById(`st-${resultObj.data.articles[i].id}`).innerText = `${(cantidad.value)*(resultObj.data.articles[i].unitCost)} ${resultObj.data.articles[i].currency}`
            });
        }
    });
});