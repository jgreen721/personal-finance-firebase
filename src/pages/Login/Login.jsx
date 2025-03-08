import React, {useState} from 'react'
import {SignUpCard, SignInCard} from "./components"
import {authenticationillustration, iconlogoLarge} from "../../const"
import "./Login.css"

const Login = () => {
  const [showSignIn,setShowSignIn] = useState(false)




  return (
  <div className="login-container">
      <div className="mobile-login-header">
        <img src={iconlogoLarge} alt="logo"/>
      </div>
      <div className="login-main-content-row">
      <div className="login-column">
        <img className="login-illustration-img" src={authenticationillustration} alt="img" />
      </div>
      <div className="login-column flex-center">
     
        <div className={`${showSignIn && 'rotate-login-card'} login-card`}>
          <div className="card-side card-front">
            <SignUpCard setShowSignIn={setShowSignIn}/>
          </div>
          <div className="card-side card-back">
            <SignInCard setShowSignIn={setShowSignIn}/>

          </div>
        </div>
      </div>
    </div>
    <footer className="login-footer">
      <a target="_blank" className="footer-link" href="https://jgreen721dev.com">Jg<span className="bold">Dev</span></a>
    </footer>
  </div>

)
}

export default Login