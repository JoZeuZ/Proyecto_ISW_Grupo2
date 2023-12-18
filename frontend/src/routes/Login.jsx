import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';



function Login() {
  const navigate = useNavigate();



  if (localStorage.getItem('user')) {
    return (
      <>
        <h2>¡Ya estás logeado!</h2>
        <button onClick={() => navigate('/')}>Ir a home</button>
      </>
    );
  }

  return (
    <div>
      <h2>Inicia sesión</h2>
      <LoginForm />

      
      <div>
        <button style={{ marginRight: '5px' }} onClick={() => navigate('/concursos')}>Concursos</button>
      </div> 

    </div>

  );
}

export default Login;



