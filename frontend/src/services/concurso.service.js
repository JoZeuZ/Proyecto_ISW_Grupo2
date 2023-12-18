
import axios from './root.service';


export const getConcursos = async () => {
  try {
    const response = await axios.get('/concurso');

    if (response.status === 200) {
      return response.data.data;
    }
    return [];

  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
        "Error desconocido al obetener los Concursos"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const createConcurso = async (data) => {
  try {
    const response = await axios.post('/concurso', data);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Error al crear el concurso. Estado: ${response.status}`);
    }
  }
  catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message || "Error desconocido al crear el Concurso"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const deleteConcurso = async (id) => {
  try {
    const response = await axios.delete(`/concurso/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
        "Error desconocido al borrar el Concurso"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const updateConcurso = async (id, data) => {
  try {
    const response = await axios.put(`/concurso/${id}`, data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Error al actualizar el Concurso. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
        "Error desconocido al actualizar el concursa"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }

  }
};

export const getConcurso = async (id) => {
  try {
    const response = await axios.get(`/concurso/${id}`);

    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message ||
          "Error desconocido al obtener el Concurso"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

