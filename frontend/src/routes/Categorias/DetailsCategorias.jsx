import { getCategorias } from "../../services/categoria.service.js";
import { useEffect, useState } from "react";
import DeleteCategoria from "./DeleteCategoria.jsx";
import { getFondos } from "../../services/fondo.service.js";
import { Link } from "react-router-dom";
import "../../css/Categorias.css";

const DetailsCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [fondos, setFondos] = useState({});

  const reloadCategorias = () => {
    getCategorias().then(setCategorias);
  };

  const handleDeleteSuccess = (deletedId) => {
    setCategorias(
      categorias.filter((categoria) => categoria._id !== deletedId)
    );
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

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredCategorias = searchTerm
    ? categorias.filter((categoria) =>
        categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categorias;

  const sortedCategorias = filteredCategorias.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.nombre.localeCompare(b.nombre);
    }
    return b.nombre.localeCompare(a.nombre);
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  const sortCategories = (field) => {
    const sortedCategorias = [...categorias].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });
    setCategorias(sortedCategorias);
    toggleSortOrder();
  };
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
          <th onClick={() => sortCategories('nombre')}>Nombre</th>
          <th onClick={() => sortCategories('descricion')}>Descripción</th>
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
