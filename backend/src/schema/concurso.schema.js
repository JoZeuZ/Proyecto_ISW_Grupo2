"use strict";

const Joi = require("joi");


const concursoBodySchema = Joi.object({
    nombre: Joi.string()
        .required()
        .messages({
            "string.base": "El nombre debe ser de tipo string.",
            "string.empty": "El nombre no puede estar vacío.",
            "any.required": "El nombre es obligatorio."
        }),
    bases: Joi.string()
        .required()
        .messages({
            "string.base": "Las bases deben ser de tipo string.",
            "string.empty": "Las bases no pueden estar vacías.",
            "any.required": "Las bases son obligatorias."
        }),
    fechaInicio: Joi.date()
        .required()
        .messages({
            "date.base": "La fecha de inicio debe ser una fecha válida.",
            "any.required": "La fecha de inicio es obligatoria."
        }),
    fechaFin: Joi.date()
        .required()
        .messages({
            "date.base": "La fecha de fin debe ser una fecha válida.",
            "any.required": "La fecha de fin es obligatoria."
        }),
    montoAsignado: Joi.number()
        .required()
        .min(0)
        .messages({
            "number.base": "El monto asignado debe ser un número.",
            "number.min": "El monto asignado no puede ser negativo.",
            "any.required": "El monto asignado es obligatorio."
        }),
    fondo: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El fondo no puede estar vacío.",
            "any.required": "El fondo es obligatorio.",
            "string.base": "El fondo debe ser de tipo string.",
            "string.pattern.base": "El fondo proporcionado no es un ObjectId válido."
        })
}).messages({
    "object.unknown": "No se permiten propiedades adicionales."
});

const concursoIdSchema = Joi.object({
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

module.exports = { concursoBodySchema, concursoIdSchema };
