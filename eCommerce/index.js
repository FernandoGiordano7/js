const modal = new bootstrap.Modal('#modalCarrito', {});
const btnModal = document.querySelector('#btnModal');
const carritoContar = document.querySelector('#carritoContar');
const sumaCarrito = document.querySelector('#sumaCarrito');
const inputBuscar = document.querySelector('#inputBuscar');
const listaProductos = document.querySelector('#listaProductos');
const listaProductosModal = document.querySelector('#listaProductosModal');
const btnCerrar = document.querySelector('#btnCerrar');
const btnGuardar = document.querySelector('#btnGuardar');
const btnOrdenarMenor = document.querySelector('#btnOrdenarMenor');
const btnOrdenarMayor = document.querySelector('#btnOrdenarMayor');

let productos = [];

const listaCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];
const carrito = new Carrito(listaCarrito); 

carritoContar.innerText = carrito.getContar();

btnModal.addEventListener('click', function(){
    const lista = carrito.getProductos();
    sumaCarrito.innerText = carrito.getSumar();

    renderCarrito( lista );

    modal.show();
})

btnGuardar.addEventListener('click', ()=> {

    modal.hide();
    console.log('compra finalizada');

    localStorage.removeItem('carrito');
})

btnCerrar.addEventListener('click', ()=> {
    modal.hide();
})

inputBuscar.addEventListener('input', (event) => {

    const buscar = event.target.value; 

    const newLista = productos.filter(  (product) => product.descripcion.toLowerCase().includes( buscar.toLowerCase() )  );
    renderProductos(newLista);
})

btnOrdenarMayor.addEventListener('click', ()=> {

    productos.sort(  (a, b ) => {
        if(  a.precio < b.precio  ){
            return 1
        }
        if ( a.precio > b.precio){
            return -1
        }
        return 0
    })

    renderProductos(productos)
    btnOrdenarMayor.setAttribute('disabled', true)
})

btnOrdenarMenor.addEventListener('click', ()=> {
    productos.sort(  (a, b ) => {
        if(  a.precio < b.precio ){
            return -1
        }
        if ( a.precio > b.precio){
            return 1
        }
        return 0
    })

    renderProductos(productos)
    btnOrdenarMenor.setAttribute('disabled', true)
})


const renderProductos = (lista) => {
    listaProductos.innerHTML = '';
    lista.forEach(producto => {
        listaProductos.innerHTML += // html
            `<div class="col-6">
            <div class="card mb-3" style="min-height:200px">
                <div class="row g-0">
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.descripcion}</h5>
                            <p class="card-text"><small class="text-body-secondary">Rubro: ${producto.rubro}</small></p>
                            <h4 class="card-title">Precio: $${producto.precio}</h4>
                        </div>
                        <button id="${producto.codigo}" class="btnAgregarAlCarrito">Comprar</button>
                    </div>
                <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="..."
                    style="max-height: 150px;">
                </div>
            </div>
        </div>`;
    });


    //Eventos
    const botones = document.querySelectorAll('.btnAgregarAlCarrito');
    
    botones.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
        
    });
    console.log(botones);

}

const agregarAlCarrito = ( e )=> {

    const codigo = e.target.id;
    const producto = productos.find( item => item.codigo == codigo );

    console.table(producto);

    carrito.agregarAlCarrito(producto);

    carritoContar.innerText = carrito.getContar();

}


const renderCarrito = (lista) => {

    listaProductosModal.innerHTML = '';

    lista.forEach( producto => {
        listaProductosModal.innerHTML += // html

            `<tr>
                <td> ${producto.descripcion} </td>
                <td> ${producto.unidad}</td>
                <td>$${producto.precio}</td>
                <td>$${producto.precio * producto.unidad}</td>
            </tr>`

    });
}

const getProductos = async () => {

    try {
        const endPoint = 'productos.json';

        const resp = await fetch(endPoint);

        const json = await resp.json();

        console.log(json);


        const productos = json.productos
        renderProductos(productos);
    } catch (error) {
        alert('error')
    }


}


getProductos();




