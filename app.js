 class Noticia {
    constructor(id, titulo, descripcion, fecha) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
}

class SistemaNoticias {
    constructor() {
        this.noticias = JSON.parse(localStorage.getItem('noticias')) || [];
        this.idNoticia = this.noticias.length ? this.noticias[this.noticias.length - 1].id + 1 : 1;
        this.init();
    }

    init() {
        // Manejar el evento de envío del formulario
        document.getElementById('formularioNoticia').addEventListener('submit', (event) => {
class Noticia {
    constructor(id, titulo, descripcion, fecha) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
}

class SistemaNoticias {
    constructor() {
        this.noticias = JSON.parse(localStorage.getItem('noticias')) || [];
        this.idNoticia = this.noticias.length ? this.noticias[this.noticias.length - 1].id + 1 : 1;
        this.init();
    }

    init() {
        // Manejar el evento de envío del formulario
        document.getElementById('formularioNoticia').addEventListener('submit', (event) => {