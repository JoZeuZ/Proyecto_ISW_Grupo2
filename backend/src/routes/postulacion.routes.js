"use strict";
const express = require("express");

const postulacionController = require("../controllers/postulacion.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const upload = require("../config/configMulter.js")
const {validarRutPostulante,validarRutEmpresa}= require("../middlewares/validarRut.middleware.js");

//Rutas que no requieren logeo
const router = express.Router();
router.post("/",
upload.any(), 
(req, res, next) => {
  console.log(req.files)
  if (req.files && req.files.length > 0) {
    next();
  } else {
   res.status(400).json({ success: false, message: "Error al subir el archivo" }); 
  }
},
validarRutPostulante,validarRutEmpresa,postulacionController.createPostulacion);

router.put("/:id",
upload.any(), 
(req, res, next) => {
  if (req.files && req.files.length > 0) {
    next();
  } else {
   res.status(400).json({ success: false, message: "Error al subir el archivo" }); 
  }
},
validarRutPostulante,validarRutEmpresa,postulacionController.updatePostulacion);


//Rutas que requieren logeo
router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin,postulacionController.getPostulaciones);
router.get("/:id",authorizationMiddleware.isAdmin,postulacionController.getPostulacionById);
router.delete("/:id", authorizationMiddleware.isAdmin,postulacionController.deletePostulacion);

module.exports = router;




