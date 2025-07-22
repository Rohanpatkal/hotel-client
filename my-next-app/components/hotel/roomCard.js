import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/details.module.css';

const RoomCard = ({ room }) => {
  const {
    room_type,
    room_area,
    size_unit,
    max_occupancy,
    amenities,
    minimum_price,
    old_price,
    room_description,
  } = room;

  // Convert amenities from string to array
  const amenityList = amenities?.split(',') || [];

  // Map known amenity names to icons and labels
  const amenityIconMap = {
    'Air Conditioning': { icon: '/icons/details/air_conditioning.svg', label: 'Air Conditioning' },
    'Free WiFi': { icon: '/icons/details/wifi.svg', label: 'Free Wi-Fi' },
    'TV': { icon: '/icons/details/bed-room 1.svg', label: 'TV' },
    'amenity': { icon: '/icons/details/bed-room 1.svg', label: 'Room Only' },
    'Bath': { icon: '/icons/details/houseKiping.svg', label: 'Housekeeping' },
  };

  return (
    <section className={styles["room-card"]}>
      <div className={styles["room-card__banner"]}>
        <Image 
          src="/images/details/Frame 1801286061.png" 
          alt="Room banner" 
          width={400}
          height={200}
        />
      </div>

      <div className={styles["room-card__content"]}>
        <h3>{room_type}</h3>
        <p>{room_description || 'Comfortable and spacious room.'}</p>

        <div className={styles["room-card__content-facalitys"]}>
          <span>
            <Image src="/icons/details/User_dark.svg" alt="Sleep" width={16} height={16} />
            Sleep {max_occupancy}
          </span>
          <span>
            <Image src="/icons/details/sqft.svg" alt="Size" width={16} height={16} />
            {room_area} {size_unit}
          </span>

          {amenityList.map((item, idx) => {
            const mapped = amenityIconMap[item.trim()];
            return mapped ? (
              <span key={idx}>
                <Image src={mapped.icon} alt={mapped.label} width={16} height={16} />
                {mapped.label}
              </span>
            ) : null;
          })}
        </div>

        <p>
          <del>₹{parseFloat(old_price || 0).toFixed(0)}</del>{' '}
          <strong>₹{parseFloat(minimum_price || 0).toFixed(0)}</strong>
        </p>

        <Link href="#">View All</Link>
      </div>
    </section>
  );
};

export default RoomCard;
