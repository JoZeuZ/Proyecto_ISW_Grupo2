// UpdateFondo.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFondo } from "../../services/fondo.service.js";
import FondoForm from "../../components/FondoForm.jsx";

const UpdateFondo = () => {
  const { id } = useParams();
  const [fondo, setFondo] = useState(null);

  useEffect(() => {
    const fetchFondoData = async () => {
      try {
        const res = await getFondo(id);
        if (res) {
          // Establece solo los valores necesarios
          setFondo({
            nombre: res.nombre,
            montoTotal: res.montoTotal,
            categoria: res.categoria
          });
        }
      } catch (error) {
        console.error("Error al obtener fondo:", error);
      }
    };
    fetchFondoData();
  }, [id]);

  return fondo ? (
    <>
      <br />
      <FondoForm
        defaultValues={fondo}
        buttonLabel="Actualizar"
        isUpdateForm={true}
      />
    </>
  ) : (
    <p>Cargando...</p>
  );
};

export default UpdateFondo;
