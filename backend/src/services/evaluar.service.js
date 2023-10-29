"use strict";

const Postulacion = require('../models/postulacion.model');
const Rubrica = require('../models/rubrica.model');
const Informe = require('../models/informe.model');
const nodemailer = require('nodemailer');
const {handleError} = require('../utils/errorHandler');
const concurso = require("../models/concurso.model");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'examplemuni@gmail.com',
        pass: 'fclueqymhehoorcz'
    },
});

async function evaluarPostulacion(postulacionId, puntajes) {
    try {
        const postulacion = await Postulacion.findById(postulacionId).populate('concurso');
        if (!postulacion) return [null, 'Postulación no encontrada'];

        const concursoId = postulacion.concurso._id;
        const rubrica = await Rubrica.findOne({ concurso: concursoId });
        if (!rubrica) return [null, 'Rúbrica no encontrada'];

        const puntajeTotal = await calcularPuntajeTotal(puntajes, rubrica.criterios);
        const aprobado = puntajeTotal >= rubrica.puntajeAprobacion;

        const informe = new Informe({
            postulacion: postulacionId,
            resultados: puntajeTotal,
            aprobado
        });
        await informe.save();


        if (aprobado) {
            await enviarNotificacion(postulacion.correoElectronico);
        }

        return { mensaje: 'Evaluación completada con éxito', informe };

    }
    catch (error) {
        handleError(error, "evaluar.service -> evaluarPostulacion");
    }
}

async function calcularPuntajeTotal(puntajes, criterios) {
    let puntajeTotal = 0;

    criterios.forEach(criterio => {
        const puntajeObtenido = puntajes[criterio.name];

        if (typeof puntajeObtenido !== 'undefined') {
            puntajeTotal += puntajeObtenido;
        } else {
            console.warn(`No se encontró puntaje para el criterio: ${criterio.name}`);
        }
    });

    return puntajeTotal;
}

async function enviarNotificacion(correo) {
    const mailOptions = {
        from: 'examplemuni@gmail.com',
        to: correo,
        subject: 'Postulación aprobada',
        text: 'Estimad@ enviamos este correo para informarle que su postulación ha sido aprobada. Por favor dirígase a la Municipalidad para proceder con la entrega de los fondos.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
}

module.exports = {
    evaluarPostulacion,
};