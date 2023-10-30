"use strict";

const Joi = require("joi");

const evaluacionBodySchema = Joi.object({
    puntajes: Joi.object().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/, Joi.number().required()).required().messages({
        "object.base": "Los puntajes deben ser de tipo object.",
        "any.required": "Los puntajes son obligatorios.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { evaluacionBodySchema };

