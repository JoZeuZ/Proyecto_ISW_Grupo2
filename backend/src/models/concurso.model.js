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


// actualiza el monto asignado del fondo luego de guardar el concurso, anteriormente se hacia en el middleware, 
// pero se cambio por inconsistencias en la base de datos
ConcursoSchema.post('save', async function () {
  try {
    const Fondo = mongoose.model('Fondo');
    const concurso = this;
    const fondo = await Fondo.findById(concurso.fondo);
    if (!fondo) {
      throw new Error('Fondo no encontrado');
    }

    fondo.montoAsignado += concurso.montoAsignado;
    await fondo.save();
  } catch (error) {
    console.error('Error al actualizar el monto asignado del fondo:', error);
    throw error;
  }
});

ConcursoSchema.pre('findOneAndUpdate', async function(next) {
  const query = this;
  const update = query.getUpdate().$set;
  const Fondo = mongoose.model('Fondo');
  if (update && update.montoAsignado !== undefined) {
    try {
      const concursoOriginal = await Concurso.findById(query._conditions._id);
      const fondo = await Fondo.findById(concursoOriginal.fondo);

      const montoTotalAsignadoOtrosConcursos = fondo.montoAsignado - concursoOriginal.montoAsignado;
      const nuevoMontoTotalAsignado = montoTotalAsignadoOtrosConcursos + update.montoAsignado;

      if (nuevoMontoTotalAsignado > fondo.montoTotal) {
        throw new Error("El monto asignado excede el monto total del fondo");
      }

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

ConcursoSchema.post('findOneAndUpdate', async function(doc) {
  if (doc) {
    try {
      const Fondo = mongoose.model('Fondo');
      const fondo = await Fondo.findById(doc.fondo);

      const montoTotalAsignado = await Concurso.aggregate([
        { $match: { fondo: doc.fondo } },
        { $group: { _id: null, total: { $sum: "$montoAsignado" } } }
      ]).then(res => res[0] ? res[0].total : 0);

      fondo.montoAsignado = montoTotalAsignado;
      await fondo.save();
    } catch (error) {
      console.error("Error al actualizar el monto asignado del fondo", error);
    }
  }
});


ConcursoSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    const Fondo = mongoose.model('Fondo');
    const fondo = await Fondo.findById(doc.fondo);
    if (fondo) {
      if (fondo.montoAsignado <= 0 || fondo.montoAsignado < doc.montoAsignado) {
        throw new Error('El monto asignado del fondo es insuficiente para realizar la operación');
      }

      fondo.montoAsignado -= doc.montoAsignado;
      fondo.concursos = fondo.concursos.filter(id => id.toString() !== doc._id.toString());
      await fondo.save();
    }
  }
});

const Concurso = mongoose.model('Concurso', ConcursoSchema);
module.exports = Concurso;
