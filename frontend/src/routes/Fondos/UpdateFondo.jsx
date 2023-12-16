import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getFondo, updateFondo } from "../../services/fondo.service.js";
import { getCategorias } from "../../services/categoria.service.js";
import FondoForm from "../../components/FondoForm.jsx";

const UpdateFondo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [categorias, setCategorias] = useState([]);
  const [fondo, setFondo] = useState(null);

  useEffect(() => {
    const fetchCategoriasYFondo = async () => {
      try {
        const categoriasRes = await getCategorias();
        setCategorias(categoriasRes);

        const fondoRes = await getFondo(id);
        // Aquí estableces los valores del formulario con los datos del fondo
        setValue("nombre", fondoRes.nombre);
        setValue("montoTotal", fondoRes.montoTotal);
        setValue("categoria", fondoRes.categoria);
      } catch (error) {
        console.error("Error al cargar el fondo o las categorías:", error);
      }
    };

    fetchCategoriasYFondo();
    const fetchFondoData = async () => {
      try {
        const res = await getFondo(id);
        setFondo(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFondoData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const dataToUpdate = {
        nombre: data.nombre,
        montoTotal: data.montoTotal,
        categoria: data.categoria,
      };

      await updateFondo(id, dataToUpdate);
      navigate("/fondos");
      console.log(data);
    } catch (error) {
      console.error("Error al actualizar el fondo:", error);
    }
  };

  return fondo ? (
    <>
      <br />
      <FondoForm
        defaultValues={fondo}
        onFormSubmit={onSubmit}
        buttonLabel="Actualizar"
        isUpdateForm={true}
      />
    </>
  ) : (
    <p>Cargando...</p>
  );
};

export default UpdateFondo;
