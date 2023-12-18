import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { evaluarPostulacion } from "../services/evaluar.service";
import { getRubricaByPostulacion } from "../services/rubrica.service";
import Swal from "sweetalert2";

export default function EvaluacionForm() {
  const { register, handleSubmit } = useForm();

  const [rubricas, setRubricas] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchRubricas = async () => {
      try {
        const respuesta = await getRubricaByPostulacion(id);
        setRubricas(respuesta);
      } catch (error) {
        console.error("Error al obtener las rúbricas:", error);
      }
    };
    fetchRubricas();
  }, []);
  const router = useNavigate();
  const onSubmit = async (data) => {
    // console.log(data);
    let puntajes = {};
    const criterios = rubricas.criterios;
    criterios.forEach((criterio) => {
      puntajes[criterio.name] = parseInt(data[`puntaje_${criterio.name}`]);
    });
    router("/postulaciones");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Postulacion evaluada exitosamente",
    });
    try {
      const evaluacionResult = await evaluarPostulacion(id, puntajes);
      console.log("Postulación evaluada con éxito:", evaluacionResult);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Ocurrió un error al crear la rúbrica",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="container-gob">
      <h1>Evaluación de Postulación</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(rubricas).length > 0 &&
          rubricas.criterios?.map((criterio, index) => {
            // console.log(criterio);
            return (
              <div key={index}>
                <label className="col-2" htmlFor={`puntaje_${criterio.name}`}>
                  {criterio.name}
                </label>
                <div className="col-2">
                  <input
                    type="number"
                    className="form-control"
                    {...register(`puntaje_${criterio.name}`, {
                      required: false,
                      min: 0,
                      max: criterio.puntaje,
                    })}
                  />
                  <span>Puntaje Máximo: {criterio.puntaje}</span>
                </div>
              </div>
            );
          })}
        <br />
        <input className="btn btn-pill-primary" type="submit" value="Evaluar" />
      </form>
    </div>
  );
}
