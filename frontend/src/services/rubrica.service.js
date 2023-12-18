import axios from "./root.service";

export const getRubricas = async () => {
  try {
    const response = await axios.get("/rubrica");
    if (response.status === 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
};

export const getRubricaById = async (rubricaId) => {
  try {
    const response = await axios.get(`/rubrica/${rubricaId}`);
    if (response.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(
      "Error al obtener la rubrica:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const createRubrica = async (rubricaData) => {
  try {
    const response = await axios.post("/rubrica", rubricaData);
    if (response.status === 201) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(
      "Error al crear la rubrica:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const deleteRubrica = async (rubricaId) => {
  try {
    const response = await axios.delete(`/rubrica/${rubricaId}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(
      "Error al eliminar la rubrica:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const updateRubrica = async (rubricaId, rubricaData) => {
  try {
    const response = await axios.put(`/rubrica/${rubricaId}`, rubricaData);
    if (response.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(
      "Error al actualizar la rubrica:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const getRubricaByPostulacion = async (postulacionId) => {
  try {
    const response = await axios.get(`/rubrica/postulacion/${postulacionId}`);
    if (response.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(
      "Error al obtener la rubrica por postulación:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
