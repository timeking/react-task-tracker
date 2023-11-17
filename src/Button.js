import React from 'react'

const Button = ({ title, color }) => {
  return (
    <button className="btn"
      style={{ backgroundColor: color }}
    >
      {title}
    </button>
  )
}

export default Button