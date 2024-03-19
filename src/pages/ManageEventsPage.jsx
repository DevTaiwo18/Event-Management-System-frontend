import React, { useState } from 'react';
import { Card, Spinner, Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import "./../styles/Manageevent.css";
import { useEventContext } from '../context/eventContext';
import { useAuthContext } from '../context/authContext';
import UpdateEventModal from '../component/UpdateEventModal';

const ManageEventsPage = () => {
    const { token } = useAuthContext();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true); 
    const { getUserEvent, event, eventTicket, Ticket } = useEventContext();
    const history = useHistory();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true); 
            await getUserEvent(token);
            setEvents(event || []);
            setLoading(false); 

            event.forEach(eventItem => {
                eventTicket(eventItem._id);
            });
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    const handleUpdateEvent = (eventItem) => {
        setSelectedEvent(eventItem); 
    };

    const handleCloseModal = () => {
        setSelectedEvent(null); 
    };

    const handleOpenModal = (ticket) => {
        setSelectedTicket(ticket);
        setShowModal(true);
    };

    const handleUpdateTicket = (updatedTicket) => {
        // Perform logic to update the ticket in your context or API
        console.log('Updated ticket:', updatedTicket);

        // Close the modal
        setShowModal(false);
    };

    const handleCloseTicketModal = () => {
        setShowModal(false);
    };

    const handleFinishUpdate = () => {
        history.push('/manage-events');
    };

    return (
        <div className="body">
            {loading && ( 
                <div className="spinner-overlay">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            <div className="manage-events-page shadow-lg">
                <h1>Manage Events</h1>
                {events.map((eventItem, index) => (
                    <div key={index} className="manage-event-card">
                        <div className="manage-event-details">
                            <img src={eventItem.image} alt={eventItem.name} className="manage-event-image" />
                            <div className="manage-event-info">
                                <div className="manage-event-title">{eventItem.name}</div>
                                <div className="manage-event-location">{eventItem.location}</div>
                                <div className="manage-event-date-description">
                                    <p className="manage-event-date">{moment(eventItem.date).format('YYYY-MM-DD')}</p>
                                    <p className="manage-event-description">{eventItem.description.substring(0, 150)}...</p>
                                </div>
                                <div className="manage-event-actions">
                                    <button className="manage-update-button" onClick={() => handleUpdateEvent(eventItem)}>Update</button>
                                    <button className="manage-delete-button">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="manage-ticket-section flex-display">
                            {Ticket && Ticket.length > 0 && Ticket.filter(ticket => ticket.eventId === eventItem._id).map((ticket, ticketIndex) => (
                                <div key={ticketIndex}>
                                    <Card className="manage-ticket-card">
                                        <div className="boder">
                                            <h1>{ticket.type}</h1>
                                        </div>
                                        <Card.Body>
                                            <Card.Img src="/public/price_icon.png" className='ticketImg' />
                                            {ticket.price === 0 ? (
                                                <Card.Text>Free</Card.Text>
                                            ) : (
                                                <Card.Text>₦{ticket.price}</Card.Text>
                                            )}
                                            <Card.Text>{`${ticket.sit} Tickets`}</Card.Text>
                                            <div className="d-flex align-items-center justify-content-center gap-3">
                                                <button className="manage-update-ticket-button" onClick={() => handleOpenModal(ticket)}>Update</button>
                                                <button className="manage-delete-ticket-button">Delete</button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {selectedEvent && (
                    <UpdateEventModal
                        eventDetails={selectedEvent}
                        handleClose={handleCloseModal}
                        onFinishUpdate={handleFinishUpdate}
                    />
                )}
                {showModal && selectedTicket && (
                    <TicketUpdateModal
                        ticket={selectedTicket}
                        onUpdate={handleUpdateTicket}
                        onClose={handleCloseTicketModal}
                    />
                )}
            </div>
        </div>
    );
}

export default ManageEventsPage;
