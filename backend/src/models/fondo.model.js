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
    // montoDisponible: {
    //     type: Number,
    //     default: function() {
    //         return this.montoTotal - this.montoAsignado;
    //     }
    // }
})


const Fondo = mongoose.model("Fondo", fondoSchema);
module.exports = Fondo;
