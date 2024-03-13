import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './../styles/Navbar.module.css';
import { useAuthContext } from '../context/authContext';

const Navbar = () => {
  const [scrollBackground, setScrollBackground] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { token, logout } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 80) {
        setScrollBackground(true);
      } else {
        setScrollBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsNavVisible(false);
    setIsDropdownVisible(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const handleToggleNav = () => {
    setIsNavVisible(!isNavVisible);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className={`${styles.Header} ${scrollBackground ? styles.ScrollBackground : ''}`}>
      <div className={styles.nav}>
        <div>
          <Link to="/horizontal/">
            <img src="/logo_white.png" alt="" />
          </Link>
        </div>

        <ul className={`${styles.ul} ${isNavVisible ? styles.navVisible : ''}`}>
          <Link className={`${styles.a} ${styles.commonLinkStyle}`} to="/horizontal/"><li>HOME</li></Link>
          <Link className={`${styles.a} ${styles.commonLinkStyle}`} to="/horizontal/event"><li>EVENT</li></Link>
          <li className={styles.dropdown} ref={dropdownRef}>
            <span className={`${styles.dropdowntoggle} ${styles.commonLinkStyle}`} onClick={toggleDropdown}>CATEGORIES</span>
            {isDropdownVisible && (
              <div className={styles.dropdownmenu}>
                <ul>
                  <li><Link className={styles.dropa} to="/horizontal/categories/sport">Sport</Link></li>
                  <li><Link className={styles.dropa} to="/horizontal/categories/travel">Travel</Link></li>
                  <li><Link className={styles.dropa} to="/horizontal/categories/conference">Conference</Link></li>
                  <li><Link className={styles.dropa} to="/horizontal/categories/business">Business</Link></li>
                  <li><Link className={styles.dropa} to="/horizontal/categories/festival">Festival</Link></li>
                  <li><Link className={styles.dropa} to="/horizontal/categories/music">Music</Link></li>
                </ul>
              </div>
            )}
          </li>
          <Link className={`${styles.a} ${styles.commonLinkStyle}`} to="/vertical/createEvent"><li>POST AN EVENT</li></Link>
        </ul>

        <div className={styles.icon}>

          {token ?( <div onClick={logout} className={styles.circle}>
            <p>Log Out</p>
          </div> ) : <div className={styles.f}>(<Link className={styles.a} to="/horizontal/login">
            <div className={styles.circle}>
              <p>Sign ln</p>
            </div>
          </Link>
          <Link className={styles.a} to="/horizontal/signup">
            <div className={styles.circle}>
              <p>Sign Up</p>
            </div>
          </Link>)</div> }

          <div className={styles.menu}>
            <i className="bi bi-list" onClick={handleToggleNav}></i>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
