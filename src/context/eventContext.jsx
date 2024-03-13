import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Message from "../component/Message";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

const EventProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_apiUrl;
    const [message, setMessage] = useState({ content: "", status: "" });

    const createEvent = async (formData, token) => {
        try {
            const response = await axios.post(`${apiUrl}/event/createEvent`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage({ content: response.data.message, status: response.data.status });
            console.log(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    };

    const values = { createEvent };

    return (
        <EventContext.Provider value={values}>
            {children}
            {message.content && <Message content={message.content} status={message.status} />}
        </EventContext.Provider>
    );
};

export default EventProvider;
