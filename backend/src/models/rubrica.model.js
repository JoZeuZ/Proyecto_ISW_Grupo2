"use strict";

const mongoose = require("mongoose");

const criterioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
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
    criterios:[{
        type: criterioSchema,
        required: true,
    }],
    puntajeAprobacion: {
        type: Number,
        required: true,
    },
    concurso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Concurso",
        required: true,
    },
});


const rubrica = mongoose.model("rubrica", rubricaSchema);

module.exports = rubrica;
