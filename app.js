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
        document.getElementById('formularioNoticia').addEventListener('submit', (event) => {
            event.preventDefault();
            this.agregarNoticia();
        });

        this.mostrarNoticias();
    }

    agregarNoticia() {
        const titulo = document.getElementById('titulo').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const fecha = document.getElementById('fecha').value;

        if (titulo && descripcion && fecha) {
            const nuevaNoticia = new Noticia(this.idNoticia++, titulo, descripcion, fecha);
            this.noticias.push(nuevaNoticia);
            this.guardarNoticias();
            this.mostrarNoticias();
            document.getElementById('formularioNoticia').reset();
        } else {
            alert('Todos los campos son obligatorios.');
        }
    }

    eliminarNoticia(id) {
        this.noticias = this.noticias.filter(noticia => noticia.id !== id);
        this.guardarNoticias();
        this.mostrarNoticias();
    }

    mostrarNoticias() {
        const listaNoticias = document.getElementById('listaNoticias');
        listaNoticias.innerHTML = '';

        if (this.noticias.length === 0) {
            listaNoticias.innerHTML = '<p>No hay noticias disponibles.</p>';
            return;
        }

        this.noticias.forEach(noticia => {
            const div = document.createElement('div');
            div.classList.add('noticia');
            div.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
                <p class="fecha">Fecha: ${noticia.fecha}</p>
                <button onclick="sistemaNoticias.eliminarNoticia(${noticia.id})">Eliminar</button>
            `;
            listaNoticias.appendChild(div);
        });
    }

    guardarNoticias() {
        localStorage.setItem('noticias', JSON.stringify(this.noticias));
    }
}

const sistemaNoticias = new SistemaNoticias();
