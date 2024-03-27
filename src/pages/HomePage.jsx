import React, { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { faShoppingBag, faPlane, faBriefcase, faMusic, faCalendarAlt, faRunning } from '@fortawesome/free-solid-svg-icons';
import { useEventContext } from '../context/eventContext';
import Box from '../component/Box';
import RectangleBox from '../component/RectangleBox';
import EventCard from '../component/EventCard';
import EventsCardss from '../component/EventsCardss';
import './../styles/HomePag.css';

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('sport');
  const [time, setTime] = useState('today');
  const { getLength, getFeatures, getLengthVenue, getAllTheEvents, search } = useEventContext();
  const [featured, setFeatured] = useState();
  const [categoryLengths, setCategoryLengths] = useState({
    sport: 0,
    travel: 0,
    conference: 0,
    business: 0,
    festival: 0,
    music: 0
  });
  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [venueCount, setVenueCount] = useState(0);
  const [allEvents, setAllEvents] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate (); 

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    handleLength();
    handleFeature();
    handleUserAndVenueLength();
    fetchAllEvents();
  }, []);

  const handleLength = async () => {
    const lengths = await getLength();
    const categoryLengthMap = {
      sport: 0,
      travel: 0,
      conference: 0,
      business: 0,
      festival: 0,
      music: 0
    };
    lengths.forEach(({ category, length }) => {
      categoryLengthMap[category] = length;
    });
    setCategoryLengths(categoryLengthMap);
  };

  const handleFeature = async () => {
    let featured = await getFeatures()
    setFeatured(featured);
  }

  const handleSearchButtonClick = async () => {
    try {
      setLoading(true);
      const response = await search(searchText, category, time);
      console.log(response);
      navigate('/horizontal/search', { state: { events: response } });
      setLoading(false);
    } catch (error) {
      console.error('Error searching events:', error);
      setLoading(false);
    }
  };

  const handleUserAndVenueLength = async () => {
    try {
      const { userCount, eventCount, venueCount } = await getLengthVenue();
      setUserCount(userCount);
      setEventCount(eventCount);
      setVenueCount(venueCount);
    } catch (error) {
      console.error('Error fetching user and venue length:', error);
    }
  }

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
      <div className="backgroundImage">
        <h2>Walking street under the tunnel</h2>
        <h3>Get Ready For The Next Event</h3>
        <button className='home-btn'>Buy Ticket</button>

        <div className="search">
          <input
            type="text"
            name="text"
            id="text"
            value={searchText}
            onChange={handleSearchInputChange}
            placeholder="Enter Name..."
          />
          <select className='homepageselect' value={category} onChange={handleCategoryChange}>
            <option value="sport">Sport</option>
            <option value="travel">Travel</option>
            <option value="conference">Conference</option>
            <option value="business">Business</option>
            <option value="festival">Festival</option>
            <option value="music">Music</option>
          </select>
          <select className='homepageselect' value={time} onChange={handleTimeChange}>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this_week">This Week</option>
            <option value="next_week">Next Week</option>
            <option value="next_month">Next Month</option>
            <option value="future">Future</option>
          </select>
          <button className='Homepagebutton' onClick={handleSearchButtonClick}>
            {loading ? (
              <span>Loading...</span>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
      </div>

      <div className="section-two">
        <h3 className='sect-title'>POPULAR CATEGORIES</h3>
        <div className='box-flex'>
          <Link to={"/horizontal/categories/business"} className="link">
            <Box icon={faShoppingBag} name="Business" length={categoryLengths.business} />
          </Link>
          <Link to={"/horizontal/categories/music"} className="link">
            <Box icon={faMusic} name="Music" length={categoryLengths.music} />
          </Link>
          <Link to={"/horizontal/categories/conference"} className="link">
            <Box icon={faBriefcase} name="Conference" length={categoryLengths.conference} />
          </Link>
          <Link to={"/horizontal/categories/festival"} className="link">
            <Box icon={faCalendarAlt} name="Festival" length={categoryLengths.festival} />
          </Link>
          <Link to={"/horizontal/categories/sport"} className="link">
            <Box icon={faRunning} name="Sport" length={categoryLengths.sport} />
          </Link>
          <Link to={"/horizontal/categories/travel"} className="link">
            <Box icon={faPlane} name="Travel" length={categoryLengths.travel} />
          </Link>

        </div>
      </div>

      <div className="images">
        <h3 className='images-title'>MOST VISITED PLACES</h3>
        <h4 className='images-h4'>Browse Popular Location</h4>
        <div className="image-flex">
          <div className="placeflex1">
            <div className="left" data-text="Abuja"></div>
          </div>
          <div className="placeflex2">
            <div className="top" data-text="Lagos"></div>
            <div className="side">
              <div className="bottom" data-text="Ibadan"></div>
              <div className="bottom" data-text="Port Harcourt"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="rectangele-box">
        <h3 className='sect-title'>WHY CHOOSE US</h3>
        <div className="grid-flex">
          <RectangleBox number={'01'} heading={'MULTIPLE EVENTS'} paragraph={"Discover, attend, and organize diverse events effortlessly on one platform."} />
          <RectangleBox number={"02"} heading={"EVENT MANAGEMENT"} paragraph={"Streamline event planning and execution with comprehensive management solutions."} />
          <RectangleBox number={"03"} heading={"EASY PAYMENT"} paragraph={"Seamless and hassle-free payment solutions for effortless transactions."} />
          <RectangleBox number={"04"} heading={"LOCATION MANAGEMENT"} paragraph={"Efficiently manage event locations with precision and ease."} />
          <RectangleBox number={"05"} heading={"FREE REGISTRING MANAGEMENT"} paragraph={"Effortlessly handle registration for events at absolutely no cost."} />
          <RectangleBox number={"06"} heading={"EASY TO USE"} paragraph={"Intuitive and user-friendly interface for seamless event management."} />
        </div>
      </div>

      <div className="featuereEvent">
        <h3 className='images-title'>FEATURED EVENTS</h3>
        <h4 className='images-h4'>Recommended events</h4>

        <div className="featureFlex">
          {featured && featured.length > 0 && (
            featured.slice(0, 3).map(event => {
              return <EventCard key={event._id} event={event} />;
            })
          )}
        </div>


        <Link to={"/horizontal/event"} className='Links'>
          <div className="allevent">
            <p className='allEventp'>All Events</p>
          </div>
        </Link>

      </div>

      <div className="displayCapcity">
        <div className="">
          <div className="topss">
            <i className="fas fa-user"></i>
            <div className="number">{userCount}</div>
          </div>
          <div className="name">Participants</div>
        </div>
        <div className="">
          <div className="topss">
            <i className="fas fa-calendar-alt"></i>
            <div className="number">{eventCount}</div>
          </div>
          <div className="name">Total Events</div>
        </div>
        <div className="">
          <div className="topss">
            <i className="fas fa-map-marker-alt"></i>
            <div className="number">{venueCount}</div>
          </div>
          <div className="name">Venues</div>
        </div>
      </div>

      <div className="displayAllEvent">
        <h3 className='sect-title'>LATEST EVENTS</h3>
        <div className="carosel">
          {allEvents && allEvents.length > 0 && (
            allEvents.slice().reverse().slice(0, 3).map(event => (
              <EventsCardss key={event._id} event={event} />
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default HomePage;

