import React from 'react'
import "./../styles/Postevent.css"

const PostEventPage = () => {
  return (
    <div className='body'>
      <div className="event shadow-lg">
        <h1>Post an event</h1>
        <div className="flex">
          <div className="formGroup">
            <label htmlFor="eventName">Event Name</label>
            <input type="text" id="eventName" placeholder='Your name' name="eventName" />
          </div>
          <div className="formGroup">
            <label htmlFor="category">Category</label>
            <select id="category" name="category">
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
            <input type="text" id="location" name="location" placeholder='Your location' />
          </div>
          <div className="formGroup">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" />
          </div>
        </div>
        <div className="flex">
          <div className="formGroup">
            <label htmlFor="venues">Venues</label>
            <input type="text" id="venues" name="venues" placeholder='Your venues' />
          </div>
          <div className="formGroup">
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" accept="image/*" />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder='Detailed information' rows="4"></textarea>
        </div>
        <button>Post an event</button>
      </div>
    </div>
  )
}


export default PostEventPage
