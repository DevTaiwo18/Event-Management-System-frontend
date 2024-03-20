import React from 'react';
import "./../styles/Box.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Box = ({ icon, name, length }) => {
    return (    
        <div className='box'>
            <FontAwesomeIcon icon={icon} className='icon' />
            <p>{name}</p>
            <span>{length}</span>
        </div>
    );
};

export default Box;
