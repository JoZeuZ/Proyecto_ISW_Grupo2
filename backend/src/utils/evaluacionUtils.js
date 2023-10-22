function calcularPuntajes(evaluadorPuntajes, rubrica) {
    const puntajesCalculados = [];

    rubrica.criterios.forEach((criterio) => {
        const criterioId = criterio._id;
        const puntajeEvaluador = evaluadorPuntajes[criterioId];

        if (puntajeEvaluador !== undefined) {
            const puntajeCriterio = Math.min(criterio.puntaje, puntajeEvaluador);
            
            puntajesCalculados.push({
                criterioId,
                puntaje: puntajeCriterio,
            });
        }
    });

    return puntajesCalculados;
}

function determinarAprobacion(puntajesCalculados, rubrica) {
    const puntajeTotal = puntajesCalculados.reduce(
        (total, criterio) => total + criterio.puntaje, 
        0
    );

    const aprobado = puntajeTotal >= rubrica.puntajeAprobacion;
    return aprobado;
}