"use strict";

const mongoose = require("mongoose");

const fondoSchema = new mongoose.Schema({
    montoTotal: {
        type: Number,
        required: true,
    },
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})


const Fondo = mongoose.model("Fondo", fondoSchema);
module.exports = Fondo;