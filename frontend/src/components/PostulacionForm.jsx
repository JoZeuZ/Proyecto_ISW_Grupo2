import React from "react";
import { useForm } from "react-hook-form";
import { createPostulacion } from "../services/postulacion.service";
import { useNavigate } from "react-router-dom";

export default function PostulacionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const respaldoPostulacion = watch("respaldoPostulacion");

  const onSubmit = async (data) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const handleVolverAlInicio = () => {
    navigate("/auth");
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

      <div className="form-group col-12">
        <label htmlFor="concurso">Concurso</label>
        <input
          className="form-control"
          {...register("concurso", { required: true })}
          placeholder="Eliga el concurso"
        />
      </div>

      {errors.exampleRequired && <span>Este campo es requerido</span>}

      <div className="form-group col-12 d-flex justify-content-between align-items-end mt-3">
        <button
          onClick={handleVolverAlInicio}
          className="btn btn-secondary btn-default-size"
        >
          Volver al inicio
        </button>
        <button type="submit" className="btn btn-primary btn-default-size">
          Enviar
        </button>
      </div>
    </form>
  );
}
