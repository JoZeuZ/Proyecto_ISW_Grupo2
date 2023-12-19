"use strict";

const Joi = require("joi");

const categoriaBodySchema = Joi.object({
    nombre: Joi.string().required().min(9).max(40).trim()
    .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser un texto.",
        "string.min": "El nombre debe tener al menos 9 caracteres.",
        "string.max": "El nombre no puede tener más de 40 caracteres.",
        "any.required": "El nombre es obligatorio."
    }),
    descripcion: Joi.string().required().min(20).trim()
    .messages({
        "string.empty": "La descripción no puede estar vacía.",
        "string.base": "La descripción debe ser un texto.",
        "string.min": "La descripción debe tener al menos 20 caracteres.",
        "any.required": "La descripción es obligatoria."
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales."
});


const categoriaIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es un ObjectId válido."
        }),
});

const categoriaNombreSchema = Joi.object({
    nombre: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio."
    }),
})

module.exports = { categoriaBodySchema, categoriaIdSchema, categoriaNombreSchema };