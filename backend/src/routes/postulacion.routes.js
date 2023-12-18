"use strict";

const express = require("express");

const postulacionController = require("../controllers/postulacion.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const {validarRutPostulante,validarRutEmpresa}= require("../middlewares/validarRut.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", postulacionController.getPostulaciones);
router.post("/", validarRutPostulante,validarRutEmpresa, authorizationMiddleware.isPostulante, postulacionController.createPostulacion);
router.get("/:id", authorizationMiddleware.isAdmin, postulacionController.getPostulacionById);
router.put("/:id", authorizationMiddleware.isPostulante, postulacionController.updatePostulacion);
router.delete("/:id",authorizationMiddleware.isPostulante , postulacionController.deletePostulacion);

module.exports = router;

