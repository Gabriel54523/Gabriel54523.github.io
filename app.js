 // Productos de ejemplo
const productos = {
  electronica: [
    {id: 1, nombre: "Smartphone X", precio: 1200, img: ""}, {id: 2, nombre: "Laptop Pro", precio: 2500, img: ""},
    {id: 3, nombre: "Auriculares", precio: 150, img: ""}, {id: 4, nombre: "Smartwatch", precio: 300, img: ""},
    {id: 5, nombre: "Tablet", precio: 800, img: ""}, {id: 6, nombre: "Cámara", precio: 950, img: ""},
    {id: 7, nombre: "Monitor 4K", precio: 700, img: ""}, {id: 8, nombre: "Teclado mecánico", precio: 120, img: ""},
    {id: 9, nombre: "Mouse gamer", precio: 90, img: ""}, {id: 10, nombre: "Altavoz Bluetooth", precio: 110, img: ""}
  ],
  hogar: [
    {id: 11, nombre: "Aspiradora", precio: 400, img: ""}, {id: 12, nombre: "Licuadora", precio: 80, img: ""},
    {id: 13, nombre: "Microondas", precio: 250, img: ""}, {id: 14, nombre: "Cafetera", precio: 120, img: ""},
    {id: 15, nombre: "Plancha", precio: 60, img: ""}, {id: 16, nombre: "Ventilador", precio: 70, img: ""},
    {id: 17, nombre: "Refrigerador", precio: 1500, img: ""}, {id: 18, nombre: "Tostadora", precio: 45, img: ""},
    {id: 19, nombre: "Sartén", precio: 30, img: ""}, {id: 20, nombre: "Juego de cuchillos", precio: 55, img: ""}
  ],
  moda: [
    {id: 21, nombre: "Camisa casual", precio: 35, img: ""}, {id: 22, nombre: "Pantalón jeans", precio: 50, img: ""},
    {id: 23, nombre: "Vestido verano", precio: 70, img: ""}, {id: 24, nombre: "Zapatillas", precio: 90, img: ""},
    {id: 25, nombre: "Chaqueta", precio: 120, img: ""}, {id: 26, nombre: "Bolso", precio: 60, img: ""},
    {id: 27, nombre: "Gorra", precio: 20, img: ""}, {id: 28, nombre: "Bufanda", precio: 25, img: ""},
    {id: 29, nombre: "Reloj", precio: 150, img: ""}, {id: 30, nombre: "Cinturón", precio: 18, img: ""}
  ]
};

// Renderizar productos
function renderProductos() {
  for (const cat in productos) {
    const cont = document.getElementById('productos-' + cat);
    cont.innerHTML = '';
    productos[cat].forEach(prod => {
      cont.innerHTML += `
        <div class="bg-white rounded-lg shadow p-3 mb-4 flex flex-col items-center">
          <img src="${prod.img || 'https://via.placeholder.com/150?text=Imagen'}" class="w-full h-32 object-cover rounded mb-2" id="img-${prod.id}">
          <div class="font-bold">${prod.nombre}</div>
          <div class="text-green-700 font-semibold mb-2">$${prod.precio}</div>
          <div class="text-xs text-gray-400 mb-2">ID: ${prod.id}</div>
        </div>
      `;
    });
  }
}
renderProductos();

// Agregar producto
document.getElementById('formAgregarProducto').onsubmit = function(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const categoria = document.getElementById('categoria').value;
  const imagenInput = document.getElementById('imagen');
  let imgURL = "";

  if (imagenInput.files && imagenInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      imgURL = evt.target.result;
      agregarProducto(nombre, precio, categoria, imgURL);
    };
    reader.readAsDataURL(imagenInput.files[0]);
  } else {
    agregarProducto(nombre, precio, categoria, "");
  }
  this.reset();
};

function agregarProducto(nombre, precio, categoria, img) {
  const nuevoId = Math.max(...productos[categoria].map(p => p.id)) + 1;
  productos[categoria].push({id: nuevoId, nombre, precio, img});
  renderProductos();
}

// Editar precio
function editarPrecio() {
  const id = parseInt(document.getElementById('editId').value);
  const nuevoPrecio = parseFloat(document.getElementById('editPrecio').value);
  if (!id || !nuevoPrecio) {
    alert("Completa ambos campos para editar el precio.");
    return;
  }
  let encontrado = false;
  for (const cat in productos) {
    const prod = productos[cat].find(p => p.id === id);
    if (prod) {
      prod.precio = nuevoPrecio;
      encontrado = true;
      break;
    }
  }
  if (!encontrado) {
    alert("Producto no encontrado.");
  } else {
    renderProductos();
    alert("Precio actualizado.");
  }
}
window.editarPrecio = editarPrecio;

// ...existing code...

// Carrito y ventas
let carrito = [];
let ventas = [];

// Agregar al carrito desde cada producto
function agregarAlCarrito(id, categoria) {
  const prod = productos[categoria].find(p => p.id === id);
  if (prod) {
    carrito.push({...prod, categoria});
    alert("Producto agregado al carrito.");
  }
}

// Renderizar productos con botón "Agregar al carrito"
function renderProductos() {
  for (const cat in productos) {
    const cont = document.getElementById('productos-' + cat);
    cont.innerHTML = '';
    productos[cat].forEach(prod => {
      cont.innerHTML += `
        <div class="bg-white rounded-lg shadow p-3 mb-4 flex flex-col items-center">
          <img src="${prod.img || 'https://via.placeholder.com/150?text=Imagen'}" class="w-full h-32 object-cover rounded mb-2" id="img-${prod.id}">
          <div class="font-bold">${prod.nombre}</div>
          <div class="text-green-700 font-semibold mb-2">$${prod.precio}</div>
          <div class="text-xs text-gray-400 mb-2">ID: ${prod.id}</div>
          <button onclick="agregarAlCarrito(${prod.id}, '${cat}')" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mt-2">Agregar al carrito</button>
        </div>
      `;
    });
  }
}
renderProductos();

// Modal carrito
function verCarrito() {
  const modal = document.getElementById('modalCarrito');
  const cont = document.getElementById('carritoContenido');
  if (carrito.length === 0) {
    cont.innerHTML = "<p class='text-gray-500'>El carrito está vacío.</p>";
  } else {
    cont.innerHTML = carrito.map((item, i) =>
      `<div class="mb-2 flex justify-between items-center">
        <span>${item.nombre} (${item.categoria}) - $${item.precio}</span>
        <button onclick="quitarDelCarrito(${i})" class="text-red-600 ml-2">Quitar</button>
      </div>`
    ).join('') +
    `<button onclick="finalizarCompra()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 w-full">Finalizar compra</button>`;
  }
  modal.classList.remove('hidden');
}
function cerrarCarrito() {
  document.getElementById('modalCarrito').classList.add('hidden');
}
function quitarDelCarrito(idx) {
  carrito.splice(idx, 1);
  verCarrito();
}

// Finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) return;
  const metodo = document.getElementById('metodoPago').value;
  ventas.push({
    productos: [...carrito],
    metodo,
    fecha: new Date().toLocaleString()
  });
  carrito = [];
  cerrarCarrito();
  alert("¡Compra realizada con " + metodo + "!");
}

// Modal ventas
function verVentas() {
  const modal = document.getElementById('modalVentas');
  const cont = document.getElementById('ventasContenido');
  if (ventas.length === 0) {
    cont.innerHTML = "<p class='text-gray-500'>No hay ventas registradas.</p>";
  } else {
    cont.innerHTML = ventas.map(v =>
      `<div class="mb-3 border-b pb-2">
        <div class="font-semibold">Fecha: ${v.fecha}</div>
        <div>Método: ${v.metodo}</div>
        <ul class="list-disc ml-5">
          ${v.productos.map(p => `<li>${p.nombre} (${p.categoria}) - $${p.precio}</li>`).join('')}
        </ul>
      </div>`
    ).join('');
  }
  modal.classList.remove('hidden');
}
function cerrarVentas() {
  document.getElementById('modalVentas').classList.add('hidden');
}

// Mostrar sección actual en la barra superior
function actualizarSeccionActual() {
  const secciones = ["Electrónica", "Hogar", "Moda"];
  const idx = document.activeElement.closest("section")?.querySelector("h2")?.textContent || "";
  document.getElementById('seccionActual').textContent = idx ? "Sección: " + idx : "";
}
document.querySelectorAll("main section").forEach(sec => {
  sec.addEventListener("mouseenter", actualizarSeccionActual);
});