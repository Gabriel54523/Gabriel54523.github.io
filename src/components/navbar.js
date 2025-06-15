import React from 'react';

const Navbar = () => {
    const toggleMenu = () => {
        const menu = document.getElementById('navbar-menu');
        menu.classList.toggle('hidden');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/">Red Social</a>
                <button onClick={toggleMenu} className="navbar-toggler">
                    ☰
                </button>
            </div>
            <div id="navbar-menu" className="navbar-menu hidden">
                <ul>
                    <li><a href="/home">Inicio</a></li>
                    <li><a href="/profile">Perfil</a></li>
                    <li><a href="/messages">Mensajes</a></li>
                    <li><a href="/settings">Configuración</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;