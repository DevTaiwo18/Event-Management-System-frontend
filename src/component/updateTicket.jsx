import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useEventContext } from '../context/eventContext';
import { useAuthContext } from '../context/authContext';

const TicketUpdateModal = ({ ticket, onClose, fetchTickets }) => {
    const [price, setPrice] = useState(ticket.price);
    const [sit, setSit] = useState(ticket.sit);
    const [isFree, setIsFree] = useState(ticket.price === 0);
    const [bankName, setBankName] = useState(ticket.bankName || '');
    const [bankAccount, setBankAccount] = useState(ticket.bankAccount || '');
    const [bankHolderName, setBankHolderName] = useState(ticket.bankHolderName || '');
    const { updateTicket } = useEventContext();
    const { token } = useAuthContext();

    const handleUpdate = async () => {
        const updatedTicket = {
            price: isFree ? 0 : parseFloat(price),
            sit: parseInt(sit),
            bankName: isFree ? '' : bankName,
            bankAccount: isFree ? '' : bankAccount,
            bankHolderName: isFree ? '' : bankHolderName
        };

        try {
            await updateTicket(ticket._id, updatedTicket, token);
            onClose();
            fetchTickets(ticket.eventId);
        } catch (error) {

        }


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
                {!isFree && (
                    <>
                        <Form.Group controlId="formBankName">
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBankAccount">
                            <Form.Label>Bank Account Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={bankAccount}
                                onChange={(e) => setBankAccount(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBankHolderName">
                            <Form.Label>Bank Holder Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={bankHolderName}
                                onChange={(e) => setBankHolderName(e.target.value)}
                            />
                        </Form.Group>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" style={buttonStyle} onClick={handleUpdate}>
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

export default TicketUpdateModal;
