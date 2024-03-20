import React, { useEffect, useState } from 'react';
import "./../styles/HomePag.css";
import Box from '../component/Box';
import { faShoppingBag, faPlane, faBriefcase, faMusic, faCalendarAlt, faRunning } from '@fortawesome/free-solid-svg-icons';
import { useEventContext } from '../context/eventContext';

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('sport');
  const [time, setTime] = useState('today');
  const { getLength } = useEventContext();
  const [categoryLengths, setCategoryLengths] = useState({
    sport: 0,
    travel: 0,
    conference: 0,
    business: 0,
    festival: 0,
    music: 0
  });

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

  const handleSearchButtonClick = () => {
    alert(`Search Text: ${searchText}\nCategory: ${category}\nTime: ${time}`);
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
          <button className='Homepagebutton' onClick={handleSearchButtonClick}>Search</button>
        </div>
      </div>

      <div className="section-two">
        <h3 className='sect-title'>POPULAR CATEGORIES</h3>
        <div className='box-flex'>
          <Box icon={faShoppingBag} name="Business" length={categoryLengths.business} />
          <Box icon={faMusic} name="Music" length={categoryLengths.music} />
          <Box icon={faBriefcase} name="Conference" length={categoryLengths.conference} />
          <Box icon={faCalendarAlt} name="Festival" length={categoryLengths.festival} />
          <Box icon={faRunning} name="Sport" length={categoryLengths.sport} />
          <Box icon={faPlane} name="Travel" length={categoryLengths.travel} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

