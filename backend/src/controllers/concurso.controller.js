"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const ConcursoService = require("../services/concurso.service");
const { handleError } = require("../utils/errorHandler");
const { concursoBodySchema, concursoIdSchema } = require("../schema/concurso.schema");

async function getConcurso(req, res) {
  try {
    const [concursos, errorConcursos] = await ConcursoService.getConcurso();
    if (errorConcursos) return respondError(req, res, 404, errorConcursos);

    concursos.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, concursos);
  } catch (error) {

    handleError(error, "concurso.controller -> getConcurso");

    respondError(req, res, 400, error.message);
  }
}

async function createConcurso(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = concursoBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newConcurso, concursoError] = await ConcursoService.createConcurso(body);
    if (concursoError) return respondError(req, res, 400, concursoError);

    if (!newConcurso) {
      return respondError(req, res, 400, "No se creo el concurso");
    }

    respondSuccess(req, res, 201, newConcurso);
  } catch (error) {
    handleError(error, "concurso.controller -> createConcurso");
    respondError(req, res, 500, "No se creo el concurso");
  }
}

async function getConcursoById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = concursoIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [concurso, errorConcurso] = await ConcursoService.getConcursoById(params.id);
    if (errorConcurso) return respondError(req, res, 404, errorConcurso);

    respondSuccess(req, res, 200, concurso);
  } catch (error) {
    handleError(error, "concurso.controller -> getConcursoById");
    respondError(req, res, 500, error.message);
  }
}

async function updateConcurso(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = concursoIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = concursoBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [concursoUpdated, errorConcurso] = await ConcursoService.updateConcurso(params.id, body);
    if (errorConcurso) return respondError(req, res, 404, errorConcurso);

    respondSuccess(req, res, 200, concursoUpdated);
  } catch (error) {
    handleError(error, "concurso.controller -> updateConcurso");
    respondError(req, res, 500, "No se pudo actualizar el concurso");
  }
}

async function deleteConcurso(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = concursoIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [concursoDeleted, errorConcurso] = await ConcursoService.deleteConcurso(params.id);
    if (errorConcurso) return respondError(req, res, 404, errorConcurso);

    respondSuccess(req, res, 200, concursoDeleted);
  } catch (error) {
    handleError(error, "concurso.controller -> deleteConcurso");
    respondError(req, res, 400, error.message);
  }
}

module.exports = {
  getConcurso,
  createConcurso,
  getConcursoById,
  updateConcurso,
  deleteConcurso,
};