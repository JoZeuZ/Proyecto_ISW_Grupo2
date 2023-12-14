"use strict";

const Informe = require("../models/informe.model.js");

const { handleError } = require("../utils/errorHandler");

async function getInformes() {
  try {
    const informes = await Informe.find().exec();
    if (!informes) return [null, "No hay informes"];
    return [informes, null];
  } catch (error) {
    handleError(error, "informe.service -> getInformes");
  }
}

async function getInformeById(id) {
    try {
        const informeFound = await Informe.findById(id).exec();
        if (!informeFound) return [null, "El informe no existe"];
        return [informeFound, null];
    } catch (error) {
        handleError(error, "informe.service -> getInformeById");
    }
}

async function getInformeByPostulacionId(id) {
    try {
        const informeFound = await Informe.findOne({ postulacion: id }).exec();
        if (!informeFound) return [null, "El informe no existe"];
        return [informeFound, null];
    } catch (error) {
        handleError(error, "informe.service -> getInformeByPostulacionId");
    }
}

async function deleteInforme(id) {
    try {
        const informeFound = await Informe.findByIdAndDelete(id).exec();
        if (!informeFound) return [null, "El informe no existe"];
        return [informeFound, null];
    } catch (error) {
        handleError(error, "informe.service -> deleteInforme");
    }
}

module.exports = {
    getInformes,
    getInformeById,
    getInformeByPostulacionId,
    deleteInforme,
};