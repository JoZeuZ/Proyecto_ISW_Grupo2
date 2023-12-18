import axios from './root.service';

export const evaluarPostulacion = async (postulacionId, puntajes) => {
  try {
    console.log(puntajes)
    const response = await axios.post(`/evaluacion/evaluar/${postulacionId}`, puntajes);
    if (response.status === 200) {
      return response.data;
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