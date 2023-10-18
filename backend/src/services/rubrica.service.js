"use strict";

const rubrica = require("../models/rubrica.model.js");
const { handleError } = require("../utils/errorHandler");

async function getRubricas() {
    try {
        const rubricas = await rubrica.find().exec();
        if (!rubricas) return [null, "No hay rubricas"];

        return [rubricas, null];
    } catch (error) {
        handleError(error, "rubrica.service -> getRubricas");
    }
}

async function getRubricaById(id){
    try {
        const rubricaFound = await rubrica.findById(id).exec();
        if (!rubricaFound) return [null, "La rubrica no existe"];

        return [rubricaFound, null];
    } catch (error) {
        handleError(error, "rubrica.service -> getRubricaById");
    }
}

async function createRubrica(rubrica){
    try {
        const { name, descripcion, criterios, concursos } = rubrica;

        const rubricaFound = await rubrica.findOne({ name: rubrica.name });
        if (rubricaFound) return [null, "La rubrica ya existe"];

        const newRubrica = new rubrica({
            name,
            descripcion,
            criterios,
            concursos,
        });
        const myRubrica = await newRubrica.save();
        return [myRubrica, null];
    } catch (error) {
        handleError(error, "rubrica.service -> createRubrica");
    }
}

async function updateRubrica(id, rubrica){
    try {
        const rubricaFound = await rubrica.findById(id);
        if (!rubricaFound) return [null, "La rubrica no existe"];

        const rubricaUpdated = await rubrica.findByIdAndUpdate(
            id,
            rubrica,
            {
                new: true,
            }
        );
        return [rubricaUpdated, null];
    } catch (error) {
        handleError(error, "rubrica.service -> updateRubrica");
    }
}

async function deleteRubrica(id){
    try {
        const rubricaFound = await rubrica.findById(id);
        if (!rubricaFound) return [null, "La rubrica no existe"];

        const rubricaDeleted = await rubrica.findByIdAndDelete(id);
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