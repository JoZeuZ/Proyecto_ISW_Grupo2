/**
 * Funciones middleware para manejar operaciones relacionadas con fondos.
 * @module fondoMiddleware
 */

"use strict";

const mongoose = require('mongoose');
const { respondError } = require('../utils/resHandler');
const { handleError } = require('../utils/errorHandler');
const Fondo = require("../models/fondo.model");
const Concurso = require("../models/concurso.model");

/**
 * Valida la cantidad asignada a un concurso y actualiza la cantidad asignada del fondo correspondiente.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware siguiente de Express.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la cadena de middleware está completa.
 */
async function validarMonto(req, res, next) {
  try {
    const concurso = req.body;
    const fondo = await Fondo.findById(concurso.fondo);
    if (!fondo) {
      return respondError(req, res, 404, "Fondo no encontrado");
    }

    if (concurso.montoAsignado < 0) {
      return respondError(req, res, 400, "El monto asignado no puede ser un número negativo");
    }

    const montoAsignadoActualizado = fondo.montoAsignado + concurso.montoAsignado;
    if (montoAsignadoActualizado > fondo.montoTotal) {
      return respondError(req, res, 400, "El monto asignado excede el monto total del fondo", {
        montoTotal: fondo.montoTotal,
        montoAsignado: fondo.montoAsignado
      });
    }

    // Actualizar el monto asignado del fondo
    fondo.montoAsignado = montoAsignadoActualizado;
    // Agregar el concurso al array de concursos del fondo
    fondo.concursos.push(concurso._id);
    await fondo.save();

    next();
  } catch (error) {
    handleError(error, "monto.middleware -> validarMonto");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Resta la cantidad asignada a un concurso del fondo correspondiente.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware siguiente de Express.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la cadena de middleware está completa.
 */
async function restarMontoFondo(req, res, next) {
  try {
    const concursoId = req.params.id;
    const concurso = await Concurso.findById(concursoId).populate('fondo');
    if (!concurso || !concurso.fondo) {
      return respondError(req, res, 404, 'Concurso o fondo no encontrado');
    }

    concurso.fondo.montoAsignado -= concurso.montoAsignado;
    await concurso.fondo.save();

    next();
  } catch (error) {
    handleError(error, "monto.middleware -> restarMontoFondo");
    respondError(req, res, 500, 'Error al restar monto del fondo');
  }
}

module.exports = {
  validarMonto,
  restarMontoFondo
};
