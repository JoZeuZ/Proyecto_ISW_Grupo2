"use strict";

const Fondo = require("../models/fondo.model.js");
const Concurso = require("../models/concurso.model.js");
const { handleError } = require("../utils/errorHandler");

async function getFondo() {
  try {
    const fondos = await Fondo.find().exec();
    if (!fondos) return [null, "No hay fondos"];

    return [fondos, null];
  } catch (error) {
    handleError(error, "fondo.service -> getFondos");
  }
}

async function createFondo(fondo) {
  try {
    const { montoTotal, montoAsignado, concursos} = fondo;
    const fondosFound = await Fondo.findOne({_id: fondo._id}).exec();
    if (fondosFound) return [null, "El fondo ya existe"];

    const concursosFound = await Concurso.find({ _id: { $in: concursos } });
    if (concursosFound.length === 0) return [null, "El concurso no existe"];
    const myConcurso = concursosFound.map((concurso) => concurso._id);

    const newFondo = new Fondo({
      montoTotal,
      montoAsignado,
      concursos: myConcurso,
    });
    await newFondo.save();

    return [newFondo, null];
  } catch (error) {
    handleError(error, "fondo.service -> createFondo");
  }
}

async function getFondoById(id) {
  try {
    const fondoFound = await Fondo.findById(id).exec();
    if (!fondoFound) return [null, "El fondo no existe"];

    return [fondoFound, null];
  } catch (error) {
    handleError(error, "fondo.service -> getFondoById");
  }
}

async function updateFondo(id, fondo) {
  try {
    const fondoFound= await Fondo.findById(id);
    if (!fondoFound) return [null, "El fondo no existe"];

    const { montoTotal, montoAsignado, concursos} = fondo;

    const concursosFound = await Concurso.find({ _id: { $in: concursos } });
    if (concursosFound.length === 0) return [null, "El concurso no existe"];

    const myConcurso = concursosFound.map((concurso) => concurso._id);

    const fondoUpdated = await Fondo.findByIdAndUpdate(
      id,
      {
        $set: {
          montoTotal,
          montoAsignado,
          concursos: myConcurso,
        },
      },
      { new: true }
    );
    return [fondoUpdated, null];
  } catch (error) { 
    handleError(error, "fondo.service -> updateFondo");
  }
}

async function deleteFondo(id) {
  try {
    const fondoFound = await Fondo.findById(id);
    if (!fondoFound) return [null, "El fondo no existe"];

    await Fondo.findByIdAndDelete(id);
    return ["Fondo eliminado", null];
  } catch (error) {
    handleError(error, "fondo.service -> deleteFondo");
  }
}

module.exports = {
  getFondo,
  createFondo,
  getFondoById,
  updateFondo,
  deleteFondo,
};