"use strict";

const Concurso = require("../models/concurso.model");

const Fondo = require("../models/fondo.model");
const { parse, isValid, isBefore, format } = require('date-fns');

const { handleError } = require("../utils/errorHandler");

async function getConcurso() {
  try {
    const concursos = await Concurso.find().exec();
    if (!concursos) return [null, "No hay concursos"];

    const concursosFormateados = concursos.map(concurso => {
      const fechaInicioFormateada = format(new Date(concurso.fechaInicio), 'dd-MM-yyyy');
      const fechaFinFormateada = format(new Date(concurso.fechaFin), 'dd-MM-yyyy');

      return {
        ...concurso.toObject(),
        fechaInicio: fechaInicioFormateada,
        fechaFin: fechaFinFormateada
      };
    });

    return [concursosFormateados, null];
  } catch (error) {
    handleError(error, "concurso.service -> getConcursos");
    return [null, 'Error interno del servidor'];
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

    const fechaInicioParsed = parse(fechaInicio, 'dd-MM-yyyy', new Date());
    const fechaFinParsed = parse(fechaFin, 'dd-MM-yyyy', new Date());
    const fechaActual = new Date();

    if (!isValid(fechaInicioParsed) || !isValid(fechaFinParsed)) {
      return [null, 'Formato de fecha inválido'];
    }

    if (isBefore(fechaInicioParsed, fechaActual)) {
      return [null, "La fecha de inicio no puede ser antes de la fecha actual"];
    }

    if (isBefore(fechaFinParsed, fechaInicioParsed)) {
      return [null, "La fecha de fin no puede ser antes que la fecha de inicio"];
    }

    const fechaInicioUTC = fechaInicioParsed.toISOString();
    const fechaFinUTC = fechaFinParsed.toISOString();

    const concursosFound = await Concurso.findOne({ nombre });
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

    const fechaInicioFormateada = format(new Date(concursoFound.fechaInicio), 'dd-MM-yyyy');
    const fechaFinFormateada = format(new Date(concursoFound.fechaFin), 'dd-MM-yyyy');

    const concursoFormateado = {
      ...concursoFound.toObject(),
      fechaInicio: fechaInicioFormateada,
      fechaFin: fechaFinFormateada
    };

    return [concursoFormateado, null];

  } catch (error) {
    handleError(error, "concurso.service -> getConcursoById");
    return [null, 'Error interno del servidor'];
  }
}

async function updateConcurso(id, concurso) {
  try {
    const concursoFound = await Concurso.findById(id);
    if (!concursoFound) return [null, "El concurso no existe"];

    const { nombre, bases, fechaInicio, fechaFin, montoAsignado, fondo } = concurso;
    const fechaInicioParsed = parse(fechaInicio, 'dd-MM-yyyy', new Date());
    const fechaFinParsed = parse(fechaFin, 'dd-MM-yyyy', new Date());
    const fechaActual = new Date();

    if (!isValid(fechaInicioParsed) || !isValid(fechaFinParsed)) {
      return [null, 'Formato de fecha inválido'];
    }

    if (isBefore(fechaInicioParsed, fechaActual)) {
      return [null, "La fecha de inicio no puede ser antes de la fecha actual"];
    }

    if (isBefore(fechaFinParsed, fechaInicioParsed)) {
      return [null, "La fecha de fin no puede ser antes que la fecha de inicio"];
    }

    const fechaInicioUTC = fechaInicioParsed.toISOString();
    const fechaFinUTC = fechaFinParsed.toISOString();

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
    return [null, 'Error interno del servidor'];
  }
}

async function deleteConcurso(id) {
  try {
    const concursoDeleted = await Concurso.findByIdAndDelete(id);
    if (!concursoDeleted) return [null, "El concurso no existe"];

    return [concursoDeleted, null];
  } catch (error) {
    handleError(error, "concurso.service -> deleteConcurso");
    return [null, 'Error interno del servidor'];
  }
}

module.exports = {
  getConcursoById,
  getConcurso,
  updateConcurso,
  deleteConcurso,
};