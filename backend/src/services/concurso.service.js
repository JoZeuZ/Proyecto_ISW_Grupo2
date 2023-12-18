"use strict";

const Concurso = require("../models/concurso.model");

const Fondo = require("../models/fondo.model");
const moment = require('moment');


const { handleError } = require("../utils/errorHandler");

async function getConcurso() {
  try {
    const concursos = await Concurso.find().exec();
    if (!concursos) return [null, "No hay concursos"];

    const concursosFormateados = concursos.map(concurso => {
      const fechaInicioFormateada = moment(concurso.fechaInicio).format('DD/MM/YYYY');
      const fechaFinFormateada = moment(concurso.fechaFin).format('DD/MM/YYYY');

      return {
        ...concurso.toObject(),
        fechaInicio: fechaInicioFormateada,
        fechaFin: fechaFinFormateada
      };
    });

    return [concursosFormateados, null];
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

    const fechaInicioMoment = moment(fechaInicio, 'DD/MM/YYYY');
    const fechaFinMoment = moment(fechaFin, 'DD/MM/YYYY');
    const fechaActualMoment = moment();

    if (!fechaInicioMoment.isValid() || !fechaFinMoment.isValid()) {
      return [null, 'Formato de fecha inválido'];
    }

    // Verificar que la fecha de inicio no es antes de la fecha actual
    if (fechaInicioMoment.isBefore(fechaActualMoment, 'day')) {
      return [null, "La fecha de inicio no puede ser antes de la fecha actual"];
    }

    // Verificar que la fecha de fin no es antes que la fecha de inicio
    if (fechaFinMoment.isBefore(fechaInicioMoment, 'day')) {
      return [null, "La fecha de fin no puede ser antes que la fecha de inicio"];
    }

    const fechaInicioUTC = fechaInicioMoment.toDate();
    const fechaFinUTC = fechaFinMoment.toDate();

    const concursosFound = await Concurso.findOne({ nombre: concurso.nombre });
    if (concursosFound) return [null, "El concurso ya existe"];

    const fondoFound = await Fondo.find({ _id: { $in: fondo } });
    if (fondoFound.length === 0) return [null, "El fondo no existe"];
    const myFondo = fondoFound.map((fondo) => fondo._id);

    const newConcurso = new Concurso({
      nombre,
      bases,
      fechaInicio: fechaInicioUTC,
      fechaFin: fechaFinUTC,
      montoAsignado,
      fondo: myFondo,

    });
    await newConcurso.save();

    return [newConcurso, null];
  } catch (error) {
    handleError(error, "concurso.service -> createConcurso");
    return [null, 'Error interno del servidor'];
  }
}

async function getConcursoById(id) {
  try {
    const concursoFound = await Concurso.findById(id).exec();
    if (!concursoFound) return [null, "El concurso no existe"];

    const fechaInicioFormateada = moment(concursoFound.fechaInicio).format('DD/MM/YYYY');
    const fechaFinFormateada = moment(concursoFound.fechaFin).format('DD/MM/YYYY');

    const concursoFormateado = {
      ...concursoFound.toObject(),
      fechaInicio: fechaInicioFormateada,
      fechaFin: fechaFinFormateada
    };

    return [concursoFormateado, null];

  } catch (error) {
    handleError(error, "concurso.service -> getConcursoById");
  }
}

async function updateConcurso(id, concurso) {
  try {

    const concursoFound = await Concurso.findById(id);
    if (!concursoFound) return [null, "El concurso no existe"];

    const { nombre, bases, fechaInicio, fechaFin, montoAsignado, fondo } = concurso;
    const fechaInicioMoment = moment(fechaInicio, 'DD/MM/YYYY');
    const fechaFinMoment = moment(fechaFin, 'DD/MM/YYYY');
    const fechaActualMoment = moment();

    if (!fechaInicioMoment.isValid() || !fechaFinMoment.isValid()) {
      return [null, 'Formato de fecha inválido'];
    }

    // Verificar que la fecha de inicio no es antes de la fecha actual
    if (fechaInicioMoment.isBefore(fechaActualMoment, 'day')) {
      return [null, "La fecha de inicio no puede ser antes de la fecha actual"];
    }

    // Verificar que la fecha de fin no es antes que la fecha de inicio
    if (fechaFinMoment.isBefore(fechaInicioMoment, 'day')) {
      return [null, "La fecha de fin no puede ser antes que la fecha de inicio"];
    }

    const fechaInicioUTC = fechaInicioMoment.toDate();
    const fechaFinUTC = fechaFinMoment.toDate();

    const fondoFound = await Fondo.find({ _id: { $in: fondo } });
    if (fondoFound.length === 0) return [null, "El fondo no existe"];
    const myFondo = fondoFound.map((fondo) => fondo._id);

    const concursoUpdated = await Concurso.findByIdAndUpdate(
      id,
      {
        $set: {
          nombre,
          bases,
          fechaInicio: fechaInicioUTC,
          fechaFin: fechaFinUTC,
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