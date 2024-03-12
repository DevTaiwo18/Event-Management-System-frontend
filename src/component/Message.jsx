import React, { useState, useEffect } from 'react';
import './../styles/message.css'; 

const Message = ({ content, status }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000); 

    return () => clearTimeout(timeout);
  }, []);


  return (
    <div className={`message ${status} ${isVisible ? 'show' : 'hide'}`}>
      <div className="content">{content}</div>
    </div>
  );
};

export default Message;
