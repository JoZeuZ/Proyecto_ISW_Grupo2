"use strict";

const Concurso = require("../models/concurso.model");
const { handleError } = require("../utils/errorHandler");

async function getConcurso() {
  try {
    const concursos = await concurso.find().exec();
    if (!concursos) return [null, "No hay concursos"];

    return [concursos, null];
  } catch (error) {
    handleError(error, "concurso.service -> getConcursos");
  }
}

async function createConcurso(concurso) {
  try {
    const {
      nombre,
      bases,
      fechaInicio,
      fechaFin,
      montoAsignado,
      fondoID,
      adminID,
    } = concurso;

    const newConcurso = new concurso({
      nombre,
      bases,
      fechaInicio,
      fechaFin,
      montoAsignado,
      fondoID,
      adminID,
    });
    await newConcurso.save();

    return [newConcurso, null];
  } catch (error) {
    handleError(error, "concurso.service -> createConcurso");
  }
}

async function getConcursoById(id) {
  try {
    const concursoFound = await concurso.findById(id).exec();
    if (!concursoFound) return [null, "El concurso no existe"];

    return [concursoFound, null];
  } catch (error) {
    handleError(error, "concurso.service -> getConcursoById");
  }
}

async function updateConcurso(id, concurso) {
  try {
    const concursoUpdated = await concurso.findByIdAndUpdate(
      id,
      {
        $set: concurso,
      },
      { new: true }
    );
    if (!concursoUpdated) return [null, "El concurso no existe"];

    return [concursoUpdated, null];
  } catch (error) {
    handleError(error, "concurso.service -> updateConcurso");
  }
}


async function deleteConcurso(id) {
  try {
    const concursoDeleted = await concurso.findByIdAndDelete(id);
    if (!concursoDeleted) return [null, "El concurso no existe"];

    return [concursoDeleted, null];
  } catch (error) {
    handleError(error, "concurso.service -> deleteConcurso");
  }
}

module.exports = {
  getConcurso,
  createConcurso,
  getConcursoById,
  updateConcurso,
  deleteConcurso,
};