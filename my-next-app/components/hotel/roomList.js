import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/details.module.css';

const RoomList = ({ rooms = [], ratePlans = [] }) => {
  return (
    <div className={styles["booking-container"]}>
      {rooms.map((room, index) => {
        const {
          room_type,
          max_occupancy,
          minimum_price,
          old_price,
        } = room;

        // Get a rate plan matching the room max occupancy (fallback if needed)
        const rate = ratePlans.find(plan => plan.max_occupancy === max_occupancy) || ratePlans[0];
        const mealPlan = rate?.inclusions || 'Room Only';
        const bookingType = rate?.booking_type || 'Standard';
        const price = rate?.base_price || minimum_price || '8000';
        const taxes = rate?.total_price
          ? (parseFloat(rate.total_price) - parseFloat(rate.base_price)).toFixed(0)
          : '800';
        const earnings = (parseFloat(price) * 0.01 * 10).toFixed(0); // Example: 10% earnings

        // Cancellation logic
        const isNonRefundable = bookingType.toLowerCase().includes('non refundable');
        const cancelDate = ['24 Dec 2024', '10 Dec 2024', '10 Feb 2025'][index % 3];

        return (
          <div key={index} className={styles["room-item"]}>
            <div className={styles["room-info"]}>
              <h3 className={styles["room-title"]}>{room_type}</h3>
              <Link href="#" className={styles["room-amenities-link"]}>View Room Amenities</Link>
              {index === 0 && <div className={styles["package-rate"]}>Package Rate</div>}
            </div>

            <div className={styles["room-details"]}>
              <div className={`${styles["cancellation-policy"]} ${
                isNonRefundable ? styles["cancellation-non-refundable"] : styles["cancellation-free"]
              }`}>
                <span>
                  <Image src="/icons/right.svg" alt="Check" width={16} height={16} />
                </span>
                {isNonRefundable ? 'Non Refundable' : `Free Cancellation till ${cancelDate}, 02:00 hr`}
              </div>

              <div className={styles["meal-plan"]}>
                <span>
                  <Image src="/icons/right.svg" alt="Check" width={16} height={16} />
                </span>
                {mealPlan}
              </div>

              <div className={styles["accommodation-info"]}>
                <span>
                  <Image src="/icons/user.svg" alt="Guests" width={16} height={16} />
                  Accommodates {max_occupancy}
                </span>
              </div>

              <Link href="#" className={styles["cancellation-link"]}>View Cancellation Policy</Link>
            </div>

            <div className={styles["pricing-section"]}>
              <div className={styles["pricing-content"]}>
                <div className={styles["price"]}>
                  ₹ {parseFloat(price).toFixed(0)}
                </div>
                <div className={styles["taxes-info"]}>
                  + ₹ {taxes} taxes / per night
                </div>
                <div className={styles["earnings"]}>
                  Your Earnings : INR {earnings}
                </div>
              </div>

              <div className={styles["action-buttons"]}>
                <button className={styles["select-btn"]}>Select</button>
                <div className={styles["compare-section"]}>
                  <input
                    type="checkbox"
                    id={`compare${index}`}
                    className={styles["compare-checkbox"]}
                  />
                  <label htmlFor={`compare${index}`} className={styles["compare-label"]}>Compare</label>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomList;
