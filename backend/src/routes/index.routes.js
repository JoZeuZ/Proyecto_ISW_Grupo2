"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
// Enrutador de rubrica
const rubricaRoutes = require("./rubrica.routes.js");
// Enrutador de evaluacion
const evaluacionRoutes = require("./evaluacion.routes.js");
/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");
/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");
/** Enrutador de postulacion */
const postulacionRoutes = require("./postulacion.routes.js");
/** Enrutador de concurso */
const concursoRoutes = require("./concurso.routes.js");
/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const informeRoutes = require("./informe.routes.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
//Define las rutas para la rubrica /api/rubrica
router.use("/rubrica", rubricaRoutes);
//Define las rutas para la evaluacion /api/evaluacion
router.use("/evaluacion", evaluacionRoutes);

//Define las rutas para la postulacion /api/postulacion
router.use("/postulacion", postulacionRoutes);

// Define las rutas para los fondos /api/fondo
router.use("/fondo", require("./fondo.routes.js"));

// Define las rutas para los concursos /api/concurso
router.use("/concurso", require("./concurso.routes.js"));

// Define las rutas para las categorias /api/categoria
router.use("/categoria", require("./categoria.routes.js"));



// Exporta el enrutador
module.exports = router;
