import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Message from "../component/Message";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_apiUrl;
    const [user, setUser] = useState({});
    const [message, setMessage] = useState({ content: "", status: "" });

    
    const changepassword = async (formData, token) =>{
        try {
            const response = await axios.patch(`${apiUrl}/user/changepassword`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage({ content: response.data.message, status: response.data.status });
            console.log(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
            navigate("/")
        }
    }

    const editusername = async (formData, token) => {
        try {
            const response = await axios.patch(`${apiUrl}/user/profile`, formData,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage({ content: response.data.message, status: response.data.status });
            localStorage.setItem("user", JSON.stringify(response.data.user))
            setUser(response.data.user)
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    }

    const values = { changepassword, editusername };

    return (
        <UserContext.Provider value={values}>
            {children}
            {message.content && <Message content={message.content} status={message.status} />}
        </UserContext.Provider>
    );
}

export default UserProvider;