import Link from 'next/link';
import styles from '../../styles/details.module.css';

const HotelOverview = ({ hotel }) => {
  const property = hotel?.property || {};
  const name = property.property_name || 'Hotel Name';
  const description = property.description || 'No description available.';
  const address = property.address || 'No address available';
  const zip = property.zip_code || '';
  const city = property.city || '';
  const country = property.country || '';

  const locationText = [address, city, country, zip].filter(Boolean).join(', ');

  // Languages are hardcoded unless you add a new field in your API
  const languages = ['English', 'Hindi'];

  return (
    <section className={styles["overview"]}>
      <h2 className={styles["overview__title"]}>Overview</h2>

      <h3 className={styles["overview__hotel-name"]}>
        <Link href="#">{name}</Link>
      </h3>

      <p className={styles["overview__description"]}>
        {description}
      </p>

      <Link href="#" className={styles["overview__read-more"]}>Read More</Link>

      <div className={styles["overview__languages"]}>
        <strong>Languages</strong><br />
        {languages.join(', ')}
      </div>

      <div className={styles["overview__location"]}>
        <strong>Location</strong><br />
        {locationText || 'Location information not available.'}
      </div>
    </section>
  );
};

export default HotelOverview;
