import { getCategorias } from "../../services/categoria.service.js";
import { useEffect, useState } from "react";
import DeleteCategoria from "./DeleteCategoria.jsx";
import { getFondos } from "../../services/fondo.service.js";
import { Link } from "react-router-dom";

const DetailsCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [fondos, setFondos] = useState({});

  const reloadCategorias = () => {
    getCategorias().then(setCategorias);
  };

  const handleDeleteSuccess = (deletedId) => {
    setCategorias(categorias.filter(categoria => categoria._id !== deletedId));
  };

  useEffect(() => {
    const fetchCategoriasYFondos = async () => {
      const categoriasResponse = await getCategorias();
      setCategorias(categoriasResponse);

      const fondosResponse = await getFondos();
      const fondosMap = {};
      fondosResponse.forEach((fondo) => {
        fondosMap[fondo._id] = fondo.nombre;
      });
      setFondos(fondosMap);
    };

    fetchCategoriasYFondos();
    reloadCategorias();
  }, []);

  return (
    <table className="table" border="2">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Fondos Asociados</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria) => (
          <tr key={categoria._id}>
            <td>{categoria.nombre}</td>
            <td>{categoria.descripcion}</td>
            <td>
              {categoria.fondos.length > 0
                ? categoria.fondos
                    .map((fondoId) =>
                      fondos[fondoId] ? (
                        <Link key={fondoId} to={`/fondos/${fondoId}`}>
                          {fondos[fondoId]}
                        </Link>
                      ) : (
                        "No disponible"
                      )
                    )
                    .reduce((prev, curr) => [prev, ", ", curr])
                : "No hay fondos asociados"}
            </td>
            <td>
              <div className="d-flex align-items-center">
                <Link
                  className="btn btn-primary btn-sm me-2 btn-action" // 'me-2' agrega un margen a la derecha
                  to={`/categorias/${categoria._id}/update`}
                >
                  Editar
                </Link>
                <DeleteCategoria id={categoria._id} onDeleteSuccess={handleDeleteSuccess} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailsCategorias;
