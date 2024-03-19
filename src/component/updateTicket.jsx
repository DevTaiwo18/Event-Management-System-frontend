import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TicketUpdateModal = ({ ticket, onUpdate, onClose }) => {
    const [price, setPrice] = useState(ticket.price);
    const [sit, setSit] = useState(ticket.sit);
    const [isFree, setIsFree] = useState(ticket.price === 0);

    const handleUpdate = () => {
        // Perform validation if needed

        // Update the ticket with the new values
        onUpdate({
            ...ticket,
            price: isFree ? 0 : parseFloat(price),
            sit: parseInt(sit)
        });

        // Close the modal
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={isFree ? 0 : price} 
                        onChange={(e) => {
                            setPrice(e.target.value);
                            setIsFree(parseFloat(e.target.value) === 0);
                        }} 
                        disabled={isFree} 
                    />
                </Form.Group>
                <Form.Group controlId="formSit">
                    <Form.Label>Number of Seats</Form.Label>
                    <Form.Control type="number" value={sit} onChange={(e) => setSit(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TicketUpdateModal;
