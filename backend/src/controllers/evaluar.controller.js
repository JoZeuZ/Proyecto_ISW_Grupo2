"use strict";

const {respondSuccess, respondError} = require("../utils/resHandler");

const evaluacionService = require('../services/evaluar.service');

async function evaluarPostulacion(req, res) {
    try {
        const { postulacionId } = req.params;
        const puntajes = req.body;

        const resultado = await evaluacionService.evaluarPostulacion(postulacionId, puntajes);

        respondSuccess(req, res, 200, resultado);
    } catch (error) {
        console.error('Error al evaluar la postulación:', error);
        respondError(req, res, 500, 'Error al evaluar la postulación');
    }
}

module.exports = {
    evaluarPostulacion,
};