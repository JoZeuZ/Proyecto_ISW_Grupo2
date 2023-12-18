import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Login from "./routes/Login.jsx";
import Postulaciones from "./routes/Postulaciones/Postulaciones.jsx";
import Postular from "./routes/Postulaciones/Postular.jsx";
import Concursos from "./routes/Concursos/Concursos.jsx";

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
        path: "/postulaciones",
        element: <Postulaciones />,
      },
    ],
  },
  {
    path: "/concursos",
    element: <Concursos />,
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/postular/:id",
    element: <Postular />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
