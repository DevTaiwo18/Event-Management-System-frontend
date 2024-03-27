import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../component/Navbar';
import HomePage from '../pages/HomePage';
import EventsPage from '../pages/EventsPage';
import CategoriesPage from '../pages/CategoriesPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import EventDetailsPage from '../pages/EventDetailsPage';
import Footer from '../component/Footer';
import SearchPage from '../pages/SearchPage';

const Horizontal = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/event" element={<EventsPage />} />
                <Route path="/categories/:category" element={<CategoriesPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/event/:eventId" element={<EventDetailsPage />} />
                <Route path="/name/category/time" element={<SearchPage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default Horizontal;
