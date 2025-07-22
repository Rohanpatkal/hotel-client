"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";

import PropertyFilterSidebar from "@/components/srp/propertyFilterSidebar";
import HotelCardList from "@/components/srp/hotelCardList";
import SearchBox from "@/components/searchBox";
import DateSelector from "@/components/dateSelector";
import RoomGuestSelector from "@/components/roomsGuestPicker";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

import styles from "@/styles/srp.module.css";

export default function SrpPage() {
    const searchParams = useSearchParams();
    const [destination, setDestination] = useState('');
    const [showRoomSelector, setShowRoomSelector] = useState(false);
    const [roomGuestSummary, setRoomGuestSummary] = useState('1 Room, 2 Adults');
    const [hotelCount, setHotelCount] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('recommended');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filters, setFilters] = useState({
        minPrice: undefined,
        maxPrice: undefined,
        selectedStars: [],
        selectedInclusions: [],
    });


    useEffect(() => {
        const start = searchParams.get("start");
        const end = searchParams.get("end");
        const guests = searchParams.get("guests");
        const dest = searchParams.get("destination");

        if (start && end) {
            setStartDate(new Date(start));
            setEndDate(new Date(end));
        }

        if (guests) {
            setRoomGuestSummary(decodeURIComponent(guests));
        }
        if (dest) setDestination(decodeURIComponent(dest));
    }, [searchParams]);

    return (
        <div className={styles.containerh}>

            <NavBar />

            <div className={styles["advance-search"]}>
                <div className={styles["advance-search-wrapper"]}>
                    <div className={`${styles["advance-search-option"]} ${styles["explore-option"]} ${styles["explore-destination"]}`}>
                        <SearchBox destination={destination} setDestination={setDestination} selectedFilter={selectedFilter} />
                    </div>
                    <div className={`${styles["advance-search-option"]} ${styles["explore-option"]} ${styles["explore-check-in-out"]}`}>
                        <DateSelector
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                        />
                    </div>
                    <div className={`${styles["advance-search-option"]} ${styles["explore-option"]} ${styles["explore-rooms-guests"]}`}>
                        <div
                            className={`${styles["room-guest-wrapper"]}  m-0 p-0`}
                            onClick={() => setShowRoomSelector(true)}
                        >
                            <Image src="/icons/user.svg" alt="user icon" width={20} height={20} />
                            <input
                                type="text"
                                readOnly
                                value={roomGuestSummary}
                                className={styles["room-guest-input"]}
                            />
                        </div>

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

                    <div className={styles["search-btn"]}>
                        <Link
                            href={{
                                pathname: "/srp",
                                query: {
                                    destination,
                                    start: startDate?.toISOString(),
                                    end: endDate?.toISOString(),
                                    guests: roomGuestSummary
                                }
                            }}
                        >
                            <button>
                                <Image src="/icons/Search.svg" alt="search" width={20} height={20} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles["search-property-container"]}>
                <div className={styles["search-property-window"]}>
                    <PropertyFilterSidebar filters={filters} setFilters={setFilters} />
                </div>

                <div className={styles["search-property-result"]}>
                    <div className={styles["search-property-result--filter"]}>
                        <p><span>{hotelCount || '949'}</span> Properties in {destination || 'Dubai'}</p>
                        <div className={styles["search-property-result--filter-wrapper"]}>
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        onClick={() => setSelectedFilter('recommended')}
                                        className={selectedFilter === 'recommended' ? styles["active-anker"] : ''}
                                    >
                                        Recommended
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={() => setSelectedFilter('rating_desc')}
                                        className={selectedFilter === 'rating_desc' ? styles["active-anker"] : ''}
                                    >
                                        <span>User Rating</span> (Highest First)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={() => setSelectedFilter('price_desc')}
                                        className={selectedFilter === 'price_desc' ? styles["active-anker"] : ''}
                                    >
                                        <span>Price</span> (Highest First)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={() => setSelectedFilter('price_asc')}
                                        className={selectedFilter === 'price_asc' ? styles["active-anker"] : ''}
                                    >
                                        <span>Price</span> (Lowest First)
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className={styles["search-property-result-hotels"]}>
                        <HotelCardList destination={destination} setHotelCount={setHotelCount} selectedFilter={selectedFilter} filters={filters} />
                    </div>
                </div>
            </div>

            <Footer />

        </div >
    );
}