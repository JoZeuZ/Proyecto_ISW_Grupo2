"use strict";

const mongoose = require("mongoose");

const criterioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    puntaje: {
        type: Number,
        required: true,
    },
});

const rubricaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
    criterios:[{
        type: criterioSchema,
        required: true,
    }],
    puntajeAprobacion: {
        type: Number,
        required: true,
    },
    concurso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Concurso",
    },
});

// rubricaSchema.pre('save', async function (next) {
//     if(!this.isNew) return next();

//     try{
//         const Concurso = mongoose.model('Concurso');
//         const concurso = await Concurso.findById(this.concurso);

//         if(!concurso){
//             console.error("Concurso no encontrado");
//             return next(new Error("Concurso no encontrado"));
//         }
//         concurso.rubrica.push(this._id);
//         await concurso.save();
//         next(); 
//     }
//     catch(error){
//         next(error);
//     }
// });

// rubricaSchema.post('FindByIDAndDelete', async function (doc) {
//     if(doc){
//         const Concurso = mongoose.model('Concurso');
//         const concurso = await Concurso.findById(doc.concurso);
//         if(concurso){
//             concurso.rubrica = concurso.rubrica.filter((rubrica) => rubrica._id !== doc._id);
//         }
//     }
// });

const rubrica = mongoose.model("rubrica", rubricaSchema);

module.exports = rubrica;