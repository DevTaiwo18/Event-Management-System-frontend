import React, { useState, useEffect } from 'react';
import './../styles/message.css'; 

const Message = ({ content, status }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(hideTimeout);
  }, [content, status]);
  
  if (!content) {
    return null;
  }

  return (
    <div className={`message ${status} ${isVisible ? '' : 'hide'}`}>
      <div className="content">{content}</div>
    </div>
  );
};

export default Message;
