import { Outlet } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { NavBar } from '../components/NavBar';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const { user } = useAuth();

  return (
    <div>
      <NavBar />
      <div>
        <p>Estás logeado como: {user.email}</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <Outlet />
    </div>
  );
}

export default Root;
