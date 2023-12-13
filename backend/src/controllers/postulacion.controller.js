"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const PostulacionService = require("../services/postulacion.service");
const { handleError } = require("../utils/errorHandler");
const { postulacionBodySchema, postulacionIdSchema } = require("../schema/postulacion.schema");

async function getPostulaciones(req, res) {
  try {
    const [postulaciones, errorPostulaciones] = await PostulacionService.getPostulaciones();
    if (errorPostulaciones) return respondError(req, res, 404, errorPostulaciones);

    postulaciones.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, postulaciones);
  } catch (error) {
    handleError(error, "postulacion.controller -> getPostulaciones");
    respondError(req, res, 400, error.message);
  }
}

async function createPostulacion(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = postulacionBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        if (req.files && req.files.length > 0) {
          for (const file of req.files) {
            switch (file.fieldname) {
              case "respaldoPostulacion":
                body.imagenesRespaldoPostulacion = "respaldosPostulaciones/" + file.filename;
                break;
            }
          }
        }
    
        const [newPostulacion, postulacionError] = await PostulacionService.createPostulacion(body);
        if (postulacionError) return respondError(req, res, 400, postulacionError);
    
        if (!newPostulacion) {
        return respondError(req, res, 400, "No se creo la postulacion");
        }
    
        respondSuccess(req, res, 201, newPostulacion);
    } catch (error) {
        handleError(error, "postulacion.controller -> createpostulacion");
        respondError(req, res, 500, "No se creo la postulacion");
    }
}

async function getPostulacionById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = postulacionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [postulacion, errorPostulacion] = await PostulacionService.getPostulacionById(params.id);
    if (errorPostulacion) return respondError(req, res, 404, errorPostulacion);

    respondSuccess(req, res, 200, postulacion);
  } catch (error) {
    handleError(error, "postulacion.controller -> getpostulacionById");
    respondError(req, res, 500, error.message);
  }
}

async function updatePostulacion(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = postulacionIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
    
        const { error: bodyError } = postulacionBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
    
        const [updatedPostulacion, errorUpdate] = await PostulacionService.updatePostulacion(params.id, body);
        if (errorUpdate) return respondError(req, res, 400, errorUpdate);
    
        respondSuccess(req, res, 200, updatedPostulacion);
    } catch (error) {
        handleError(error, "postulacion.controller -> updatepostulacion");
        respondError(req, res, 500, error.message);
    }
}

async function deletePostulacion(req, res) { 
    try {
        const { params } = req;
        const { error: paramsError } = postulacionIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
    
        const [deletedPostulacion, errorDelete] = await PostulacionService.deletePostulacion(params.id);
        if (errorDelete) return respondError(req, res, 404, errorDelete);
    
        respondSuccess(req, res, 200, deletedPostulacion);
    } catch (error) {
        handleError(error, "postulacion.controller -> deletepostulacion");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
  getPostulaciones,
  createPostulacion,
  getPostulacionById,
  updatePostulacion,
  deletePostulacion,
};