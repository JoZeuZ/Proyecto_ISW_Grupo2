import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoria, updateCategoria } from "../../services/categoria.service.js";
import CategoriaForm from "../../components/CategoriaForm.jsx";

const UpdateCategoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    const fetchCategoriaData = async () => {
      try {
        const res = await getCategoria(id);
        setCategoria(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategoriaData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await updateCategoria(id, data);
      navigate("/categorias");
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  return categoria ? (
    <>
      <br />
      <CategoriaForm
        defaultValues={categoria}
        onFormSubmit={onSubmit}
        buttonLabel="Actualizar"
      />
    </>
  ) : (
    <p>Cargando...</p>
  );
};

export default UpdateCategoria;
