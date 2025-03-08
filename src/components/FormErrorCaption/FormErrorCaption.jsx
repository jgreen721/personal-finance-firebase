import React from 'react'
import "./FormErrorCaption.css"

const FormErrorCaption = ({showError,msg}) => {
  return (
    <div className="form-error-div">
    <h5 className={`${showError ? 'rise-element' : 'lower-element'} form-error error-text`}>{msg}</h5>
  </div>
  )
}

export default FormErrorCaption