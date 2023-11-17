import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'


const App = () => {
  return (
    <div className="container">
      <Header title="Трекер Задач"/>
      <Outlet />
    </div>
  )
}

export default App