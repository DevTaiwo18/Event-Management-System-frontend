import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Message from "./../component/Message";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || {});
    const apiUrl = import.meta.env.VITE_apiUrl;
    const [message, setMessage] = useState({ content: "", status: "" });

    const setUserData = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
    };

    const clearUserData = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser({});
    };

    const performActionWithImmediateFeedback = async (action, successCallback, showMessage = true) => {
        try {
            const response = await action();
            setUserData(response);
            successCallback?.();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    };

    const registerUser = (formDetails) => performActionWithImmediateFeedback(async () => {
        const response = await axios.post(`${apiUrl}/auth/signup`, formDetails);
        return response.data;
    }, () => navigate("/vertical/createEvent"));

    const handleSignIn = (formData) => performActionWithImmediateFeedback(async () => {
        const response = await axios.post(`${apiUrl}/auth/login`, formData);
        return response.data;
    }, () => navigate("/"));

    const logout = async () => {
        try {
            await axios.post(`${apiUrl}/auth/logout`, { token });
            clearUserData();
            navigate("/")
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
            setMessage({ content: errorMessage, status: 'fail' });
        }
    };


    const values = { token, user, registerUser, handleSignIn, logout };

    return (
        <AuthContext.Provider value={values}>
            {children}
            {message.content && <Message content={message.content} status={message.status} />}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
