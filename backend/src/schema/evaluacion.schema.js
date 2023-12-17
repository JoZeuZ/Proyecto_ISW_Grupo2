"use strict";

const Joi = require("joi");

const evaluacionBodySchema = Joi.object().pattern(
    Joi.string(),
    Joi.number().positive().required(),
);

module.exports = { evaluacionBodySchema };

