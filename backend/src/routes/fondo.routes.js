"use strict"; 
const express = require("express");

const fondoController = require("../controllers/fondo.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();
router.use(authenticationMiddleware);

router.get("/", fondoController.getFondo);
router.post("/", authorizationMiddleware.isAdmin, fondoController.createFondo);
router.get("/:id", fondoController.getFondoById);
router.put("/:id", authorizationMiddleware.isAdmin, fondoController.updateFondo);
router.delete("/:id", authorizationMiddleware.isAdmin, fondoController.deleteFondo);

module.exports = router;
