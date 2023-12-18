import { Link } from "react-router-dom";
import { getFondos } from "../../services/fondo.service.js";
import { useEffect, useState } from "react";
import "../../index.css";

export const Fondos = () => {
  const [fondos, setFondos] = useState([]);
  const [filtro, setFiltro] = useState(""); // Estado para el filtro de búsqueda

  useEffect(() => {
    getFondos().then((response) => {
      setFondos(response);
      console.log(fondos);
    });
  }, []);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setFiltro(e.target.value.toLowerCase());
  };

   // Filtrar fondos según el texto ingresado en el campo de búsqueda
   const fondosFiltrados = fondos.filter(fondo => fondo.nombre.toLowerCase().includes(filtro));

   return (
    <div>
      <h1>Fondos</h1>

      <Link className="btn btn-pill-primary btn-sm" to="/fondos/create">Crear fondo</Link>

      {/* Barra de búsqueda */}
      <input className= "search-bar" type="text" placeholder="Buscar fondo..." onChange={handleSearchChange} />

      <div className="fondos-grid">
        {fondosFiltrados.map((fondo) => (
          <div key={fondo._id} className="card">
            <div className="card-body">
              <h5 className="card-title">{fondo.nombre}</h5>
              {/* Agrega más información del fondo aquí */}
              <Link to={`/fondos/${fondo._id}`} className="btn btn-primary btn-sm btn-action">Ver detalles</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};