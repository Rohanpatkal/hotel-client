import styles from '../../styles/details.module.css';

const HotelTabs = () => {
  return (
    <nav className={styles["tabs"]}>
      <ul className={styles["tabs__list"]}>
        <li className={`${styles["tabs__item"]} ${styles["tabs__item--active"]}`}>Overview</li>
        <li className={styles["tabs__item"]}>Amenities</li>
        <li className={styles["tabs__item"]}>Rooms</li>
        <li className={styles["tabs__item"]}>Policies</li>
      </ul>
    </nav>
  );
};

export default HotelTabs;
