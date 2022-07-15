//CLASE PRODUCTO
class producto {
    constructor(nombreProd, precioProd, descuentoProd) {
        this.nombre=nombreProd.toUpperCase();
        this.precio=parseFloat(precioProd);
        this.descuento=parseFloat(descuentoProd);
    }
    //al precio neto del producto le aplico el descuento informado y le agrego el IVA para obtener el precio final.
    calcularPrecioFinal() {
        this.precio = (this.precio - (this.precio * (this.descuento/100)))*1.21;
    }
}

//CLASE FACTURA
class factura {
    constructor(productos, montoFactura) {
        this.fechaFactura = new Date();
        this.detalleFactura = productos;
        this.montoFactura = montoFactura;
    }
    //sumo el precio final de cada uno de los articulos en el carrito.
    calcularTotal() {
        //creo un array con todos los precios de los productos del carrito.
        const precios = this.detalleFactura.map((prod) => prod.precio);
        //sumo el precio final de cada uno de los productos del carrito.
        this.montoFactura = precios.reduce((montoFactura,precioProducto) => montoFactura + precioProducto,0);
    }
    //Muestra los datos de la factura.
    mostrarFactura() {
        console.log("Fecha de factura: "+this.fechaFactura+"\nDetalle de los Productos:\n");
        for(const prod of this.detalleFactura){
            console.log(" - Nombre del Producto: "+prod.nombre+" - Precio: $"+prod.precio+" - descuento: "+prod.descuento+"%\n");
        }
        console.log("Monto Final Factura: $"+this.montoFactura);
    }
}

//Función para agregar producto al carrito.
function agregarProductoCarrito(productosCarrito) {
    let nombreProducto;
    let precio;
    let descuento;
    nombreProducto = prompt("Ingrese nombre del producto a agregar al carrito.");
    precio = parseFloat(prompt("Ingrese precio del producto"));
    //Valido que el precio ingresado no sea negativo.
    while(precio<=0) {
        precio = parseFloat(prompt("Precio del producto ingresado incorrecto, debe ingresar un precio mayor a cero"));
    }
    //valido que el descuento ingresado sea un valor entre el 0% (sin descuento) y el 100% (regalo)
    descuento = parseFloat(prompt("Ingrese porcentaje de descuento que tiene el producto, número entre 0 y 100"));
    while(descuento<0 || descuento>100){
        descuento = parseFloat(prompt("Valor de descuento ingresado incorrecto, debe ser un numero entre 0 y 100"));
    }
    productoActual=new producto(nombreProducto,precio,descuento);
    productoActual.calcularPrecioFinal();
    productosCarrito.push(productoActual);
}

//Función para quitar un producto del carrito.
function quitarProductoCarrito(productosCarrito) {
    let nombreProducto;
    nombreProducto = prompt("Ingrese nombre del producto a quitar del carrito.").toUpperCase();
    if(productosCarrito.some((prod) => prod.nombre === nombreProducto)){
        const productoAEliminar = productosCarrito.find((prod) => prod.nombre === nombreProducto);
        productos.splice(productosCarrito.indexOf(productoAEliminar),1);
    }else{
        alert("El producto ingresado no está en el carrito.");
    }
}

//main
let productos = [];
let productoActual;
let opcionMenu = prompt("Ingrese la opción que corresponda:\nIngrese A para agregar producto al carrito\nIngrese B para quitar producto del carrito\nIngrese ESC para finalizar compra.");

//Switch con las opciones del menú
while(opcionMenu.toUpperCase() != 'ESC'){
    switch(opcionMenu){
        case "A":
            //Agregar producto al carrito.
            agregarProductoCarrito(productos);
            break;
        case "B":
            //Valido que el carrito no este vacio antes de intentar quitar un producto del carrito.
            if(productos.length>0){
                //quitar producto del carrito.
                quitarProductoCarrito(productos);
            }else{
                alert("No hay productos cargados en el carrito actualmente.")
            }
            break;
    }
    opcionMenu = prompt("Ingrese la opción que corresponda:\nIngrese A para agregar producto al carrito\nIngrese B para quitar producto del carrito\nIngrese ESC para finalizar compra.");
}

//Creo factura con los productos cargados en el carrito, calculo total de la factura y muestro los datos de la misma por la consola.
const facturaFinal = new factura(productos,0);
facturaFinal.calcularTotal();
facturaFinal.mostrarFactura();