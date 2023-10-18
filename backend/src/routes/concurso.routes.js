"use strict";

const express = require("express");

const concursoController = require("../controllers/concurso.controller.js");
const { isAdmin } = require('../middlewares/authorization.middleware');
const { verifyJWT } = require('../middlewares/authentication.middleware');

const router = express.Router();

router.get("/", concursoController.getConcursos);
router.post("/", verifyJWT, isAdmin, concursoController.createConcurso);
router.get("/:id", concursoController.getConcursoById);
router.put("/:id", verifyJWT, isAdmin, concursoController.updateConcurso);
router.delete("/:id", verifyJWT, isAdmin, concursoController.deleteConcurso);

module.exports = router;