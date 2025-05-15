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
        this.productos = [];
    }

    añadirProducto(producto) {
        this.productos.push(producto);
        this.generarFactura();
    }

    generarFactura() {
        const factura = this.productos.map(producto => {
            return `Producto: ${producto.nombre}, Precio: $${producto.precio.toFixed(2)}`;
        }).join('\n');
        const total = this.productos.reduce((acc, producto) => acc + producto.precio, 0);
        document.getElementById('factura').innerText = `Factura:\n${factura}\n\nTotal: $${total.toFixed(2)}`;
    }

    limpiarCarrito() {
        this.productos = [];
        this.generarFactura();
    }
}

// Clase principal para manejar el sistema de registro de productos
class SistemaRegistro {
    constructor() {
        this.productos = [];
        this.carrito = new Carrito();
        this.idProducto = 1;
        this.init();
    }

    init() {
        // Eventos para manejar el formulario de registro
        document.getElementById('formularioRegistro').addEventListener('submit', (event) => {
            event.preventDefault();
            this.registrarProducto();
        });

        // Eventos para manejar la navegación
        document.getElementById('navInicio').addEventListener('click', () => {
            this.mostrarSeccion('factura');
        });

        document.getElementById('navProductos').addEventListener('click', () => {
            this.mostrarSeccion('productos');
        });

        document.getElementById('navContacto').addEventListener('click', () => {
            this.mostrarSeccion('contacto');
        });

        // Evento para generar un número de cuenta aleatorio
        document.getElementById('generarNumeroCuenta').addEventListener('click', () => {
            this.generarNumeroCuenta();
        });
    }

    registrarProducto() {
        const nombre = document.getElementById('nombre').value.trim();
        const precio = parseFloat(document.getElementById('precio').value);

        if (nombre && !isNaN(precio) && precio >= 1 && precio <= 100000) {
            const nuevoProducto = new Producto(this.idProducto++, nombre, precio);
            this.productos.push(nuevoProducto);
            this.actualizarListaProductos();
            document.getElementById('formularioRegistro').reset();
        } else {
            alert('El precio debe estar entre 1 y 100,000 pesos y el nombre no puede estar vacío.');
        }
    }

    actualizarListaProductos() {
        const listaProductos = document.getElementById('listaProductos');
        listaProductos.innerHTML = '';
        this.productos.forEach(producto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td><button onclick="sistemaRegistro.añadirAlCarrito(${producto.id})">Añadir</button></td>
            `;
            listaProductos.appendChild(fila);
        });
    }

    añadirAlCarrito(id) {
        const producto = this.productos.find(p => p.id === id);
        if (producto) {
            this.carrito.añadirProducto(producto);
        } else {
            alert('Producto no encontrado.');
        }
    }

    mostrarSeccion(seccion) {
        // Oculta todas las secciones
        ['factura', 'productos', 'contacto'].forEach(id => {
            document.getElementById(id).style.display = 'none';
        });

        // Muestra la sección seleccionada
        document.getElementById(seccion).style.display = 'block';
    }

    generarNumeroCuenta() {
        const numeroCuenta = Math.floor(Math.random() * 1000000000);
        document.getElementById('numeroCuenta').innerText = `Número de Cuenta: ${numeroCuenta}`;
    }
}

// Inicializa el sistema de registro
const sistemaRegistro = new SistemaRegistro();