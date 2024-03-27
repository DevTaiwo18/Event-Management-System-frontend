import React, { useState } from 'react';
import Static from '../component/Static';
import "./../styles/Signup.css";
import { useAuthContext } from '../context/authContext';
import Message from '../component/Message';

const SignupPage = () => {
  const { registerUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormDetails(data => ({
      ...data,
      [name]: value
    }));
  }

  const registerClick = async () => {
    if (!formDetails.username || !formDetails.email || !formDetails.password) {
      setErrorMessage("Please fill in all fields.");
      setShowError(false);
      setTimeout(() => {
        setShowError(true);
      }, 0);
      return;
    }

    setIsLoading(true);
    await registerUser(formDetails);
    setIsLoading(false);
  }
  
  return (
    <div>
      <Static title="REGISTER" title2="Register" />

      <div className='signup'>
        <h1>REGISTER USER</h1>
        <div className='formGroup'>
          <input type="text" placeholder='Username' name='username' value={formDetails.username} onChange={handleFormInput} />
        </div>
        <div className='formGroup'>
          <input type="email" placeholder='Email *' name='email' value={formDetails.email} onChange={handleFormInput} />
        </div>
        <div className='formGroup'>
          <input type="password" placeholder='Password *' name='password' value={formDetails.password} onChange={handleFormInput} />
        </div>
        <p className='p'>Note: Your password must be at least 6 characters long.</p>
        {showError && errorMessage && <Message content={errorMessage} status="fail" />}
        <div className="formGroup">
          <button className="btns gap-2 d-flex align-items-center" type="button" onClick={registerClick} disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <span>REGISTER</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;
