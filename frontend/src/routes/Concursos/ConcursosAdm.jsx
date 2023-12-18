import { useNavigate } from "react-router-dom";
import { deleteConcurso, getConcursos, updateConcurso } from "../../services/concurso.service.js";
import { useState, useEffect } from 'react';
import ConcursoDelete from "./ConcursoDelete.jsx";
import ConcursoUpdate from "./ConcursoUpdate.jsx";


const ConcursoAdm = () => {
    const navigate = useNavigate();

    const [concursos, setConcursos] = useState([]);


    useEffect(() => {
        getConcursos().then((response) => {
            setConcursos(response);
            console.log(response);
        });
    }, []);

    return (
        <>
            <div>
                <h1>Concursos</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Bases</th>
                            <th>Fecha de inicio</th>
                            <th>Fecha de fin</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {concursos.map((concurso) => (
                            <tr key={concurso._id}>
                                <td>{concurso.nombre}</td>
                                <td>{concurso.bases}</td>
                                <td>{concurso.fechaInicio}</td>
                                <td>{concurso.fechaFin}</td>
                                <td><ConcursoDelete id={concurso._id} /></td>
                                <td><ConcursoUpdate id={concurso._id} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default ConcursoAdm;