import axios from "./root.service.js";

export const getCategorias = async () => {
  try {
    const response = await axios.get("/categoria");
    if (response.status === 200) {
      return response.data.data; // Accede a la propiedad 'data' que es el array de categorías
    }
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return []; // Devuelve un array vacío en caso de error
  }
};

export const createCategoria = async (categoria) => {
  try {
    const response = await axios.post("/categoria", categoria);
    if (response.status === 201) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    return [];
  }
};

export const updateCategoria = async (id, categoria) => {
  try {
    const response = await axios.put(`/categoria/${id}`, categoria);
    if (response.status == 200){
        return response.data.data;
    }
    return null;
  } catch (error) {
    console.error("Error al actualizar la categoria:", error);
    return null;
  }
};

export const deleteCategoria = async (id) => {
  try {
    const response = await axios.delete(`/categoria/${id}`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    return [];
  }
}

export const getCategoria = async (id) => {
  try {
    const response = await axios.get(`/categoria/${id}`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    return [];
  }
}
