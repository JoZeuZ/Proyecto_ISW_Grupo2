import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const { user } = useAuth();

  return (
    <div>
      <div>
        <h1>Municipalidad</h1>
        <p>Estas logeado como: {user.email}</p>
        <button onClick={handleLogout}>Cerrar sesion</button>
      </div>
      {/* <div>
        {/* <button onClick={() => navigate('/concurso/create')}>Crear Concurso</button> */}
      {/* </div> */}
      <div>
        <button style={{ marginRight: '5px' }} onClick={() => navigate('/concursos')}>Concursos</button>
      </div>
      <Outlet />
    </div>
  );
}

export default Root;
