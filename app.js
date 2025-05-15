 // Clase para representar un producto
class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Clase para manejar el carrito de compras
class Carrito {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem('carrito')) || [];
    }

    añadirProducto(producto) {
        const existente = this.productos.find(p => p.id === producto.id);
        if (existente) {
            alert('El producto ya está en el carrito.');
        } else {
            this.productos.push(producto);
        }
        this.guardarCarrito();
        this.generarFactura();
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
        this.guardarCarrito();
        this.generarFactura();
    }

    generarFactura() {
        if (this.productos.length === 0) {
            document.getElementById('factura').innerText = 'El carrito está vacío. Agrega productos para generar una factura.';
            return;
        }

        const factura = this.productos.map(producto => {
            return `Producto: ${producto.nombre}, Precio: $${producto.precio.toFixed(2)}`;
        }).join('\n');
        const total = this.productos.reduce((acc, producto) => acc + producto.precio, 0);
        document.getElementById('factura').innerText = `Factura:\n${factura}\n\nTotal: $${total.toFixed(2)}`;
    }

    limpiarCarrito() {
        this.productos = [];
        this.guardarCarrito();
        this.generarFactura();
    }

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.productos));
    }
}

// Clase principal para manejar el sistema de registro de productos
class SistemaRegistro {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem('productos')) || [];
        this.carrito = new Carrito();
        this.idProducto = this.productos.length ? this.productos[this.productos.length - 1].id + 1 : 1;
        this.init();
    }

    init() {
        // Eventos para manejar el formulario de registro
        document.getElementById('formularioRegistro').addEventListener('submit', (event) => {
            event.preventDefault();
            this.registrarProducto();
        });

        // Evento para vaciar el carrito
        document.getElementById('vaciarCarrito').addEventListener('click', () => {
            this.carrito.limpiarCarrito();
        });

        // Cargar productos y carrito al iniciar
        this.actualizarListaProductos();
        this.carrito.generarFactura();
        this.mostrarEstadisticas();
    }

    registrarProducto() {
        const nombre = document.getElementById('nombre').value.trim();
        const precio = parseFloat(document.getElementById('precio').value);

        if (nombre && !isNaN(precio) && precio > 0) {
            const nuevoProducto = new Producto(this.idProducto++, nombre, precio);
            this.productos.push(nuevoProducto);
            this.guardarProductos();
            this.actualizarListaProductos();
            this.mostrarEstadisticas();
            document.getElementById('formularioRegistro').reset();
        } else {
            alert('Todos los campos son obligatorios y deben tener valores válidos.');
        }
    }

    actualizarListaProductos() {
        const listaProductos = document.getElementById('listaProductos');
        listaProductos.innerHTML = '';

        if (this.productos.length === 0) {
            listaProductos.innerHTML = '<tr><td colspan="5">No hay productos registrados.</td></tr>';
            return;
        }

        this.productos.forEach(producto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>
                    <button onclick="sistemaRegistro.editarProducto(${producto.id})">Editar</button>
                    <button onclick="sistemaRegistro.eliminarProducto(${producto.id})">Eliminar</button>
                    <button onclick="sistemaRegistro.añadirAlCarrito(${producto.id})">Añadir al Carrito</button>
                </td>
            `;
            listaProductos.appendChild(fila);
        });
    }

    editarProducto(id) {
        const producto = this.productos.find(p => p.id === id);
        if (producto) {
            const nuevoNombre = prompt('Nuevo nombre del producto:', producto.nombre);
            const nuevoPrecio = parseFloat(prompt('Nuevo precio del producto:', producto.precio));

            if (nuevoNombre && !isNaN(nuevoPrecio) && nuevoPrecio > 0) {
                producto.nombre = nuevoNombre;
                producto.precio = nuevoPrecio;
                this.guardarProductos();
                this.actualizarListaProductos();
                this.mostrarEstadisticas();
            } else {
                alert('Datos inválidos. No se realizaron cambios.');
            }
        } else {
            alert('Producto no encontrado.');
        }
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
        this.guardarProductos();
        this.actualizarListaProductos();
        this.mostrarEstadisticas();
    }

    añadirAlCarrito(id) {
        const producto = this.productos.find(p => p.id === id);
        if (producto) {
            this.carrito.añadirProducto(producto);
        } else {
            alert('Producto no encontrado.');
        }
    }

    mostrarEstadisticas() {
        const totalProductos = this.productos.length;
        const valorInventario = this.productos.reduce((acc, producto) => acc + producto.precio, 0);
        document.getElementById('estadisticas').innerText = `Total de productos: ${totalProductos}, Valor total del inventario: $${valorInventario.toFixed(2)}`;
    }

    guardarProductos() {
        localStorage.setItem('productos', JSON.stringify(this.productos));
    }
}

// Inicializa el sistema de registro
const sistemaRegistro = new SistemaRegistro();