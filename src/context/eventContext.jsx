import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Message from "../component/Message";
import { useNavigate } from "react-router-dom";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

const EventProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_apiUrl;
    const navigate = useNavigate()
    const [message, setMessage] = useState({ content: "", status: "" });
    const [event, setEvent] = useState();
    const [Ticket, setTicket] = useState();

    const createEvent = async (formData, token) => {
        try {
            const response = await axios.post(`${apiUrl}/event/createEvent`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage({ content: response.data.message, status: response.data.status });
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    };

    const getUserEvent = async (token) => {
        try {
            const response = await axios.get(`${apiUrl}/user/my-events`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setEvent(response.data.events);
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    }

    const createTicket = async (formData, token) => {
        try {
            const response = await axios.post(`${apiUrl}/event/createTicket`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage({ content: response.data.message, status: response.data.status });
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    }

    const eventTicket = async (eventId) => {
        try {
            const response = await axios.get(`${apiUrl}/event/getTicket/${eventId}`);
            setTicket(response.data.tickets);
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    }

    const updateEvents = async (eventId, updateData, token) => {
        try {
            const response = await axios.put(`${apiUrl}/event/${eventId}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage({ content: response.data.message, status: response.data.status });
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    };

    const updateTicket = async (ticketId, updateData, token) => {
        try {
            const response = await axios.put(`${apiUrl}/event/updateTicket/${ticketId}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage({ content: response.data.message, status: response.data.status });
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    }


    const values = { createEvent, getUserEvent, event, createTicket, eventTicket, Ticket, updateEvents, updateTicket};

    return (
        <EventContext.Provider value={values}>
            {children}
            {message.content && <Message content={message.content} status={message.status} />}
        </EventContext.Provider>
    );
};

export default EventProvider;
