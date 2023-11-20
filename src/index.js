import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Tasks from './Tasks';
import Task from './Task';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Tasks />,
      },
      {
        path: "/tasks/:id",
        element: <Task />,
      },
    ]
  },
]);

const Input = ({label}) => {
  return (
    <span className='formControl' style={{display: "block"}}>
      <label for={label}>{label}</label>
      <input id={label} type="text"/>
    </span>
  );
}

const Test = () => {
  console.log(`Компонент отрендерился`);
  let [name, setName] = useState("");
  let [surname, setSurname] = useState("");

  const setFullName = (newName, newSurname) => {
    setName(newName);
    setSurname(newSurname);
    
  }

  return (
    <form>
      <p>Имя</p>
      <input type="text" value={name} onChange={(e)=> {setFullName(e.target.value, surname);}}/>
      <p>Фамилия</p>
      <input type="text" value={surname} onChange={(e)=> {setFullName(name, e.target.value);}}/>
    </form>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);