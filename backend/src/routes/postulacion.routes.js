"use strict";

const express = require("express");

const postulacionController = require("../controllers/postulacion.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const upload = require("../config/configMulter.js")
const {validarRutPostulante,validarRutEmpresa}= require("../middlewares/validarRut.middleware.js");


const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin,postulacionController.getPostulaciones);
router.post("/", upload.any(), 
(req, res, next) => {
  if (req.files && req.files.length > 0) {
    next();
  } else {
   res.status(400).json({ success: false, message: "Error al subir el archivo" }); 
  }
},authorizationMiddleware.isPostulante, postulacionController.createPostulacion,validarRutPostulante,validarRutEmpresa,);
router.get("/:id",authorizationMiddleware.isAdmin,postulacionController.getPostulacionById);
router.put("/:id", authorizationMiddleware.isPostulante, postulacionController.updatePostulacion);
router.delete("/:id",authorizationMiddleware.isPostulante , postulacionController.deletePostulacion);

module.exports = router;






