import React from 'react';
import "./../styles/RectangleBox.css";

const RectangleBox = ({ number, heading, paragraph }) => {
    return (
        <div className='RectangleBox'>
            <div className="textss">
                <div className="radius">
                    <p>{number}</p>
                </div>
                <h4>{heading}</h4>
            </div>
            <p id='textp'>{paragraph}</p>
        </div>
    )
}

export default RectangleBox;
