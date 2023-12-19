import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFondo } from "../../services/fondo.service.js";
import { getCategorias } from "../../services/categoria.service.js";
import { getConcursos } from "../../services/concurso.service.js";
import { useNavigate } from "react-router-dom";
import DeleteFondo from "./DeleteFondo.jsx";
import "../../css/Fondos.css";

const DetailsFondo = () => {
  const { id } = useParams();
  const [fondo, setFondo] = useState(null);
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [concursos, setConcursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFondo = await getFondo(id);
        if (responseFondo) {
          setFondo(responseFondo);
          const resCategorias = await getCategorias();
          const categoria = resCategorias.find(
            (cat) => cat._id === responseFondo.categoria
          );
          setCategoriaNombre(
            categoria ? categoria.nombre : "Categoría no encontrada"
          );

          const resConcursos = await getConcursos();
          const concursosDelFondo = resConcursos.filter((con) =>
            responseFondo.concursos.includes(con._id)
          );
          setConcursos(concursosDelFondo);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!fondo) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="details-container">
        <h2>Detalles del fondo</h2>
        <div className="card">
          <p>
            <strong>Nombre:</strong> {fondo.nombre}
          </p>
          <p>
            <strong>Monto total:</strong> {fondo.montoTotal}
          </p>
          <p>
            <strong>Monto asignado:</strong> {fondo.montoAsignado}
          </p>
          <p>
            <strong>Categoría:</strong> {categoriaNombre}
          </p>
        </div>

        <div className="concursos-container">
          <h3>Concursos</h3>
          <ul>
            {concursos.length > 0 ? (
              concursos.map((concurso) => (
                <li className="concurso-item" key={concurso._id}>
                  {concurso.nombre} - Monto Asignado: ${concurso.montoAsignado}
                </li>
              ))
            ) : (
              <li>No hay concursos</li>
            )}
          </ul>
        </div>

        <div className="actions">
          <button
            className="btn btn-primary2"
            onClick={() => navigate("/fondos")}
          >
            Volver
          </button>
          <DeleteFondo id={id} />
          <Link className="btn btn-primary" to={`/fondos/${id}/update`}>
            Actualizar Fondo
          </Link>
        </div>
      </div>
    </>
  );
};

export default DetailsFondo;
