import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem('user')) {
    return (
      <div className="login-container">
        <h2 className="login-header">¡Ya estás logeado!</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Ir a home</button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2 className="login-header">Inicia sesión</h2>
      <LoginForm />
      <div className="postulate-section">
        <p className="postulate-label">¿Quieres postular? Hazlo aquí:</p>
        <button className="btn btn-lg btn-block btn-primary" onClick={() => navigate('/concursos')}>
          Postular a concursos
        </button>
      </div> 
    </div>
  );
}

export default Login;
