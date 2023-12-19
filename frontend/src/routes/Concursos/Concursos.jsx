import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConcursos } from "../../services/concurso.service.js";

const Concursos = () => {
  const navigate = useNavigate();
  const [concursos, setConcursos] = useState([]);

  useEffect(() => {
    getConcursos().then((response) => {
      setConcursos(response);
    });
  }, []);

  const handlePostular = (id) => {
    navigate(`/postular/${id}`);
  };

  const handleVolverAlLogin = () => {
    navigate('/auth');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-3">Concursos Disponibles</h1>
      <div className="text-right mb-3">
        <button onClick={handleVolverAlLogin} className="btn btn-link">Volver al Login</button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Nombre</th>
              <th>Bases</th>
              <th>Fecha de inicio</th>
              <th>Fecha de fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {concursos.map((concurso) => (
              <tr key={concurso._id}>
                <td>{concurso.nombre}</td>
                <td>{concurso.bases}</td>
                <td>{concurso.fechaInicio}</td>
                <td>{concurso.fechaFin}</td>
                <td>
                  <button onClick={() => handlePostular(concurso._id)} className="btn btn-primary">
                    Postular
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Concursos;
