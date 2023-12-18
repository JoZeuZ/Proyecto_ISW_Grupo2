"use strict";

const Joi = require("joi");

const evaluacionBodySchema = Joi.object().pattern(
    Joi.string(),
    Joi.number().positive().required(),
    ).messages({
        "object.base": "El cuerpo de la evaluación debe ser un objeto.",
        "number.positive": "El valor de cada criterio debe ser positivo.",
    });

module.exports = { evaluacionBodySchema };

