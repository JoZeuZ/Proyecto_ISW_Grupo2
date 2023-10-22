"use strict";

const Informe = require('../models/informe.model');
const Postulacion = require('../models/postulacion.model');
const { calcularPuntajes, determinarAprobacion } = require('../utils/evaluacionUtils');

async function evaluarPostulacion(evaluadorId, postulacionId, evaluadorPuntajes, rubrica) {
  try {
    // Calcula los puntajes obtenidos y determina si está aprobado o no
    const puntajesObtenidos = calcularPuntajes(evaluadorPuntajes, rubrica);
    const aprobado = determinarAprobacion(puntajesObtenidos, rubrica);

    // Guarda los resultados en un informe
    const informe = new Informe({
      evaluador: evaluadorId,
      postulacion: postulacionId,
      resultados: puntajesObtenidos,
      aprobado,
    });

    await informe.save();

    return informe;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  evaluarPostulacion,
};