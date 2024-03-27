import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/authContext';
import Horizontal from './route/Horizontal';
import Vertical from './route/Vertical';
import Landingpage from './route/Landingpage';
import EventProvider from './context/eventContext';
import UserProvider from './context/userContext';
import ScrollToTopOnMount from './component/ScrollToTopMount'; 
import Loader from './pages/Loader';
import Four4page from './pages/Four4page';

function App() {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const tempToken = localStorage.getItem('token');
        if (tempToken && tempToken !== null && tempToken !== undefined) {
            setToken(tempToken);
        }
        setTimeout(() => setLoading(false), 2000);
    }, []);

    return (
        <Router>
            <AuthProvider>
                <UserProvider>
                    <EventProvider>
                        {loading ? <Loader /> : null}
                        {!loading && (
                            <>
                                <ScrollToTopOnMount /> 
                                <Routes>
                                    <Route path='/' element={<Landingpage />} />
                                    <Route path="/horizontal/*" element={<Horizontal />} />
                                    <Route path="/vertical/*" element={<Vertical />} />
                                    <Route path="*" element={<Four4page/>} />
                                </Routes>
                            </>
                        )}
                    </EventProvider>
                </UserProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
