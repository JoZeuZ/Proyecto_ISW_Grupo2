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

const postulacionRoutes = require("./postulacion.routes.js");

const concursoRoutes = require("./concurso.routes.js");
/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
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

router.use("/postulacion", postulacionRoutes);

// Define las rutas para los fondos /api/fondo
router.use("/fondo", require("./fondo.routes.js"));

// Define las rutas para los concursos /api/concurso
router.use("/concurso", require("./concurso.routes.js"));


// Exporta el enrutador
module.exports = router;
