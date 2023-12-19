import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import gobheader from "../assets/gob-header.svg";

const navItems = [
  { title: "Home", path: "/" },
  { title: "Fondos", path: "/fondos" },
  { title: "Categorías", path: "/categorias" },
  { title: "Concursos", path: "/concurso" },
  { title: "Postulaciones", path: "/postulaciones" },
  { title: "Informes", path: "/informe" },
  { title: "Rubricas", path: "/rubrica" },
  { title: "Crear Concurso", path: "/concursos/concurso/create" },
  // Agrega más items aquí si es necesario
];

export const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path, event) => {
    event.preventDefault();
    navigate(path);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    console.log("Cerrar sesión");
    // Aquí asumo que rediriges al usuario a la página de inicio de sesión después del logout
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-lg navbar-lg">
      <div className="container">
        {/* Asume que tienes un logo en la carpeta de imágenes de tu proyecto */}
        <a className="navbar-brand" href="/" onClick={(e) => handleNavigate('/', e)}>
          <img src={gobheader}/>
        </a>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarNav">
          <div className="navbar-nav ml-auto">
            {navItems.map((item) => (
              <a key={item.title} className="nav-item nav-link" href={item.path} onClick={(e) => handleNavigate(item.path, e)}>
                {item.title}
              </a>
            ))}
            <button className="btn btn-primary" type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};