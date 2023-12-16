import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFondo } from "../../services/fondo.service.js";

const DeleteFondo = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFondo(id);
      // Si la eliminación es exitosa, redirigir o actualizar la lista de fondos
      navigate("/fondos"); // Asumiendo que "/fondos" es la ruta donde se lista los fondos
    } catch (error) {
      console.error("Error al eliminar el fondo:", error);
      // Manejar el error (mostrar mensaje al usuario, etc.)
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <button class="btn btn-pill-secondary" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Eliminando..." : "Eliminar Fondo"}
    </button>
  );
};

export default DeleteFondo;
