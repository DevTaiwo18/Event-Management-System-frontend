import React, { useState } from 'react'
import "./../styles/Editprofile.css"
import ChangePasswordPage from './ChangePasswordPage'
import { useAuthContext } from '../context/authContext';
import { useUserContext } from '../context/userContext';
import Message from '../component/Message';

const EditProfilePage = () => {
  const { token, user } = useAuthContext();
  const { editusername } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ content: '', status: '' });
  const [formData, setFormData] = useState({
    oldUsername: user.username,
    newUsername: '',
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

    if (!formData.oldUsername || !formData.newUsername){
      setMessage({ content: 'Please fill in all fields.', status: 'fail' });
      return;
    }

    setIsLoading(true);
    await editusername(formData, token)
    setIsLoading(false);

  };

  return (
    <div className='bod'>
      <div className="changeU shadow-lg">
        <h1>Edit Username</h1>
        <form onSubmit={handleSubmit}>
          <div className="Eform-group">
            <label htmlFor="oldUsername">Current Username</label>
            <input type="text" id='oldUsername' name='oldUsername' value={user.username} onChange={handleChange} />
          </div>
          <div className="Eform-group">
            <label htmlFor="newUsername">New Username</label>
            <input type="text" id='newUsername' name='newUsername' value={formData.newUsername} onChange={handleChange} />
          </div>
          <button className="gap-2 d-flex align-items-center" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <span>Change Username</span>
            )}
          </button>
        </form>
        {message.content && <Message content={message.content} status={message.status} />}
      </div>

      <ChangePasswordPage />

    </div>
  )
}

export default EditProfilePage
