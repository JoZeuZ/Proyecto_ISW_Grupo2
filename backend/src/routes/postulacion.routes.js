"use strict";

const express = require("express");

const postulacionController = require("../controllers/postulacion.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", postulacionController.getPostulaciones);
router.get("/:id", postulacionController.getPostulacionById);
router.post("/", authorizationMiddleware, postulacionController.createPostulacion);
router.put("/:id", authorizationMiddleware, postulacionController.updatePostulacion);
router.delete("/:id", authorizationMiddleware, postulacionController.deletePostulacion);


module.exports = router;




