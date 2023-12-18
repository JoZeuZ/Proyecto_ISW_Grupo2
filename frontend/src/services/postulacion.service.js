
import axios from "./root.service";

export const getPostulaciones = async () => {
  try {
    const response = await axios.get("/postulacion");

    if (response.status === 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error desconocido al obtener postulaciones");
    }
    else {
      throw new Error("Error servidor");
    }
  }
};

export const createPostulacion = async (postulacion) => {
  try {
    console.log(postulacion);
    const response = await axios.post("/postulacion", postulacion, {
      headers: { "Content-Type": undefined },
    });
    if (response.status === 201) {
      return response.data.data;
    }else{
      throw new Error(`Error desconocido al crear postulacion: ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error desconocido al crear postulacion");
    }
    else {
      throw new Error("Error servidor");
    }
  }
};

export const deletePostulacion = async (id) => {
  try {
    const response = await axios.delete(`/postulacion/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return {};
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error desconocido al eliminar postulacion");
    }
    else {
      throw new Error("Error servidor");
    }
  }
};

