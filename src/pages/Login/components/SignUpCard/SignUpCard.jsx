import React, {useRef, useState} from 'react'
import { FileUpload,FormDiv } from '../../../../components'
import {useAuthContext} from "../../../../context/AuthContext"
import "./SignUpCard.css"

const SignUpCard = ({setShowSignIn}) => {
  const [selectedFile,setSelectedFile] = useState(null);
  // const [showPassword,setShowPassword] = useState(false);
  // const [showConfirm,setShowConfirm] = useState(false);
  const [confirmError,setConfirmError] = useState(false)
  const [passwordError,setPasswordError] = useState(false)
  const [emailError,setEmailError] = useState(false)
  const [balanceError,setBalanceError] = useState(false)
  const formRef = useRef();
  const {signup,signinwithdemodata,alert} = useAuthContext()



  const handleSignup = (e)=>{
    e.preventDefault()
    let formData = new FormData(formRef.current);
    let isValid = true;

    let userData={
      email:formData.get("email"),
      password:formData.get("password"),
      confirm:formData.get("confirm"),
      balance:formData.get("balance"),
      avatarUrl: selectedFile
    }

    if(userData.password != userData.confirm){
      setConfirmError(true)
      isValid = false;
    }

    if(userData.password.length < 5){
      setPasswordError(true)
      isValid = false;
    }

    if(userData.email.indexOf("@") == -1){
      setEmailError(true)
      isValid = false;
    }

    if(userData.balance == '' || isNaN(userData.balance) || parseInt(userData.balance) < 500){
      setBalanceError(true);
      isValid = false;
    }

    if(!isValid){
        clearErrors();
        return;
    }
    signup(userData);

    console.log(userData);

  }

  const clearErrors=()=>{
    setTimeout(()=>{
      setEmailError(false)
      setPasswordError(false)
      setBalanceError(false)
      setConfirmError(false)},2000);
  }



  // const handleUpload=(e)=>{
   
  //   console.log("handleUpload fired!")
  //   console.log(e.target.files[0])
  //   let file = e.target.files[0];
  //   setSelectedFile({file: file,
  //     preview: URL.createObjectURL(file)
  //   })
  // }

  return (
    <div className="signup-card">
      <div className="hidden justify-between">
        <h1>Sign Up</h1>
        <div className="form-error-div">
          <h3 className={`error-text ${alert ? 'rise-element' : 'lower-element'}`}>Error: Email already in use.</h3>
        </div>
      </div> 
      <form ref={formRef} className="signup-form">
        {/* <div className="form-inputs"> */}
          {/* <div className="form-div">
            <label htmlFor="email">Email:</label>
            <input type="text" className="form-control" defaultValue="test@gmail.com" placeholder="Email..." autoComplete="off" name="email" id="email" /> */}
            {/* <div className="form-error-div">
              <h5 className={`${emailError ? 'rise-element' : 'lower-element'} form-error error-text`}>Inv@lid Email!</h5>
            </div> */}
            {/* <FormErrorCaption showError={emailError} msg="Inv@lid Email!"/> */}

          {/* </div> */}
          {/* <div className="form-div">
            <label htmlFor="password">Password:</label>
            <input type={showPassword ? 'password' : 'text'} defaultValue="pword123" className="form-control" placeholder="Password..." autoComplete="off" name="password" id="password" />
            <button onClick={(e)=>{
                e.preventDefault();
                setShowPassword(showPassword=>showPassword = !showPassword)
              }} className="input-icon-btn input-icon">
                <img src={showPassword ? iconHidePassword : iconShowPassword} alt="" />
            </button>
            <FormErrorCaption showError={passwordError} msg="Password must be at least 5 characters"/>

        </div> */}
        <FormDiv label="email" fieldName="email" showError={emailError} errorMsg="Inv@lid Email" placeholder="Email..." defaultValue="test@gmail.com"/>
        <FormDiv label="password" fieldName="password" showError={passwordError} errorMsg="Password must be at least 5 characters" placeholder="Password" isPassword={true} defaultValue="pword123"/>
        <FormDiv label="password" fieldName="confirm" showError={confirmError} errorMsg="Passwords don't match" placeholder="Confirm Password" isPassword={true} defaultValue="pword123"/>
        {/* <div className="form-div">
          <label htmlFor="confirm">Confirm:</label>
            <input type={showConfirm ? 'password' : 'text'} defaultValue="pword123" className="form-control" placeholder="Confirm Password..." autoComplete="off" name="confirm" id="confirm" />
            <button onClick={(e)=>{
              e.preventDefault();
              setShowConfirm(showConfirm=>showConfirm = !showConfirm)
            }} className="input-icon-btn input-icon">
              <img src={showConfirm ? iconHidePassword : iconShowPassword} alt="" />
            </button> */}
            {/* <div className="form-error-div">
              <h5 className={`${confirmError ? 'rise-element' : 'lower-element'} form-error error-text`}>Passwords don't match!</h5>
            </div> */}
            {/* <FormErrorCaption showError={confirmError} msg="Passwords don't match!"/> */}
        {/* </div> */}
      <div className="form-row">
        {/* <div className="form-div">
          <label htmlFor="balance">Starting Balance:</label>
          <input type="text" name="balance" id="balance" defaultValue={balance} onChange={(e)=>setBalance(e.target.value)} autoComplete="off" className="form-control" />
            <div className="input-dollar-icon">
              <h3>$</h3>
            </div>
        </div> */}
        <FormDiv label="balance" fieldName="balance" showError={balanceError} errorMsg="Invalid balance - (Minimum $500)" placeholder="Balance" defaultValue="" isMoney={true}/>

        
        <FileUpload setSelectedFile={setSelectedFile}/>
      </div>
    {/* </div> */}

    <div className="form-div">
      <button onClick={handleSignup} className="btn btn-full btn-dark">Sign Up</button>
    </div>
  </form>

  <div className="flex-center form-caption ">
    <h5>Already have an account?
    <button onClick={()=>setShowSignIn((showSignIn)=>showSignIn=!showSignIn)} className="link-btn mx-1">Login</button>
     or
    <button onClick={signinwithdemodata} className="link-btn mx-1">Demo</button>
    </h5>
  </div>
  </div>

  )
}

export default SignUpCard