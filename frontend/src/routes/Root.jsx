import { Outlet } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { NavBar } from '../components/NavBar';
import { useNavigate } from "react-router-dom";


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
    navigate("/auth");
  };

  const { user } = useAuth();

  return (
    <div>
      <NavBar />
      <div>

        
        <p>Estás logeado como: {user.email}</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      <button

          style ={{marginRigth: '5px' }}
          onClick={() => navigate('/postulaciones')}
          >
          Ver postulaciones
        </button>

        <button onClick={() => navigate("/informe")}>Ver Informes</button>
        <button onClick={() => navigate("/rubrica")}>Ver Rubricas</button>
        {"  "}
        <button onClick={() => navigate("/")}>Home</button>

      </div>
      <button onClick={() => navigate('concursos/concurso/create')}>
        Crear Concurso
      </button>
      <div>
        <button style={{ marginRight: '5px' }} onClick={() => navigate('/concurso')}>Concursos</button>
        
      </div>
      <Outlet />
    </div>
  );
}

export default Root;
