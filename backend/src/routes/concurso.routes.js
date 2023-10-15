"use strict";

const express = require("express");

const concursoController = require("../controllers/concurso.controller.js");

const router = express.Router();

router.get("/", concursoController.getConcursos);
router.post("/", concursoController.createConcurso);
router.get("/:id", concursoController.getConcursoById);
router.put("/:id", concursoController.updateConcurso);
router.delete("/:id", concursoController.deleteConcurso);

module.exports = router;