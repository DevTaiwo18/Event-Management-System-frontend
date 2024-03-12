import React, {useState, useEffect} from 'react'
import {Outlet, useNavigate} from "react-router-dom"
import { useAuthContext } from '../context/authContext';
const ProtectedRoutes = () => {
    const {token} = useAuthContext();
    const navigation = useNavigate();

    const isAuthenticated = () => {
        if(!token){
            return false
        }
        return true
    }

    useEffect(() => {
        if(!isAuthenticated()){
            navigation("/horizontal/login")
        }
    }, [])

    return <Outlet />
}

export default ProtectedRoutes