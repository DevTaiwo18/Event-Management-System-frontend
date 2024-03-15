// import React, { useEffect, useState } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import moment from 'moment';
// import "./../styles/Manageevent.css";
// import { useEventContext } from '../context/eventContext';
// import { useAuthContext } from '../context/authContext';

// const ManageEventsPage = () => {
//   const { token } = useAuthContext();
//   const [events, setEvents] = useState([]);
//   const { getUserEvent, event, Ticket, eventTicket } = useEventContext();

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       await getUserEvent(token); 
//       setEvents(event || []); 
//       event.forEach(async (eventItem) => {
//         let eventId = eventItem._id;
//         await eventTicket(eventId);
//       });
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   return (
//     <div className="manage-events-page">
//       <h1>Manage Events</h1>
//       {events.map((eventItem, index) => (
//         <div key={index} className="event-card">
//           <div className="event-details">
//             <img src={eventItem.image} alt={eventItem.name} className="event-image" />
//             <div>
//               <h3 className="event-title">{eventItem.name}</h3>
//               <p className="event-date">{moment(eventItem.date).format('MMMM D, YYYY')}</p>
//               <p className="event-location">{eventItem.location}</p>
//               <p className="event-description">{eventItem.description.substring(0, 100)}...</p>
//             </div>
//           </div>
//           <div className="event-actions">
//             <Button variant="primary" className="update-button">Update</Button>
//             <Button variant="danger" className="delete-button">Delete</Button>
//           </div>
//           <div className="ticket-section">
//             {Ticket.map((ticket, ticketIndex) => (
//               <Card key={ticketIndex} className="ticket-card">
//                 <Card.Body>
//                   <Card.Title>{ticket.name}</Card.Title>
//                   <Card.Text>{ticket.description}</Card.Text>
//                   <Card.Text>Date: {moment(ticket.date).format('MMMM D, YYYY')}</Card.Text>
//                   <Card.Text>Price: ₦{ticket.price}</Card.Text>
//                   <Card.Text>Available Seats: {ticket.availableSeats}</Card.Text>
//                   <Button variant="info" className="get-ticket-button">Get Ticket</Button>
//                 </Card.Body>
//               </Card>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ManageEventsPage;
