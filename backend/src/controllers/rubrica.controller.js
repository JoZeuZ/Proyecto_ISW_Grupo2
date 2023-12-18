"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const rubricaService = require("../services/rubrica.service");
const { rubricaBodySchema, rubricaIdSchema } = require("../schema/rubrica.schema");
const { handleError } = require("../utils/errorHandler");


async function getRubricas(req, res) {
    try {
        const [rubricas, errorRubricas] = await rubricaService.getRubricas();
        if (errorRubricas) return respondError(req, res, 404, errorRubricas);

        rubricas.length === 0 ?
            respondSuccess(req, res, 204) :
            respondSuccess(req, res, 200, rubricas);
    } catch (error) {
        handleError(error, "rubrica.controller -> getRubricas");
        respondError(req, res, 400, error.message);
    }
}

async function getRubricaById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = rubricaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [rubrica, errorRubrica] = await rubricaService.getRubricaById(params.id);
        if (errorRubrica) return respondError(req, res, 404, errorRubrica);

        respondSuccess(req, res, 200, rubrica);
    } catch (error) {
        handleError(error, "rubrica.controller -> getRubricaById");
        respondError(req, res, 400, error.message);
    }
}

async function createRubrica(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = rubricaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newRubrica, rubricaError] = await rubricaService.createRubrica(body);

        if (rubricaError) return respondError(req, res, 400, rubricaError);
        if (!newRubrica) {
            return respondError(req, res, 400, "No se creo la rubrica");
        }

        respondSuccess(req, res, 201, newRubrica);
    } catch (error) {
        handleError(error, "rubrica.controller -> createRubrica");
        respondError(req, res, 500, "No se creo la rubrica");
    }
}

async function updateRubrica(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = rubricaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = rubricaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [updatedRubrica, rubricaError] = await rubricaService.updateRubrica(params.id, body);
        if (rubricaError) return respondError(req, res, 404, rubricaError);

        respondSuccess(req, res, 200, updatedRubrica);
    } catch (error) {
        handleError(error, "rubrica.controller -> updateRubrica");
        respondError(req, res, 400, error.message);
    }
}

async function deleteRubrica(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = rubricaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [deletedRubrica, rubricaError] = await rubricaService.deleteRubrica(params.id);
        if (rubricaError) return respondError(req, res, 404, rubricaError);

        respondSuccess(req, res, 200, deletedRubrica);
    } catch (error) {
        handleError(error, "rubrica.controller -> deleteRubrica");
        respondError(req, res, 400, error.message);
    }
}

async function getRubricaByPostulacion(req, res) {
    try {
        const { params } = req;
        const rubrica = await rubricaService.getRubricaByPostulacion(params.id);
        respondSuccess(req, res, 200, rubrica);
    } catch (error) {
      console.error('Error al obtener la rubrica por postulación:', error);
      return res.status(500).json({ error: 'Error interno al obtener la rubrica' });
    }
  }


module.exports = {
    getRubricas,
    getRubricaById,
    createRubrica,
    updateRubrica,
    deleteRubrica,
    getRubricaByPostulacion,
};