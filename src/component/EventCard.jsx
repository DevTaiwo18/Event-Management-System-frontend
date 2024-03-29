import React, { useEffect } from 'react';
import "./../styles/EventCards.css";
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {

  if (!event) {
    return (
      <div class="spinner-grow text-danger text-align-center p-5" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    );
  }

  useEffect(() => {
    event
  })

  const shortDescription = event.description.split(' ').slice(0, 14).join(' ');
  const eventDate = new Date(event.date);
  const formattedDate = `${eventDate.getDate()}-${eventDate.toLocaleString('default', { month: 'short' })}-${eventDate.getFullYear()}`;

  return (
    <div className='Eventcard'>
      <Link className='Links' to={`/horizontal/event/${event._id}`}>
        <div className="eventimagetop">
          <img src={event.image} alt={event.name} />
        </div>
      </Link>
      <div className="blur-container">
        <div className="eventtext">
          <Link className='Links' to={`/horizontal/event/${event._id}`}>
            <h4>{event.name}</h4>
          </Link>
          <p className='eventcardD'>{shortDescription}...</p>
          <div className="eventf">
            <img src="/location-2955.png" alt="" />
            <p className='location'>{event.location}...</p>
          </div>
        </div>
        <div className="eventcardbottom">
          <Link to={`/horizontal/event/${event.id}`} className='Links'>
            <h5>Get Ticket</h5>
          </Link>
          <p className="eventcardprice">{event.price}</p>
        </div>
        <div className="date">
          <p className="eventmoth">{eventDate.toLocaleString('default', { month: 'short' })}</p>
          <p className="eventcarddate">{formattedDate.split('-').slice(0, 1).join('-')}-{formattedDate.split('-').slice(2).join('-')}</p>
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
}

export default EventCard;
