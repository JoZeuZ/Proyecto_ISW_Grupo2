import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFondo } from "../../services/fondo.service.js";
import Swal from 'sweetalert2';


const DeleteFondo = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        deleteFondo(id)
          .then(() => {
            Swal.fire(
              '¡Eliminado!',
              'El fondo ha sido eliminado.',
              'success'
            );
            navigate("/fondos");
          })
          .catch((error) => {
            console.error("Error al eliminar el fondo:", error);
            Swal.fire(
              'Error',
              'No se pudo eliminar el fondo.',
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
    <button className="btn btn-secondary" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Eliminando..." : "Eliminar Fondo"}
    </button>
  );
};

export default DeleteFondo;
