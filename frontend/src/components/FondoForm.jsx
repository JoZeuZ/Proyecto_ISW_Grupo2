import { useForm } from "react-hook-form";
import { createFondo } from "../services/fondo.service.js";
import { getCategorias } from "../services/categoria.service.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FondoForm({
  defaultValues,
  onFormSubmit,
  buttonLabel = "Crear",
  isUpdateForm = false
}) {
  const [categorias, setCategorias] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    // Carga las categorías al iniciar el componente
    const fetchCategorias = async () => {
      const res = await getCategorias();
      setCategorias(res);
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(key, defaultValues[key]);
      });
    }
  }, [defaultValues, setValue]);

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-group col-12">
        <label htmlFor="nombre">Nombre del Fondo</label>
        <input
          autoComplete="off"
          {...register("nombre", { required: true })}
          className="form-control"
          type="text"
          placeholder="Escriba aquí el nombre del fondo"
        />
        {errors.nombre && <span>Este campo es obligatorio.</span>}
      </div>
      <div className="form-group col-12">
        <label>Monto para el Fondo </label>
        <input
          className="form-control"
          placeholder="Ingrese el monto"
          type="number"
          autoComplete="off"
          {...register("montoTotal", {
            required: true,
            valueAsNumber: true,
            min: 0,
          })}
        />
      </div>
      <div className="col-12">
        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <select className="form-control" {...register("categoria", { required: true })}>
            {!isUpdateForm && <option value="">Seleccione la categoría</option>}
            {categorias.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          {errors.categoria && <span>Este campo es obligatorio</span>}
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
  );
}
