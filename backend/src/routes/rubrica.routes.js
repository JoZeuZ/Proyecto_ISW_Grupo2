"use strict";

const express = require("express");

const rubricaController = require("../controllers/rubrica.controller.js");

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin, rubricaController.getRubricas);
router.post("/", authorizationMiddleware.isAdmin, rubricaController.createRubrica);
router.get("/:id", authorizationMiddleware.isAdmin, rubricaController.getRubricaById);
router.put("/:id", authorizationMiddleware.isAdmin, rubricaController.updateRubrica);
router.delete("/:id", authorizationMiddleware.isAdmin, rubricaController.deleteRubrica);

module.exports = router;

