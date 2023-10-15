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
    montoDisponible: {
        type: Number,
        default: function() {
            return this.montoTotal - this.montoAsignado;
        }
    },
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    concursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concurso'
    }]
})


const Fondo = mongoose.model("Fondo", fondoSchema);
module.exports = Fondo;