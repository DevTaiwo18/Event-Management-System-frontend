import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../context/authContext";
import { useUserContext } from '../context/userContext';
import { Table, Card } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import "./../styles/joinevent.css"

const JoinEvent = () => {
  const { token } = useAuthContext();
  const { getMyregisteredEvents } = useUserContext();
  const [events, setEvents] = useState([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    fetchMyRegisteredEvents();
  }, []);

  const fetchMyRegisteredEvents = async () => {
    try {
      const response = await getMyregisteredEvents(token);
      setEvents(response.events);
      setShowTitle(response.events.length > 0);
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  };

  return (
    <div className='shadow-lg'>
      {showTitle && <h1 className='tranh1'>Events You Registered For</h1>}
      <div className="mt-4 ps-3 pe-3 pb-5 tab-body shadow-lg">
        {events.length > 0 ? (
          <Table striped bordered hover className='shadow-lg tb'>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Venue</th>
                <th>Category</th>
                <th>Days Until Event</th>
                <th>Registration Status</th>
                <th>Number of Seats</th>
                <th>Ticket Price</th>
                <th>Ticket Type</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{event.eventName}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.eventLocation}</td>
                  <td>{event.eventVenue}</td>
                  <td>{event.eventCategory}</td>
                  <td>{event.daysUntilEvent}</td>
                  <td>{event.registrationStatus}</td>
                  <td>{event.numberOfSeats}</td>
                  <td>{event.ticketPrice === 0 ? 'Free' : event.ticketPrice}</td>
                  <td>{event.ticketType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Card className='showmEventm'>
            <Card.Body className='pb-5'>
              <Card.Img variant="top" src="/No data-rafiki.png" className='shownOdataimg' />
              <Card.Title>No events to join</Card.Title>
              <Card.Text className='mb-3'>
                Join some events now!
              </Card.Text>
              <Link to="/" className="btnShow">Join Events</Link>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JoinEvent;
