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
        .min(5)
        .max(50)
        .pattern(/^[A-Za-z\s]+$/)
        .messages({
            "string.base": "El nombre del postulante debe ser de tipo string.",
            "string.empty": "El nombre del postulante no puede estar vacío.",
            "any.required": "El nombre del postulante es obligatorio.",
            "string.min": "El nombre del postulante debe tener un mínimo de {#limit} caracteres.",
            "string.max": "El nombre del postulante debe tener un máximo de {#limit} caracteres.",
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
        .trim()
        .required()
        .max(50)
        .email()
        .messages({
            "string.base": "El correo electrónico del postulante debe ser de tipo string.",
            "string.empty": "El correo electrónico del postulante no puede estar vacío.",
            "any.required": "El correo electrónico del postulante es obligatorio.",
            "string.max": "El correo electrónico del postulante debe tener un máximo de {#limit} caracteres.",
            "string.email": "El correo electrónico del postulante debe ser un correo electrónico válido."
        }),
    numeroTelefono: Joi.string()
        .required()
        .pattern(/^(?:\+?56\s?)?9\d{8}$/)
        .messages({
            "string.base": "El número de teléfono del postulante debe ser de tipo string.",
            "string.empty": "El número de teléfono del postulante no puede estar vacío.",
            "string.pattern.base": "El número de teléfono del postulante debe ser un número de teléfono válido en Chile."
        }),
    nombreEmpresa: Joi.string()
        .required()
        .min(5)
        .max(50)
        .messages({
            "string.base": "El nombre de la empresa debe ser de tipo string.",
            "string.empty": "El nombre de la empresa no puede estar vacío.",
            "any.required": "El nombre de la empresa es obligatorio.",
            "string.min": "El nombre de la empresa debe tener un mínimo de {#limit} caracteres.",
            "string.max": "El nombre de la empresa debe tener un máximo de {#limit} caracteres."
        }),
    rutEmpresa: Joi.string()
        .required()
        .messages({
            "string.base": "El rut de la empresa debe ser de tipo string.",
            "string.empty": "El rut de la empresa no puede estar vacío.",
            "any.required": "El rut de la empresa es obligatorio."
        }),
    temaProyecto: Joi.string()
        .required()
        .min(5)
        .max(100)
        .messages({
            "string.base": "El tema del proyecto debe ser de tipo string.",
            "string.empty": "El tema del proyecto no puede estar vacío.",
            "any.required": "El tema del proyecto es obligatorio.",
            "string.min": "El tema del proyecto debe tener un mínimo de {#limit} caracteres.",
            "string.max": "El tema del proyecto debe tener un máximo de {#limit} caracteres."
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