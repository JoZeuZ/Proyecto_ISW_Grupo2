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

  export const createPostulacion = async (postulacion) => {
    try {
      console.log(postulacion);
      const response = await axios.post('/postulacion', postulacion, {headers: {'Content-Type': undefined}});
      if (response.status === 201) {
        return response.data;
      }
      return {};
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
