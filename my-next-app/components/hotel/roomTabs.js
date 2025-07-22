import { useState, useEffect } from 'react';
import styles from '../../styles/details.module.css';

const RoomTabs = ({ rooms = [], ratePlans = [] }) => {
  const [activeRoomType, setActiveRoomType] = useState(null);
  const [filters, setFilters] = useState({
    all: true,
    bed1: false,
    bed2: false,
    freeCancellation: false,
    breakfast: false,
    halfBoard: false,
    fullBoard: false,
  });

  // Get unique room types dynamically
  const uniqueRoomTypes = [...new Set(rooms.map(room => room.room_type))];

  useEffect(() => {
    if (!activeRoomType && uniqueRoomTypes.length > 0) {
      setActiveRoomType(uniqueRoomTypes[0]); // Set default active
    }
  }, [uniqueRoomTypes]);

  const handleFilterChange = (filterKey) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  return (
    <section className={styles["room-tabs"]}>
      <div className={styles["room-tabs__list"]}>
        {uniqueRoomTypes.map((type, index) => (
          <span
            key={index}
            className={`${styles["room-tabs__tab"]} ${activeRoomType === type ? styles["room-tabs__tab--active"] : ''}`}
            onClick={() => setActiveRoomType(type)}
          >
            {type}
          </span>
        ))}
      </div>

      <div className={styles["room-tabs__filters"]}>
        {[
          { key: 'all', label: 'All Rooms' },
          { key: 'bed1', label: '1 Bed' },
          { key: 'bed2', label: '2 Beds' },
          { key: 'freeCancellation', label: 'Free Cancellation' },
          { key: 'breakfast', label: 'Breakfast Included' },
          { key: 'halfBoard', label: 'Half Board' },
          { key: 'fullBoard', label: 'Full Board' },
        ].map(({ key, label }) => (
          <label
            key={key}
            className={`${styles["room-tabs__chip"]} ${filters[key] ? styles["room-tabs__chip--active"] : styles["border"]}`}
          >
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={() => handleFilterChange(key)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default RoomTabs;
