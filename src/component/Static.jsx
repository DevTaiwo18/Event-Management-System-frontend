import React from 'react';
import { Link } from 'react-router-dom';
import "./../styles/Static.css"
const Static = ({ title, title2 }) => {
  return (
    <div className='containerStyle'>
      <h1 className='titleStyle'>{title}</h1>
      <ul>
        <Link className='a' to={'/horizontal/'}><li>Home</li></Link>
        <li>
          <i className="bi bi-chevron-right arrow-right"></i>
        </li>
        <li>{title2}</li>
      </ul>
    </div>
  );
};

export default Static;
