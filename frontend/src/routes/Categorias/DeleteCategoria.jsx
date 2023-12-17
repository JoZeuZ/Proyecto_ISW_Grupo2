import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCategoria } from "../../services/categoria.service.js";
import Swal from 'sweetalert2';

const DeleteCategoria = ({ id, onDeleteSuccess}) => {
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
      confirmButtonText: 'Sí, eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        deleteCategoria(id)
          .then(() => {
            Swal.fire(
              '¡Eliminada!',
              'La categoría ha sido eliminada.',
              'success'
            );
            onDeleteSuccess(id);
          })
          .catch((error) => {
            console.error("Error al eliminar la categoría:", error);
            Swal.fire(
              'Error',
              'No se pudo eliminar la categoría.',
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
    <button className="btn btn-secondary btn-sm btn-action" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Eliminando..." : "Eliminar"}
    </button>
  );
};

export default DeleteCategoria;
