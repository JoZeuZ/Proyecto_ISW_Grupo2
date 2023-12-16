import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFondo } from "../../services/fondo.service.js";
import { getCategorias } from "../../services/categoria.service.js";
import { getConcursos } from "../../services/concurso.service.js";
import { useNavigate } from "react-router-dom";
import DeleteFondo from "./DeleteFondo.jsx";

const DetailsFondo = () => {
  const { id } = useParams();
  const [fondo, setFondo] = useState({});
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [concursos, setConcursos] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los detalles del fondo
        const responseFondo = await getFondo(id);
        setFondo(responseFondo);

        // Obtener las categorías
        const resCategorias = await getCategorias();
        // Buscar la categoría correspondiente por ID y actualizar el estado
        const categoria = resCategorias.find(
          (cat) => cat._id === responseFondo.categoria
        );
        setCategoriaNombre(
          categoria ? categoria.nombre : "Categoría no encontrada"
        );

        const resConcursos = await getConcursos();
        // Filtrar los concursos que están en el array de concursos del fondo
        const concursosDelFondo = resConcursos.filter((con) =>
          responseFondo.concursos.includes(con._id)
        );
        setConcursos(concursosDelFondo);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <br />
      <h2>Detalles del fondo:</h2>
      <div>
        <p>Nombre: {fondo.nombre}</p>
        <p>Monto total: {fondo.montoTotal}</p>
        <p>Monto asignado: {fondo.montoAsignado}</p>
        <p>Categoría: {categoriaNombre}</p>
        <div>
          <h3>Concursos:</h3>
          <p>
            {concursos.map(concurso => (
              <li key={concurso._id}>{concurso.nombre}</li>
            ))}
          </p>
        </div>
      </div>
      <div>
        <button
          className="btn btn-pill-primary"
          onClick={() => navigate("/fondos")}
        >
          Volver
        </button>
        <DeleteFondo id={id} />
      </div>
    </>
  );
};

export default DetailsFondo;
