import React from 'react'
import "./ThemeDot.css"

const ThemeDot = ({className}) => {
  return (
    <div className="theme-dot-div">
    <div className={`${className} theme-dot`}></div>
</div>
  )
}

export default ThemeDot