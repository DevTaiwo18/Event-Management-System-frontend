import React, { useState } from 'react';
import './../styles/Postevent.css';
import Message from '../component/Message';
import { useAuthContext } from './../context/authContext';
import { useEventContext } from '../context/eventContext';

const PostEventPage = () => {
  const { token } = useAuthContext();
  const { createEvent } = useEventContext();
  const [message, setMessage] = useState({ content: '', status: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    date: '',
    venue: '',
    image: null,
    description: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: imageFile,
    }));
  };


  const validateForm = () => {
    const areAllFieldsFilled = Object.values(formData).every(value => {
      if (typeof value === 'string') return value.trim() !== '';
      return value !== null;
    });

    if (!areAllFieldsFilled) {
      setMessage({ content: 'Please fill in all fields.', status: 'fail' });
    }

    return areAllFieldsFilled;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    await createEvent(formData, token);
    setIsLoading(false);

    setFormData({
      name: '',
      category: '',
      location: '',
      date: '',
      venue: '',
      image: null,
      description: '',
    });

  };

  return (
    <div className='body'>
      <form className="event shadow-lg" onSubmit={handleSubmit}>
        <h1>Post an event</h1>
        <div className="flex">
          <div className="formGroup">
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" placeholder='Event Name' name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="formGroup">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
              <option>Your category</option>
              <option value="sport">Sport</option>
              <option value="travel">Travel</option>
              <option value="conference">Conference</option>
              <option value="business">Business</option>
              <option value="festival">Festival</option>
              <option value="music">Music</option>
            </select>
          </div>
        </div>
        <div className="flex">
          <div className="formGroup">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" placeholder='Location' value={formData.location} onChange={handleChange} />
          </div>
          <div className="formGroup">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>
        <div className="flex">
          <div className="formGroup">
            <label htmlFor="venue">Venue</label>
            <input type="text" id="venue" name="venue" placeholder='Venue' value={formData.venue} onChange={handleChange} />
          </div>
          <div className="formGroup">
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder='Description' rows="4" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <button className="gap-2 d-flex align-items-center" type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
          ) : (
            <span>Post an event</span>
          )}
        </button>
      </form>
      {message.content && <Message content={message.content} status={message.status} />}
    </div>
  );
}

export default PostEventPage;
