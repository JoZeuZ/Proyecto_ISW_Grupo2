"use strict";

const mongoose = require('mongoose');

const postulacionSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
    },
    propuestaProyecto:{
        nombre: {
            type: String,
            required: true
        },
        contenido: {
            type: String,
            required: true
        },
        formato: {
            type: String,
            required: true
        }   
    },
    imagenes: [
    {
      nombre: {
        type: String,
        required: true,
      },
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
  ],
  certificados: [
    {
      nombre: {
        type: String,
        required: true,
      },
      contenido: {
        type: String,
        required: true,
      },
      formato: {
        type: String,
        required: true,
      },
    },
  ],
  concursos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Concurso",
}, ],
});    


const Postulacion = mongoose.model('Postulacion', postulacionSchema);
module.exports = Postulacion;