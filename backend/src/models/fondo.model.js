"use strict";

const mongoose = require("mongoose");

const fondoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
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
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
    },
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

fondoSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        const Categoria = mongoose.model('Categoria');
        const categoria = await Categoria.findById(doc.categoria);
        categoria.fondos.pull(doc._id);
        await categoria.save();
    }
});


fondoSchema.pre('save', function (next) {
    // Comprobar que el montoTotal no sea menor que el montoAsignado
    if (this.montoTotal < this.montoAsignado) {
        next(new Error('El monto total no puede ser menor que el monto asignado'));
    } else {
        next();
    }
});

fondoSchema.pre('save', async function (next) {
    if (!this.isNew) return next();
  
    try {
      const Categoria = mongoose.model('Categoria');
      const categoria = await Categoria.findById(this.categoria);
  
      if (!categoria) {
        return next(new Error('Categoria no encontrada'));
      }
  
      categoria.fondos.push(this._id);
      await categoria.save();
      next();
    } catch (error) {
      next(error);
    }
  });

fondoSchema.pre('findOneAndUpdate', async function (next) {
    const original = this;
    const update = this.getUpdate().$set;
    const Categoria = mongoose.model('Categoria');
    if (update && update.categoria !== undefined) {
        try {
            const fondoOriginal = await Fondo.findById(original._conditions._id);
            const categoriaOriginal = await Categoria.findById(fondoOriginal.categoria);
            const categoriaNueva = await Categoria.findById(update.categoria);

            if (!categoriaOriginal) {
                throw new Error('Categoria original no encontrada');
            }

            if (!categoriaNueva) {
                throw new Error('Categoria nueva no encontrada');
            }

            categoriaOriginal.fondos.pull(this.getQuery()['_id']);
            await categoriaOriginal.save();

            categoriaNueva.fondos.push(this.getQuery()['_id']);
            await categoriaNueva.save();

            next();
        } catch (error) {
            next(error);
        }
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
