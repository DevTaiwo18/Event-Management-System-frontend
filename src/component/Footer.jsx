import React from 'react'
import styles from "./../styles/Footer.module.css"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.flex}>
        <div className={styles.box}>
          <p>Beside Unity Bank Iwo Road,
            <br />
            Ibadan Oyo State, Nigeria</p>

        </div>
        <div className={styles.box}>
          <Link to={'/horizontal/'}><img src="/footer2.png" alt="" /></Link>
          <p>adeyemitaiwo@royalorbitzvoyage.com
            <br />
            +(234) 8026 151 366</p>
        </div>
        <div className={styles.box}>
          <p>We are open round the clock</p>
        </div>
      </div>
      <div className={styles.icons}>
        <i className="bi bi-facebook"></i>
        <i className="bi-twitter"></i>
        <i className="bi-instagram"></i>
        <i className="bi-whatsapp"></i>
      </div>
    </div>
  )
}

export default Footer
