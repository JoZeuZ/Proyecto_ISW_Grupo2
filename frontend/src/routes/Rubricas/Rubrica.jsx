import { getRubricas } from "../../services/rubrica.service";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const Rubrica = () => {
    const navigate = useNavigate();
    const [rubricas, setRubricas] = useState([]);
    useEffect(() => {
        getRubricas().then((respuesta) => {
            console.log(respuesta);
            const rubricasFormateada = respuesta.map(rubrica => ({
                ...rubrica,
                concurso: rubrica.concurso.nombre 
            }));
            setRubricas(rubricasFormateada);
            console.log(rubricasFormateada);
        }); 
    }, []);


    return (
        <>
            <h1>Rubricas</h1>
            <button className="btn btn-primary" onClick = {() => navigate('/rubrica/create')}>Crear Rubrica</button>
            <br/>
            <br/>
            {rubricas.length > 0 ? (
                <table border = "1">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Concurso</th>
                            <th>Descripción</th>
                            <th>Criterios</th>
                            <th>Puntaje de Aprobación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rubricas.map((rubrica) => (
                            <tr key={rubrica._id}>
                                <td>{rubrica.name}</td>
                                <td>{rubrica.concurso}</td>
                                <td>{rubrica.descripcion}</td>
                                <td>
                                    <ul>
                                        {rubrica.criterios.map((criterio, indice) => (
                                            <li key={indice}>
                                                {criterio.name} - Puntaje: {criterio.puntaje}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{rubrica.puntajeAprobacion}</td>
                                <td>
                                    <button className="btn btn-primary">Editar</button>{"  "}
                                    <button className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay rúbricas disponibles.</p>
            )}
        </>
    );
};

export default Rubrica