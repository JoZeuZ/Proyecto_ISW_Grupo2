import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Concursos from './routes/Concursos/Concursos.jsx';
import ConcursoForm from './components/ConcursoForm.jsx';
import ConcursoAdm from './routes/Concursos/ConcursosAdm.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/concurso',
        element: <ConcursoAdm />,
      },
      {
        path: '/concursos/concurso/create',
        element: <ConcursoForm />,
      }
    ],
  },
  {
    path: '/concursos',
    element: <Concursos />,
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
