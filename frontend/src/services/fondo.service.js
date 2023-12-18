import axios from "./root.service.js";

export const getFondos = async () => {
  try {
    const response = await axios.get("/fondo");
    if (response.status == 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
          "Error desconocido al obetener los fondos"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const createFondo = async (fondo) => {
  try {
    const response = await axios.post("/fondo", fondo);
    if (response.status === 201) {
      return response.data.data;
    } else {
      throw new Error(`Error al crear el fondo. Estado: ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message || "Error desconocido al crear el fondo"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const updateFondo = async (id, fondo) => {
  try {
    const response = await axios.put(`/fondo/${id}`, fondo);
    if (response.status == 200) {
      return response.data.data;
    } else {
      throw new Error(
        `Error al actualizar el fondo. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
          "Error desconocido al actualizar el fondo"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const deleteFondo = async (id) => {
  try {
    const response = await axios.delete(`/fondo/${id}`);
    if (response.status == 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
          "Error desconocido al borrar el fondo"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const getFondo = async (id) => {
  try {
    const response = await axios.get(`/fondo/${id}`);
    if (response.status == 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
          "Error desconocido al obtener el fondo"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};
