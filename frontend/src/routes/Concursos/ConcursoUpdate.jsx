import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getConcurso, updateConcurso } from "../../services/concurso.service";
import ConcursoForm from "../../components/ConcursoForm";


const ConcursoUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [concurso, setConcurso] = useState(null);

    useEffect(() => {
        const fetchConcurso = async () => {
            try {
                const concurso = await getConcurso(id);
                if (concurso) {
                    setConcurso({
                        nombre: concurso.nombre,
                        bases: concurso.bases,
                        fechaInicio: concurso.fechaInicio,
                        fechaFin: concurso.fechaFin,
                        montoAsignado: concurso.montoAsignado,
                        fondo : concurso.fondo,
                    });
                }
            } catch (error) {
                console.error("Error al obtener el concurso:", error);
            }
        };

        fetchConcurso();
    }, [id]);




    return concurso ? (
        <>
            <br />
            <ConcursoForm defaultValue = {concurso}
                buttonLabel="Actualizar"
                isUpdateForm={true}
            />
        </>
    ) : (
        <p>Cargando...</p>
    );
};
export default ConcursoUpdate;
