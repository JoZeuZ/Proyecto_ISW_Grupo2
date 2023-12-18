import axios from "./root.service";

export const getRubricas = async () => {
  try {
    const response = await axios.get("/rubrica");
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(
        `Error al obtener la rubrica. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(error.response.data.message || "Error desconocido");
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const getRubricaById = async (rubricaId) => {
  try {
    const response = await axios.get(`/rubrica/${rubricaId}`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(
        `Error al obtener la rubrica. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(error.response.data.message || "Error desconocido");
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const createRubrica = async (rubricaData) => {
  try {
    const response = await axios.post("/rubrica", rubricaData);
    if (response.status === 201) {
      return response.data.data;
    } else {
      throw new Error(`Error al crear la rubrica. Estado: ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.message || "Error desconocido al crear la rubrica"
      );
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const deleteRubrica = async (rubricaId) => {
  try {
    const response = await axios.delete(`/rubrica/${rubricaId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Error al eliminar la rubrica. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(error.response.data.message || "Error desconocido");
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const updateRubrica = async (rubricaId, rubricaData) => {
  try {
    const response = await axios.put(`/rubrica/${rubricaId}`, rubricaData);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(
        `Error al actualizar la rubrica. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(error.response.data.message || "Error desconocido");
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};

export const getRubricaByPostulacion = async (postulacionId) => {
  try {
    const response = await axios.get(`/rubrica/postulacion/${postulacionId}`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(
        `Error al obtener la rubrica. Estado: ${response.status}`
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      throw new Error(error.response.data.message || "Error desconocido");
    } else {
      throw new Error(
        "Error al conectar con el servidor. Intente nuevamente más tarde."
      );
    }
  }
};
