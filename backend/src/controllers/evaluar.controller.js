"use strict";

const {respondSuccess, respondError} = require("../utils/resHandler");
const evaluacionService = require('../services/evaluar.service');
const {evaluacionBodySchema} = require("../schema/evaluacion.schema");
const Informe = require('../models/informe.model');

async function evaluarPostulacion(req, res) {
    try {
        const { postulacionId } = req.params;
        const puntajes = req.body;
        const { error: bodyError } = evaluacionBodySchema.validate(puntajes);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const resultado = await evaluacionService.evaluarPostulacion(postulacionId, puntajes);
        respondSuccess(req, res, 200, resultado);


    } catch (error) {
        console.error('Error al evaluar la postulación:', error);
        if(error.statusCode === 400){
            return respondError(req, res, 400, error.message);
        }else{
            respondError(req, res, 500, 'Error al evaluar la postulación');
        }

    }
}

module.exports = {
    evaluarPostulacion,
};