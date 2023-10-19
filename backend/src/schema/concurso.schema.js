"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de Fondo.
 * @constant {Object}
 */
const fondoBodySchema = Joi.object({
    montoTotal: Joi.number().required().min(0).messages({
        "number.base": "El monto total debe ser un número.",
        "number.min": "El monto total no puede ser negativo.",
        "any.required": "El monto total es obligatorio."
    }),
    adminID: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El adminID no puede estar vacío.",
            "any.required": "El adminID es obligatorio.",
            "string.base": "El adminID debe ser de tipo string.",
            "string.pattern.base": "El adminID proporcionado no es un ObjectId válido."
        }),
    concursos: Joi.array()
        .items(Joi.string().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/))
        .messages({
            "array.base": "Los concursos deben ser de tipo array.",
            "string.pattern.base": "El concursoID proporcionado no es un ObjectId válido."
        })
}).messages({
    "object.unknown": "No se permiten propiedades adicionales."
});

/**
 * Esquema de validación para el id de Fondo.
 * @constant {Object}
 */
const fondoIdSchema = Joi.object({
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

module.exports = { fondoBodySchema, fondoIdSchema };