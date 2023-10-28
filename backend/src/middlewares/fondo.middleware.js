/**
 * Funcion middleware para manejar operaciones relacionadas con fondos.
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

    next();
  } catch (error) {
    handleError(error, "monto.middleware -> validarMonto");
    respondError(req, res, 500, "Error interno del servidor");
  }
}



module.exports = {
  validarMonto,
};
