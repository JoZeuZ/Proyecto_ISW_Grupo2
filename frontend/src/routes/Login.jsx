import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handlePostular = () => {
    navigate('/postular'); 
  };

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
      <button onClick={handlePostular}>Postular</button> 
    </div>
  );
}

export default Login;



