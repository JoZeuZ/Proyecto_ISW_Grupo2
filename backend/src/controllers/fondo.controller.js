"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const FondoService = require("../services/fondo.service");
const { handleError } = require("../utils/errorHandler");
const { fondoBodySchema, fondoIdSchema } = require("../schema/fondo.schema");

async function getFondo(req, res) {
    try {
        const [fondo, errorFondo] = await FondoService.getFondo();
        if (errorFondo) return respondError(req, res, 404, errorFondo);

        fondo.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, fondo);
    } catch (error) {
        handleError(error, "fondo.controller -> getFondo");
        respondError(req, res, 400, error.message);
    }
}

async function createFondo(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = fondoBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newFondo, fondoError] = await FondoService.createFondo(body);

        if (fondoError) return respondError(req, res, 400, fondoError);
        if (!newFondo) {
            return respondError(req, res, 400, "No se creo el fondo");
        }

        respondSuccess(req, res, 201, newFondo);
    } catch (error) {
        handleError(error, "fondo.controller -> createFondo");
        respondError(req, res, 500, "No se creo el fondo");
    }
}

async function getFondoById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = fondoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [fondo, errorFondo] = await FondoService.getFondoById(params.id);
        if (errorFondo) return respondError(req, res, 404, errorFondo);

        respondSuccess(req, res, 200, fondo);
    } catch (error) {
        handleError(error, "fondo.controller -> getFondoById");
        respondError(req, res, 400, error.message);
    }
}

async function updateFondo(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = fondoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = fondoBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [fondo, errorFondo] = await FondoService.updateFondo(
            params.id,
            body
        );
        if (errorFondo) return respondError(req, res, 404, errorFondo);

        respondSuccess(req, res, 200, fondo);
    } catch (error) {
        handleError(error, "fondo.controller -> updateFondo");
        respondError(req, res, 400, error.message);
    }
}

async function deleteFondo(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = fondoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [fondo, errorFondo] = await FondoService.deleteFondo(params.id);
        if (errorFondo) return respondError(req, res, 404, errorFondo);

        respondSuccess(req, res, 200, fondo);
    } catch (error) {
        handleError(error, "fondo.controller -> deleteFondo");
        respondError(req, res, 400, error.message);
    }
}

module.exports = {
    getFondo,
    createFondo,
    getFondoById,
    updateFondo,
    deleteFondo,
};