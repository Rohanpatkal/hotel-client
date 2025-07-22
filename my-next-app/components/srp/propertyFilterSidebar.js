"use client";

import React from 'react';
import Image from 'next/image';
import styles from '@/styles/srp.module.css'; // CSS Module import
import PriceRangeSlider from '../reusable/priceRangeSlider';

const PropertyFilterSidebar = ({ filters, setFilters }) => {
  const handleStarChange = (star) => {
    const currentStars = filters.selectedStars || [];
    const updatedStars = currentStars.includes(star)
      ? currentStars.filter(s => s !== star)
      : [...currentStars, star];

    setFilters(prev => ({ ...prev, selectedStars: updatedStars }));
  };

  const handleInclusionChange = (inclusion) => {
    const current = filters.selectedInclusions || [];
    const updated = current.includes(inclusion)
      ? current.filter(i => i !== inclusion)
      : [...current, inclusion];

    setFilters(prev => ({ ...prev, selectedInclusions: updated }));
  };

  const handleReset = () => {
    setFilters({
      minPrice: undefined,
      maxPrice: undefined,
      selectedStars: [],
      selectedInclusions: [],
      searchText: ''
    });
  };

  return (
    <div className={styles["search-property-window-container"]}>
      {/* Search by Property Name */}
      <div className={styles["search-input-property-name"]}>
        <label htmlFor="Incredible">Search by property name</label>
        <div className={styles["input-fild"]}>
          <Image
            src="/images/SRP/Vector.svg"
            alt="search"
            width={16}
            height={16}
          />
          <input
            id="Incredible"
            type="text"
            placeholder="e.g. Incredible Costa Del..."
            value={filters.searchText || ''}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchText: e.target.value }))
            }
          />
        </div>
      </div>

      <hr className={styles.hr} />

      {/* Filter By */}
      <div className={styles["filter-by"]}>
        <h3>Filter by</h3>
        <button onClick={handleReset}>Reset</button>
      </div>


      <div className={styles["form-input-populer-filters"]}>
        <h3>Popular filters</h3>
        {/* <label><input type="checkbox" />Breakfast Included</label>
        <label><input type="checkbox" />Free Cancellation</label>
        <label><input type="checkbox" />Andheri</label> */}
        <label>
          <input
            type="checkbox"
            checked={filters.selectedInclusions?.includes('Breakfast Included')}
            onChange={() => handleInclusionChange('Breakfast Included')}
          />
          Breakfast Included
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.selectedInclusions?.includes('Lunch Included')}
            onChange={() => handleInclusionChange('Lunch Included')}
          />
          Lunch Included
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.selectedInclusions?.includes('Andheri')}
            onChange={() => handleInclusionChange('Andheri')}
          />
          Andheri
        </label>

      </div>

      <hr className={styles.hr} />

      {/* Price Per Night */}
      <div className={styles["search--price-pernight"]}>
        <h3>Price (Per night)</h3>
        <div className={styles["search--price-wrapper"]}>
          <div className={styles["search--price-wrapper-inner"]}>
            <div className={styles["search-price--input"]}>
              <span>Min</span>
              {/* <input type="text" placeholder="₹ 0" /> */}
              <input
                type="number"
                placeholder="₹ 0"
                value={filters.minPrice || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              />
            </div>
            <div className={styles["search-price--input"]}>
              <span>Max</span>
              <input
                type="number"
                placeholder="₹ 200000"
                value={filters.maxPrice || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              />
            </div>
          </div>

          {/* <div className={styles["search-price--range"]}>
            <input type="range" />
            <div className={styles["search-price-upto"]}>
              <span>₹ 0</span>
              <span>₹ 2000</span>
            </div>
          </div> */}
          <PriceRangeSlider
            minPrice={filters.minPrice || 0}
            maxPrice={filters.maxPrice || 200000}
            setFilters={setFilters}
          />
        </div>
      </div>

      <hr className={styles.hr} />

      {/* Guest Rating */}
      <div className={styles["search-guest-rating"]}>
        <h3>Guest Rating</h3>
        <div className={styles["search-guest-rating--wrapper"]}>
          <div className={styles.row}>
            <span>ANY</span>
            <span>Unrated</span>
            <span>Poor</span>
            <span>Fair</span>
          </div>
          <div className={styles.row}>
            <span>Average</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </div>
      </div>

      <hr className={styles.hr} />

      {/* Star Ratings */}
      <div className={styles["search-star--container"]}>
        {[5, 4, 3, 2].map((star) => (
          <span
            key={star}
            className={filters.selectedStars?.includes(star) ? styles.active : ''}
            onClick={() => handleStarChange(star)}
          >
            {star} Star
          </span>
        ))}
      </div>
    </div>
  );
};

export default PropertyFilterSidebar;