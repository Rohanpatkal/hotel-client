import styles from '../../styles/details.module.css';

const RoomFilter = ({ checkInDate, checkOutDate, numRooms, numGuests }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const formattedDate = checkInDate && checkOutDate
    ? `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}`
    : 'Select Dates';

  const roomGuestText = `${numRooms || 1} Room${numRooms > 1 ? 's' : ''}, ${numGuests || 2} Guest${numGuests > 1 ? 's' : ''}`;

  return (
    <section className={styles["room-filter"]}>
      <div className={styles["room-filter__header"]}>
        <h2 className={styles["room-filter__title"]}>Choose your room</h2>
        <div className={styles["room-filter__toggles"]}>
          <div className={styles["room-filter__toggle"]}>
            <label>Show Prices As</label>
            <div className={styles["room-filter__toggle-group"]}>
              <button className={`${styles["room-filter__toggle-btn"]} ${styles["room-filter__toggle-btn--selected"]}`}>
                Per Night
              </button>
              <button className={styles["room-filter__toggle-btn"]}>Total Stay</button>
            </div>
          </div>
          <div className={styles["room-filter__toggle"]}>
            <label>Earnings</label>
            <div className={styles["room-filter__toggle-group"]}>
              <button className={`${styles["room-filter__toggle-btn"]} ${styles["room-filter__toggle-btn--selected"]}`}>
                Show
              </button>
              <button className={styles["room-filter__toggle-btn"]}>Hide</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["room-filter__controls"]}>
        <div className={styles["room-filter__group"]}>
          <label>Check-In / Check-Out</label>
          <div className={`${styles["room-filter__box"]} ${styles["border"]}`}>
            <span className={styles["room-filter__icon"]}>📅</span>
            <input type="text" placeholder={formattedDate} readOnly />
          </div>
        </div>
        <div className={styles["room-filter__group"]}>
          <label>Rooms & Guests</label>
          <div className={`${styles["room-filter__box"]} ${styles["border"]}`}>
            <span className={styles["room-filter__icon"]}>👤</span>
            <input type="text" placeholder={roomGuestText} readOnly />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomFilter;
