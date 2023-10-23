"use strict";

const mongoose = require('mongoose');

const PostulacionSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
    },
    correoElectronico:{
        type: String,
        required: true
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
  concurso: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Concurso",
    required: true,
}, ],
});    


const Postulacion = mongoose.model('Postulacion', PostulacionSchema);
module.exports = Postulacion;