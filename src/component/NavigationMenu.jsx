import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const NavigationMenu = ({ className }) => {

  const {logout} = useAuthContext()
  
  return (
    <div className={`nav ${className}`}>
      <ul>
        <p>Main</p>
        <Link className='a' to="/vertical/createEvent">
          <li><i className="fa-solid fa-plus"></i>Post an Event</li>
        </Link>
        <Link className='a' to="/vertical/createTicket">
          <li><i className="fa-solid fa-list"></i>Create Ticket</li>
        </Link>
        <Link className='a' to="/vertical/manageevent">
          <li><i className="fa-solid fa-elevator"></i>Manage Event</li>
        </Link>
        <Link className='a' to="/vertical/manageregistration">
          <li><i className="fa-solid fa-registered"></i>Manage Registration</li>
        </Link>
        <Link className='a' to="/vertical/transaction">
          <li><i className="fa-solid fa-registered"></i>Transaction</li>
        </Link>
        <Link className='a' to="/vertical/joinevent">
          <li><i className="fa-solid fa-money-bill-transfer"></i>Joined Event</li>
        </Link>
      </ul>
      <ul>
        <p>Account</p>
        <Link className='a' to="/vertical/editprofile">
          <li><i className="fa-regular fa-user"></i>Edit Profile</li>
        </Link>
        <Link className='a' onClick={logout} to={"/"}> 
          <li><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</li>
        </Link>
      </ul>
    </div>
  );
};

export default NavigationMenu;
