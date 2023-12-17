import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRubricas, deleteRubrica } from "../../services/rubrica.service";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Rubrica = () => {
  const navigate = useNavigate();
  const [rubricas, setRubricas] = useState([]);
  const { user } = useAuth();
  const isAdmin = user.roles.some((role) => role.name === "admin");
  console.log("es administrador? ", isAdmin);
  useEffect(() => {
    fetchRubricas();
  }, []);

  const fetchRubricas = async () => {
    try {
      const respuesta = await getRubricas();
      const rubricasFormateada = respuesta.map((rubrica) => ({
        ...rubrica,
        concurso: rubrica.concurso.nombre,
      }));
      setRubricas(rubricasFormateada);
    } catch (error) {
      console.error("Error al obtener las rúbricas:", error);
    }
  };

  const handleDeleteRubrica = async (rubricaId) => {
    try {
      await deleteRubrica(rubricaId);
      fetchRubricas();
    } catch (error) {
      console.error("Error al eliminar la rúbrica:", error);
    }
  };

  return (
    <>
      <h1>Rubricas</h1>
      {isAdmin ? (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/rubrica/create")}
        >
          Crear Rubrica
        </button>
      ) : (
        ""
      )}
      <br />
      <br />
      {rubricas.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Concurso</th>
              <th>Descripción</th>
              <th>Criterios</th>
              <th>Puntaje de Aprobación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rubricas.map((rubrica) => (
              <tr key={rubrica._id}>
                <td>{rubrica.name}</td>
                <td>{rubrica.concurso}</td>
                <td>{rubrica.descripcion}</td>
                <td style={{ textAlign: "center" }}>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {rubrica.criterios.map((criterio, indice) => (
                      <li key={indice}>
                        {criterio.name} - Puntaje: {criterio.puntaje}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{rubrica.puntajeAprobacion}</td>
                <td>
                  <button className="btn btn-primary">Editar</button>
                  {"  "}
                  {isAdmin ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        Swal.fire({
                          title: "¿Estás seguro?",
                          text: "¡No podrás revertir esto!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Sí, eliminarlo",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDeleteRubrica(rubrica._id);
                            Swal.fire({
                              title: "¡Eliminado!",
                              text: "La rubrica ha sido eliminada.",
                              icon: "success",
                            });
                          }
                        });
                      }}
                    >
                      Eliminar
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay rúbricas disponibles.</p>
      )}
    </>
  );
};

export default Rubrica;
