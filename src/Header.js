import React from 'react'
import './Header.css'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title }) => {
  const location = useLocation();
  const isTaskList = location.pathname === "/";
  const button = isTaskList && (<Button title="Добавить" color="darkgreen" />);
  return (
    <header>
      <h1>{title}</h1>
      {button}
    </header>
  )
}

export default Header