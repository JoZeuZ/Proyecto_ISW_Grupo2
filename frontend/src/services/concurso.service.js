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