"use strict";

const Fondo = require("../models/fondo.model.js");
const Concurso = require("../models/concurso.model.js");
const Categoria = require("../models/categoria.model.js");
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
    const { nombre, montoTotal, montoAsignado, concursos, categoria } = fondo;
    const fondosFound = await Fondo.findOne({ _id: fondo._id }).exec();
    if (fondosFound) return [null, "El fondo ya existe"];

    if ('montoAsignado' in fondo || 'concursos' in fondo) {
      throw new Error('No está permitido modificar montoAsignado o concursos directamente.');
    }

    let myConcurso = [];
    if (concursos && concursos.length > 0) {
      const concursosFound = await Concurso.find({ _id: { $in: concursos } });
      if (concursosFound.length === 0) return [null, "El concurso no existe"];
      myConcurso = concursosFound.map((concurso) => concurso._id);
    }
    
    const categoriaFound = await Categoria.find({ _id: { $in: categoria } });
    if (!categoriaFound) return [null, "La categoria no existe"];

    const newFondo = new Fondo({
      nombre,
      montoTotal,
      montoAsignado,
      concursos: myConcurso,
      categoria,
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
    const fondoFound = await Fondo.findById(id);
    if (!fondoFound) return [null, "El fondo no existe"];

    if ('montoAsignado' in fondo || 'concursos' in fondo) {
      throw new Error('No está permitido modificar montoAsignado o concursos directamente.');
    }

    const { nombre, montoTotal, montoAsignado, concursos, categoria } = fondo;

    const categoriaFound = await Categoria.findById(categoria);
    if (!categoriaFound) return [null, "La categoria no existe"];

    const fondoUpdated = await Fondo.findByIdAndUpdate(
      id,
      {
        $set: {
          nombre,
          montoTotal,
          montoAsignado,
          concursos,
          categoria,
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
    if (error.statusCode === 400) {
      return [null, error.message];
    }
    handleError(error, "fondo.service -> deleteFondo");
    return [null, "Error interno del servidor"];
  }
}
module.exports = {
  getFondo,
  createFondo,
  getFondoById,
  updateFondo,
  deleteFondo,
};