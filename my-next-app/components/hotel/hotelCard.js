import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/details.module.css';

const HotelCard = ({ hotel }) => {
  if (!hotel || !hotel.property) return <div>Loading...</div>;

  const property = hotel.property;
  const room = hotel.rooms?.[0]; // use first room as an example
  const ratePlan = hotel.ratePlans?.[0];

  return (
    <div className={`${styles["hotel-card"]} border`}>
      <div className={styles["hotel-card__info"]}>
        <h2 className={styles["hotel-card__title"]}>
          {property.property_name ?? 'Unknown Hotel'}
          <span className={styles["hotel-card__stars"]}>
            {[...Array(property.star_category ?? 0)].map((_, i) => (
              <Image key={`star-${i}`} src="/icons/star.svg" alt="star" width={16} height={16} />
            ))}
            {[...Array(5 - (property.star_category ?? 0))].map((_, i) => (
              <Image key={`dim-${i}`} src="/icons/star-dim.svg" alt="dim star" width={16} height={16} />
            ))}
          </span>
        </h2>

        <p className={styles["hotel-card__location"]}>
          <Image src="/icons/Location.svg" alt="Location" width={16} height={16} />
          {property.address ?? 'Location not available'}
        </p>

        <div className={styles["hotel-card__rating"]}>
          <span className={styles["hotel-card__rating-box"]}>9.1</span>
          <span className={styles["hotel-card__rating-label"]}>Exceptional (320)</span>
          <Link href="#" className={styles["hotel-card__review-link"]}>See all Reviews</Link>
        </div>

        <p className={styles["hotel-card__cancellation"]}>
          <Image src="/icons/right.svg" alt="Check" width={16} height={16} />
          Free Cancellation till <strong>Nov 2024, 12:00 hr</strong>
        </p>
      </div>

      <div className={styles["hotel-card__pricing"]}>
        {room && (
          <p className={styles["hotel-card__availability"]}>
            We have {hotel.rooms.length} room{hotel.rooms.length > 1 ? 's' : ''} left at
          </p>
        )}
        <p className={styles["hotel-card__price"]}>
          {room?.old_price && <del>₹{parseInt(room.old_price).toLocaleString()}</del>}
          <span className={styles["hotel-card__discounted-price"]}>
            ₹{parseInt(room?.minimum_price ?? ratePlan?.base_price ?? 0).toLocaleString()}
          </span>
        </p>
        {ratePlan && (
          <p className={styles["hotel-card__taxes"]}>
            + ₹{parseInt(ratePlan.total_price - ratePlan.base_price).toLocaleString()} Taxes & Fees / Per Night
          </p>
        )}

        <Link href={`/review`}>{/* <Link href={`/review-page/${property.property_id}`}> */}
          <button className={styles["hotel-card__select-btn"]}>Select Room</button>
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
