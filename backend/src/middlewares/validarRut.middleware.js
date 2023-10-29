"use strict";

const { validate, format, clean } = require("rut.js"); 

async function validarRutPostulante(req, res, next) {
  const rut = req.body.rutPostulante;
  
  clean(rut);
  
  const rutFormateado = format(rut);
  
  if (!validate(rutFormateado)) {
    return res.status(400).json({ error: "El rut del postulante no es valido" });
  }
  req.body.rutPostulante = rutFormateado;
  next();
}

async function validarRutEmpresa(req, res, next) {
  const rutE = req.body.rutEmpresa;
  
  clean(rutE);
  
  const rutFormateadoE = format(rutE);
  
  if (!validate(rutFormateadoE)) {
    return res.status(400).json({ error: "El rut de la empresa no es valido" });
  }
  req.body.rutEmpresa = rutFormateadoE;
  next();
}

module.exports = {validarRutPostulante, validarRutEmpresa};


