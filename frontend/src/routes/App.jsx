import React from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
// Importa tus imágenes y estilos si los tienes

function App() {
  return (
    <div className="main-container">
      <section className="hero">
        <h1>Bienvenido a la plataforma de gestión de concursos</h1>
        <p>La manera fácil y rápida de organizar y gestionar concursos.</p>
        <Link to="/concurso" className="btn btn-primary">Explorar Concursos</Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Crear Concurso</h3>
          <p>Crea un nuevo concurso con unos pocos clics.</p>
          <Link to="/concursos/concurso/create" className="btn btn-secondary">Crear</Link>
        </div>
        {/* Repite para otras características */}
      </section>

      <section className="how-to">
        <h2>Cómo utilizar la plataforma</h2>
        <p>Descubre cómo puedes sacar el máximo partido a nuestra aplicación.</p>
        {/* Contenido o instrucciones adicionales */}
      </section>

      <footer className="footer">
        {/* Información del pie de página */}
      </footer>
    </div>
  );
}

export default App;
