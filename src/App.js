import React from 'react'
import Header from './Header'
import Tasks from './Tasks'


const App = () => {
  return (
    <div className="container">
      <Header title="Трекер Задач"/>
      <Tasks />
    </div>
  )
}

export default App