import { useForm, useFieldArray } from "react-hook-form";
import { createRubrica } from "../services/rubrica.service";
import { getConcursos } from "../services/concurso.service";
import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RubricaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "criterios",
  });
  const [concursos, setConcursos] = useState([]);
  const [selectedConcursoID, setSelectedConcursoID] = useState(""); // Estado para almacenar el ID del concurso seleccionado

  useEffect(() => {
    const fetchConcursos = async () => {
      try {
        const listaConcursos = await getConcursos();
        setConcursos(listaConcursos);
      } catch (error) {
        console.error("Error al obtener concursos:", error);
      }
    };

    fetchConcursos();
  }, []);

  if (fields.length === 0) {
    append({});
  }

  const router = useNavigate();

  const styles = {
    container: {
      width: "50%",
      margin: "auto",
      border: "10px solid",
      borderRadius: "10px",
      padding: "20px",
      borderImage: "linear-gradient(to right, #006FB3 50%, #FE6565 50%) 1",
      borderImageSlice: "1",
    },
  };

  const onSubmit = async (data) => {
    try {
      const dataToSend = { ...data, concurso: selectedConcursoID };
      const res = await createRubrica(dataToSend);
      console.log(res);
      router("/rubrica");

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
        title: "Rúbrica creada exitosamente",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Formulario Creación de Rubrica</h1>
    <form className="form-row" onSubmit={handleSubmit(onSubmit)}>
    <div className="form-group col-12">
        <label className="col-5" htmlFor="name">
          Nombre
        </label>
        <div className="form-group col-5">
          <input
            {...register("name", { required: true })}
            className="form-control col-10"
            type="text"
            placeholder="Nombre de la Rubrica"
          />
        </div>
      </div>
      <div className="form-group col-12">
        <label className="col-5" htmlFor="concurso">
          Seleccionar concurso:
        </label>
        <div className="form-group col-12">
          <select
            className="form-control col-5"
            name="concurso"
            onChange={(e) => setSelectedConcursoID(e.target.value)}
            value={selectedConcursoID}
          >
            <option value="">Selecciona un concurso</option>
            {concursos.map((concurso) => (
              <option key={concurso._id} value={concurso._id}>
                {concurso.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group col-12">
        <label className="col-5" htmlFor="descripcion">
          Descripción
        </label>
        <div className="col-8">
          <textarea
            {...register("descripcion", { required: true })}
            className="form-control col-7"
            style={{
              width: "200px",
              height: "100px",
              resize: "none", 
              textAlign: "center", 
              lineHeight: "20px", 
              overflow: "hidden", 
            }}
            placeholder="Descripción de la Rubrica"
          />
        </div>
      </div>
      {fields.map((criterio, index) => (
        <div className="form-group col-12" key={criterio.id}>
          <label className="col-5" htmlFor={`criterios[${index}].name`}>
            Nombre del Criterio
          </label>
          <div className="form-group col-5">
            <input
              {...register(`criterios[${index}].name`, { required: true })}
              className="form-control col-10"
              type="text"
              placeholder="Nombre del Criterio"
            />
          </div>
          <label className="col-5" htmlFor={`criterios[${index}].descripcion`}>
            Descripción del Criterio
          </label>
          <div className="form-group col-8">
            <textarea
              {...register(`criterios[${index}].descripcion`, {
                required: true,
              })}
              className="form-control col-7"
              style={{
                width: "200px",
                height: "100px",
                resize: "none", 
                textAlign: "center", 
                lineHeight: "20px", 
                overflow: "hidden", 
              }}
              placeholder="Descripción del Criterio"
            />
          </div>
          <label className="col-5" htmlFor={`criterios[${index}].puntaje`}>
            Puntaje del Criterio
          </label>
          <div className="form-group col-5">
            <input
              type="number"
              {...register(`criterios[${index}].puntaje`, {
                required: true,
                min: 0,
              })}
              className="form-control"
              style={{ width: "65px", height: "50px" }}
            />
          </div>
          <div className="form-group col-11">
            <button
              className="btn btn-pill-secondary col-5"
              type="button"
              onClick={() => remove(index)}
            >
              Eliminar Criterio
            </button>
          </div>
        </div>
      ))}
      <div className="form-group col-12">
        <div className="form-group col-11">
          <button
            className="btn btn-pill-primary col-5"
            type="button"
            onClick={() => append({})}
          >
            Agregar Criterio
          </button>
        </div>
      </div>
      <div className="form-group col-12">
        <label className="col-5" htmlFor="puntajeAprobacion">
          Puntaje de Aprobación
        </label>
        <div className="form-group col-5">
          <input
            type="number"
            {...register("puntajeAprobacion", { required: true, min: 0 })}
            className="form-control col-5"
            style={{ width: "65px", height: "50px" }}
          />
        </div>
      </div>
      <div className="col-5">
        <div className ="col-10">
        <input className="btn btn-pill-primary" type="submit"/>
        </div>
      </div>
    </form>
  </div>
  );
}
