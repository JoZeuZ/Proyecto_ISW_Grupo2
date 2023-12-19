"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const informeService = require("../services/informe.service");
const { informeIdSchema } = require("../schema/informe.schema");
const { handleError } = require("../utils/errorHandler");

async function getInformes(req, res) {
    try {
        const [informes, errorInformes] = await informeService.getInformes();
        if (errorInformes) return respondError(req, res, 404, errorInformes);

        informes.length === 0 ?
            respondSuccess(req, res, 204) :
            respondSuccess(req, res, 200, informes);
    } catch (error) {
        handleError(error, "informe.controller -> getInformes");
        respondError(req, res, 400, error.message);
    }
}

async function getInformeById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = informeIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [informe, errorInforme] = await informeService.getInformeById(params.id);
        if (errorInforme) return respondError(req, res, 404, errorInforme);

        respondSuccess(req, res, 200, informe);
    } catch (error) {
        handleError(error, "informe.controller -> getInformeById");
        respondError(req, res, 400, error.message);
    }
}

async function getInformeByPostulacionId(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = informeIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [informe, errorInforme] = await informeService.getInformeByPostulacionId(params.id);
        if (errorInforme) return respondError(req, res, 404, errorInforme);

        respondSuccess(req, res, 200, informe);
    } catch (error) {
        handleError(error, "informe.controller -> getInformeByPostulacionId");
        respondError(req, res, 400, error.message);
    }
}

async function deleteInforme(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = informeIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [deletedInforme, errorInforme] = await informeService.deleteInforme(params.id);
        if (errorInforme) return respondError(req, res, 404, errorInforme);

        respondSuccess(req, res, 200, deletedInforme);
    } catch (error) {
        handleError(error, "informe.controller -> deleteInforme");
        respondError(req, res, 400, error.message);
    }
}

module.exports = {
    getInformes,
    getInformeById,
    getInformeByPostulacionId,
    deleteInforme,
};
