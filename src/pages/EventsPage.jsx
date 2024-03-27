import React, { useEffect, useState } from 'react';
import Static from '../component/Static';
import { useEventContext } from '../context/eventContext';
import EventsCardss from '../component/EventsCardss';
import "./../styles/EventPAgw.css";

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllTheEvents } = useEventContext();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      const events = await getAllTheEvents();
      setAllEvents(events);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all events:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Static title="EVENTS" title2="Events" />

      {loading ? ( 
        <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="eventsPageCard">
          <div className="carosel">
            {allEvents.map(event => (
              <EventsCardss key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
