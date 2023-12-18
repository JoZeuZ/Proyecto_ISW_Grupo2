import { useNavigate } from "react-router-dom";
import { getConcursos } from "../../services/concurso.service.js";
import { useState, useEffect } from 'react';


const Concursos = () => {
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
                        </tr>
                    </thead>
                    <tbody>
                        {concursos.map((concurso) => (
                            <tr key={concurso._id}>
                                <td>{concurso.nombre}</td>
                                <td>{concurso.bases}</td>
                                <td>{concurso.fechaInicio}</td>
                                <td>{concurso.fechaFin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Concursos;