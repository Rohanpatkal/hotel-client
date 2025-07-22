'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/home.module.css";
import { useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/globals.css';

import RoomGuestSelector from "@/components/roomsGuestPicker";
import SearchBox from "@/components/searchBox";
import DateSelector from "@/components/dateSelector";
import NavBar from "@/components/navBar";

import { useRouter, useSearchParams } from 'next/navigation';
import { formatISO } from 'date-fns';

export default function HomePage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [destination, setDestination] = useState('');
  const [roomGuestSummary, setRoomGuestSummary] = useState('1 Room, 2 Adults');
  const [showRoomSelector, setShowRoomSelector] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const guests = searchParams.get("guests");
    const dest = searchParams.get("destination");

    if (start) setStartDate(new Date(start));
    if (end) setEndDate(new Date(end));
    if (guests) setRoomGuestSummary(decodeURIComponent(guests));
    if (dest) setDestination(decodeURIComponent(dest));
  }, []);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (destination) queryParams.set("destination", destination);
    if (startDate) queryParams.set("start", startDate.toISOString());
    if (endDate) queryParams.set("end", endDate.toISOString());
    if (roomGuestSummary) queryParams.set("guests", roomGuestSummary);

    router.push(`/srp?${queryParams.toString()}`);
  };

  const queryParams = new URLSearchParams();
  if (destination) queryParams.set("destination", destination);
  if (startDate) queryParams.set("start", formatISO(startDate, { representation: 'date' }));
  if (endDate) queryParams.set("end", formatISO(endDate, { representation: 'date' }));
  if (roomGuestSummary) queryParams.set("guests", roomGuestSummary);
  const searchUrl = `/srp?${queryParams.toString()}`;

  return (
    <div className={styles.container}>

      <NavBar/>
      
      <div className={styles["banner-explore"]}>
        <div className={styles["banner-explore-content"]}>
          <div className={styles["banner-explore-content-heading"]}>
            <div className={styles["explore-heading"]}>
              <h1>Explore. Book. Earn.</h1>
            </div>
            <p>Access 7,000+ hotels in 100+ destinations with exclusive agent deals.</p>
          </div>

          <div className={styles["banner-explore-content-filter"]}>
            <div className={styles["explore-filter-head"]}>
              <div className={styles["fi-head-hotel"]}>
                <Image src="/icons/Hotels.svg" alt="hotel icon" width={24} height={24} />
                <span>Hotels</span>
              </div>
            </div>

            <div className={styles["explore-filter-foot"]}>
              <div className={styles["explore-filter-options"]}>
                {/* Destination */}
                <div className={`${styles["explore-option"]} ${styles["explore-destination"]}`}>
                  <SearchBox destination={destination} setDestination={setDestination} />
                </div>

                {/* Check-In/Out */}
                <div className={`${styles["explore-option"]} ${styles["explore-check-in-out"]}`}>
                  <DateSelector
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                </div>

                {/* Guests */}
                <div
                  className={`${styles["explore-option"]} ${styles["explore-rooms-guests"]}`}
                  onClick={() => setShowRoomSelector(true)}
                >
                  <Image src="/icons/user.svg" alt="user" width={20} height={20} />
                  <input type="text" placeholder="Rooms & Guests" readOnly value={roomGuestSummary} />
                  {showRoomSelector && (
                    <RoomGuestSelector
                      onClose={() => setShowRoomSelector(false)}
                      onApply={(rooms) => {
                        const roomCount = rooms.length;
                        let adultCount = 0;
                        let childCount = 0;
                        rooms.forEach(room => {
                          adultCount += room.adults;
                          childCount += room.children;
                        });
                        const summary = `${roomCount} Room${roomCount > 1 ? 's' : ''}, ${adultCount} Adult${adultCount > 1 ? 's' : ''}${childCount > 0 ? `, ${childCount} Child${childCount > 1 ? 'ren' : ''}` : ''}`;
                        setRoomGuestSummary(summary);
                        setShowRoomSelector(false);
                      }}
                    />
                  )}
                </div>

                {/* Search Button */}
                <div className={`${styles["explore-option-btn"]} ${styles["explore-search-btn"]}`}>
                  <Link href={searchUrl}>
                    <button onClick={handleSearch}>
                      <Image src="/icons/Search.svg" alt="search" width={20} height={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Services Section */}
        <div className={styles["book-services"]}>
          <div className={styles["book-services-content"]}>
            <div className={styles["book-services-content-banner"]}>
              <Image src="/images/slider-image.png" width={1200} height={400} alt="slider hotels" />
              <h2>Unbeatable Hotel Deals <br /> Book Your Stay Today!</h2>
            </div>

            <div className={styles["book-services-content-elements"]}>
              <h2>Why book with VERNOST</h2>
              <div className={styles["hotel-book-services-wrapper"]}>
                {[
                  { icon: "/icons/Frame.svg", title: "Competitive Edge in the Market", desc: "Enhances customer experience and satisfaction with user-friendly travel technology." },
                  { icon: "/icons/Frame (1).svg", title: "Access to Global Inventory", desc: "Offers travel services from multiple suppliers worldwide with competitive pricing and better deals." },
                  { icon: "/icons/Frame (2).svg", title: "Automated Booking System", desc: "Real-time availability, instant bookings, and easy cancellations." },
                  { icon: "/icons/Frame (3).svg", title: "24/7 Customer Support", desc: "Dedicated support for troubleshooting and assistance ensures seamless operations for travel agents." },
                  { icon: "/icons/Frame (4).svg", title: "Time-Saving & Efficiency", desc: "Instant confirmations and invoice generation streamline workflow." },
                  { icon: "/icons/Frame (5).svg", title: "Reliable Partnerships & Networking", desc: "Connects travel businesses with global suppliers and service providers." }
                ].map((card, i) => (
                  <div key={i} className={styles["hotel-book-services-card"]}>
                    <div className={styles["hotel-book-icon"]}>
                      <Image src={card.icon} alt="icon" width={36} height={36} />
                    </div>
                    <div className={styles["hotel-book-text"]}>
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer" style={{marginTop:"20px"}}>
        <p>@2025 Vernost. All rights reserved. Privacy Policy | Terms & Conditions</p>
      </footer>
    </div>
  );
}
