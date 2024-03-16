import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import "./../styles/Manageevent.css";
import { useEventContext } from '../context/eventContext';
import { useAuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';
import UpdateEventModal from '../component/UpdateEventModal';

const ManageEventsPage = () => {
    const { token } = useAuthContext();
    const [events, setEvents] = useState([]); 
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { getUserEvent, event, Ticket, eventTicket, updateEvent } = useEventContext();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            await getUserEvent(token);
            setEvents(event || []);
            if (event) {
                event.forEach(async (eventItem) => {
                    let eventId = eventItem._id;
                    await eventTicket(eventId);
                });
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleUpdateEvent = (eventItem) => {
        setSelectedEvent(eventItem);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    const handleEventClick = (eventItem) => {
        // Update selected event when clicking on an event
        if (selectedEvent && selectedEvent._id === eventItem._id) {
            // If the clicked event is the same as the selected event, close the modal
            handleCloseModal();
        } else {
            // If the clicked event is different, update the selected event
            handleUpdateEvent(eventItem);
        }
    };

    if (!events || events.length === 0) {
        return (
            <Card className='showmEventm'>
                <Card.Body>
                    <Card.Img variant="top" src="/public/Personal files.gif" className='shownOdataimg' />
                    <Card.Title>No event to manage</Card.Title>
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
            <div className="manage-events-page shadow-lg">
                <h1>Manage Events</h1>
                {events.map((eventItem, index) => (
                    <div key={index} className="manage-event-card" onClick={() => handleEventClick(eventItem)}>
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
                                    <button className="manage-update-button">Update</button>
                                    <button className="manage-delete-button">Delete</button>
                                </div>
                            </div>
                        </div>
                        {selectedEvent && selectedEvent._id === eventItem._id && (
                            <UpdateEventModal eventDetails={selectedEvent} updateEvent={updateEvent} handleClose={handleCloseModal} />
                        )}
                        <div className="manage-ticket-section flex-display">
                            {Ticket && Ticket.length > 0 && Ticket.map((ticket, ticketIndex) => (
                                ticket.eventId === eventItem._id && (
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
                                                    <button className="manage-delete-ticket-button">Delete</button>
                                                    <button className="manage-update-ticket-button">Update</button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageEventsPage;
