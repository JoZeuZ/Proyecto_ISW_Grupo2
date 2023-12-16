import { Link } from "react-router-dom";
import { getFondos } from "../../services/fondo.service.js";
import { useEffect, useState } from "react";

export const Fondos = () => {
  const [fondos, setFondos] = useState([]);

  useEffect(() => {
    getFondos().then((response) => {
      setFondos(response);
      console.log(fondos);
    });
  }, []);

  return (
    <div>
      <h1>Fondos</h1>

      <Link className="btn btn-pill-primary" to="/fondos/create">
        Crear fondo
      </Link>

      <ul>
        <br />
        {fondos.map((fondo) => (
          <li key={fondo._id}>
            <Link to={`/fondos/${fondo._id}`}>{fondo.nombre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
