class Carrito {

    constructor(lista = []) {
        this.carrito = lista;
    }

    agregarAlCarrito({codigo, descripcion, img, precio }){

        const index = this.carrito.findIndex(producto => producto.codigo == codigo);

        if (index == -1) {
            this.carrito.push({ codigo, descripcion, precio, unidad: 1 });
        } else {
            this.carrito[index].unidad += 1;
        }

        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }

    getProductos() {
        return this.carrito;
    }

    getContar() {
        const contar = this.carrito.reduce((cantidad, producto) => { return cantidad + producto.unidad; }, 0);
        return contar;
    }

    getSumar() {
        return this.carrito.reduce((sumar, producto) => { return sumar + (producto.unidad * producto.precio); }, 0);
    }

    borrarCarrito(){
        listaProductosModal.innerHTML = '';
        
        localStorage.setItem('carrito', []);
    }

    
}