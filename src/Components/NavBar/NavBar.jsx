import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
    return (
        <main>
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-index">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>
                        <img className="logoMain" src='https://res.cloudinary.com/dw94zgfgu/image/upload/v1642984158/logo-main2_oq8nxa.png' alt="logo-main" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse nav-index" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to={'/'}>
                                    Inicio
                                </Link>
                            </li>
                            <span className="separador">|</span>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/'}>
                                    Informes
                                </Link>
                            </li>
                            <span className="separador">|</span>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={'/'} id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Historias clínicas
                                </Link>
                                <ul className="dropdown-menu submenu-boot" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={'/formOrder'}>
                                        <li>
                                            Crear
                                        </li>
                                    </Link>
                                    <Link className="dropdown-item" to={'/consultar'}>
                                        <li>
                                            Consultar
                                        </li>
                                    </Link>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </main>
    )
}

export default NavBar;
