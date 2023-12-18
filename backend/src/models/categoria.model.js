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
        required: true,
    },
    fondos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fondo",
    }],
});


categoriaSchema.pre('findOneAndDelete', async function (next) {
    const nombreC = this.getQuery()['nombre'];
    const fondo = await mongoose.model('Fondo').find({ categoria: nombreC});

    if (fondo.length > 0) {
        const error = new Error("No se puede eliminar la categoria. Desasigne los fondos antes.");
        error.statusCode = 400;
        return next(error);
    }

    next();
});


const Categoria = mongoose.model("Categoria", categoriaSchema);
module.exports = Categoria;
