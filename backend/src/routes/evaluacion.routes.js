"use strict";

const express = require("express");

//const evaluarController = require("../controllers/evaluar.controller.js");

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);


//router.post("/evaluar/:postulacionId", authorizationMiddleware.isEvaluador, evaluarController.evaluarPostulacion);

module.exports = router;