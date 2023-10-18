"use strict"; 
const express = require("express");

const fondoController = require("../controllers/fondo.controller.js");
const { isAdmin } = require('../middlewares/authorization.middleware');
const { verifyJWT } = require('../middlewares/authentication.middleware');


const router = express.Router();

router.get("/", fondoController.getFondo);
router.post("/", verifyJWT, isAdmin, fondoController.createFondo);
router.get("/:id", fondoController.getFondoById);
router.put("/:id", verifyJWT, isAdmin, fondoController.updateFondo);
router.delete("/:id", verifyJWT, isAdmin, fondoController.deleteFondo);

module.exports = router;
