import React, { useState, useEffect } from 'react';
import { useEventContext } from '../context/eventContext';
import { useAuthContext } from "../context/authContext";
import { useParams } from 'react-router-dom';
import Static from '../component/Static';
import "./../styles/EventDatail.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import { useUserContext } from '../context/userContext';
import {useNavigate} from "react-router-dom"

const EventDetailsPage = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const { getSingle, eventTicket, Ticket } = useEventContext();
  const { user, token } = useAuthContext();
  const { registerForevent } = useUserContext();
  const { eventId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();


  useEffect(() => {
    handleGetSingleEvent();
    fetchTicketsForEvent(eventId);
  }, [eventId]);

  const handleGetSingleEvent = async () => {
    try {
      const event = await getSingle(eventId);
      setEventDetails(event);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const fetchTicketsForEvent = async (eventId) => {
    try {
      const ticketsData = await eventTicket(eventId);
    } catch (error) {
      console.error('Error fetching tickets for event:', error);
    }
  };

  const formatDescription = (description) => {
    return description.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const handleRegisterForEvent = (ticketId, ticketType) => {
    if (!token) {
      navigation('/horizontal/login');
      return; 
    }
    setShowModal(true);
    setSelectedTicketId(ticketId);
    setSelectedTicketType(ticketType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        email,
        numberOfSeats,
        ticketId: selectedTicketId,
        eventId,
        userId: user._id,
        ticketType: selectedTicketType
      };

      console.log(formData);

      const registrationResponse = await registerForevent(formData, token);
      console.log(registrationResponse);

      if (registrationResponse.paymentUrl) {
        window.location.href = registrationResponse.paymentUrl;
      } else {
        window.location.href = '/vertical/joinevent';
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };


  return (
    <div>
      {eventDetails ? (
        <div>
          <Static title={eventDetails.name} title2={eventDetails.name} />
          <div className="detailsevent">
            <div className="eventdatailpimg shadow-md">
              <img src={eventDetails.image} alt="" />
              <div>
                {formatDescription(eventDetails.description)}
              </div>
            </div>
            <div className="locationandmap shadow-md">
              <div className="locationandmaptop">
                <div className="locationandmaptilte">
                  <h3>EVENT DETAIL</h3>
                  <FontAwesomeIcon icon={faInfoCircle} className="event-detail-icon" />
                </div>
                <div className="locationandmapflex">
                  <h4>Date:</h4>
                  <p>{formatDate(eventDetails.date)}</p>
                </div>
                <div className="locationandmapflex">
                  <h4>Category:</h4>
                  <p>{eventDetails.category}</p>
                </div>
                <div className="locationandmapflex">
                  <h4>Venue:</h4>
                  <p>{eventDetails.venue}</p>
                </div>
                <div className="locationandmapflex">
                  <h4>Location:</h4>
                  <p>{eventDetails.location}</p>
                </div>
              </div>
              <h4 className='locationandmaph4'>Map:</h4>
              <div className="map-location">
                <iframe
                  src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0075207296827!2dYOUR_LONGITUDE!3dYOUR_LATITUDE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zYOUR_LATITUDE!5e0!3m2!1sen!2sus!4v1604756721339!5m2!1sen!2sus"}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="ticketdisplay">
            <h4 className='ticketdisplayh4'>TICKET&PRICE</h4>
            <div className="ticketshow">
              {Ticket && Ticket.length > 0 ? (
                <div className="ticketshow">
                  {Ticket.map((ticket) => (
                    <div className="ticketbody" key={ticket._id}>
                      <button className="ticketbodybtn">{ticket.type}</button>
                      <img src="/price_icon.png" alt="" className="ticketbodyImg" />
                      <h4 className="ticketbodyh4">{ticket.price === 0 ? "Free" : ticket.price}</h4>
                      <p className="ticketbodyp">{ticket.sit} Tickets</p>
                      <button
                        className="registerforevent"
                        onClick={() => handleRegisterForEvent(ticket._id, ticket.type)}
                      >
                        REGISTER EVENT
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No tickets available</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <Modal show={showModal} className='registermodal' onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register for Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label
              >Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="numberOfSeats">
              <Form.Label>Number of Seats</Form.Label>
              <Form.Control type="number" min="1" value={numberOfSeats} onChange={(e) => setNumberOfSeats(e.target.value)} required />
            </Form.Group>
            <Button className='register' type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventDetailsPage;
