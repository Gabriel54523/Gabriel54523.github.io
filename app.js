class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

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
}

class SistemaRegistro {
    constructor() {
        this.productos = [];
        this.carrito = new Carrito();
        this.idProducto = 1;
        this.init();
    }

    init() {
        document.getElementById('formularioRegistro').addEventListener('submit', (event) => {
            event.preventDefault();
            this.registrarProducto();
        });

        document.getElementById('navInicio').addEventListener('click', () => {
            this.mostrarSeccion('factura');
        });

        document.getElementById('navProductos').addEventListener('click', () => {
            this.mostrarSeccion('productos');
        });

        document.getElementById('navContacto').addEventListener('click', () => {
            this.mostrarSeccion('contacto');
        });

        document.getElementById('generarNumeroCuenta').addEventListener('click', () => {
            this.generarNumeroCuenta();
        });
    }

    registrarProducto() {
        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);

        if (nombre && !isNaN(precio) && precio >= 1 && precio <= 100000) {
            const nuevoProducto = new Producto(this.idProducto++, nombre, precio);
            this.productos.push(nuevoProducto);
            this.actualizarListaProductos();
            document.getElementById('formularioRegistro').reset();
        } else {
            alert('El precio debe estar entre 1 y 100,000 pesos.');
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
        this.carrito.añadirProducto(producto);
    }

    mostrarSeccion(seccion) {
        document.getElementById('factura').style.display = 'none';
        document.getElementById('productos').style.display = 'none';
        document.getElementById('contacto').style.display = 'none';
        document.getElementById(seccion).style.display = 'block';
    }

    generarNumeroCuenta() {
        const numeroCuenta = Math.floor(Math.random() * 1000000000);
        document.getElementById('numeroCuenta').innerText = `Número de Cuenta: ${numeroCuenta}`;
    }
}

class Publicacion {
    constructor(contenido) {
        this.contenido = contenido;
        this.fecha = new Date();
    }
}

class Mensaje {
    constructor(contenido) {
        this.contenido = contenido;
        this.fecha = new Date();
    }
}

class RedSocial {
    constructor() {
        this.publicaciones = [];
        this.mensajes = [];
        this.init();
    }

    init() {
        document.getElementById('formularioPublicacion').addEventListener('submit', (event) => {
            event.preventDefault();
            this.publicar();
        });

        document.getElementById('formularioMensaje').addEventListener('submit', (event) => {
            event.preventDefault();
            this.enviarMensaje();
        });

        document.getElementById('navInicio').addEventListener('click', () => {
            this.mostrarSeccion('inicio');
        });

        document.getElementById('navPerfil').addEventListener('click', () => {
            this.mostrarSeccion('perfil');
        });

        document.getElementById('navMensajes').addEventListener('click', () => {
            this.mostrarSeccion('mensajes');
        });

        document.getElementById('editarPerfil').addEventListener('click', () => {
            this.editarPerfil();
        });
    }

    publicar() {
        const contenido = document.getElementById('publicacion').value;
        const nuevaPublicacion = new Publicacion(contenido);
        this.publicaciones.push(nuevaPublicacion);
        this.actualizarListaPublicaciones();
        document.getElementById('formularioPublicacion').reset();
    }

    actualizarListaPublicaciones() {
        const listaPublicaciones = document.getElementById('listaPublicaciones');
        listaPublicaciones.innerHTML = '';
        this.publicaciones.forEach(publicacion => {
            const div = document.createElement('div');
            div.className = 'publicacion';
            div.innerHTML = `
                <p>${publicacion.contenido}</p>
                <small>${publicacion.fecha.toLocaleString()}</small>
            `;
            listaPublicaciones.appendChild(div);
        });
    }

    enviarMensaje() {
        const contenido = document.getElementById('mensaje').value;
        const nuevoMensaje = new Mensaje(contenido);
        this.mensajes.push(nuevoMensaje);
        this.actualizarListaMensajes();
        document.getElementById('formularioMensaje').reset();
    }

    actualizarListaMensajes() {
        const listaMensajes = document.getElementById('listaMensajes');
        listaMensajes.innerHTML = '';
        this.mensajes.forEach(mensaje => {
            const div = document.createElement('div');
            div.className = 'mensaje';
            div.innerHTML = `
                <p>${mensaje.contenido}</p>
                <small>${mensaje.fecha.toLocaleString()}</small>
            `;
            listaMensajes.appendChild(div);
        });
    }

    mostrarSeccion(seccion) {
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('perfil').style.display = 'none';
        document.getElementById('mensajes').style.display = 'none';
        document.getElementById(seccion).style.display = 'block';
    }

    editarPerfil() {
        const nuevoNombre = prompt('Ingrese su nuevo nombre:');
        if (nuevoNombre) {
            document.getElementById('nombrePerfil').innerText = nuevoNombre;
        }
    }
}

const sistemaRegistro = new SistemaRegistro();
const redSocial = new RedSocial();
