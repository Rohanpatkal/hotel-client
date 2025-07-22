import styles from '../../styles/details.module.css';

const HotelInfo = ({ extras = [] }) => {
  return (
    <section className={styles["info"]}>
      <div className={styles["info__container"]}>
        <h2 className={styles["info__title"]}>Important information</h2>

        <div className={styles["info__content"]}>
          <h3 className={styles["info__section-title"]}>Optional extras</h3>
          <ul className={styles["info__list"]}>
            {extras.length > 0 ? (
              extras.map((item, index) => (
                <li key={index} className={styles["info__item"]}>{item}</li>
              ))
            ) : (
              <li className={styles["info__item"]}>
                No additional charges or extras provided.
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HotelInfo;
