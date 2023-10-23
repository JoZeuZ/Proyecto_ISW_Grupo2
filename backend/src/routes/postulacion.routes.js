"use strict";

const express = require("express");

const postulacionController = require("../controllers/postulacion.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", postulacionController.getPostulaciones);
router.post("/", authorizationMiddleware.isAdmin, postulacionController.createPostulacion);
router.get("/:id", postulacionController.getPostulacionById);
router.put("/:id", authorizationMiddleware.isAdmin, postulacionController.updatePostulacion);
router.delete("/:id", authorizationMiddleware.isAdmin, postulacionController.deletePostulacion);

module.exports = router;






