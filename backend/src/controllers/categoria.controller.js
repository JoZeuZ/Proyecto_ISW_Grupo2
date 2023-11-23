"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const CategoriaService = require("../services/categoria.service");
const { handleError } = require("../utils/errorHandler");
const { categoriaBodySchema, categoriaIdSchema } = require("../schema/categoria.schema");

async function getCategorias(req, res) {
    try {
        const [categorias, errorCategoria] = await CategoriaService.getCategorias();
        if (errorCategoria) return respondError(req, res, 404, errorCategoria);

        categorias.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, categorias);
    } catch (error) {
        handleError(error, "categoria.controller -> getCategorias");
        respondError(req, res, 400, error.message);
    }
}

async function createCategoria(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = categoriaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newCategoria, categoriaError] = await CategoriaService.createCategoria(body);

        if (categoriaError) return respondError(req, res, 400, categoriaError);
        if (!newCategoria) {
            return respondError(req, res, 400, "No se creo la categoria");
        }

        respondSuccess(req, res, 201, newCategoria);
    } catch (error) {
        handleError(error, "categoria.controller -> createCategoria");
        respondError(req, res, 500, "No se creo la categoria");
    }
}

async function getCategoriaById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = categoriaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [categoria, errorCategoria] = await CategoriaService.getCategoriaById(params.id);
        if (errorCategoria) return respondError(req, res, 404, errorCategoria);

        respondSuccess(req, res, 200, categoria);
    } catch (error) {
        handleError(error, "categoria.controller -> getCategoriaById");
        respondError(req, res, 400, error.message);
    }
}

async function updateCategoria(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = categoriaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
        const { error: bodyError } = categoriaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [categoria, errorCategoria] = await CategoriaService.updateCategoria(params.id, body);
        if (errorCategoria) return respondError(req, res, 404, errorCategoria);
        respondSuccess(req, res, 200, categoria);
    } catch (error) {
        handleError(error, "categoria.controller -> updateCategoria");
        respondError(req, res, 400, "No se actualizo la categoria");
    }
}

async function deleteCategoria(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = categoriaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [categoria, errorCategoria] = await CategoriaService.deleteCategoria(params.id);
        if (errorCategoria) return respondError(req, res, 404, errorCategoria);

        respondSuccess(req, res, 200, categoria);
    } catch (error) {
        handleError(error, "categoria.controller -> deleteCategoria");
        respondError(req, res, 400, "No se elimino la categoria");
    }
}

module.exports = {
    getCategorias,
    createCategoria,
    getCategoriaById,
    updateCategoria,
    deleteCategoria,
};