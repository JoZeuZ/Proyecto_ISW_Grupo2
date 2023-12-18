import axios from './root.service';

export const evaluarPostulacion = async (postulacionId, puntajes) => {
  try {
    console.log(puntajes)
    const response = await axios.post(`/evaluacion/evaluar/${postulacionId}`, puntajes);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error al evaluar la postulación:', error);
    throw error;
  }
};