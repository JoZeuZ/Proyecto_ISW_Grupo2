"use strict";

const postulacion = require("../models/postulacion.model");
const { handleError } = require("../utils/errorHandler");

async function getPostulaciones() {
    try {
        const postulaciones = await postulacion.find().exec();
        if (!postulaciones) return [null, "No hay postulaciones"];
    
        return [postulaciones, null];
    } catch (error) {
        handleError(error, "postulacion.service -> getpostulaciones");
    }
 }

async function createPostulacion(postulacion) {
    try{
        const{
            nombre,
            descripcion,
            propuestaProyecto,
            imagenes,
            certificados,
        } = postulacion;
        const postulacionFound = await postulacion.findOne({nombre: postulacion.nombre}).exec();
        if (postulacionFound) return [null, "La postulacion ya existe"];
        const newPostulacion = new postulacion({
            nombre,
            descripcion,
            propuestaProyecto,
            imagenes,
            certificados,
        });
        await newPostulacion.save();
        return [newPostulacion, null];
        
    }catch(error){
        handleError(error, "postulacion.service -> createpostulacion");
}
}

async function getPostulacionById(id) {
    try {
        const postulacionFound = await postulacion.findById(id).exec();
        if (!postulacionFound) return [null, "La postulacion no existe"];
    
        return [postulacionFound, null];
    } catch (error) {
        handleError(error, "postulacion.service -> getpostulacionById");
    }
}

async function updatePostulacion(id, postulacion) {
    try {
        const postulacionUpdated = await postulacion.findByIdAndUpdate(
            id,
            postulacion,
            { new: true }
        );
        if (!postulacionUpdated) return [null, "La postulacion no existe"];
    
        return [postulacionUpdated, null];
    } catch (error) {
        handleError(error, "postulacion.service -> updatepostulacion");
    }
}
async function deletePostulacion(id) {
    try {
        const postulacionDeleted = await postulacion.findByIdAndDelete(id);
        if (!postulacionDeleted) return [null, "La postulacion no existe"];
    
        return [postulacionDeleted, null];
    } catch (error) {
        handleError(error, "postulacion.service -> deletepostulacion");
    }
}

module.exports = {
    getPostulaciones,
    createPostulacion,
    getPostulacionById,
    updatePostulacion,
    deletePostulacion,
};






