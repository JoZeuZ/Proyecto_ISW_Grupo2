"use strict";

const mongoose = require("mongoose");

const criterioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
    puntaje: {
        type: Number,
        required: true,
    },
});

const rubricaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
    criterios: [criterioSchema],
    concursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Concurso",
    }, ],
});

const rubrica = mongoose.model("Rubrica", rubricaSchema);

module.exports = rubrica;