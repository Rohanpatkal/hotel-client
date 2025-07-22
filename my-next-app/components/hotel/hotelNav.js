import styles from '../../styles/details.module.css';

const HotelNav = () => (
  <nav className={styles["main-nav"]}>
    <ul className={styles["main-nav__list"]}>
      <li className={styles["main-nav__item"]}>Home</li>
      <li className={styles["main-nav__item"]}>Search</li>
      <li className={styles["main-nav__item"]}>Details</li>
    </ul>
  </nav>
);

export default HotelNav;
