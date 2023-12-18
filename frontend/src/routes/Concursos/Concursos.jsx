import { useNavigate } from "react-router-dom";
import { getConcursos } from "../../services/concurso.service.js";
import { useState, useEffect } from "react";

const Concursos = () => {
  const navigate = useNavigate();

  const handlePostular = (id) => {
    navigate(`/postular/${id}`); 
  };

  const handleVolverAlLogin = () => {
    navigate('/auth'); 
  };

  const [concursos, setConcursos] = useState([]);

  useEffect(() => {
    getConcursos().then((response) => {
      setConcursos(response);
      console.log(response);
    });
  }, []);

  return (
    <>
      <div>
        <h1>Concursos</h1>
        <button onClick={handleVolverAlLogin}>Volver al Login</button>
        <table border="1">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Bases</th>
              <th>Fecha de inicio</th>
              <th>Fecha de fin</th>
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
                <button onClick={() => handlePostular(concurso._id)}>
                    Postular
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Concursos;
