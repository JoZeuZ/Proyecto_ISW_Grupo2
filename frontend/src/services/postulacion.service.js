import axios from './root.service';

export const getPostulaciones = async () => {
    try {
      const response = await axios.get('/postulacion');
      
      if (response.status === 200) {
        return response.data.data;
      }
      return[];

    } catch (error) {
      console.log(error);
    }
  };