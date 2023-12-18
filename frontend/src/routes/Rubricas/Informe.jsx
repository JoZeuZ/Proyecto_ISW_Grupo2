import { getInformes, deleteInforme } from "../../services/informe.service";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Informes = () => {
  const [informes, setInformes] = useState([]);

  useEffect(() => {
    fetchInformes();
  }, []);

  const fetchInformes = async () => {
    try {
      const respuesta = await getInformes();
      console.log(respuesta);
      const informesFormateado = respuesta.map((informe) => ({
        ...informe,
        postulacion: informe.postulacion.nombrePostulante,
      }));
      setInformes(informesFormateado);
    } catch (error) {
      console.error("Error al obtener los informes:", error);
    }
  };

  const handleDeleteInforme = async (informeId) => {
    try {
      await deleteInforme(informeId);
      fetchInformes();
    } catch (error) {
      console.error("Error al eliminar el informe:", error);
    }
  };

  return (
    <>
      <h1>Informes</h1>
      {informes.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Nombre Postulante</th>
              <th>Puntaje Obtenido</th>
              <th>Aprobado?</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {informes.map((informe) => (
              <tr key={informe._id}>
                <td>{informe.postulacion}</td>
                <td>{informe.resultados}</td>
                <td>{informe.aprobado ? 'Si' : 'No'}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    style={{ borderRadius: "10px" }}
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
                          handleDeleteInforme(informe._id);
                          Swal.fire({
                            title: "¡Eliminado!",
                            text: "El informe ha sido eliminado.",
                            icon: "success",
                          });
                        }
                      });
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay informes</p>
      )}
    </>
  );
};

export default Informes;
