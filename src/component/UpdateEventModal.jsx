import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useEventContext } from '../context/eventContext';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import moment from 'moment';

const UpdateEventModal = ({ eventDetails, handleClose, fetchEvents }) => {
    const { token } = useAuthContext();
    const { updateEvents, getSingle } = useEventContext();
    const navigate = useNavigate();
    const [updatedEvent, setUpdatedEvent] = useState(eventDetails);

    useEffect(() => {
        setUpdatedEvent(eventDetails);
    }, [eventDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'date' ? moment(value).format('YYYY-MM-DD') : value;
        setUpdatedEvent({ ...updatedEvent, [name]: formattedValue });
    };

    const handleSubmit = async () => {
        try {
            const updated = await updateEvents(updatedEvent._id, updatedEvent, token);
            if (updated) {
                handleClose();
                navigate('/vertical/createTicket');
            }   else {
                console.error('Failed to update event');
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleInputClick = (e) => {
        e.stopPropagation();
    };

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="eventName">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control type="text" name="name" value={updatedEvent.name} onChange={handleChange} onClick={handleInputClick} />
                    </Form.Group>
                    <Form.Group controlId="eventDate">
                        <Form.Label>Event Date</Form.Label>
                        <Form.Control type="date" name="date" value={moment(updatedEvent.date).format('YYYY-MM-DD')} onChange={handleChange} onClick={handleInputClick} />
                    </Form.Group>
                    <Form.Group controlId="eventLocation">
                        <Form.Label>Event Location</Form.Label>
                        <Form.Control type="text" name="location" value={updatedEvent.location} onChange={handleChange} onClick={handleInputClick} />
                    </Form.Group>
                    <Form.Group controlId="eventVenue">
                        <Form.Label>Event Venue</Form.Label>
                        <Form.Control type="text" name="venue" value={updatedEvent.venue} onChange={handleChange} onClick={handleInputClick} />
                    </Form.Group>
                    <Form.Group controlId="eventDescription">
                        <Form.Label>Event Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={updatedEvent.description} onChange={handleChange} onClick={handleInputClick} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" style={buttonStyle} onClick={handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const buttonStyle = {
    padding: '6px 12px',
    backgroundColor: '#f53f7b',

    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontFamily: '"Poppins", sans-serif'
};

export default UpdateEventModal;