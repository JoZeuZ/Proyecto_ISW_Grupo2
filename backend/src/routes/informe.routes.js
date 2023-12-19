"use strict";

const express = require("express");

const informeController = require("../controllers/informe.controller.js");

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", informeController.getInformes);
router.get("/:id", authorizationMiddleware.isAdmin, informeController.getInformeById);
router.get("/postulacion/:id", informeController.getInformeByPostulacionId);
router.delete("/:id", authorizationMiddleware.isAdmin, informeController.deleteInforme);

module.exports = router;
