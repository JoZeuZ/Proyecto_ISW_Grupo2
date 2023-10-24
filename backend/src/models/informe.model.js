"use strict";

const mongoose = require("mongoose");

const criterioEvaluadoSchema = new mongoose.Schema({
  criterio: {
    type: String,
    required: true,
  },
  puntaje: {
    type: Number,
    required: true,
  },
});

const informeSchema = new mongoose.Schema({
  evaluador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postulacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Postulacion",
    required: true,
  },
  resultados: {
    type: Number,
    required: true,
  },
  aprobado: {
    type: Boolean, //0 rechazado 1 aprobado
    required: true,
  },
});

const informe = mongoose.model("informe", informeSchema);

module.exports = informe;