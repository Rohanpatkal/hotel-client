import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/details.module.css';

const iconMap = {
  "Free WiFi": "/images/details/free wifi.svg",
  "TV": "/images/details/room services.svg",
  "h-pick": "/images/details/parking.svg",
  "Spa": "/images/details/swiming pool.svg",
  "Gym": "/images/details/air conditionar.svg",
  "abcgf": "/images/details/ironing.svg"
  // Add more mappings if needed
};

const HotelAmenities = ({ hotel }) => {
  const amenities = hotel?.amenities || [];
  const facilities = hotel?.facilities || [];

  const combined = [...amenities, ...facilities];

  return (
    <section className={styles["amenities"]}>
      <h2 className={styles["amenities__title"]}>Amenities</h2>

      <div className={styles["amenities__list"]}>
        {combined.length === 0 ? (
          <p>No amenities available.</p>
        ) : (
          combined.map((item, index) => (
            <div className={styles["amenities__item"]} key={index}>
              <Image
                src={"/images/details/room services.svg"} //src={iconMap[item.name] || "/images/details/default-icon.svg"}
                alt={item.name}
                width={20}
                height={20}
              />
              <span>{item.name}</span>
            </div>
          ))
        )}
      </div>

      <Link href="#" className={styles["amenities__view-all"]}>View all Amenities</Link>
    </section>
  );
};

export default HotelAmenities;
