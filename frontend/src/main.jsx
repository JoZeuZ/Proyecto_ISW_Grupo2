import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import { Fondos } from './routes/Fondos/Fondos.jsx';
import CreateFondo from './routes/Fondos/CreateFondo.jsx';
import DetailsFondo from './routes/Fondos/DetailsFondo.jsx';

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
        children: [
          {
            path: 'update',
            element: <CreateFondo />,
          },
          {
            path: 'delete',
            element: <CreateFondo />,
          }
        ]
      },
      {
        path: '/fondos/create',
        element: <CreateFondo />,
      },
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
