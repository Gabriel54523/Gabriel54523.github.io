// Archivo principal de la aplicación de la red social
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.createElement('div');
    navbar.id = 'navbar';
    document.body.prepend(navbar);

    // Función para mostrar la barra de navegación
    function showNavbar() {
        navbar.style.display = 'block';
    }

    // Función para ocultar la barra de navegación
    function hideNavbar() {
        navbar.style.display = 'none';
    }

    // Lógica para manejar la interacción del usuario
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Navbar';
    toggleButton.addEventListener('click', () => {
        if (navbar.style.display === 'none' || navbar.style.display === '') {
            showNavbar();
        } else {
            hideNavbar();
        }
    });

    document.body.appendChild(toggleButton);
});