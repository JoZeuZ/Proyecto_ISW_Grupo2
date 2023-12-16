import FondoForm from "../../components/FondoForm.jsx"
import { createFondo } from "../../services/fondo.service.js";
import { useNavigate } from "react-router-dom";

const CreateFondo = () => {
  const navigate = useNavigate();

  const onFormSubmit = async (data) => {
    const res = await createFondo(data);
    console.log(res);
    navigate("/fondos");
  };

  return (
    <>
      <br />
      <FondoForm onFormSubmit={onFormSubmit} />
    </>
  );
};

export default CreateFondo;
