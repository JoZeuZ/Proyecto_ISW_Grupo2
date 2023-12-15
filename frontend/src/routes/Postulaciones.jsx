import { getPostulaciones } from "../services/postulacion.service";
import { useEffect, useState } from "react";



const Postulaciones = () => {

  const [postulaciones, setPostulaciones] = useState([]);

  useEffect(() => {
    getPostulaciones().then((response) => {
      setPostulaciones(response);
    });
    console.log(postulaciones);
  }, []);

  return (
    <>
      <h1>Postulaciones</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre Postulante</th>
            <th>RUT Postulante</th>
            <th>Correo Electronico</th>
            <th>Nombre Empresa</th>
            <th>RUT Empresa</th>
            <th>Tema Proyecto</th>
            <th>Propuesta Proyecto</th>
            <th>Respaldo Postulacion</th>
            <th>Concurso</th>
          </tr>
        </thead>
        <tbody>
          {postulaciones.map((postulacion) => (
            <tr key={postulacion._id}>
              <td>{postulacion.nombrePostulante}</td>
              <td>{postulacion.rutPostulante}</td>
              <td>{postulacion.correoElectronico}</td>
              <td>{postulacion.nombreEmpresa}</td>
              <td>{postulacion.rutEmpresa}</td>
              <td>{postulacion.temaProyecto}</td>
              <td>{postulacion.propuestaProyecto}</td>
              <td>{postulacion.respaldoPostulacion}</td>
              <td>{postulacion.concurso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Postulaciones;