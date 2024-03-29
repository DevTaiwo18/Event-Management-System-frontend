import React, { useState, useEffect } from 'react';
import { Card, Modal, Table } from 'react-bootstrap';
import moment from 'moment';
import { useAuthContext } from '../context/authContext';
import { useEventContext } from '../context/eventContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./../styles/joinevent.css";
import { useUserContext } from '../context/userContext';

const ManageRegistrationsPage = () => {
  const { token } = useAuthContext();
  const { getUserEvent } = useEventContext();
  const { getUserRegisterformyevent } = useUserContext();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getUserEvent(token);
      setEvents(response.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleManageRegistrationsClick = async (eventId) => {
    setSelectedEvent(eventId);
    setIsLoading(true);
    try {
      const response = await getUserRegisterformyevent(eventId, token);
      setRegistrations(response);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="body">
      <div className="events-table shadow-lg">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event-row">
              <div className="event-data">
                <img src={event.image} alt={event.name} className="event-image" />
                <div>
                  <h3 className="event-title">{event.name}</h3>
                  <p className="event-location">{event.location}</p>
                </div>
              </div>
              <p className="event-date">{moment(event.date).format('MMMM D, YYYY')}</p>
              <div className="event-action">
                <button className="manage-registrations-button" onClick={() => handleManageRegistrationsClick(event._id)}>Manage Registrations</button>
              </div>
            </div>
          ))
        ) : (
          <Card className='showmEventm'>
            <Card.Body>
              <Card.Img variant="top" src="/Personal files.gif" className='shownOdataimg' />
              <Card.Title>No events available for managing registrations</Card.Title>
              <Card.Text className='mb-3'>
                Create your first event now!
              </Card.Text>
              <Link to="/vertical/createEvent" className="btnShow">Create Event</Link>
            </Card.Body>
          </Card>
        )}
      </div>
      <Modal show={selectedEvent !== null} onHide={() => setSelectedEvent(null)}>
        <Modal.Header closeButton>
          <Modal.Title>User Registrated for This Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
           <div className='d-flex justify-content-center align-items-center'>
             <div class="spinner-border text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
           </div>
          ) : (
            <div className="mt-4 ps-1 pe-1 pb-5 tab-body shadow-lg">
              {registrations && registrations.length > 0 ? (
                <>
                  <Table striped bordered hover className='shadow-lg tb'>
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Ticket Type</th>
                        <th>Status</th>
                        <th>Ticket Price</th>
                        <th>Number of Seats</th>
                        <th>Price Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((registration, index) => (
                        <tr key={index}>
                          <td>{registration.userName}</td>
                          <td>{registration.ticketType}</td>
                          <td>{registration.status}</td>
                          <td>{registration.ticketPrice === 0 ? 'Free' : registration.ticketPrice}</td>
                          <td>{registration.numberOfSeats}</td>
                          <td>{registration.pricePaid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              ) : (
                <Card className='showmEventm'>
                  <Card.Body className='pb-5'>
                    <Card.Img variant="top" src="/No data-rafiki.png" className='shownOdataimg' />
                    <Card.Title>No registrations available</Card.Title>
                    <Card.Text className='mb-3'>
                      No users have registered for this event yet.
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageRegistrationsPage;
