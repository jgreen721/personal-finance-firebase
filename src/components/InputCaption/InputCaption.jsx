import React from 'react'
import "./InputCaption.css"

const InputCaption = ({textColor,msg,showCaption}) => {
  return (
    <div className={`${showCaption ? 'clear-blur' : 'full-blur'} input-caption`}>
        <p className={`bold ${textColor}`}>{msg}</p>
    </div>
  )
}

export default InputCaption