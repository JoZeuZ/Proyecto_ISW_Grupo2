"use strict";

const mongoose = require("mongoose");

const informeSchema = new mongoose.Schema({
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
    type: Boolean,
    required: true,
  },
});

const informe = mongoose.model("informe", informeSchema);
module.exports = informe;