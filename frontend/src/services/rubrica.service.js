import axios from './root.service';

export const getRubricas = async () => {
    try {
      const response = await axios.get('/rubrica');
      if (response.status === 200) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  };

export const createRubrica = async (rubricaData) => {
    try {
      const response = await axios.post('/rubrica', rubricaData);
      if (response.status === 201) {
        return response.data.data;
      }
      return null;
    } catch (error) {
        console.error('Error al crear la rubrica:', error.response?.data?.message || error.message);
        throw error;
    }
  };