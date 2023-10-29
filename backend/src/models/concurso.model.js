"use strict";

const mongoose = require('mongoose');

const ConcursoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    bases: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    montoAsignado: {
        type: Number,
        required: true
    },
    fondo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fondo',
        required: true
    },
});

  
const Concurso = mongoose.model('Concurso', ConcursoSchema);
module.exports = Concurso;