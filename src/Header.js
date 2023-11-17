import React from 'react'
import './Header.css'
import Button from './Button'

const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <Button title="Добавить" color="darkgreen" />
    </header>
  )
}

export default Header