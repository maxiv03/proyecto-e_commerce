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
        //entrega 6, parte 1> pongo el costo del articulo que trae la api multiplicado por la cantidad de articulos en el carrito
        // dentro de un parrafo contenedor del subtotal de la compra en el html
        let subtotalCompra = 0;
        let tipoDeEnvioSeleccionado = 15;
        for(let i = 0; i < resultObj.data.articles.length; i++){
            subtotalCompra += (document.getElementById(`c-${resultObj.data.articles[i].id}`).value)*resultObj.data.articles[i].unitCost;
        }
        localStorage.setItem('subtotal', subtotalCompra);
        document.getElementById("subtotal-compra").innerText = `${subtotalCompra} USD`
        
        for(let i = 0; i < resultObj.data.articles.length; i++){
            const cantidad = document.getElementById(`c-${resultObj.data.articles[i].id}`);

            cantidad.addEventListener('input', (event) => {
                document.getElementById(`st-${resultObj.data.articles[i].id}`).innerText = `${(cantidad.value)*(resultObj.data.articles[i].unitCost)} ${resultObj.data.articles[i].currency}`
                //entrega 6, parte 1> hago que cada vez que se cambie la cantidad de articulos, tambien cambie el valor mostrado en el subtotal
                subtotalCompra = 0;
                for(let i = 0; i < resultObj.data.articles.length; i++){
                    subtotalCompra += (document.getElementById(`c-${resultObj.data.articles[i].id}`).value)*resultObj.data.articles[i].unitCost;
                }
                localStorage.setItem('subtotal', subtotalCompra);
                document.getElementById("subtotal-compra").innerText = `${subtotalCompra} USD`
                document.getElementById("costo-de-envio").innerText = `${Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100))} USD`
                costoTotal = subtotalCompra + (Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100)));
                document.getElementById("costo-total").innerText = `${costoTotal} USD`
            });
        }
        //entrega 6, parte 1> le agrego eventlisteners a los botones de tipo de envio para que cambie el costo de envio al
        // seleccionarlos
        let tiposDeEnvio = document.querySelectorAll('input[name="tipoEnvio"]');
        let costoTotal = subtotalCompra + (Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100)));
        document.getElementById("costo-de-envio").innerText = `${subtotalCompra*(tipoDeEnvioSeleccionado/100)} USD`;
        document.getElementById("costo-total").innerText = `${costoTotal} USD`;
        for(let tipoDeEnvio of tiposDeEnvio){
            tipoDeEnvio.addEventListener('change', function(){
                tipoDeEnvioSeleccionado = tipoDeEnvio.value;
                costoTotal = subtotalCompra + (Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100)));
                document.getElementById("costo-de-envio").innerText = `${Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100))} USD`;
                document.getElementById("costo-total").innerText = `${costoTotal} USD`;
            });
        }
        //validaciones de formulario para la compra
        let botonTransferencia = document.getElementById('transferencia-bancaria');
        let numeroTransferencia = document.getElementById('numero-de-cuenta');
        let botonTarjeta = document.getElementById('tarjeta-de-credito');
        let inputsCredito = document.querySelectorAll('.input-credito');
        let numeroCredito = inputsCredito[0];
        let codigoCredito = inputsCredito[1];
        let vencimientoCredito = inputsCredito[2];
        let botonGuardar = document.getElementById('btn-guardar');

        botonTarjeta.addEventListener('change', function(){
            document.getElementById('numero-de-cuenta').setAttribute('disabled', '');
            for(let inputCredito of inputsCredito){
                inputCredito.removeAttribute('disabled')
            }
        })

        botonTransferencia.addEventListener('change', function(){
            document.getElementById('numero-de-cuenta').removeAttribute('disabled');
            for(let inputCredito of inputsCredito){
                inputCredito.setAttribute('disabled','')
            }
        })

        botonGuardar.addEventListener('click', function(){
            if(botonTarjeta.checked){
                if(numeroCredito.value != '' && codigoCredito.value != '' && vencimientoCredito.value != ''){
                    document.getElementById('cartel-de-pago').innerText = 'Tarjeta de crédito';
                    document.getElementById('error-forma-pago').innerText = '';
                }
            }else if(botonTransferencia.checked){
                if(numeroTransferencia.value != ''){
                    document.getElementById('cartel-de-pago').innerText = 'Transferencia bancaria';
                    document.getElementById('error-forma-pago').innerText = '';
                }
            }
        })
    });
    let botonTransferencia = document.getElementById('transferencia-bancaria');
    let numeroTransferencia = document.getElementById('numero-de-cuenta');
    let botonTarjeta = document.getElementById('tarjeta-de-credito');
    let inputsCredito = document.querySelectorAll('.input-credito');
    let numeroCredito = inputsCredito[0];
    let codigoCredito = inputsCredito[1];
    let vencimientoCredito = inputsCredito[2];

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
        var form = document.querySelector('.needs-validation');
        

        /* if(botonTarjeta.checked){
            if(numeroCredito.value = ''){
                numeroCredito.setCustomValidity(false);
            }else{
                numeroCredito.setCustomValidity('');
            }

            if(codigoCredito.value = ''){
                codigoCredito.setCustomValidity(false);
            }else{
                codigoCredito.setCustomValidity('');
            }

            if(vencimientoCredito.value = ''){
                vencimientoCredito.setCustomValidity(false);
            }else{
                vencimientoCredito.setCustomValidity('');
            }
        }else if(botonTransferencia.checked){
            if(numeroTransferencia.value = ''){
                numeroTransferencia.setCustomValidity(false);
            }else{
                numeroTransferencia.setCustomValidity('');
            }
        } */

        form.addEventListener('submit', function (event) {

            if(botonTarjeta.checked){
                if(numeroCredito.value == '' || codigoCredito.value == '' || vencimientoCredito.value == ''){
                    document.getElementById('error-forma-pago').innerText = 'Debe seleccionar una forma de pago';
                }else{
                    document.getElementById('error-forma-pago').innerText = '';
                }
            }else if(botonTransferencia.checked){
                if(numeroTransferencia.value == ''){
                    document.getElementById('error-forma-pago').innerText = 'Debe seleccionar una forma de pago';
                }else{
                    document.getElementById('error-forma-pago').innerText = '';
                }
            }
            let subTotal = localStorage.getItem('subtotal');
            if(subTotal == 0){
                alert('Seleccione algun producto por favor');
                event.preventDefault()
                event.stopPropagation()
            }
            
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }else if(form.checkValidity() && subTotal > 0){
                alert('¡Has comprado con éxito!')
            }
            form.classList.add('was-validated')
        }, false)
    })()

});