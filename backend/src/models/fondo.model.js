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

fondoSchema.pre('findOneAndDelete', async function (next) {
    const fondoId = this.getQuery()['_id'];
    const concursos = await mongoose.model('Concurso').find({ fondo: fondoId });
    if (concursos.length > 0) {
        const error = new Error('No se puede eliminar el fondo porque tiene concursos asignados. Por favor, desasigne los concursos antes de eliminar el fondo.');
        error.statusCode = 400;
        return next(error);
    }

    next();
});

fondoSchema.pre('save', function (next) {
    // Comprobar que el montoTotal no sea menor que el montoAsignado
    if (this.montoTotal < this.montoAsignado) {
        next(new Error('El monto total no puede ser menor que el monto asignado'));
    } else {
        next();
    }
});

fondoSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate().$set;

    if (update && update.montoTotal !== undefined) {
        try {
            const fondoActual = await this.model.findOne(this.getQuery());
            if (update.montoTotal < fondoActual.montoAsignado) {
                throw new Error('El monto total no puede ser menor que el monto asignado');
            }
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Fondo = mongoose.model("Fondo", fondoSchema);
module.exports = Fondo;
