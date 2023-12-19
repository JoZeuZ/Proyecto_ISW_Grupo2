import { Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { NavBar } from '../components/NavBar'; // Asegúrate de que la ruta sea correcta

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const { user } = useAuth();

  return (
    <div>
      <NavBar /> {/* El NavBar ahora maneja la navegación y el logout */}
      <p>Estás logeado como: {user.email}</p>
      <Outlet /> {/* Esto renderizará los componentes de tus rutas hijas */}
    </div>
  );
}

export default Root;
