import React from 'react';
import styles from '../../styles/PriceRangeSlider.module.css';

const PriceRangeSlider = ({ minPrice, maxPrice, setFilters }) => {
  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) {
      setFilters((prev) => ({ ...prev, minPrice: value }));
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minPrice) {
      setFilters((prev) => ({ ...prev, maxPrice: value }));
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderTrack}>
        <div
          className={styles.sliderRange}
          style={{
            left: `${(minPrice / 200000) * 100}%`,
            width: `${((maxPrice - minPrice) / 200000) * 100}%`,
          }}
        />
        <input
          type="range"
          min="0"
          max="200000"
          step="500"
          value={minPrice}
          onChange={handleMinChange}
          className={`${styles.thumb} ${styles.thumbLeft}`}
        />
        <input
          type="range"
          min="0"
          max="200000"
          step="500"
          value={maxPrice}
          onChange={handleMaxChange}
          className={`${styles.thumb} ${styles.thumbRight}`}
        />
      </div>
      <div className={styles.priceLabels}>
        <span>₹ {minPrice}</span>
        <span>₹ {maxPrice}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
