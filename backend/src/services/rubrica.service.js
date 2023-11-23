"use strict";

const Concurso = require("../models/concurso.model.js");
const Rubrica = require("../models/rubrica.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todas las rúbricas.
 */
async function getRubricas() {
    try {
        const rubricas = await Rubrica.find().exec();
        if (!rubricas) return [null, "No hay rúbricas"];

        return [rubricas, null];
    } catch (error) {
        handleError(error, "rubrica.service -> getRubricas");
    }
}

/**
 * Obtener una rúbrica por su ID.
 * @param {string} id - ID de la rúbrica.
 */
async function getRubricaById(id) {
    try {
        const rubricaFound = await Rubrica.findById(id).exec();
        if (!rubricaFound) return [null, "La rúbrica no existe"];

        return [rubricaFound, null];
    } catch (error) {
        handleError(error, "rubrica.service -> getRubricaById");
    }
}

/**
 * Crear una nueva rúbrica.
 * @param {Object} rubrica - Datos de la rúbrica a crear.
 */
async function createRubrica(rubrica) {
    try {
        const { name, descripcion, criterios, puntajeAprobacion, concurso } = rubrica;
        const concursoFound = await Concurso.findById(concurso);
        if (!concursoFound) return [null, "El concurso no existe"];
        const rubricaFound = await Rubrica.findOne({ concurso: rubrica.concurso });
        if (rubricaFound) return [null, "La rubrica ya existe"];
        const newRubrica = new Rubrica({
            name,
            descripcion,
            criterios,
            puntajeAprobacion,
            concurso,
        });
        await newRubrica.save();

        return [newRubrica, null];
    } catch (error) {
        handleError(error, "rubrica.service -> createRubrica");
    }
}

/**
 * Actualizar una rúbrica existente.
 * @param {string} id - ID de la rúbrica a actualizar.
 * @param {Object} rubrica - Datos actualizados de la rúbrica.
 */
async function updateRubrica(id, rubrica) {
    try {
        const rubricaFound = await Rubrica.findById(id);
        if (!rubricaFound) return [null, "La rúbrica no existe"];

        const rubricaUpdated = await Rubrica.findByIdAndUpdate(id, rubrica, {
            new: true,
        });
        return [rubricaUpdated, null];
    } catch (error) {
        handleError(error, "rubrica.service -> updateRubrica");
    }
}

/**
 * Eliminar una rúbrica por su ID.
 * @param {string} id - ID de la rúbrica a eliminar.
 */
async function deleteRubrica(id) {
    try {
        const rubricaFound = await Rubrica.findById(id);
        if (!rubricaFound) return [null, "La rúbrica no existe"];

        const rubricaDeleted = await Rubrica.findByIdAndDelete(id);
        return [rubricaDeleted, null];
    } catch (error) {
        handleError(error, "rubrica.service -> deleteRubrica");
    }
}

module.exports = {
    getRubricas,
    getRubricaById,
    createRubrica,
    updateRubrica,
    deleteRubrica,
};