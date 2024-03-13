import React, { useState } from 'react';
import "./../styles/changepasswod.css";
import Message from '../component/Message';
import { useAuthContext } from '../context/authContext';
import { useUserContext } from '../context/userContext';

const ChangePasswordPage = () => {
  const { token } = useAuthContext();
  const { changepassword } = useUserContext();
  const [message, setMessage] = useState({ content: '', status: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmNewPassword){
      setMessage({ content: 'Please fill in all fields.', status: 'fail' });
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage({ content: 'password do not match', status: 'fail' });
      return;
    }

    setIsLoading(true);
    await changepassword(formData, token)
    setIsLoading(false);
  };

  return (
    <div className='body'>
      <div className="changep shadow-lg">
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="cform-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input type="password" id="currentPassword" name="oldPassword" value={formData.currentPassword} onChange={handleChange} />
          </div>
          <div className="cform-group">
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} />
          </div>
          <div className="cform-group">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} />
          </div>
          <button className="gap-2 d-flex align-items-center" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <span>Change Password</span>
            )}
          </button>
        </form>
      </div>
      {message.content && <Message content={message.content} status={message.status} />}
    </div>
  );
};

export default ChangePasswordPage;
