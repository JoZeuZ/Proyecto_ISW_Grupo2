import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Login from "./routes/Login.jsx";
import Rubrica from "./routes/Rubricas/Rubrica.jsx";
import CreateRubrica from "./routes/Rubricas/CreateRubrica.jsx";
import UpdateRubrica from "./routes/Rubricas/UpdateRubrica.jsx";
import Postulaciones from './routes/Postulaciones/Postulaciones.jsx';
import Postular from './routes/Postulaciones/Postular.jsx';
import Evaluacion from './routes/EvaluacionPostulacion.jsx';
import Informe from './routes/Rubricas/Informe.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/rubrica",
        element: <Rubrica />,
      },
      {
        path: "/rubrica/create",
        element: <CreateRubrica />,
      },
      {
        path: '/postulaciones',
        element: <Postulaciones />,
      },
      {
        path: 'postulacion/evaluar/:id',
        element: <Evaluacion />,
      },
      {
        path: '/informe',
        element: <Informe />,
      },
      
        {
          path: "/rubrica/:id/update",
          element: <UpdateRubrica />,
        },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/postular",
    element: <Postular />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
