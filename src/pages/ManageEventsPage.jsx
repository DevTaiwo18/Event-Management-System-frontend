import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import moment from 'moment';
import "./../styles/Manageevent.css";
import { useEventContext } from '../context/eventContext';
import { useAuthContext } from '../context/authContext';
import TicketUpdateModal from './../component/updateTicket';
import { useNavigate } from 'react-router-dom';
import UpdateEventModal from '../component/UpdateEventModal';
import { Link } from 'react-router-dom';

const ManageEventsPage = () => {
    const { token } = useAuthContext();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getUserEvent, event, eventTicket, Ticket, deleteTicket, deleteEvent } = useEventContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            await getUserEvent(token);
            const fetchedEvents = event || [];
            setEvents(fetchedEvents);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    const fetchTicketsForEvent = async (eventId) => {
        try {
            await eventTicket(eventId);
        } catch (error) {
            console.error('Error fetching tickets for event:', error);
        }
    };

    const handleUpdateEvent = (eventItem) => {
        setSelectedEvent(eventItem);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    const handleOpenTicketUpdateModal = (ticket) => {
        setSelectedTicket(ticket);
    };

    const handleCloseTicketUpdateModal = () => {
        setSelectedTicket(null);
    };

    const handleDeleteTicket = async (ticket) => {
        try {
            await deleteTicket(ticket._id, token);
            fetchTicketsForEvent(ticket.eventId); 
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEvent(eventId, token);
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId)); 
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };
    

    const handleToggleTicketVisibility = async (eventId) => {
        const eventIndex = events.findIndex(eventItem => eventItem._id === eventId);
        if (eventIndex !== -1 && !events[eventIndex].showTickets) {
            await fetchTicketsForEvent(eventId);
        }

        const updatedEvents = events.map(eventItem => {
            if (eventItem._id === eventId) {
                return { ...eventItem, showTickets: !eventItem.showTickets };
            }
            return eventItem;
        });
        setEvents(updatedEvents);
    };

    if (!event || event.length === 0) {
        return (
            <Card className='showmEventm'>
                <Card.Body>
                    <Card.Img variant="top" src="/Personal files.gif" className='shownOdataimg' />
                    <Card.Title>No event to manage </Card.Title>
                    <Card.Text className='mb-3'>
                        Create your first event now!
                    </Card.Text>
                    <Link to="/vertical/createEvent" className="btnShow">Create Event</Link>
                </Card.Body>
            </Card>
        );
    }

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
                                    <button className="manage-delete-button" onClick={() => handleDeleteEvent(eventItem._id)}>Delete</button>
                                    <button className="manage-show-ticket-button" onClick={() => handleToggleTicketVisibility(eventItem._id)}>
                                        {eventItem.showTickets ? 'Hide Tickets' : 'Show Tickets'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {eventItem.showTickets && (
                            <div className="manage-ticket-section flex-display">
                                {Ticket && Ticket.length > 0 && Ticket.filter(ticket => ticket.eventId === eventItem._id).map((ticket, ticketIndex) => (
                                    <div key={ticketIndex}>
                                        <Card className="manage-ticket-card">
                                            <div className="boder">
                                                <h1>{ticket.type}</h1>
                                            </div>
                                            <Card.Body>
                                                <Card.Img src="/price_icon.png" className='ticketImg' />
                                                {ticket.price === 0 ? (
                                                    <Card.Text>Free</Card.Text>
                                                ) : (
                                                    <Card.Text>₦{ticket.price}</Card.Text>
                                                )}
                                                <Card.Text>{`${ticket.sit} Tickets`}</Card.Text>
                                                <div className="d-flex align-items-center justify-content-center gap-3">
                                                    <button className="manage-update-ticket-button" onClick={() => handleOpenTicketUpdateModal(ticket)}>Update</button>
                                                    <button className="manage-delete-ticket-button" onClick={() => handleDeleteTicket(ticket)}>Delete</button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                                {Ticket.filter(ticket => ticket.eventId === eventItem._id).length === 0 && (
                                    <p>No tickets available for this event.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                {selectedEvent && (
                    <UpdateEventModal
                        eventDetails={selectedEvent}
                        handleClose={handleCloseModal}
                    />
                )}
                {selectedTicket && (
                    <TicketUpdateModal
                        ticket
                        ={selectedTicket}
                        onClose={handleCloseTicketUpdateModal}
                        fetchTickets={fetchTicketsForEvent}
                    />
                )}
            </div>
        </div>
    );
}

export default ManageEventsPage;
