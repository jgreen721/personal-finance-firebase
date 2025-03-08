import React, {useRef, useState} from 'react'
import { FormDiv } from '../../../../components'
import {useAuthContext} from "../../../../context/AuthContext"
import "./SignInCard.css"

const SignInCard = ({setShowSignIn}) => {
  const [emailError,setEmailError] = useState(false);
  const [passwordError,setPasswordError] = useState(false);
  const signInRef = useRef();
  const {signin,alert} = useAuthContext()



  const handleSignin = (e)=>{
    e.preventDefault()
    let formData = new FormData(signInRef.current);
    let signInData={
      email:formData.get("email"),
      password:formData.get("password")
    }
    let isError = false;
    if(!signInData?.email || signInData.email.indexOf("@") == -1){
      setEmailError(true)
      isError = true;
    }
    if(!signInData?.password){
      setPasswordError(true)
      isError = true;
    }

    if(isError)clearErrors();
    else signin(signInData)
  }

  const clearErrors=()=>{
    setTimeout(()=>{
      setPasswordError(false);
      setEmailError(false)
    },2000);
  }




  return (
    <div className="signin-card">
      <div className="signin-header-row hidden justify-between">
          <h1>Sign In</h1>
          <div className="form-error-div">
            <h3 className={`error-text ${alert ? 'rise-element' : 'lower-element'}`}>{alert}</h3>
          </div>
      </div>
      <form ref={signInRef} className="login-form">
        <div className="form-inputs">
          {/* <div className="form-div">
            <label htmlFor="loginemail">Email:</label>
            <input type="text" className="form-control" placeholder="Email..." autoComplete="off" name="email" id="loginemail" />
            <FormErrorCaption showError={emailError} msg="Need to provide an email"/>
          </div> */}
          <FormDiv label="email" fieldName="email" showError={emailError} errorMsg="Inv@lid Email" placeholder="Email..." defaultValue="test@gmail.com"/>
          <FormDiv label="password" fieldName="password" showError={passwordError} errorMsg="Password must be at least 5 characters" placeholder="Password" isPassword={true} defaultValue="pword123"/>

          {/* <div className="form-div">
            <label htmlFor="loginpassword">Password:</label>
            <input type={showPassword ? 'password' : 'text'} className="form-control" placeholder="Password..." autoComplete="off" name="password" id="loginpassword" />
            <button onClick={(e)=>{
                  e.preventDefault();
                  setShowPassword(showPassword=>showPassword = !showPassword)
                  }} 
                  className="input-icon-btn input-icon">
                <img src={showPassword ? iconHidePassword : iconShowPassword} alt="" />
            </button>
            <FormErrorCaption showError={passwordError} msg="Invalid password"/>
          </div> */}
        </div>
        <div className="form-div">
          <button onClick={handleSignin} className="btn btn-full btn-dark">Sign In</button>
        </div>
      </form>
      <div className="flex-center form-caption">
        <h5>Need to create an account?</h5>
        <button onClick={()=>setShowSignIn((showSignIn)=>showSignIn=!showSignIn)} className="link-btn ml-1">Sign Up</button>
      </div>
    </div>

  )
}

export default SignInCard