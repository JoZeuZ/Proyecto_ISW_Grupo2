import axios from "./root.service.js";

export const getConcursos = async () => {
  try {
    const response = await axios.get("/concurso");
    if (response.status == 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};

export const createConcurso = async (concurso) => {
  try {
    const response = await axios.post("/concurso", concurso);
    if (response.status == 201) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};

export const updateConcurso = async (concurso) => {
  try {
    const response = await axios.put("/concurso", concurso);
    if (response.status == 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};

export const deleteConcurso = async (id) => {
  try {
    const response = await axios.delete(`/concurso/${id}`);
    if (response.status == 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};

export const getConcurso = async (id) => {
  try {
    const response = await axios.get(`/concurso/${id}`);
    if (response.status == 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};
