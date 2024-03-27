import React, { useEffect } from 'react';
import "./../styles/EventsCardss.css";
import { Link } from 'react-router-dom';


const EventsCardss = ({ event }) => {
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

    const shortDescription = event.description.split(' ').slice(0, 25).join(' ');
    const eventDate = new Date(event.date);
    const formattedDate = `${eventDate.toLocaleString('default', { month: 'short' })} ${eventDate.getDate()}, ${eventDate.getFullYear()}`;

    return (
        <div className='Eventcards shadow-md'>
            <Link className='Links' to={`/horizontal/event/${event._id}`}>
                <div className="eventimagetop">
                    <img src={event.image} alt={event.name} />
                </div>
            </Link>
            <div className="blur-container">
                <div className="eventtexts">
                    <Link className='Links' to={`/horizontal/event/${event._id}`}>
                        <h4>{event.name}</h4>
                    </Link>
                    <p className='eventcardD'>{shortDescription}...</p>
                </div>
                <div className="eventcardbottoms">
                    <Link to={`/horizontal/event/${event.id}`} className='Links'>
                        <h5>{formattedDate}</h5>
                    </Link>
                    <p className="eventcardprice">{event.price}</p>
                </div>
                <div className="dates">
                    <i className="fa-solid fa-image gallery"></i>
                </div>
            </div>
            <div className="overlay"></div>
        </div>
    );
}


export default EventsCardss
