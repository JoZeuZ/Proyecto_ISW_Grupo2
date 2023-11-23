"use strict";
const express = require("express");

const categoriaController = require("../controllers/categoria.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();
router.use(authenticationMiddleware);

router.get("/", categoriaController.getCategorias);
router.get("/:id", categoriaController.getCategoriaById);
router.post("/", authorizationMiddleware.isAdmin, categoriaController.createCategoria);
router.put("/:id", authorizationMiddleware.isAdmin, categoriaController.updateCategoria);
router.delete("/:id", authorizationMiddleware.isAdmin, categoriaController.deleteCategoria);

module.exports = router;
