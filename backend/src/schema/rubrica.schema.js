"use strict";

const Joi = require("joi");

const rubricaBodySchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "El nombre de la rúbrica no puede estar vacío.",
        "any.required": "El nombre de la rúbrica es obligatorio.",
        "string.base": "El nombre de la rúbrica debe ser de tipo string.",
    }),
    descripcion: Joi.string().messages({
        "string.base": "La descripción de la rúbrica debe ser de tipo string.",
    }),
    criterios: Joi.array().items(Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "El nombre del criterio no puede estar vacío.",
            "any.required": "El nombre del criterio es obligatorio.",
            "string.base": "El nombre del criterio debe ser de tipo string.",
        }),
        descripcion: Joi.string().messages({
            "string.base": "La descripción del criterio debe ser de tipo string.",
        }),
        puntaje: Joi.number().required().messages({
            "number.base": "El puntaje del criterio debe ser de tipo number.",
            "any.required": "El puntaje del criterio es obligatorio.",
        }),
    })).required().messages({
        "array.base": "Los criterios deben ser de tipo array.",
        "any.required": "Los criterios son obligatorios.",
        "object.base": "Los criterios deben ser de tipo object.",
    }),
    concursos: Joi.array().items(Joi.string().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)).messages({
        "array.base": "Los concursos deben ser de tipo array.",
        "object.base": "Los concursos deben ser de tipo object.",
        "string.pattern.base": "Los concursos proporcionados no son ObjectIds válidos.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const rubricaIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
        }),
});

module.exports = { rubricaBodySchema, rubricaIdSchema };
