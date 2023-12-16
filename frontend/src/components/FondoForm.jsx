import { useForm } from "react-hook-form";
import { createFondo } from "../services/fondo.service.js";
import { getCategorias } from "../services/categoria.service.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FondoForm() {
  const [categorias, setCategorias] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Carga las categorías al iniciar el componente
    const fetchCategorias = async () => {
      const res = await getCategorias();
      setCategorias(res);
    };
    fetchCategorias();
  }, []);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const res = await createFondo(data);
    console.log(res);
    navigate("/fondos");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="nombre">Nombre Fondo </label>
        <input autoComplete="off" {...register("nombre", { required: true })} />
        {errors.exampleRequired && <span>Esto es obligatorio</span>}
      </div>
      <div>
        <label htmlFor="montoTotal">Monto para el fondo </label>
        <input
          type="number"
          autoComplete="off"
          {...register("montoTotal", {
            required: true,
            valueAsNumber: true,
            min: 0,
          })}
        />
        </div>
        <div>
        <label htmlFor="categoria">Categoría</label>
        <select {...register("categoria", { required: true })}>
          {categorias.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        {errors.categoria && <span>Este campo es obligatorio</span>}
      </div>
      <input className="btn btn-pill-primary" type="submit" />
      <button className="btn btn-pill-secondary" onClick={() => navigate("/fondos")}>Cancelar</button>
    </form>
  );
}
