import { useForm } from "react-hook-form"
import { createConcurso } from "../services/concurso.service"


export default function ConcursoForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const mostrarPorConsola = async (data) => {
        const res = await createConcurso(data);
        console.log(res);
    }


    return (

        <form onSubmit={handleSubmit(mostrarPorConsola)}>
            <label htmlFor="nombre">Nombre: </label>
            <input autoComplete="off" {...register("nombre", { required: true })} />
            <label htmlFor="bases">Bases: </label>
            <input autoComplete="off" {...register("Bases", { required: true })} />
            <label htmlFor="fechaInicio">Fecha de Inicio: </label>
            <input type = "date" autoComplete="off" {...register("fechaInicio", { required: true, valueAsDate: true })} />
            <label htmlFor="fechaFin">Fecha de Fin: </label>
            <input type = "date" autoComplete="off" {...register("fechaFin", { required: true, valueAsDate: true })} />
            <label htmlFor="montoAsignado">Monto Asignado: </label>
            <input type = "number" autoComplete="off" {...register("montoAsignado", { required: true, valueAsNumber: true, min:0})} />
            <label htmlFor="fondo">Fondo: </label>
            <input autoComplete="off" {...register("fondo", { required: true})} />


            {errors.exampleRequired && <span>Este campo es obligatorio</span>}


            <input type="submit" />
        </form>
    )
}