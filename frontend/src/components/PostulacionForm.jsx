import React from "react";
import { useForm } from "react-hook-form";
import { createPostulacion } from "../services/postulacion.service";
import { useNavigate, useParams } from "react-router-dom";
import { getConcursos } from "../services/concurso.service";
import { useEffect, useState } from "react";
import sweetalert2 from "sweetalert2";

export default function PostulacionForm() {
  const [concurso, setConcursos] = useState([]);
  const [selectedConcursoId, setSelectedConcursoId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const respaldoPostulacion = watch("respaldoPostulacion");


  const { id } = useParams();

  useEffect(() => {
    const fetchConcursos = async () => {
      const response = await getConcursos();
      setConcursos(response);
    };
    fetchConcursos();
  }, []);

  useEffect(() => {
    const foundConcurso = concurso.find((concurso) => concurso._id === id);
    if (foundConcurso) {
      setSelectedConcursoId(id);
    }
  }, [id, concurso]);

  const onSubmit = async (data) => {
    console.log(data);
    console.log(data.concursos);

    const formData = new FormData();
    for (const key in data) {
      if (
        key === "respaldoPostulacion" &&
        respaldoPostulacion &&
        respaldoPostulacion.length > 0
      ) {
        // AÃ±adir el archivo seleccionado a formData
        formData.append(key, respaldoPostulacion[0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    try {
      const response = await createPostulacion(formData);
      console.log(response);

      sweetalert2
        .fire({
          icon: "success",
          title: "¡Postulación enviada con éxito!",
          confirmButtonText: "Ok",
        })
        .then(() => {
          navigate("/concursos");
        });
    } catch (error) {
      console.log(error);
      sweetalert2.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ha ocurrido un error al crear la postulación",
        confirmButtonText: "Ok",
      });

    }
  };

  const navigate = useNavigate();
  const handleVolverAlInicio = () => {

    navigate("/concursos");
  };

  const customButtonStyle = {
    fontSize: "1.2em",
    padding: "0.3em 1.2em",

  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group col-12">
        <label htmlFor="nombrePostulante">Nombre Completo</label>
        <input
          className="form-control"
          {...register("nombrePostulante", { required: true })}
          placeholder="Escriba su nombre completo"
        />
      </div>

      <div className="form-group col-12">
        <label htmlFor="rutPostulante">Rut Postulante</label>
        <input
          className="form-control"
          {...register("rutPostulante", { required: true })}
          placeholder="Escriba su rut"
        />
      </div>

      <div className="form-group col-12">
        <label htmlFor="correoElectronico">Correo Electrónico</label>
        <input
          className="form-control"
          {...register("correoElectronico", { required: true })}
          placeholder="Escriba su correo electrónico"
        />
      </div>

      <div className="form-group col-12">
        <label htmlFor="numeroTelefono">Número Teléfono</label>
        <input
          className="form-control"
          {...register("numeroTelefono", { required: true })}
          placeholder="Escriba su número de teléfono"
        />
      </div>

      <div className="form-group col-12">
        <label htmlFor="nombreEmpresa">Nombre Empresa</label>
        <input
          className="form-control"
          {...register("nombreEmpresa", { required: true })}
          placeholder="Escriba el nombre de la empresa"
        />
      </div>

      <div className="form-group col-12">
        <label htmlFor="rutEmpresa">Rut Empresa</label>
        <input
          className="form-control"
          {...register("rutEmpresa", { required: true })}
          placeholder="Escriba el rut de la empresa"
        />
      </div>

      <div className="form-group col-12">
        <label htmlFor="temaProyecto">Tema Proyecto</label>
        <input
          className="form-control"
          {...register("temaProyecto", { required: true })}
          placeholder="Escriba el tema de proyecto"
        />
      </div>

      <div className="form-group col-12">
        <label htmlFor="respaldoPostulacion">Respaldo Postulación:</label>
        <input
          className="form-control-file"
          type="file"
          accept=".pdf"
          {...register("respaldoPostulacion")}
        />
      </div>


      <label htmlFor="concurso">Concurso seleccionado:</label>
      <select
        className="form-control"
        aria-label="Default select example"
        {...register("concurso", { required: true })}
        value={selectedConcursoId || ""}
      >
        <option value="" disabled>
          Seleccione un concurso
        </option>
        {concurso.map((concurso) => (
          <option key={concurso._id} value={concurso._id}>
            {concurso.nombre}
          </option>
        ))}
      </select>


      {errors.exampleRequired && <span>Este campo es requerido</span>}

      <div className="form-group col-12 mt-3 d-flex justify-content-between">
        <button
          onClick={handleVolverAlInicio}
          className="btn btn-secondary btn-sm"

          style={customButtonStyle}
        >
          Volver a concursos
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          style={customButtonStyle}
        >

          Enviar Postulación
        </button>
      </div>
    </form>
  );
}
