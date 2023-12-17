import { Link } from "react-router-dom";
import { getCategorias } from "../../services/categoria.service.js";
import { useEffect, useState } from "react";
import DetailsCategoria from "./DetailsCategorias.jsx";

export const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias().then((response) => {
      setCategorias(response);
      console.log(categorias);
    });
  }, []);

  return (
    <div>
      <h1>Categorias</h1>
      <Link className="btn btn-pill-primary" to="/categorias/create">
        Crear Categoria
      </Link>
        <DetailsCategoria />
    </div>
  );
};
