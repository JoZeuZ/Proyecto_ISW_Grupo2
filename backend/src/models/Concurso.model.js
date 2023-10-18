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
    fondoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fondo',
        required: true
    },
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Concurso = mongoose.model('Concurso', ConcursoSchema);
module.exports = Concurso;
