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
  

const Fondo = mongoose.model("Fondo", fondoSchema);
module.exports = Fondo;
