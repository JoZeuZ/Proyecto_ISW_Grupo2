import CategoriaForm from "../../components/CategoriaForm.jsx";
import { createCategoria } from "../../services/categoria.service.js";
import { useNavigate } from "react-router-dom";

const CreateCategoria = () => {
  const navigate = useNavigate();

  const onFormSubmit = async (data) => {
    const res = await createCategoria(data);
    console.log(res);
    navigate("/categorias");
  };

  return (
    <>
      <br />
      <CategoriaForm onFormSubmit={onFormSubmit} />
    </>
  );
};

export default CreateCategoria;
