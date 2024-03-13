import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/authContext';
import Horizontal from './route/Horizontal';
import Vertical from './route/Vertical';
import Landingpage from './route/Landingpage';
import EventProvider from './context/eventContext';
import UserProvider from './context/userContext';

function App() {
    const [token, setToken] = useState('');

    useEffect(() => {
        const tempToken = localStorage.getItem('token');
        if (tempToken && tempToken !== null && tempToken !== undefined) {
            setToken(tempToken);
        }
    }, []);

    return (
        <Router>
            <AuthProvider>
                <UserProvider>
                    <EventProvider>
                        <Routes>
                            <Route path='/' element={<Landingpage />} />
                            <Route path="/horizontal/*" element={<Horizontal />} />
                            <Route path="/vertical/*" element={<Vertical />} />
                        </Routes>
                    </EventProvider>
                </UserProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
