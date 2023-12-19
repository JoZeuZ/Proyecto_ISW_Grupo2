import React from 'react';
import PostulacionForm from '../../components/PostulacionForm';

function Postular() {
  const municipalidadTextStyles = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  };

  const lineStyles = {
    borderTop: '1px solid #000',
    margin: '10px 0',
    width: '100%',
  };

  const formularioPostulacionStyles = {
    marginBottom: '3rem', 
    border: '1px solid #000', 
    padding: '1rem', 
    borderRadius: '8px', 
    background: '#f0f0f0', 
  };

  const bannerStyles = {
    marginBottom: '0', 
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className="col-12">
        <a className="banner mb-3" href="#banners" style={bannerStyles}>
          <div className="line"></div>
          <span className="banner-icon cl cl-call-info" aria-hidden="true"></span>
          <h4 className="banner-text">
            <span className="mr-1">Postulación</span>
            <span className="font-weight-bold">Concursos 2023</span>
          </h4>
        </a>
      </div>
      <div style={formularioPostulacionStyles}>
        <h1 className="text-center">Formulario de Postulación</h1>
        <section>
          <PostulacionForm />
        </section>
      </div>
      <div style={municipalidadTextStyles}>
        Municipalidad de Chiguayante
      </div>
      <div className="h3 line" style={lineStyles}></div>
    </div>
  );
}

export default Postular;

