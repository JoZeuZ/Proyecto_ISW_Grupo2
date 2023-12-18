import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getConcurso, updateConcurso } from "../../services/concurso.service";
import ConcursoForm from "../../components/ConcursoForm";


const ConcursoUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [concurso, setConcurso] = useState(null);

    useEffect(() => {
        const fetchConcurso = async () => {
            try {
                const concursoRes = await getConcurso(id);
                setConcurso(concursoRes);

                setValue("nombre", concursoRes.nombre);
                setValue("bases", concursoRes.bases);
                setValue("fechaInicio", concursoRes.fechaInicio);
                setValue("fechaFin", concursoRes.fechaFin);
                setValue("montoAsignado", concursoRes.montoAsignado);
                setValue("fondo", concursoRes.fondo);
            } catch (error) {
                console.error("Error al obtener el concurso:", error);
            }
        };

        fetchConcurso();
        const fetchConcursoData = async () => {
            try {
                const res = await getConcurso(id);
                setConcurso(res);
            } catch (error) {
                console.error(error);
            }
        };
        fetchConcursoData();
    }, [id, setValue]);
    


    return concurso ? (
        <>
            <br />
            <ConcursoForm
                defaultValues={concurso}
                buttonLabel="Actualizar"
                isUpdateForm={true}
            />
        </>
    ) : (
        <p>Cargando...</p>
    );
};
export default ConcursoUpdate;
