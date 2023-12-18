import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { deleteConcurso } from "../../services/concurso.service";
import swal from 'sweetalert2';
import { useState } from 'react';

const ConcursoDelete = ({ id }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const handleDlete = async () => {
        swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',

            confirmButtonText: 'Si, borralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsDeleting(true);
                deleteConcurso(id)
                    .then(() => {
                        swal.fire(
                            'Borrado!',
                            'El concurso fue borrado.',
                            'success'
                        )
                        navigate('/concursos');
                    })
                    .catch((error) => {
                        console.error("Error al eliminar el fondo:", error);
                        swal.fire(
                            'error',
                            'Hubo un error borrando el concurso.',
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
        <>
            <button className="btn btn-pill-secondary" onClick={handleDlete} disabled={isDeleting}>
                {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
        </>
    );
}
export default ConcursoDelete;



