import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Message from "../component/Message";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

const EventProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_apiUrl;
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
            return response.data
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
            return response.data.tickets;
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
            return response.data.event;
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

    const deleteTicket = async (ticketId, token) => {
        try {
            const response = await axios.delete(`${apiUrl}/event/deleteTicket/${ticketId}`, {
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

    const deleteEvent = async (eventId, token) => {
        try {
            const response = await axios.delete(`${apiUrl}/event/${eventId}`, {
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

    const getLength = async () => {
        try {
            const response = await axios.get(`${apiUrl}/event/categories/length`);
            return response.data.categories;
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    };

    const getFeatures = async () => {
        try {
            const response = await axios.get(`${apiUrl}/event/events/featured`);
            return response.data.events;
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    }

    const getLengthVenue = async () => {
        try {
            const response = await axios.get(`${apiUrl}/event/event/usereventvenues`);
            return response.data;
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const getAllTheEvents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/event/getEvent`);
            return response.data.events;
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    }

    const getCategoryEvents = async (category) => {
        try {
            const response = await axios.get(`${apiUrl}/event/category/${category}`);
           return response.data.events
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            console.log(errorMessage);
            setMessage({ content: errorMessage, status: 'fail' });
        }
    }

    const search = async (name, category, time) => {
        try {
            const response = await fetch(`${apiUrl}/event/search/${name}/${category}/${time}`);
            const data = await response.json(); 
            console.log(data.events);
            return data.events;
    
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            console.log(errorMessage);
            setMessage({ content: errorMessage, status: 'fail' });
        }
    }

    const getSingle = async (eventId) => {
        try {
            const response = await axios.get(`${apiUrl}/event/${eventId}`);
            return response.data.event;
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    }
    

    const values = { createEvent, getUserEvent, event, createTicket, eventTicket, Ticket, updateEvents, updateTicket, deleteTicket, deleteEvent, getLength, getFeatures, getLengthVenue , getAllTheEvents, getCategoryEvents, search, getSingle};

    return (
        <EventContext.Provider value={values}>
            {children}
            {message.content && <Message content={message.content} status={message.status} />}
        </EventContext.Provider>
    );
};

export default EventProvider;
