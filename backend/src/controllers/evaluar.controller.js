"use strict";

const Rubrica = require("../models/rubrica.model");
const Postulacion = require("../models/postulacion.model");
const Informe = require("../models/informe.model");
const EvaluarService = require('../services/evaluar.service');

const evaluarPostulacion = async (req, res) => {
    try {
        const { postulacionId } = req.params;
  
        const postulacion = await Postulacion.findById(postulacionId);
        if (!postulacion) {
            return res.status(404).json({ message: 'La postulación no existe' });
        }

        const concursoId = postulacion.concursos[0]; // Suponiendo que la postulación pertenece a un solo concurso
        const rubrica = await Rubrica.findOne({ concurso: concursoId });

        if (!rubrica) {
            return res.status(404).json({ message: "La rúbrica para este concurso no existe." });
        }

      const puntajesCalculados = EvaluarService.calcularPuntajes(req.body, rubrica);
      const aprobado = EvaluacionService.determinarAprobacion(puntajesCalculados, rubrica);
      const informe = new Informe({
        evaluador: req.user.id,
        postulacion: postulacionId,
        resultados: puntajesCalculados,
        aprobado,
      });

      await informe.save();

      res.status(201).json({ message: "Postulación evaluada e informe generado con éxito." });
  
    } catch (error) {
      res.status(500).json({ error: 'Error al evaluar la postulación y generar el informe' });
    }
};

module.exports = {
    evaluarPostulacion,
}; 