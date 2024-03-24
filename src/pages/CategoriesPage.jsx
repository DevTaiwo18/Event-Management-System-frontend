import React, { useState, useEffect } from 'react';
import Static from '../component/Static';
import { useParams } from 'react-router-dom';
import { useEventContext } from '../context/eventContext';
import EventsCardss from '../component/EventsCardss';

const CategoriesPage = () => {
  const { category } = useParams();
  const { getCategoryEvents } = useEventContext();
  const [categoryEvents, setCategoryEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryEvents = async () => {
      try {
        const events = await getCategoryEvents(category); 
        setCategoryEvents(events);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category events:', error);
        setLoading(false); 
      }
    };
    
    fetchCategoryEvents();
  }, [category, getCategoryEvents]);


  return (
    <div>
      <Static title={category.toUpperCase()} title2={category} />

      <div className="category">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <div className="spinner-border text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : categoryEvents.length > 0 ? (
          categoryEvents.map(event => (
            <EventsCardss key={event._id} event={event} />
          ))
        ) : (
          <p className="d-flex justify-content-center align-items-center" style={{ paddingTop: '50px', paddingBottom: '50px', }}>No events found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
