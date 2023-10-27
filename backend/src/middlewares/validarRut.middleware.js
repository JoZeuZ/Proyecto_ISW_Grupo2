"use strict";

const { validate, format, clean } = require("rut.js"); 

async function validarRutPostulante(req, res, next) {
  const rut = req.body.rutPostulante;
  
  clean(rut);
  
  const rutFormateado = format(rut);
  
  

  if (!validate(rutFormateado)) {
    return res.status(400).json({ error: "El rut no es valido" });
  }
  req.body.rutPostulante = rutFormateado;
  next();
}

module.exports = validarRutPostulante;


