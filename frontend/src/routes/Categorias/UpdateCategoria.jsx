import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoria } from "../../services/categoria.service.js";
import CategoriaForm from "../../components/CategoriaForm.jsx";

const UpdateCategoria = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    const fetchCategoriaData = async () => {
      try {
        const res = await getCategoria(id);
        if (res) {
          // Se establece solo los valores necesarios por defecto
          setCategoria({ nombre: res.nombre, descripcion: res.descripcion });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategoriaData();
  }, [id]);

  return categoria ? (
    <>
      <br />
      <CategoriaForm defaultValues={categoria} buttonLabel="Actualizar" isUpdateForm={true} />
    </>
  ) : (
    <p>Cargando...</p>
  );
};

export default UpdateCategoria;
