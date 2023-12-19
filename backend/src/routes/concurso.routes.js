"use strict";

const express = require("express");

const concursoController = require("../controllers/concurso.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();
router.get("/", concursoController.getConcurso);

router.use(authenticationMiddleware);

const montoMiddleware = require("../middlewares/fondo.middleware.js");


router.post("/", authorizationMiddleware.isAdmin, montoMiddleware.validarMonto, concursoController.createConcurso);
router.get("/:id", concursoController.getConcursoById);
router.put("/:id", authorizationMiddleware.isAdmin, concursoController.updateConcurso);
router.delete("/:id", authorizationMiddleware.isAdmin, concursoController.deleteConcurso);

module.exports = router;

