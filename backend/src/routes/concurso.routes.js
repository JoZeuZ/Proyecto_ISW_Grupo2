"use strict";

const express = require("express");

const concursoController = require("../controllers/concurso.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();
router.use(authenticationMiddleware);


router.get("/", concursoController.getConcurso);
router.post("/", authorizationMiddleware.isAdmin, concursoController.createConcurso);
router.get("/:id", concursoController.getConcursoById);
router.put("/:id", authorizationMiddleware.isAdmin, concursoController.updateConcurso);
router.delete("/:id", authorizationMiddleware.isAdmin, concursoController.deleteConcurso);

module.exports = router;



