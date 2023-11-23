"use strict";

const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: false
    }
    // otros campos por ahora
});

const Categoria = mongoose.model("Categoria", categoriaSchema);
module.exports = Categoria;
