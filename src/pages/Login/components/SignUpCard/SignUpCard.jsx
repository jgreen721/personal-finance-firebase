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
        <FormDiv label="email" fieldName="email" showError={emailError} errorMsg="Inv@lid Email" placeholder="Email..." />
        <FormDiv label="password" fieldName="password" showError={passwordError} errorMsg="Password must be at least 5 characters" placeholder="Password" isPassword={true} />
        <FormDiv label="confirm" fieldName="confirm" showError={confirmError} errorMsg="Passwords don't match" placeholder="Confirm" isPassword={true}/>
        <div className="form-row">
            <FormDiv label="balance" fieldName="balance" showError={balanceError} errorMsg="Invalid balance - (Minimum $500)" placeholder="Balance" defaultValue="" isMoney={true}/>
            <FileUpload setSelectedFile={setSelectedFile}/>
        </div>
     <div className="form-div">
      <button onClick={handleSignup} className="btn btn-full btn-dark">Sign Up</button>
     </div>
   </form>

  <div className="flex-center form-caption ">
    <h5>Already have an account?
    <a onClick={()=>setShowSignIn((showSignIn)=>showSignIn=!showSignIn)} className="link-btn mx-1">Login</a>
     or
    <a onClick={signinwithdemodata} className="link-btn mx-1">Demo</a>
   </h5>
  </div>
  </div>

  )
}

export default SignUpCard