"use strict";

const Joi = require("joi");


/**
 * Esquema de validación para el cuerpo de la solicitud de Fondo.
 * @constant {Object}
 */
const fondoBodySchema = Joi.object({
    nombre: Joi.string().required().min(5).max(50).trim().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser un string.",
        "string.min": "El nombre debe tener al menos 5 caracteres.",
        "string.max": "El nombre no puede tener más de 50 caracteres.",
        "any.required": "El nombre es obligatorio.",

    }),
    montoTotal: Joi.number().required().greater(100000).messages({
        "number.base": "El monto total debe ser un número.",
        "number.integer": "El monto total debe ser un número entero.",
        "number.positive": "El monto total debe ser un número positivo.",
        "number.unsafe": "El monto total debe ser un valor permitido.",
        "number.greater": "El monto total debe ser mayor a 100000.",
        "any.required": "El monto total es obligatorio.",
    }),
    categoria: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
        "string.empty": "La categoria no puede estar vacía.",
        "string.base": "La categoria debe ser un string.",
        "any.required": "La categoria es obligatoria.",
        "string.pattern.base": "La categoria proporcionada no es un ID válido.",
    }),
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
