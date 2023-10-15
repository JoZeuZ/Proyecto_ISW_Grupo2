"use strict";

const Fondo = require("../models/Fondo.model.js");
const { handleError } = require("../utils/errorHandler");

async function getFondo() {
    try {
        const fondo = await Fondo.find().exec();
        if (!fondo) return [null, "No hay fondos"];

        return [fondo, null];
    } catch (error) {
        handleError(error, "fondo.service -> getFondo");
    }
}

async function createFondo(fondo) {
    try {
        const { montoTotal, adminID } = fondo;

        const newFondo = new Fondo({
            montoTotal,
            adminID,
        });
        await newFondo.save();

        return [newFondo, null];
    } catch (error) {
        handleError(error, "fondo.service -> createFondo");
    }
}

async function getFondoById(id) {
    try {
        const fondo = await Fondo.findById(id).exec();
        if (!fondo) return [null, "No existe el fondo"];

        return [fondo, null];
    } catch (error) {
        handleError(error, "fondo.service -> getFondoById");
    }
}


async function updateFondo(id, fondo) {
    try {
        const { montoTotal, adminID } = fondo;

        const fondoFound = await Fondo.findById(id);
        if (!fondoFound) return [null, "No existe el fondo"];

        fondoFound.montoTotal = montoTotal;
        fondoFound.adminID = adminID;

        await fondoFound.save();

        return [fondoFound, null];
    } catch (error) {
        handleError(error, "fondo.service -> updateFondo");
    }
}

async function deleteFondo(id) {
    try {
        const fondoFound = await Fondo.findByIdAndDelete(id);
        if (!fondoFound) return [null, "No existe el fondo"];

        return [fondoFound, null];
    } catch (error) {
        handleError(error, "fondo.service -> deleteFondo");
    }
}

module.exports = {
    getFondo,
    createFondo,
    getFondoById,
    updateFondo,
    deleteFondo,
}