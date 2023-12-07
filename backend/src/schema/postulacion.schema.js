"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de Postulacion.
 * @constant {Object}
 *  */

const postulacionBodySchema = Joi.object({
    nombrePostulante: Joi.string()
        .trim()
        .required()
        .pattern(/^[A-Za-z\s]+$/)
        .messages({
            "string.base": "El nombre del postulante debe ser de tipo string.",
            "string.empty": "El nombre del postulante no puede estar vacío.",
            "any.required": "El nombre del postulante es obligatorio.",
            "string.pattern.base": "El nombre del postulante solo puede contener letras."
        }),
    rutPostulante: Joi.string()
        .required()
        .messages({
            "string.base": "El rut del postulante debe ser de tipo string.",
            "string.empty": "El rut del postulante no puede estar vacío.",
            "any.required": "El rut del postulante es obligatorio.",      
        }),
    correoElectronico: Joi.string()
        .required()
        .email()
        .messages({
            "string.base": "El correo electrónico del postulante debe ser de tipo string.",
            "string.empty": "El correo electrónico del postulante no puede estar vacío.",
            "any.required": "El correo electrónico del postulante es obligatorio.",
            "string.email": "El correo electrónico del postulante debe ser un correo electrónico válido."
        }),
    numeroTelefono: Joi.string()
        .allow("")
        .pattern(/^(?:\+?56)?(?:0?[2-9])\d{8}$/)
        .messages({
            "string.base": "El número de teléfono del postulante debe ser de tipo string.",
            "string.empty": "El número de teléfono del postulante no puede estar vacío.",
            "string.pattern.base": "El número de teléfono del postulante debe ser un número de teléfono válido."
        }),
    descripcion: Joi.string()
        .required()
        .messages({
            "string.base": "La descripción del postulante debe ser de tipo string.",
            "string.empty": "La descripción del postulante no puede estar vacía.",
            "any.required": "La descripción del postulante es obligatoria."
        }),
    nombreEmpresa: Joi.string()
        .required()
        .messages({
            "string.base": "El nombre de la empresa debe ser de tipo string.",
            "string.empty": "El nombre de la empresa no puede estar vacío.",
            "any.required": "El nombre de la empresa es obligatorio."
        }),
    rutEmpresa: Joi.string()
        .required()
        .messages({
            "string.base": "El rut de la empresa debe ser de tipo string.",
            "string.empty": "El rut de la empresa no puede estar vacío.",
            "any.required": "El rut de la empresa es obligatorio."
        }),
    propuestaProyecto: Joi.string()
        .required()
        .messages({
            "string.base": "La propuesta del proyecto debe ser de tipo string.",
            "string.empty": "La propuesta del proyecto no puede estar vacía.",
            "any.required": "La propuesta del proyecto es obligatoria."
        }),
    concurso: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El concurso no puede estar vacío.",
            "any.required": "El concurso es obligatorio.",
            "string.base": "El concurso debe ser de tipo string.",
            "string.pattern.base": "El concurso proporcionado no es un ObjectId válido."
        })
}).messages({
    "object.unknown": "No se permiten propiedades adicionales."
});

const postulacionIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es un ObjectId válido."
        }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales."
});

module.exports = {postulacionBodySchema, postulacionIdSchema};





