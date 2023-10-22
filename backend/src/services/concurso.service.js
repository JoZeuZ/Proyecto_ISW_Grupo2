"use strict";

const Concurso = require("../models/concurso.model");
const Fondo = require("../models/fondo.model");
const { handleError } = require("../utils/errorHandler");

async function getConcurso() {
  try {
    const concursos = await Concurso.find().exec();
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
      fondo
    } = concurso;
    const concursosFound = await Concurso.findOne({ nombre: concurso.nombre });
    if (concursosFound) return [null, "El concurso ya existe"];

    const fondoFound = await Fondo.find({ _id: { $in: fondo } });
    if (fondoFound.length === 0) return [null, "El fondo no existe"];
    const myFondo = fondoFound.map((fondo) => fondo._id);

    const newConcurso = new Concurso({
      nombre,
      bases,
      fechaInicio,
      fechaFin,
      montoAsignado,
      fondo: myFondo,
    });
    await newConcurso.save();

    return [newConcurso, null];
  } catch (error) {
    handleError(error, "concurso.service -> createConcurso");
  }
}

async function getConcursoById(id) {
  try {
    const concursoFound = await Concurso.findById(id).exec();
    if (!concursoFound) return [null, "El concurso no existe"];

    return [concursoFound, null];
  } catch (error) {
    handleError(error, "concurso.service -> getConcursoById");
  }
}

async function updateConcurso(id, concurso) {
  try {
    const concursoFound = await Concurso.findById(id);
    if (!concursoFound) return [null, "El concurso no existe"];

    const { nombre, bases, fechaInicio, fechaFin, montoAsignado, fondo } = concurso;

    const fondoFound = await Fondo.find({ _id: { $in: fondo } });
    if (fondoFound.length === 0) return [null, "El fondo no existe"];
    const myFondo = fondoFound.map((fondo) => fondo._id);

    const concursoUpdated = await Concurso.findByIdAndUpdate(
      id,
      {
        $set: {
          nombre,
          bases,
          fechaInicio,
          fechaFin,
          montoAsignado,
          fondo: myFondo,
        },
      },
      { new: true }
    );

    return [concursoUpdated, null];
  } catch (error) {
    handleError(error, "concurso.service -> updateConcurso");
  }
}


async function deleteConcurso(id) {
  try {
    const concursoDeleted = await Concurso.findByIdAndDelete(id);
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