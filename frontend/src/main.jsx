import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import { Categorias } from './routes/Categorias/Categorias.jsx';
import { Fondos } from './routes/Fondos/Fondos.jsx';
import CreateFondo from './routes/Fondos/CreateFondo.jsx';
import CreateCategoria from './routes/Categorias/CreateCategoria.jsx';
import DetailsFondo from './routes/Fondos/DetailsFondo.jsx';
import DetailsCategoria from './routes/Categorias/DetailsCategorias.jsx';
import UpdateFondo from './routes/Fondos/UpdateFondo.jsx';
import UpdateCategoria from './routes/Categorias/UpdateCategoria.jsx';

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
        path: '/fondos',
        element: <Fondos />,
      },
      {
        path: 'fondos/:id',
        element: <DetailsFondo />,
      },
      {
        path: '/fondos/create',
        element: <CreateFondo />,
      },
      {
        path: 'fondos/:id/update',
        element: <UpdateFondo />,
      },
      {
        path: '/categorias',
        element: <Categorias />,
      },
      {
        path: 'categorias/:id',
        element: <DetailsCategoria />,
      },
      {
        path: '/categorias/create',
        element: <CreateCategoria />,
      },
      {
        path: 'categorias/:id/update',
        element: <UpdateCategoria />,
      }
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
