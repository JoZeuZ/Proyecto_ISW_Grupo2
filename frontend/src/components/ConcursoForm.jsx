import { useForm } from "react-hook-form"
import { createConcurso, updateConcurso } from "../services/concurso.service"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { format } from 'date-fns';
import Swal from 'sweetalert2';

export default function ConcursoForm({
    defaultValues,
    buttonLabel = "Crear",
    isUpdateForm = false,
}) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues });


    const navigate = useNavigate();
    const { id } = useParams();

    const onSubmit = async (data) => {
        try {
            if (!isUpdateForm) {
                // Asegúrate de formatear las fechas antes de enviarlas al backend
                data.fechaInicio = format(new Date(data.fechaInicio), 'dd-MM-yyyy', new Date());
                data.fechaFin = format(new Date(data.fechaFin), 'dd-MM-yyyy', new Date());

                await createConcurso(data);
                Swal.fire({
                    title: "¡Éxito!",
                    text: "¡Concurso creado exitosamente!",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
            } else {
                // Asegúrate de formatear las fechas antes de enviarlas al backend
                data.fechaInicio = format(new Date(data.fechaInicio), 'dd-MM-yyyy', new Date());
                data.fechaFin = format(new Date(data.fechaFin), 'dd-MM-yyyy', new Date());

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
        <div className="container-gob">
            <h1 className="mb-4">{isUpdateForm ? "Editar Concurso" : "Crear Concurso"}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input {...register("nombre")} className="form-control" placeholder="Nombre del concurso" />
                        {errors.nombre && <span className="error-message">Este campo es obligatorio</span>}
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
                        {errors.FechaInicio && (
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
                    <div className="form-group col-12">
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
                </div>
                <div className="form-group-buttons">
                    <input className="btn-pill-primary" type="submit" value={buttonLabel} />
                    <button className="btn-pill-secondary" onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
