import { getCategorias } from "../../services/categoria.service.js";
import { useEffect, useState } from "react";
import DeleteCategoria from "./DeleteCategoria.jsx";
import { getFondos } from "../../services/fondo.service.js";
import { Link } from "react-router-dom";
import "../../css/Categorias.css";

const DetailsCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [fondos, setFondos] = useState({});

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
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleDeleteSuccess = (deletedId) => {
    setCategorias(
      categorias.filter((categoria) => categoria._id !== deletedId)
    );
  };

  const sortCategories = (field) => {
    let sorted;
    if (field === "fondos") {
      sorted = [...categorias].sort((a, b) => {
        const fondosA = a.fondos ? a.fondos.length : 0;
        const fondosB = b.fondos ? b.fondos.length : 0;
        return sortOrder === "asc" ? fondosA - fondosB : fondosB - fondosA;
      });
    } else {
      sorted = [...categorias].sort((a, b) => {
        const itemA = a[field] ? a[field].toLowerCase() : "";
        const itemB = b[field] ? b[field].toLowerCase() : "";
        return sortOrder === "asc"
          ? itemA.localeCompare(itemB)
          : itemB.localeCompare(itemA);
      });
    }
    setCategorias(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredCategorias = categorias.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <input
        className="search-bar"
        type="text"
        placeholder="Buscar categoría..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table-categorias">
        <thead>
          <tr>
            <th onClick={() => sortCategories("nombre")}>Nombre</th>
            <th onClick={() => sortCategories("descripcion")}>Descripción</th>
            <th onClick={() => sortCategories("fondos")}>Fondos Asociados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategorias.map((categoria) => (
            <tr key={categoria._id}>
              <td>{categoria.nombre}</td>
              <td>{categoria.descripcion}</td>
              <td>
                {categoria.fondos && categoria.fondos.length > 0
                  ? categoria.fondos.map((fondoId) =>
                      fondos[fondoId] ? (
                        <div key={fondoId}>
                          <Link to={`/fondos/${fondoId}`}>
                            {fondos[fondoId]}
                          </Link>
                        </div>
                      ) : (
                        <div key={fondoId}>No disponible</div>
                      )
                    )
                  : "No hay fondos asociados"}
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/categorias/${categoria._id}/update`}
                  >
                    Editar
                  </Link>
                  <DeleteCategoria
                    id={categoria._id}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DetailsCategorias;
