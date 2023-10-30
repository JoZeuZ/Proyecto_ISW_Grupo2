"use strict";

const express = require("express");

const concursoController = require("../controllers/concurso.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();
router.use(authenticationMiddleware);

const montoMiddleware = require("../middlewares/fondo.middleware.js");

router.get("/", concursoController.getConcurso);
router.post("/", authorizationMiddleware.isAdmin, montoMiddleware.validarMonto, concursoController.createConcurso);
router.get("/:id", concursoController.getConcursoById);
router.put("/:id", authorizationMiddleware.isAdmin, montoMiddleware.validarMonto, concursoController.updateConcurso);
router.delete("/:id", authorizationMiddleware.isAdmin, concursoController.deleteConcurso);

module.exports = router;
