import styles from '../../styles/details.module.css';

const HotelPolicies = ({ property }) => {
  const checkinTime = property?.checkin_time || '3:00 PM';
  const checkoutTime = property?.checkout_time || '12:00 PM';

  return (
    <section className={styles["policies"]}>
      <div className={styles["policies__container"]}>
        <h2 className={styles["policies__title"]}>Policies</h2>

        <div className={styles["policies__content"]}>
          <div className={styles["policies__section"]}>
            <h3 className={styles["policies__section-title"]}>Check-in</h3>
            <ul className={styles["policies__list"]}>
              <li className={styles["policies__item"]}>
                Check-in start time: {checkinTime}; check-in end time: anytime
              </li>
              <li className={styles["policies__item"]}>Early check-in subject to availability</li>
              <li className={styles["policies__item"]}>Early check-in is available for a fee</li>
              <li className={styles["policies__item"]}>Contactless check-in and check-out are available</li>
              <li className={styles["policies__item"]}>Express check-in available</li>
              <li className={styles["policies__item"]}>Minimum check-in age - 18</li>
            </ul>
          </div>

          <div className={styles["policies__section"]}>
            <h3 className={styles["policies__section-title"]}>Check-out</h3>
            <ul className={styles["policies__list"]}>
              <li className={styles["policies__item"]}>Check-out before {checkoutTime}</li>
              <li className={styles["policies__item"]}>Contactless check-out</li>
              <li className={styles["policies__item"]}>Late check-out subject to availability</li>
              <li className={styles["policies__item"]}>Express check-out available</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelPolicies;
