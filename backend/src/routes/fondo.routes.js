"use strict"; 
const express = require("express");

const fondoController = require("../controllers/fondo.controller.js");

const router = express.Router();

router.get("/", fondoController.getFondo);
router.post("/", fondoController.createFondo);
router.get("/:id", fondoController.getFondoById);
router.put("/:id", fondoController.updateFondo);
router.delete("/:id", fondoController.deleteFondo);

module.exports = router;
