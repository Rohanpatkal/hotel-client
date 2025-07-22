// components/HotelCardList.js

import React, { useEffect, useState } from 'react';
import styles from '../../styles/srp.module.css';
import Image from 'next/image';
import { fetchHotels } from '@/lib/hotel'; // your dynamic fetcher
import Link from 'next/link';

// ✅ Individual Hotel Card Component
const HotelCard = ({ hotel }) => {
  return (
    <div className={styles['search-property-result-card']}>
      <div className={styles['search-property-result-card--banner']}>
        <div className={styles['hotel-rating']}>
          <span>{hotel.rating || '9.1'}</span>
          <label>{hotel.ratingLabel || 'Exceptional (320)'}</label>
        </div>
        <Image
          src={'/images/SRP/hotel-1-image.png'} //{hotel.image || '/images/SRP/hotel-1-image.png'}
          alt={hotel.name}
          width={400}
          height={200}
        />
        <span>
          <Image src="/icons/Vector.svg" alt="icon" width={20} height={20} />
        </span>
      </div>

      <div className={styles['search-property-result-card--content']}>
        <div className={styles['content-wrapper']}>
          <h3 className={styles['hotel-card--title']}>{hotel.name}</h3>
          <span>
            <Image src="/icons/Location.svg" alt="location" width={16} height={16} />
            <p className={styles['hotel-card--description']}>
              {hotel.city === null ? "city" : hotel.city}, {hotel.state || 'state'}, {hotel.country || 'country'}
            </p>
          </span>
          <div className={styles['hotel-card--rating']}>
            {[...Array(hotel.stars)].map((_, i) => (
              <Image key={i} src="/icons/star.svg" alt="star" width={16} height={16} />
            ))}
            {[...Array(5 - hotel.stars)].map((_, i) => (
              <Image key={i} src="/icons/star-dim.svg" alt="star" width={16} height={16} />
            ))}
          </div>
        </div>

        <div className={styles['hotel-card--features-one']}>
          {(hotel.amenities?.split(',') || []).map((feature, idx) => (
            <div className={styles.icon} key={idx}>
              <span>
                <Image
                  src={feature.includes('Pool') ? '/icons/Pool Icon.svg' : '/icons/washing.svg'}
                  alt="feature"
                  width={16}
                  height={16}
                />
              </span>
              <p>{feature}</p>
            </div>
          ))}
          <div className={styles.icon}>
            <a href="#" className={styles['hotel-card__amenities-more']}>+{(hotel.amenities?.split(' ') || []).length} Amenities</a>
          </div>
        </div>

        <div className={styles['hotel-card--features-two']}>
          <div className={styles['hotel-card--features-two-wrapper']}>
            <span><Image src="/icons/right.svg" alt="check" width={16} height={16} /></span>
            <h3>{hotel.cancellation || 'Free Cancellation'}</h3>
          </div>
          <div className={styles['hotel-card--features-two-wrapper']}>
            <span><Image src="/icons/right.svg" alt="check" width={16} height={16} /></span>
            {/* <h3>{hotel.breakfast || 'Breakfast Included'}</h3>  */}
            <h3>{hotel.inclusions?.split(',').join(" ") || 'Breakfast Included'}</h3>
          </div>
        </div>

        <div className={styles['hotel-card--features-three']}>
          <div className={styles['hotel-feature']}>
            <span><Image src="/icons/Hotels.svg" alt="room" width={16} height={16} /></span>
            {hotel.room_types}
          </div>
          <div className={styles['hotel-feature']}>
            <span><Image src="/icons/user.svg" alt="user" width={16} height={16} /></span>
            Accommodates {hotel.accommodates}
          </div>
        </div>
      </div>

      <div className={styles['search-property-result-card--price']}>
        <div className={styles['search-property-price-wrapper']}>
          <div className={styles['search-property-price--top']}>
            <p>We have {hotel.room_types?.split(',').length} left at</p>
            <div className={styles.col}>
              <span><del>₹{hotel.old_price}</del></span>
              <span>₹{hotel.price}</span>
            </div>
            <p>+ ₹750 Taxes & Fees / Night</p>
          </div>
          <div className={styles['search-property-price-bottum']}>
            <h3>You Earn: Points {hotel.points || 200}</h3>
            {/* 👇 Select Room → navigates to hotel detail page */}
            <Link href={`/details/${hotel.id}`}>
              <button className={styles["hotel-card__select-btn"]}>Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ List Component
const HotelCardList = ({ destination, setHotelCount, selectedFilter, filters }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadHotels = async () => {
      const data = await fetchHotels(
        filters.searchText || destination,
        selectedFilter,
        filters?.minPrice,
        filters?.maxPrice,
        filters?.selectedStars || [],
        filters?.selectedInclusions || []
      );
      setHotels(data);
      setLoading(false);
    };
    if (destination) {
      loadHotels();
    }
    // setHotelCount(hotels.length);
    loadHotels();
  }, [destination, selectedFilter, filters]);

  useEffect(() => {
    if (typeof setHotelCount === 'function') {
      setHotelCount(hotels.length);
    }
  }, [hotels, setHotelCount, selectedFilter]);

  return (
    <div className={styles['search-property-result--hotels']}>
      {loading ? (
        <p>Loading hotels...</p>
      ) : hotels.length === 0 ? (
        <p>No hotels found for "{destination}"</p>
      ) : (
        hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
      )}
    </div>
  );
};

export default HotelCardList;


