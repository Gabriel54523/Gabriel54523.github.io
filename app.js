 // Clase para representar un producto
class Producto {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

// Clase para manejar el carrito de compras
class Carrito {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem('carrito')) || [];
    }

    añadirProducto(producto, cantidad) {
        const existente = this.productos.find(p => p.id === producto.id);
        if (existente) {
            existente.cantidad += cantidad;
        } else {
            this.productos.push({ ...producto, cantidad });
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
            const subtotal = producto.precio * producto.cantidad;
            return `Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: $${producto.precio.toFixed(2)}, Subtotal: $${subtotal.toFixed(2)}`;
        }).join('\n');

        const total = this.productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        const iva = total * 0.16; // 16% de IVA
        const totalConIva = total + iva;

        document.getElementById('factura').innerText = `Factura:\n${factura}\n\nTotal: $${total.toFixed(2)}\nIVA (16%): $${iva.toFixed(2)}\nTotal con IVA: $${totalConIva.toFixed(2)}`;
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
        this.ventasTotales = JSON.parse(localStorage.getItem('ventasTotales')) || 0;
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
        const cantidad = parseInt(document.getElementById('cantidad').value);

        if (nombre && !isNaN(precio) && precio > 0 && !isNaN(cantidad) && cantidad > 0) {
            const existente = this.productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
            if (existente) {
                alert('El producto ya existe. Puedes editarlo si deseas cambiar sus detalles.');
                return;
            }

            const nuevoProducto = new Producto(this.idProducto++, nombre, precio, cantidad);
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
                <td>${producto.cantidad}</td>
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
            const nuevaCantidad = parseInt(prompt('Nueva cantidad del producto:', producto.cantidad));

            if (nuevoNombre && !isNaN(nuevoPrecio) && nuevoPrecio > 0 && !isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                producto.nombre = nuevoNombre;
                producto.precio = nuevoPrecio;
                producto.cantidad = nuevaCantidad;
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
            const cantidad = parseInt(prompt('Cantidad a añadir al carrito:', 1));
            if (!isNaN(cantidad) && cantidad > 0 && cantidad <= producto.cantidad) {
                producto.cantidad -= cantidad;
                this.carrito.añadirProducto(producto, cantidad);
                this.guardarProductos();
                this.actualizarListaProductos();
                this.mostrarEstadisticas();
            } else {
                alert('Cantidad inválida o insuficiente en el inventario.');
            }
        } else {
            alert('Producto no encontrado.');
        }
    }

    mostrarEstadisticas() {
        const totalProductos = this.productos.length;
        const valorInventario = this.productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        document.getElementById('estadisticas').innerText = `Total de productos: ${totalProductos}, Valor total del inventario: $${valorInventario.toFixed(2)}, Ventas totales: $${this.ventasTotales.toFixed(2)}`;
    }

    guardarProductos() {
        localStorage.setItem('productos', JSON.stringify(this.productos));
    }
}

// Inicializa el sistema de registro
const sistemaRegistro = new SistemaRegistro();