import React, { useState } from 'react'
import Static from '../component/Static'
import "./../styles/Login.css"
import { useAuthContext } from '../context/authContext';

const LoginPage = () => {

  const {handleSignIn} = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      email: "",
      password: ""
  })

  const handleLoginInputs = (e) => {
      const {name, value} = e.target;
      setFormData((data) => ({
          ...data,
          [name] : value
      }))
  }

  const handleSignInClick = async () => {
    setIsLoading(true); 
    await handleSignIn(formData); 
    setIsLoading(false); 
  };

  return (
    <div>
      <Static title="SIGN IN" title2="Sign ln" />

      <div className='login'>
        <h1>SIGN IN</h1>
        <div className='LformGroup'>
          <p>Email</p>
          <input type="email"onChange={handleLoginInputs} name='email' value={formData.email} />
        </div>
        <div className='LformGroup'>
          <p>Password</p>
          <input type="password"onChange={handleLoginInputs} name='password' value={formData.password}/>
        </div>
        <div className="LformGroup'">
        <button className="Lbtns gap-2 d-flex align-items-center" type="button" onClick={handleSignInClick} disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              'SIGN IN'
            )}
          </button>
          
        </div>
      </div>

    </div>
  )
}

export default LoginPage
