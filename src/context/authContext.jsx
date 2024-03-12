import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Message from "../component/Message";

const AuthContext = createContext();
export const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const navigation = useNavigate()
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});
    const apiUrl = import.meta.env.VITE_apiUrl;
    const [message, setMessage] = useState({ content: "", status: "" })

    useEffect(() => {
        const tempToken = localStorage.getItem("token")
        setToken(tempToken);

        const tempUser = JSON.parse(localStorage.getItem("user"));
        setUser(tempUser);
    }, [])

    const registerUser = async (formDetails) => {
        try {

            const res = await fetch(`${apiUrl}/auth/signup`, {
                method: "POST",
                body: JSON.stringify(formDetails),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            localStorage.setItem("token", data.token);
            setToken(data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            setUser(data.user)
            console.log(user);
            // setMessage({ content: `${data.message}`, status: `${data.status}` })
            navigation("/horizontal/createEvent")
        } catch (error) {
            console.log("Error", error)
        }
    }

    const handleSignIn = async (formData) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, formData);
            console.log(res)

            localStorage.setItem("token", res.data.token);
            setToken(res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            setUser(res.data.user)
            // setMessage({ content: `${data.message}`, status: `${data.status}` })
            navigation("/horizontal/createEvent")
            
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            const res = await axios.post(`${apiUrl}/auth/logout`, { token })
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null)
            setUser({})
            navigation("/horizontal/")
            // setMessage({ content: `${data.message}`, status: `${data.status}` })

        } catch (error) {
            console.log(error);
        }
    }

    const values = {
        token,
        user,
        registerUser,
        handleSignIn,
        logout
    }

    return <AuthContext.Provider value={values}>
        {children}
        {/* <Message message={message.content} status={message.status} /> */}
    </AuthContext.Provider>
}

export default AuthProvider

