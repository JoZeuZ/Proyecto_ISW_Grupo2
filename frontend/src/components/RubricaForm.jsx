import { useForm, useFieldArray } from "react-hook-form";
import { createRubrica } from '../services/rubrica.service';
import { getConcursos } from "../services/concurso.service";
import { useState, useEffect } from 'react';

export default function RubricaForm() {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "criterios" });
  const [concursos, setConcursos] = useState([]);
  const [selectedConcursoID, setSelectedConcursoID] = useState(''); // Estado para almacenar el ID del concurso seleccionado

  useEffect(() => {
    const fetchConcursos = async () => {
      try {
        const listaConcursos = await getConcursos();
        setConcursos(listaConcursos);
      } catch (error) {
        console.error('Error al obtener concursos:', error);
      }
    };

    fetchConcursos();
  }, []);

  if (fields.length === 0) {
    append({});
  }

  const onSubmit = async (data) => {
    try {
    const dataToSend = { ...data, concurso: selectedConcursoID };
      const res = await createRubrica(dataToSend);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form-row" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group col-12">
        <label htmlFor="name">Nombre</label>
        <input {...register("name", { required: true })}
        className="form-control" type="text" placeholder="Nombre de la Rubrica"/>
      </div>
      <div className="form-group">
        <label htmlFor="concurso">Seleccionar concurso:</label>
        <select className="form-control" name="concurso"
        onChange={(e) => setSelectedConcursoID(e.target.value)}
        value={selectedConcursoID}
        >
        <option value="">Selecciona un concurso</option>
          {concursos.map((concurso) => (
            <option key={concurso._id} value={concurso._id}>
              {concurso.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group col-12">
        <label htmlFor="descripcion">Descripción</label>
        <input {...register("descripcion", { required: true })} 
        className="form-control" type="text" placeholder="Descripcion de la Rubrica"/>
      </div>
      {fields.map((criterio, index) => (
        <div className="form-group col-12" key={criterio.id}>
          <label htmlFor={`criterios[${index}].name`}>Nombre del Criterio</label>
          <input {...register(`criterios[${index}].name`, { required: true })} 
          className="form-control" type="text" placeholder="Nombre del Criterio"/>
          <label htmlFor={`criterios[${index}].descripcion`}>Descripción del Criterio</label>
          <input {...register(`criterios[${index}].descripcion`, { required: true })} 
          className="form-control" type="text" placeholder="Descripcion del Criterio"/>
          <label htmlFor={`criterios[${index}].puntaje`}>Puntaje del Criterio</label>
          <input type="number" {...register(`criterios[${index}].puntaje`, { required: true, min: 0 })} 
          className="form-control" placeholder="Puntaje maximo del Criterio"/>
          <br/>
          <button className="btn btn-pill-secondary" type="button" onClick={() => remove(index)}>Eliminar Criterio</button>
        </div>
      ))}
     <div className="form-group col-12">
        <label htmlFor="puntajeAprobacion">Puntaje de Aprobación</label>
        <input type="number" {...register("puntajeAprobacion", { required: true, min: 0 })} 
        className="form-control" placeholder="Puntaje minimo de aprobacion"/>
     </div>
      <button className="btn btn-pill-primary" type="button" onClick={() => append({})}>Agregar Criterio</button>
      <input className="btn btn-pill-primary" type="submit" />
    </form>
  );
}