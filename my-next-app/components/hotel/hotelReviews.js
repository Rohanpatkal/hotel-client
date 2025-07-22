import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/details.module.css';

const HotelReviews = ({ reviews = [], averageRating = null, totalReviews = 0 }) => {
  const ratingText = averageRating >= 9
    ? "Excellent"
    : averageRating >= 8
    ? "Very Good"
    : averageRating >= 7
    ? "Good"
    : "Average";

  return (
    <section className={styles["reviews"]}>
      <div className={styles["reviews__container"]}>
        <h2 className={styles["reviews__title"]}>Customer Reviews</h2>

        <div className={styles["reviews__header"]}>
          <div className={styles["reviews__rating"]}>
            <div className={styles["reviews__rating-number"]}>
              {averageRating ? `${averageRating.toFixed(1)}/10` : "N/A"}
            </div>
            <div className={styles["reviews__rating-text"]}>
              {averageRating ? ratingText : "No Rating"}
            </div>
            <div className={styles["reviews__verified"]}>
              {totalReviews}{' '}
              <Link href="#" className={styles["reviews__verified-link"]}>
                verified reviews
              </Link>
            </div>
          </div>
        </div>

        <div className={styles["reviews__content"]}>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className={styles["reviews__card"]}>
                <div className={styles["reviews__card-rating"]}>
                  {review.rating}/10 {review.rating >= 9 ? 'Excellent' : review.rating >= 8 ? 'Very Good' : 'Good'}
                </div>
                <p className={styles["reviews__card-text"]}>
                  {review.comment}
                </p>
                <Link href="#" className={styles["reviews__card-link"]}>See more</Link>
                <div className={styles["reviews__card-author"]}>{review.author}</div>
                <div className={styles["reviews__card-date"]}>{review.date}</div>
              </div>
            ))
          ) : (
            <p className={styles["reviews__card-text"]}>No reviews available.</p>
          )}
        </div>

        {totalReviews > 0 && (
          <div className={styles["reviews__footer"]}>
            <Link href="#" className={styles["reviews__all-link"]}>
              See all {totalReviews} reviews
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelReviews;
