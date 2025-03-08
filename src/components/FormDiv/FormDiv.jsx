import React, {useState} from 'react'
import {iconHidePassword,iconShowPassword} from "../../const"
import  FormErrorCaption  from '../FormErrorCaption/FormErrorCaption'
import "./FormDiv.css";


const FormDiv = ({label,fieldName,placeholder,showError,errorMsg,isPassword = false,defaultValue="",isMoney=false}) => {
  const [showPassword,setShowPassword] = useState(false);

  return (
    <div className="generic-form-div form-div">
      <label className="capitalize" htmlFor={fieldName}>{label}:</label>
      <input type={isPassword && showPassword ? 'password' : 'text'} className="generic-form-control form-control" name={fieldName} placeholder={defaultValue ? "" : placeholder} autoComplete="off" id={fieldName} defaultValue={defaultValue} />
      {isMoney && 
      <div className="input-dollar-icon">
          <h4 className="mid-thin grey-500-text">$</h4>
      </div>
      }
      {/* <div className="float-right-input-alerts"> */}
        <FormErrorCaption showError={showError} msg={errorMsg}/>
      {/* </div> */}
      {isPassword && 
          <button onClick={(e)=>{
              e.preventDefault();
              setShowPassword(showPassword=>showPassword = !showPassword)
              }} className="input-icon-btn input-icon">
              <img src={showPassword ? iconHidePassword : iconShowPassword} alt="" />
         </button>
}
    </div>
  )
}

export default FormDiv