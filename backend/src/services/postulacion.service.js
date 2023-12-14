"use strict";

const Postulacion = require("../models/postulacion.model");
const { handleError } = require("../utils/errorHandler");
const Concurso = require("../models/concurso.model");

async function getPostulaciones() {
    try {
        const postulaciones = await Postulacion.find().exec();
        if (!postulaciones) return [null, "No hay postulaciones"];
    
        return [postulaciones, null];
    } catch (error) {
        handleError(error, "postulacion.service -> getpostulaciones");
    }
 }

async function createPostulacion(postulacion) {
    try{
        const{
            nombrePostulante,
            rutPostulante,
            correoElectronico,
            numeroTelefono,
            nombreEmpresa,
            rutEmpresa,
            temaProyecto,
            propuestaProyecto,
            concurso,
        } = postulacion;
        const postulacionFound = await Postulacion.findOne({ rutPostulante, concurso }).exec();

        if (postulacionFound) return [null, "La postulacion ya existe"];

        const concursoFound = await Concurso.find({ _id: { $in: concurso } });
        if (concursoFound.length === 0) return [null, "El concurso no existe"];
        const myConcurso = concursoFound.map((concurso) => concurso._id);

        const newPostulacion = new Postulacion({
            nombrePostulante,
            rutPostulante,
            correoElectronico,
            numeroTelefono,
            nombreEmpresa,
            rutEmpresa,
            temaProyecto,
            propuestaProyecto,
            concurso: myConcurso,
        });
        await newPostulacion.save();
        return [newPostulacion, null];
        
    }catch(error){
        handleError(error, "postulacion.service -> createpostulacion");
}
}

async function getPostulacionById(id) {
    try {
        const postulacionFound = await Postulacion.findById(id).exec();
        if (!postulacionFound) return [null, "La postulacion no existe"];
    
        return [postulacionFound, null];
    } catch (error) {
        handleError(error, "postulacion.service -> getpostulacionById");
    }
}

async function updatePostulacion(id, postulacion) {
    try {
        const postulacionUpdated = await Postulacion.findByIdAndUpdate(
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
        const postulacionDeleted = await Postulacion.findByIdAndDelete(id);
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






