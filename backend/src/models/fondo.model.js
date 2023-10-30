"use strict";

const mongoose = require("mongoose");

const fondoSchema = new mongoose.Schema({
    montoTotal: {
        type: Number,
        required: true,
    },
    montoAsignado: {
        type: Number,
        default: 0,
    },
    concursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Concurso",
    }],

})


const Fondo = mongoose.model("Fondo", fondoSchema);
module.exports = Fondo;
