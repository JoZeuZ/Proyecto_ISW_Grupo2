"use strict";

const {respondSuccess, respondError} = require("../utils/resHandler"); 
const ConcursoService = require("../services/concurso.service");
const {handleError} = require("../utils/errorHandler");

async function getConcursos(req, res) {
  try {
    const [concursos, errorConcursos] = await ConcursoService.getConcursos();
    if (errorConcursos) return respondError(req, res, 404, errorConcursos);

    concursos.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, concursos);
  } catch (error) {
    handleError(error, "concurso.controller -> getConcursos");
    respondError(req, res, 400, error.message);
  }
}

async function createConcurso(req, res) {
  try {
    const {body} = req;
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
    const {params} = req;
    const [concurso, errorConcurso] = await ConcursoService.getConcursoById(params.id);
    if (errorConcurso) return respondError(req, res, 404, errorConcurso);

    respondSuccess(req, res, 200, concurso);
  } catch (error) {
    handleError(error, "concurso.controller -> getConcursoById");
    respondError(req, res, 400, error.message);
  }
}

async function updateConcurso(req, res) {
  try {
    const {params, body} = req;
    const [concursoUpdated, errorConcurso] = await ConcursoService.updateConcurso(params.id, body);
    if (errorConcurso) return respondError(req, res, 404, errorConcurso);

    respondSuccess(req, res, 200, concursoUpdated);
  } catch (error) {
    handleError(error, "concurso.controller -> updateConcurso");
    respondError(req, res, 400, error.message);
  }
}

async function deleteConcurso(req, res) {
  try {
    const {params} = req;
    const [concursoDeleted, errorConcurso] = await ConcursoService.deleteConcurso(params.id);
    if (errorConcurso) return respondError(req, res, 404, errorConcurso);

    respondSuccess(req, res, 200, concursoDeleted);
  } catch (error) {
    handleError(error, "concurso.controller -> deleteConcurso");
    respondError(req, res, 400, error.message);
  }
}

module.exports = {
  getConcursos,
  createConcurso,
  getConcursoById,
  updateConcurso,
  deleteConcurso,
};