import React from 'react'
import './TaskItem.css'
import { Link } from 'react-router-dom'

const TaskItem = ({task}) => {
  return (
    <div className="task">
      <h3><Link to={`/tasks/${task.id}`}>{ task.text }</Link> 
        <button className='btn' onClick={(e) => onDelete(e, task.id)}>
          Удалить
        </button>
      </h3>
      <p>{ task.day }</p>
    </div>
  )
}

const onDelete = (event, id) => {
  console.log("Удалён " + id);
}

export default TaskItem