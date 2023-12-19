import axios from "./root.service.js";

export const getCategorias = async () => {
  try {
    const response = await axios.get("/categoria");
    if (response.status === 200) {
      return response.data.data; // Accede a la propiedad 'data' que es el array de categorías
    } else {
      throw new Error(
        `Error al obtener las categorías. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
          "Error desconocido al obtener las categorías"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const createCategoria = async (categoria) => {
  try {
    const response = await axios.post("/categoria", categoria);
    if (response.status === 201) {
      return response.data.data;
    } else {
      throw new Error(
        `Error al crear la categoria. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message || "Error desconocido al crear la categoría"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const updateCategoria = async (id, categoria) => {
  try {
    const response = await axios.put(`/categoria/${id}`, categoria);
    if (response.status == 200) {
      return response.data.data;
    } else {
      throw new Error(
        `Error al actualizar la categoría. Estado: ${response.status}`
      );
    }
    return null;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
          "Error desconocido al actualizar la categoría"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const deleteCategoria = async (id) => {
  try {
    const response = await axios.delete(`/categoria/${id}`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(
        `Error al eliminar la categoría. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
          "Error desconocido al eliminar la categoría"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const getCategoria = async (id) => {
  try {
    const response = await axios.get(`/categoria/${id}`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(
        `Error al obtener la categoría. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
          "Error desconocido al obtener la categoría"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};
