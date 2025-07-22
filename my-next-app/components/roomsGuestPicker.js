"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/home.module.css';

const RoomGuestSelector = ({ onClose, onApply }) => {
  const searchParams = useSearchParams();
  const boxRef = useRef(null);

  const [rooms, setRooms] = useState([
    { adults: 2, children: 0, childAges: [] },
  ]);

  // ✅ Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // ✅ On mount, parse guests param and prefill state
    useEffect(() => {
    const guests = searchParams.get("guests");
    if (guests) {
      const decodedGuests = decodeURIComponent(guests); // ✅ decode the URL param
      const roomMatch = decodedGuests.match(/(\d+)\s*Room/);
      const adultMatch = decodedGuests.match(/(\d+)\s*Adult/);
      const childMatch = decodedGuests.match(/(\d+)\s*Child/);

      const roomCount = roomMatch ? parseInt(roomMatch[1]) : 1;
      const adultCount = adultMatch ? parseInt(adultMatch[1]) : 2;
      const childCount = childMatch ? parseInt(childMatch[1]) : 0;

      const newRooms = [];
      let remainingAdults = adultCount;
      let remainingChildren = childCount;

      for (let i = 0; i < roomCount; i++) {
        const adults = remainingAdults >= 2 ? 2 : remainingAdults;
        const children = remainingChildren >= 2 ? 2 : remainingChildren;

        newRooms.push({
          adults: adults > 0 ? adults : 1,
          children,
          childAges: Array(children).fill(0),
        });

        remainingAdults -= adults;
        remainingChildren -= children;
      }

      setRooms(newRooms);
    }
  }, [searchParams]);

  const handleAdultChange = (index, delta) => {
    const updated = [...rooms];
    const newCount = updated[index].adults + delta;
    if (newCount >= 1 && newCount <= 2) {
      updated[index].adults = newCount;
      setRooms(updated);
    }
  };

  const handleChildChange = (index, delta) => {
    const updated = [...rooms];
    const newCount = updated[index].children + delta;
    if (newCount >= 0 && newCount <= 6) {
      updated[index].children = newCount;
      updated[index].childAges = Array(newCount).fill(0);
      setRooms(updated);
    }
  };

  const handleAgeChange = (roomIndex, childIndex, value) => {
    const updated = [...rooms];
    updated[roomIndex].childAges[childIndex] = parseInt(value);
    setRooms(updated);
  };

  const addRoom = () => {
    setRooms([...rooms, { adults: 2, children: 0, childAges: [] }]);
  };

  return (
    <div className={styles["dropdownBox"]} ref={boxRef}>
      {rooms.map((room, roomIndex) => (
        <div key={roomIndex} className={styles["roomBlock"]}>
          <div className={styles["roomLabel"]}>Room {roomIndex + 1}</div>

          <div className={styles["counterRow"]}>
            <label>Adults</label>
            <div className={styles["counter"]}>
              <button onClick={() => handleAdultChange(roomIndex, -1)}>-</button>
              <span>{String(room.adults).padStart(2, '0')}</span>
              <button onClick={() => handleAdultChange(roomIndex, 1)}>+</button>
            </div>
          </div>

          <div className={styles["counterRow"]}>
            <label>Children</label>
            <div className={styles["counter"]}>
              <button onClick={() => handleChildChange(roomIndex, -1)}>-</button>
              <span>{String(room.children).padStart(2, '0')}</span>
              <button onClick={() => handleChildChange(roomIndex, 1)}>+</button>
            </div>
          </div>

          {room.children > 0 && (
            <div className={styles["ageSelectors"]}>
              {room.childAges.map((age, i) => (
                <div key={i} className={styles["ageSelector"]}>
                  <label>Child {i + 1} Age*</label>
                  <select
                    value={age}
                    onChange={(e) => handleAgeChange(roomIndex, i, e.target.value)}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button onClick={addRoom} className={styles["addRoomBtn"]}>+ Add New Room</button>

      <button onClick={() => onApply(rooms)} className={styles["doneBtn"]}>Done</button>
    </div>
  );
};

export default RoomGuestSelector;
