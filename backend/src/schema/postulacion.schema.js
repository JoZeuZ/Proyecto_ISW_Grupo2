"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de Postulacion.
 * @constant {Object}
 *  */

const postulacionBodySchema = Joi.object({
    nombrePostulante: Joi.string()
        .required()
        .messages({
            "string.base": "El nombre del postulante debe ser de tipo string.",
            "string.empty": "El nombre del postulante no puede estar vacío.",
            "any.required": "El nombre del postulante es obligatorio."
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
        .messages({
            "string.base": "El número de teléfono del postulante debe ser de tipo string.",
            "string.empty": "El número de teléfono del postulante no puede estar vacío."
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
        propuestaProyecto: Joi.object({
            nombre: Joi.string()
                .required()
                .messages({
                    "string.base": "El nombre de la propuesta del proyecto debe ser de tipo string.",
                    "string.empty": "El nombre de la propuesta del proyecto no puede estar vacío.",
                    "any.required": "El nombre de la propuesta del proyecto es obligatorio."
                }),
            descripcion: Joi.string()
                .required()
                .messages({
                    "string.base": "La descripción de la propuesta del proyecto debe ser de tipo string.",
                    "string.empty": "La descripción de la propuesta del proyecto no puede estar vacía.",
                    "any.required": "La descripción de la propuesta del proyecto es obligatoria."
                }),
            formato: Joi.string()
                .required()
                .messages({
                    "string.base": "El formato de la propuesta del proyecto debe ser de tipo string.",
                    "string.empty": "El formato de la propuesta del proyecto no puede estar vacío.",
                    "any.required": "El formato de la propuesta del proyecto es obligatorio."
                })
        })
        .required()
        .messages({
            "object.base": "La propuesta del proyecto debe ser de tipo object.",
            "object.empty": "La propuesta del proyecto no puede estar vacía.",
            "any.required": "La propuesta del proyecto es obligatoria."
        }),        
    imagenesRespaldoPostulacion: Joi.array()
        .items(Joi.string()
            .required()
            .messages({
                "string.base": "La imagen de respaldo de la postulación debe ser de tipo string.",
                "string.empty": "La imagen de respaldo de la postulación no puede estar vacía.",
                "any.required": "La imagen de respaldo de la postulación es obligatoria."
            }))
        .messages({
            "array.base": "Las imágenes de respaldo de la postulación deben ser de tipo array.",
            "array.empty": "Las imágenes de respaldo de la postulación no pueden estar vacías."
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





