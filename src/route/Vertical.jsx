import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './../routes/protectRouter';
import PostEventPage from './../pages/PostEventPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import EditProfilePage from '../pages/EditProfilePage';
import ManageEventsPage from '../pages/ManageEventsPage';
import ManageRegistrationsPage from '../pages/ManageRegistrationsPage';
import TransactionsPage from '../pages/TransactionsPage';
import "./../styles/Vertical.css";
import NavigationMenu from '../component/NavigationMenu';
import CreateTicket from '../pages/CreateTicket';
import { useAuthContext } from '../context/authContext';
import JoinEvent from '../pages/JoinEvent';

const Vertical = () => {

    const { user } = useAuthContext()

    const [isNavVisible, setIsNavVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsNavVisible(false);
    }, [location]);

    const handleToggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    return (
        <div>
            {user && <header className='Header shadow-lg'>
                <Link className='a' to={'/horizontal/'}>
                    <div className="lefet">
                        <img src="/footerlogo.png" alt="" />
                    </div>
                </Link>

                <div className="right">
                    <p>{`Hi, ${user.username}`}</p>
                    <Link className='a' to={"/vertical/createEvent"}>
                        <button>POST AN EVENT</button>
                    </Link>
                    <div className="menu">
                        <i className="bi bi-list" onClick={handleToggleNav}></i>
                    </div>
                </div>
            </header>}
            <div className="vertical">
                <NavigationMenu className={isNavVisible ? "navVisible" : ''} />
                <div className="show-component">
                    <Routes>
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/createEvent" element={<PostEventPage />} />
                            <Route path='/createTicket' element={<CreateTicket />} />
                            <Route path='/changepassword' element={<ChangePasswordPage />} />
                            <Route path='/editprofile' element={<EditProfilePage />} />
                            <Route path='/manageevent' element={<ManageEventsPage />} />
                            <Route path='/manageregistration' element={<ManageRegistrationsPage />} />
                            <Route path='/transaction' element={<TransactionsPage />} />
                            <Route path='/joinevent' element={<JoinEvent />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
};


    



export default Vertical;
