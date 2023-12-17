import { useForm } from "react-hook-form";
import { createCategoria } from "../services/categoria.service.js";
import { useNavigate } from "react-router-dom";

export default function CategoriaForm({ defaultValues, onFormSubmit, buttonLabel = 'Crear' }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-group col-12">
        <label htmlFor="nombre">Nombre de la Categoría</label>
        <input
          autoComplete="off"
          {...register("nombre", { required: true })}
          className="form-control"
          type="text"
          placeholder="Escriba aquí el nombre de la categoría"
        />
        {errors.nombre && <span>Este campo es obligatorio.</span>}
      </div>
      <div className="form-group col-12">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          {...register("descripcion", { required: true })}
          className="form-control"
          placeholder="Descripción de la categoría"
        ></textarea>
        {errors.descripcion && <span>Este campo es obligatorio.</span>}
      </div>
      <input className="btn btn-pill-primary" type="submit" value={buttonLabel} />
      <button className="btn btn-pill-secondary" onClick={() => navigate("/categorias")}>Cancelar</button>
    </form>
  );
}
