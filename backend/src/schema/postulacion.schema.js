"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de Postulacion.
 * @constant {Object}
 *  */
const postulacionBodySchema = Joi.object({
    nombre: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
    }),
    descripcion: Joi.string().messages({
        "string.base": "La descripción debe ser de tipo string.",
    }),
    propuestaProyecto: Joi.object({
        nombre: Joi.string().required().messages({
            "string.empty": "El nombre de la propuesta de proyecto no puede estar vacío.",
            "any.required": "El nombre de la propuesta de proyecto es obligatorio.",
            "string.base": "El nombre de la propuesta de proyecto debe ser de tipo string.",
        }),
        contenido: Joi.string().required().messages({
            "string.empty": "El contenido de la propuesta de proyecto no puede estar vacío.",
            "any.required": "El contenido de la propuesta de proyecto es obligatorio.",
            "string.base": "El contenido de la propuesta de proyecto debe ser de tipo string.",
        }),
        formato: Joi.string().required().messages({
            "string.empty": "El formato de la propuesta de proyecto no puede estar vacío.",
            "any.required": "El formato de la propuesta de proyecto es obligatorio.",
            "string.base": "El formato de la propuesta de proyecto debe ser de tipo string.",
        }),
    }),
    imagenes: Joi.array().items(
        Joi.object({
            nombre: Joi.string().required().messages({
                "string.empty": "El nombre de la imagen no puede estar vacío.",
                "any.required": "El nombre de la imagen es obligatorio.",
                "string.base": "El nombre de la imagen debe ser de tipo string.",
            }),
            data: Joi.binary().required().messages({
                "binary.base": "La imagen debe ser de tipo binary.",
                "any.required": "La imagen es obligatoria.",
            }),
            contentType: Joi.string().required().messages({
                "string.empty": "El contentType de la imagen no puede estar vacío.",
                "any.required": "El contentType de la imagen es obligatorio.",
                "string.base": "El contentType de la imagen debe ser de tipo string.",
            }),
        })
    ),
    certificados: Joi.array().items(
        Joi.object({
            nombre: Joi.string().required().messages({
                "string.empty": "El nombre del certificado no puede estar vacío.",
                "any.required": "El nombre del certificado es obligatorio.",
                "string.base": "El nombre del certificado debe ser de tipo string.",
            }),
            contenido: Joi.string().required().messages({
                "string.empty": "El contenido del certificado no puede estar vacío.",
                "any.required": "El contenido del certificado es obligatorio.",
                "string.base": "El contenido del certificado debe ser de tipo string.",
            }),
            formato: Joi.string().required().messages({
                "string.empty": "El formato del certificado no puede estar vacío.",
                "any.required": "El formato del certificado es obligatorio.",
                "string.base": "El formato del certificado debe ser de tipo string.",
            }),
        })
    ),
    concurso: Joi.array().items(
        Joi.string().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    ).messages({
        "array.base": "Los concursos deben ser de tipo array.",
        "string.pattern.base": "El concursoID proporcionado no es un ObjectId válido."
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
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
});

module.exports = { postulacionBodySchema, postulacionIdSchema };


