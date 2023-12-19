import { getPostulaciones } from "../../services/postulacion.service";
import { useEffect, useState } from "react";
import DeletePostulacion from "./DeletePostulaciones";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Postulaciones = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEvaluador = user.roles.some((role) => role.name === "evaluador");

  useEffect(() => {
    getPostulaciones().then((response) => {
      const postulacionesConNombreConcurso = response.map((postulacion) => {
        return {
          ...postulacion,

          concurso: postulacion.concurso.nombre,
        };
      });
      setPostulaciones(postulacionesConNombreConcurso);
    });
  }, []);

  const handleSort = (campo) => {
    const orden = campo === sortBy && sortOrder === "asc" ? "desc" : "asc";
    const postulacionesOrdenadas = [...postulaciones].sort((a, b) => {
      if (orden === "asc") {
        return a[campo].localeCompare(b[campo]);
      } else {
        return b[campo].localeCompare(a[campo]);
      }
    });
    setPostulaciones(postulacionesOrdenadas);
    setSortBy(campo);
    setSortOrder(orden);
  };

  return (
    <>
      <div className="container-fluid mt-4">
        <h1 className="mb-3 text-primary">Postulaciones</h1>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="bg-primary text-white">
            <tr>
              <th scope="col" onClick={() => handleSort("nombrePostulante")}>
                Nombre Postulante
              </th>
              <th scope="col" onClick={() => handleSort("rutPostulante")}>
                RUT Postulante
              </th>
              <th scope="col" onClick={() => handleSort("correoElectronico")}>
                Correo Electrónico
              </th>
              <th scope="col" onClick={() => handleSort("numeroTelefono")}>
                Numero Teléfono
              </th>
              <th scope="col" onClick={() => handleSort("nombreEmpresa")}>
                Nombre Empresa
              </th>
              <th scope="col" onClick={() => handleSort("rutEmpresa")}>
                RUT Empresa
              </th>
              <th scope="col" onClick={() => handleSort("temaProyecto")}>
                Tema Proyecto
              </th>
              <th scope="col" onClick={() => handleSort("concurso")}>
                Concurso
              </th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {postulaciones.map((postulacion) => (
              <tr key={postulacion._id}>
                <td>{postulacion.nombrePostulante}</td>
                <td>{postulacion.rutPostulante}</td>
                <td>{postulacion.correoElectronico}</td>
                <td>{postulacion.numeroTelefono}</td>
                <td>{postulacion.nombreEmpresa}</td>
                <td>{postulacion.rutEmpresa}</td>
                <td>{postulacion.temaProyecto}</td>
                <td>{postulacion.concurso}</td>
                <td>
                  <DeletePostulacion id={postulacion._id} />
                  {isEvaluador && (
                    <button
                      className="btn btn-info ml-1"
                      onClick={() =>
                        navigate(`/postulacion/evaluar/${postulacion._id}`)
                      }
                    >
                      Evaluar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Postulaciones;
