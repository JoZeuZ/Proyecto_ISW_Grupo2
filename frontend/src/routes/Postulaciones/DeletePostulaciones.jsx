import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePostulacion } from "../../services/postulacion.service.js";
import Swal from 'sweetalert2';


const DeletePostulacion = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    Swal.fire({
      title: '¿Estás seguro de eliminar la postulación?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        deletePostulacion(id)
          .then(() => {
            Swal.fire(
              '¡Eliminado!',
              'La postulacion ha sido eliminada.',
              'success'
            );
            navigate("/postulaciones");
          })
          .catch((error) => {
            console.error("Error al eliminar postulacion:", error);
            Swal.fire(
              'Error',
              'No se pudo eliminar la postulacion.',
              'error'
            );
          })
          .finally(() => {
            setIsDeleting(false);
          });
      }
    });
  };  
  return (
    <button className="btn btn-secondary btn-sm" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Eliminando..." : "Eliminar"}
    </button>
  );
};

export default DeletePostulacion;