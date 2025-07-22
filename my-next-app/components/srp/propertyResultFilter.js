import React from 'react';
import styles from '../../styles/srp.module.css'; // Create your own CSS Module file

const PropertyResultFilter = ({ total = 949, location = 'Dubai' }) => {
  return (
    <div className={styles["search-property-result--filter"]}>
      <p>
        <span>{total}</span> Properties in {location}
      </p>
      <div className={styles["search-property-result--filter-wrapper"]}>
        <ul>
          <li>
            <a href="#" className={styles["active-anker"]}>Recommended</a>
          </li>
          <li>
            <a href="#"><span>User Rating </span>(Highest First)</a>
          </li>
          <li>
            <a href="#"><span>Price </span>(Highest First)</a>
          </li>
          <li>
            <a href="#"><span>Price </span>(Lowest First)</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyResultFilter;
