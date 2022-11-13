let cartList = [];
let cartItemToAdd = {};

if(localStorage.getItem("cartList") == null){
    cartList = [];
} else{
    cartList = JSON.parse(localStorage.getItem("cartList"));
}

if(localStorage.getItem("productToCart") == null){
    cartItemToAdd = {};
} else{
    cartItemToAdd = JSON.parse(localStorage.getItem("productToCart"));
    localStorage.removeItem("productToCart");
    if(!(cartList.some(cartItem => cartItem.data.id == cartItemToAdd.data.id))){
        cartList.push(cartItemToAdd);
        localStorage.setItem('cartList', JSON.stringify(cartList));
    }
}



if(cartList.length < 1){
    let htmlContentToAppend = `
    <div style="margin:10px">
        <h1 class="text-center">Carrito de compras</h1>
    </div>
    <div class="d-flex w-100 justify-content-between">
        <div>
            <h3>Artículos a comprar</h3>
        </div>
        <small class="text-muted"> 1 USD = 42 UYU </small>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <div class="alert-danger text-center">
        <a href="categories.html" class="alert-link">Por favor selecciona algún producto</a>.
    </div>
`;
document.getElementById("cart-container").innerHTML += htmlContentToAppend;
}else{
    let htmlCartItemsToAppend = ``;
    for(let i = 0; i < cartList.length; i++){
        if(cartList[i].data.currency == 'UYU'){
            let costInUSD = Math.round((cartList[i].data.cost)/42);
            htmlCartItemsToAppend +=`
                <tr>
                    <td style="width:80px"><img style="width:90%; height:auto;" src="${cartList[i].data.images[0]}"></td>
                    <td>${cartList[i].data.name}</td>
                    <td>${cartList[i].data.cost} ${cartList[i].data.currency}</td>
                    <td><input style="width: 3em" min="0" max="100" type="number" value="1" id="c-${cartList[i].data.id}"></td>
                    <td><b id="st-${cartList[i].data.id}">${costInUSD} USD</b></td>
                    <td><button id="dltBtn-${cartList[i].data.id}" class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button></td>
                </tr>
            `;
        }else{
        let costInUSD = cartList[i].data.cost;
        htmlCartItemsToAppend +=`
            <tr>
                <td style="width:80px"><img style="width:90%; height:auto;" src="${cartList[i].data.images[0]}"></td>
                <td>${cartList[i].data.name}</td>
                <td>${cartList[i].data.cost} ${cartList[i].data.currency}</td>
                <td><input style="width: 3em" min="0" max="100" type="number" value="1" id="c-${cartList[i].data.id}"></td>
                <td><b id="st-${cartList[i].data.id}">${costInUSD} USD</b></td>
                <td><button id="dltBtn-${cartList[i].data.id}" class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="center" title="Eliminar"><i class="fa fa-trash"></i></button></td>
            </tr>
        `;
    }
}

let htmlContentToAppend = `
    <div style="margin:10px">
        <h1 class="text-center">Carrito de compras</h1>
    </div>
    <div class="d-flex w-100 justify-content-between">
        <div>
            <h3>Artículos a comprar</h3>
        </div>
        <small class="text-muted"> 1 USD = 42 UYU </small>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            ${htmlCartItemsToAppend}
        </tbody>
    </table>
    <div class="row">
        <div class="col text-center">
            <button onclick="window.location='categories.html';" type="button" class="btn btn-primary text-center">Elegir más productos</button>
        </div>
    </div>
`;

document.getElementById("cart-container").innerHTML += htmlContentToAppend;
}


let subtotalCompra = 0;
let tipoDeEnvioSeleccionado = 15;

for(let i = 0; i < cartList.length; i++){
    if(cartList[i].data.currency == 'UYU'){
        let costInUSD = Math.round((cartList[i].data.cost)/42);
        subtotalCompra += (document.getElementById(`c-${cartList[i].data.id}`).value)*costInUSD;
    }else{
        let costInUSD = cartList[i].data.cost;
        subtotalCompra += (document.getElementById(`c-${cartList[i].data.id}`).value)*costInUSD;
    }
}

localStorage.setItem('subtotal', subtotalCompra);
document.getElementById("subtotal-compra").innerText = `${subtotalCompra} USD`

// Event listeners de costos de cantidad y botones de eliminar
for(let i = 0; i < cartList.length; i++){
    const btnDlt = document.getElementById(`dltBtn-${cartList[i].data.id}`);

    btnDlt.addEventListener('click', (element) =>{
        let indexToDelete = cartList.findIndex(item => item.data.id == cartList[i].data.id);
        cartList.splice(indexToDelete, 1, );
        localStorage.setItem('cartList', JSON.stringify(cartList));
        window.location = "cart.html";
    })

    const cantidad = document.getElementById(`c-${cartList[i].data.id}`);

    cantidad.addEventListener('input', (element) => {
        if(cartList[i].data.currency == 'UYU'){
            let costInUSD = Math.round((cartList[i].data.cost)/42);
            document.getElementById(`st-${cartList[i].data.id}`).innerText = `${(cantidad.value)*(costInUSD)} USD`
        }else{
            let costInUSD = cartList[i].data.cost;
            document.getElementById(`st-${cartList[i].data.id}`).innerText = `${(cantidad.value)*(costInUSD)} USD`
        }

        
        subtotalCompra = 0;
        for(let i = 0; i < cartList.length; i++){
            if(cartList[i].data.currency == 'UYU'){
                let costInUSD = Math.round((cartList[i].data.cost)/42);
                subtotalCompra += (document.getElementById(`c-${cartList[i].data.id}`).value)*costInUSD;
            }else{
                let costInUSD = cartList[i].data.cost;
                subtotalCompra += (document.getElementById(`c-${cartList[i].data.id}`).value)*costInUSD;
            }
        }
        localStorage.setItem('subtotal', subtotalCompra);
        document.getElementById("subtotal-compra").innerText = `${subtotalCompra} USD`
        document.getElementById("costo-de-envio").innerText = `${Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100))} USD`
        costoTotal = subtotalCompra + (Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100)));
        document.getElementById("costo-total").innerText = `${costoTotal} USD`
    });
}

let tiposDeEnvio = document.querySelectorAll('input[name="tipoEnvio"]');
let costoTotal = subtotalCompra + (Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100)));

document.getElementById("costo-de-envio").innerText = `${Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100))} USD`;
document.getElementById("costo-total").innerText = `${costoTotal} USD`;
for(let tipoDeEnvio of tiposDeEnvio){
    tipoDeEnvio.addEventListener('change', function(){
        tipoDeEnvioSeleccionado = tipoDeEnvio.value;
        costoTotal = subtotalCompra + (Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100)));
        document.getElementById("costo-de-envio").innerText = `${Math.round(subtotalCompra*(tipoDeEnvioSeleccionado/100))} USD`;
        document.getElementById("costo-total").innerText = `${costoTotal} USD`;
    });
}

//

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

// Example starter JavaScript for disabling form submissions if there are invalid fields

var form = document.querySelector('.needs-validation');

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