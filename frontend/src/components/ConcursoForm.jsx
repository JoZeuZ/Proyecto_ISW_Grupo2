import { useForm } from "react-hook-form"
import { createConcurso, updateConcurso } from "../services/concurso.service"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Swal from 'sweetalert2';

export default function ConcursoForm({
    defaultValues,
    buttonLabel = "Crear",
    isUpdateForm = false,
}) {

    const navigate = useNavigate();
    const { id } = useParams();

    const onFormSubmit = async (data) => {
        try {
            if (!isUpdateForm) {
                await createConcurso(data);
                Swal.fire({
                    title: "¡Éxito!",
                    text: "¡Concurso creado exitosamente!",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
            } else {
                await updateConcurso(id, data);
                Swal.fire({
                    title: "¡Éxito!",
                    text: "¡Concurso modificado exitosamente!",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
            }
            navigate("/concursos");
        } catch (error) {
            console.error("Error al crear/modificar Concurso:", error);
            Swal.fire({
                title: "Error",
                text: error.message || "Ocurrió un error inesperado",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="form-group col-12">
                    <label htmlFor="nombre">Nombre: </label>
                    <input
                        autoComplete="off"
                        {...register("nombre")}
                        className="form-control"
                        type="text"
                        placeholder="Nombre: "
                    />
                    {errors.nombre && (
                        <span className="error-message">Este campo es obligatorio</span>
                    )}
                </div>
                <div className="form-group col-12">
                    <label htmlFor="bases">Bases: </label>
                    <input
                        className="form-control"
                        placeholder="Bases: "
                        type="text"
                        autoComplete="off"
                        {...register("bases")}
                    />
                    
                    {errors.bases && (
                    <span className="error-message">Este campo es obligatorio</span>
                    )}

                </div>
                <div className="form-gorup col-12">
                    <label htmlFor="fechaInicio">Fecha de Inicio: </label>
                    <input
                        className="form-control"
                        placeholder="Fecha de Inicio: "
                        type="date"
                        autoComplete="off"
                        {...register("fechaInicio")}
                    />
                    {erros.FechaInicio && (
                        <span className="error-message">Este campo es obligatorio</span>
                    )}
                </div>
                <div className="form-group col-12">
                    <label htmlFor="fechaFin">Fecha de Fin: </label>
                    <input
                        className="form-control"
                        placeholder="Fecha de Fin: "
                        type="date"
                        autoComplete="off"
                        {...register("fechaFin")}
                    />
                    {errors.FechaFin && (
                        <span className="error-message">Este campo es obligatorio</span>
                    )}
                </div>
                    <div>
                        <label htmlFor="montoAsignado">Monto Asignado: </label>
                        <input
                            className="form-control"
                            placeholder="Monto Asignado: "
                            type="number"
                            autoComplete="off"
                            {...register("montoAsignado")}
                        />
                        {errors.MontoAsignado && (
                            <span className="error-message">Este campo es obligatorio</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="fondo">Fondo: </label>
                        <input
                            className="form-control"
                            placeholder="Fondo: "
                            type="text"
                            autoComplete="off"
                            {...register("fondo")}
                        />
                        {errors.Fondo && (
                            <span className="error-message">Este campo es obligatorio</span>
                        )}

                    </div>
            </form>
        </div >
    );

}

