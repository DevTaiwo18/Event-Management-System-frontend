import React, { useEffect, useState } from 'react'
import Static from '../component/Static'
import { useEventContext } from '../context/eventContext';
import EventsCardss from '../component/EventsCardss';
import "./../styles/EventPAgw.css"
const EventsPage = () => {
  const [allEvents, setAllEvents] = useState();
  const { getAllTheEvents } = useEventContext();
  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const events = await getAllTheEvents();
      setAllEvents(events);
    } catch (error) {
      console.error('Error fetching all events:', error);
    }
  };

  return (
    <div>
      <Static title="EVENTS" title2="Events" />

      <div className="eventsPageCard">
        <div className="carosel">
          {allEvents && allEvents.length > 0 && (
            allEvents.map(event => (
              <EventsCardss key={event._id} event={event} />
            ))
          )}
        </div>
      </div>

    </div>
  )
}

export default EventsPage
