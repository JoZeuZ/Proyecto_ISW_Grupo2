import { useForm } from "react-hook-form";
import { createCategoria, updateCategoria } from "../services/categoria.service.js";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function CategoriaForm({ defaultValues, buttonLabel = 'Crear', isUpdateForm = false }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
  const navigate = useNavigate();
  const { id } = useParams();

  const onFormSubmit = async (data) => {
    try {
      if (isUpdateForm) {
        await updateCategoria(id, data);
        Swal.fire({
          title: "¡Éxito!",
          text: "¡Categoria modificada exitosamente!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        await createCategoria(data);
        Swal.fire({
          title: "¡Éxito!",
          text: "¡Categoria creada exitosamente!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      navigate("/categorias");
    } catch (error) {
      console.error("Error al crear/modificar categoria:", error);
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
        <label htmlFor="nombre">Nombre de la Categoría</label>
        <input
          autoComplete="off"
          {...register("nombre")}
          className="form-control"
          type="text"
          placeholder="Escriba aquí el nombre de la categoría"
        />
        {errors.nombre && <span>Este campo es obligatorio.</span>}
      </div>
      <div className="form-group col-12">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          {...register("descripcion")}
          className="form-control"
          placeholder="Descripción de la categoría"
        ></textarea>
        {errors.descripcion && <span>Este campo es obligatorio.</span>}
      </div>
      <input className="btn btn-pill-primary" type="submit" value={buttonLabel} />
      <button className="btn btn-pill-secondary" onClick={() => navigate("/categorias")}>Cancelar</button>
    </form>
    </div>
  );
}
