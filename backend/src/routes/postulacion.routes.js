"use strict";

const express = require("express");

const postulacionController = require("../controllers/postulacion.controller.js");
const { isAdmin } = require('../middlewares/authorization.middleware');
const { verifyJWT } = require('../middlewares/authentication.middleware');
const {isPostulante} = require('../middlewares/authorization.middleware');

const router = express.Router();

router.get("/", postulacionController.getPostulaciones);
router.post("/",  isAdmin,isPostulante, postulacionController.createPostulacion);
router.get("/:id", postulacionController.getPostulacionById);
router.put("/:id",  isAdmin,isPostulante, postulacionController.updatePostulacion);
router.delete("/:id",  isAdmin,isPostulante, postulacionController.deletePostulacion); 

module.exports = router;






