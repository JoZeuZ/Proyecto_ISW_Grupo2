import { getPostulaciones } from "../../services/postulacion.service";
import { useEffect, useState } from "react";
import DeletePostulacion from "./DeletePostulaciones";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Postulaciones = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [originalPostulaciones, setOriginalPostulaciones] = useState([]); //
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const isEvaluador = user.roles.some((role) => role.name === "evaluador");
  const navigate = useNavigate();

  useEffect(() => {
    getPostulaciones().then((response) => {
      const postulacionesConNombreConcurso = response.map((postulacion) => {
        return {
          ...postulacion,
          concurso: postulacion.concurso.nombre,
        };
      });
      setPostulaciones(postulacionesConNombreConcurso);
      setOriginalPostulaciones(postulacionesConNombreConcurso);
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

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      // Si el término de búsqueda está vacío, mostrar todas las postulaciones originales
      setPostulaciones(originalPostulaciones);
    } else {
      // Si hay un término de búsqueda, filtrar las postulaciones
      const filteredPostulaciones = originalPostulaciones.filter(
        (postulacion) =>
          postulacion.concurso.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPostulaciones(filteredPostulaciones);
    }
  };

  return (
    <>
      <h1>Postulaciones</h1>
      <form className="search mx-auto" onSubmit={handleSearch}>
        <input
          className="form-control"
          type="text"
          name="search"
          placeholder="Buscar por concurso"
          aria-label="Buscar por concurso"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-action">
          <button className="btn btn-outline-search" type="submit">
            <i className="icon cl cl-search"></i>
          </button>
        </div>
      </form>
      <table border="1">
        <thead>
          <tr>
            <th onClick={() => handleSort("nombrePostulante")}>
              Nombre Postulante
            </th>
            <th onClick={() => handleSort("rutPostulante")}>RUT Postulante</th>
            <th onClick={() => handleSort("correoElectronico")}>
              Correo Electrónico
            </th>
            <th onClick={() => handleSort("numeroTelefono")}>
              Numero Telefono
            </th>
            <th onClick={() => handleSort("nombreEmpresa")}>Nombre Empresa</th>
            <th onClick={() => handleSort("rutEmpresa")}>RUT Empresa</th>
            <th onClick={() => handleSort("temaProyecto")}>Tema Proyecto</th>
            <th onClick={() => handleSort("concurso")}>Concurso</th>
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
                {isEvaluador ? (
                  <button
                    className="btn btn-primary"
                    style={{ borderRadius: "10px" }}
                    onClick={() =>
                      navigate(`/postulacion/evaluar/${postulacion._id}`)
                    }
                  >
                    Evaluar
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Postulaciones;
