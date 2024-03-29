import { useLocation } from 'react-router-dom';
import EventsCardss from '../component/EventsCardss';
import Static from '../component/Static';
import './../styles/SearchPage.css'; 

const SearchPage = () => {
  const location = useLocation();
  const events = location.state?.events || [];

  return (
    <div>
      <Static title="SEARCH EVENT" title2="EVENT" />
      {events.length > 0 ? (
        <div className="search-container">
          {events.map(event => (
            <EventsCardss key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="no-events-found">
          <img src="/no-search-result-icon.webp" alt="" />
          <h1>Hmmm...</h1>
          <p>We couldn't find any matches for the value you searched.</p>
          <p>Double-check your search and keep in mind that some events may not be available.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
