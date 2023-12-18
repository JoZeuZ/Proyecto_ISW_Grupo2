import axios from './root.service';


export const getConcursos = async () => {
  try {
    const response = await axios.get('/concurso');

    if (response.status === 200) {
      return response.data.data;
    }
    return [];

  } catch (error) {
    console.log(error);
  }
};

export const createConcurso = async (data) => {
  try {
    const response = await axios.post('/concurso', data);
    if (response.status === 201) {
      return response.data;
    }
  }
  catch (error) {
    console.log(error);
  }
};

export const deleteConcurso = async (id) => {
  try {
    const response = await axios.delete(`/concurso/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  }
  catch (error) {
    console.log(error);
  }
}

export const updateConcurso = async (id, data) => {
  try {
    const response = await axios.put(`/concurso/${id}`, data);
    if (response.status === 200) {
      return response.data;
    }
  }
  catch (error) {
    console.log(error);
  }
}

export const getConcurso = async (id) => {
  try {
    const response = await axios.get(`/concurso/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  }
  catch (error) {
    console.log(error);
  }
}