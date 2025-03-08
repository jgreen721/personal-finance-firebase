import React from 'react'
import "./ThemeLine.css"

const ThemeLine = ({theme}) => {
  // console.log(theme)
  return (
    <div className={`theme-border-line ${theme}`}></div>

  )
}

export default ThemeLine