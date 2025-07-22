'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/home.module.css';
import { fetchSearchSuggestions } from '@/lib/hotel'; // 👈 fetcher

// const searchResults = [
//   { icon: '/icons/Hotel-icon.svg', name: 'Taj Lands End', desc: 'City | Mumbai, Maharashtra, India' },
//   { icon: '/icons/Hotel-icon.svg', name: 'The Taj Mahal Place Mumbai', desc: 'City | Mumbai, Maharashtra, India' },
//   { icon: '/icons/Flight-icon.svg', name: 'Mumbai (BOM - Chhatrapati Shivaji)', desc: 'City | India' },
//   { icon: '/icons/Hotel-icon.svg', name: 'Taj Santacruz', desc: 'City | Mumbai, Maharashtra, India' },
//   { icon: '/icons/Hotel-icon.svg', name: 'Taj Mahal Tower, Mumbai', desc: 'City | Mumbai, Maharashtra, India' },
// ];

const popularDestinations = ['Delhi', 'Mumbai', 'Bengaluru', 'Goa', 'Chennai'];

export default function SearchBox({ destination, setDestination }) {
  const [input, setInput] = useState(destination || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const ref = useRef();

  useEffect(() => {
    setInput(destination || '');
  }, [destination]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (input.trim().length > 1) {
        // console.log(input);
        const results = await fetchSearchSuggestions(input);
        setSuggestions(results);
        // console.log(results);
        
      } else {
        setSuggestions([]);
      }
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [input]);

  const handleSelect = (value) => {
    setInput(value);
    setDestination(value);

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('destination', value);

    // push to URL without reloading the page (optional if you want to reflect URL change)
    window.history.replaceState(null, '', `?${queryParams.toString()}`);

    setShowDropdown(false);
  };

  return (
    <div className='d-flex align-items-center p-0' ref={ref}>
      <Image src="/icons/Location.svg" alt="location" width={20} height={20} />
      <input
        type="text"
        placeholder="Destination / Hotel Name"
        value={input}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => {
          setInput(e.target.value);
          setDestination(e.target.value);
          setShowDropdown(true);
        }}
        className={styles.searchInput}
      />
      {showDropdown && (
        <div className={styles["destination-dropdown"]}>
          {input.trim() ? (
            <>
              {suggestions.length > 0 ? suggestions.map((item, index) => (
                <div
                  key={index}
                  className={styles["suggestion-item"]}
                  onClick={() => handleSelect(item.name)}
                >
                  <Image
                    src={item.type === 'hotel' ? '/icons/Hotel-icon.svg' : '/icons/Location.svg'}
                    alt={item.type}
                    width={20}
                    height={20}
                  />
                  <div>
                    <div className={styles["suggestion-title"]}>{item.name}</div>
                    <div className={styles["suggestion-desc"]}>{item.desc}</div>
                  </div>
                </div>
              )) : (
                <p className="p-2">No results found.</p>
              )}
              <hr />
            </>
          ) : (
            <div className={styles["search-placeholder"]}>
              <Image src="/icons/Search-black.svg" alt="search" width={24} height={24} />
              <p>Look up destinations, places to stay, or landmarks</p>
            </div>
          )}
          <div className={styles["popular-searches"]}>
            <h4>Popular searches</h4>
            <ul>
              {popularDestinations.map((city, idx) => (
                <li key={idx} onClick={() => handleSelect(city)}>
                  <Image src="/icons/locate.svg" alt="trend" width={14} height={14} />
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
