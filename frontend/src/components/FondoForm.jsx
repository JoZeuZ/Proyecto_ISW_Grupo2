import { useForm } from "react-hook-form";
import { createFondo, updateFondo } from "../services/fondo.service.js";
import { getCategorias } from "../services/categoria.service.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function FondoForm({
  defaultValues,
  buttonLabel = "Crear",
  isUpdateForm = false,
}) {
  const [categorias, setCategorias] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategorias = async () => {
      const res = await getCategorias();
      setCategorias(res);
    };
    fetchCategorias();
  }, []);

  const onFormSubmit = async (data) => {
    try {
      if (!isUpdateForm) {
        await createFondo(data);
        Swal.fire({
          title: "¡Éxito!",
          text: "¡Fondo creado exitosamente!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        await updateFondo(id, data);
        Swal.fire({
          title: "¡Éxito!",
          text: "¡Fondo modificado exitosamente!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      navigate("/fondos");
    } catch (error) {
      console.error("Error al crear/modificar fondo:", error);
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
      <form onSubmit={handleSubmit(onFormSubmit)} className="fondo-form">
        <div className="form-group col-12">
          <label htmlFor="nombre">Nombre del Fondo</label>
          <input
            autoComplete="off"
            {...register(
              "nombre"
              // { required: true }
            )}
            className="form-control"
            type="text"
            placeholder="Escriba aquí el nombre del fondo"
          />
          {errors.nombre && (
            <span className="error-message">Este campo es obligatorio.</span>
          )}
        </div>
        <div className="form-group col-12">
          <label>Monto para el Fondo </label>
          <input
            className="form-control"
            placeholder="Ingrese el monto"
            type="number"
            autoComplete="off"
            {...register("montoTotal", {
              // required: true,
              valueAsNumber: true,
              // min: 0,
            })}
          />
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select
              className="form-control"
              defaultValue=""
              {...register(
                "categoria"
                // { required: true }
              )}
            >
              {!isUpdateForm && (
                <option value="" disabled>
                  Seleccione la categoría
                </option>
              )}
              {categorias.map((categoria) => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <input
          className="btn btn-pill-primary"
          type="submit"
          value={buttonLabel}
        />
        <button
          className="btn btn-pill-secondary"
          onClick={() => navigate("/fondos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
