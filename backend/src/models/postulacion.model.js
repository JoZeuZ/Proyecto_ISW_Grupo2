"use strict";

const mongoose = require('mongoose');

const PostulacionSchema = new mongoose.Schema({
    nombrePostulante:{
        type: String,
        required: true
    },
    rutPostulante:{
        type: String,
        required: true,
        unique: true
    },
    correoElectronico:{
      type: String,
      required: true
    },
    numeroTelefono:{
      type: String
    },
    descripcion:{
        type: String,
        required: true
    },
    nombreEmpresa:{
        type: String,
        required: true
    },
    rutEmpresa:{
        type: String,
        required: true,
        unique: true
    },
    propuestaProyecto:{
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        formato: {
            type: String,
            required: true
        }   
    },
    imagenesRespaldoPostulacion:[
      {
        type: String,
        required: true
      }
    ],
  concurso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Concurso",
    required: true,
  }, 
});    

const Postulacion = mongoose.model('Postulacion', PostulacionSchema, "postulaciones");
module.exports = Postulacion;