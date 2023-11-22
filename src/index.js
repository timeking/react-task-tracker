import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  RouterProvider,
  createBrowserRouter,
  useRouteError
} from 'react-router-dom';
import Tasks from './Tasks';
import Task from './Task';
import Login from './Login';
import {observer} from "mobx-react-lite";
import AuthStore from "./AuthStore";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <Tasks />,
          },
          {
            path: "/tasks",
            element: <Tasks />,
          },
          {
            path: "/tasks/:id",
            element: <Task />,
          },
        ]
      },
    ]
  },
]);

const Root = observer(() => {
  useEffect(() => {
    AuthStore.checkAuth();
  }, []);

  return (
    <RouterProvider router={router} />
  );
});

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Ошибка!</div>;
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Root />
);