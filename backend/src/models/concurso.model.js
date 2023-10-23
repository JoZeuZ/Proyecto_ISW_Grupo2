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
    }
});

ConcursoSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  try {
    const Fondo = mongoose.model('Fondo');
    const fondo = await Fondo.findById(this.fondo);

    if (!fondo) {
      console.error('Fondo no encontrado');
      return next(new Error('Fondo no encontrado'));
    }

    fondo.concursos.push(this._id);
    await fondo.save();
    next();
  } catch (error) {
    next(error);
  }
});

ConcursoSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
      const Fondo = mongoose.model('Fondo');
      const fondo = await Fondo.findById(doc.fondo);
      if (fondo) {
        fondo.montoAsignado -= doc.montoAsignado;
        fondo.concursos = fondo.concursos.filter(id => id.toString() !== doc._id.toString());
        await fondo.save();
      }
    }
  });
  
  
const Concurso = mongoose.model('Concurso', ConcursoSchema);
module.exports = Concurso;
