'use client';

import styles from '../../styles/details.module.css';
import NavBar from '../navBar';
import Footer from '../footer';

import HotelNav from '../hotel/hotelNav';
import HotelCard from '../hotel/hotelCard';
import HotelGallery from '../hotel/hotelGallery';
// import Tabs from '../hotel/roomTabs';
import HotelOverview from '../hotel/hotelOverview';
import HotelAmenities from '../hotel/hotelAmenities';
import RoomFilter from '../hotel/roomFilter';
import RoomTabs from '../hotel/roomTabs';
import RoomCard from '../hotel/roomCard';
import RoomList from '../hotel/roomList';
import HotelPolicies from '../hotel/hotelPolicies';
import HotelInfo from '../hotel/hotelInfo';
import HotelReviews from '../hotel/hotelReviews';
import { useEffect, useState } from 'react';
import { fetchHotelDetails } from '@/lib/hotel';

const HotelBooking = ({ hotel }) => {
  // const [hotel , setHotel] = useState(null);
  // const 
  // useEffect(() => {
  // const loadHotels = async ()=>{
  //   const data = await fetchHotelDetails(propertyId);
  //   setHotel(data);
  // };
  // const propertyId = hotel.id;
  // loadHotels();
  // }, [propertyId]);

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className={styles["page-container"]}>
      <NavBar />
      <HotelNav />
      <HotelCard hotel={hotel} />
      <HotelGallery images={hotel.images} />
      <RoomTabs hotel={hotel} />
      <HotelOverview hotel={hotel} />
      <HotelAmenities hotel={hotel} />
      <RoomFilter
        checkInDate="2025-07-22"
        checkOutDate="2025-07-25"
        numRooms={2}
        numGuests={4} />
      {/* <RoomTabs hotel={hotel} /> */}
      <RoomTabs rooms={hotel.rooms} ratePlans={hotel.ratePlans} />
      {hotel.rooms.map((room, index) => (
        <RoomCard key={index} room={room} />
      ))}
      {/* <RoomCard hotel={hotel} /> */}

      <RoomList rooms={hotel.rooms} ratePlans={hotel.ratePlans} />

      {/* <RoomList hotel={hotel} /> */}
      <HotelPolicies property={hotel.property} />
      {/* <HotelPolicies hotel={hotel} /> */}
      <HotelInfo extras={hotel.extras} />
      {/* <HotelInfo hotel={hotel} /> */}
      
      <HotelReviews
        reviews={[
          {
            rating: 10,
            comment: "Buffet was great! Pool was clean. Would love more kid activities.",
            author: "Sophia",
            date: "May 7, 2024"
          },
          {
            rating: 9,
            comment: "Great stay overall. Staff was helpful and room was clean.",
            author: "Rohan",
            date: "Apr 21, 2024"
          }
        ]}
        averageRating={9.2}
        totalReviews={287}
      />
      {/* <HotelReviews hotel={hotel} /> */}
      <Footer />
    </div>
  );
};

export default HotelBooking;













// import Image from 'next/image';
// import Link from 'next/link';
// import styles from '../../styles/details.module.css';

// import NavBar from '../navBar';
// import Footer from '../footer';

// const HotelBooking = () => {
//   return (
//     <div className={styles["page-container"]}>
//       <NavBar/>
//       <nav className={styles["main-nav"]}>
//         <ul className={styles["main-nav__list"]}>
//           <li className={styles["main-nav__item"]}>Home</li>
//           <li className={styles["main-nav__item"]}>Search</li>
//           <li className={styles["main-nav__item"]}>Details</li>
//         </ul>
//       </nav>

//       <div className={styles["hotel-details-container"]}>
//         <div className={styles["hotel-card"]}>
//           <div className={styles["hotel-card__info"]}>
//             <h2 className={styles["hotel-card__title"]}>
//               Rixos Premium Dubai
//               <span className={styles["hotel-card__stars"]}>
//                 {[...Array(4)].map((_, i) => (
//                   <Image key={i} src="/icons/star.svg" alt="star" width={16} height={16} />
//                 ))}
//               </span>
//             </h2>

//             <p className={styles["hotel-card__location"]}>
//               <Image src="/icons/Location.svg" alt="Location" width={16} height={16} />
//               Sofitel Dubai The Palm Resort & Spa
//             </p>

//             <div className={styles["hotel-card__rating"]}>
//               <span className={styles["hotel-card__rating-box"]}>9.1</span>
//               <span className={styles["hotel-card__rating-label"]}>Exceptional (320)</span>
//               <Link href="#" className={styles["hotel-card__review-link"]}>See all Reviews</Link>
//             </div>

//             <p className={styles["hotel-card__cancellation"]}>
//               <Image src="/icons/right.svg" alt="Check" width={16} height={16} />
//               Free Cancellation till <strong>750 Nov 2024, 12:00 hr</strong>
//             </p>
//           </div>

//           <div className={styles["hotel-card__pricing"]}>
//             <p className={styles["hotel-card__availability"]}>We have 5 left at</p>
//             <p className={styles["hotel-card__price"]}>
//               <del>₹7000</del>
//               <span className={styles["hotel-card__discounted-price"]}>₹8000</span>
//             </p>
//             <p className={styles["hotel-card__taxes"]}>+ ₹750 Taxes & Fees / Per Night</p>
//             <Link href="/review-page/review-page">
//               <button className={styles["hotel-card__select-btn"]}>Select Room</button>
//             </Link>
//           </div>
//         </div>

//         <div className={styles["gallery"]}>
//           <div className={styles["gallery__grid"]}>
//             <button className={`${styles["gallery__arrow"]} ${styles["gallery__arrow--left"]}`}>
//               <Image 
//                 src="/images/details/Previous Image Arrow.svg" 
//                 alt="Previous" 
//                 width={24}
//                 height={24}
//               />
//             </button>
//             <div className={styles["gallery__large-image"]}>
//               <Image 
//                 src="/images/details/Main Image.png" 
//                 alt="Main image" 
//                 width={800}
//                 height={450}
//               />
//             </div>
//             <button className={`${styles["gallery__arrow"]} ${styles["gallery__arrow--right"]}`}>
//               <Image 
//                 src="/images/details/Vector (1).svg" 
//                 alt="Next" 
//                 width={24}
//                 height={24}
//               />
//             </button>

//             <div className={styles["gallery__small-images"]}>
//               <div className={styles["small-image"]}>
//                 <Image 
//                   src="/images/details/Image 1.png" 
//                   alt="Pool view" 
//                   width={150}
//                   height={100}
//                 />
//               </div>
//               <div className={styles["small-image"]}>
//                 <Image 
//                   src="/images/details/Image 2.png" 
//                   alt="Hotel exterior" 
//                   width={150}
//                   height={100}
//                 />
//               </div>
//               <div className={styles["small-image"]}>
//                 <Image 
//                   src="/images/details/Image 3.png" 
//                   alt="Room interior" 
//                   width={150}
//                   height={100}
//                 />
//               </div>
//               <div className={styles["gallery__more-wrapper"]}>
//                 <Image 
//                   src="/images/details/Image 4.png" 
//                   alt="Room interior" 
//                   width={150}
//                   height={100}
//                 />
//                 <span className={styles["gallery__more-badge"]}>
//                   <Image 
//                     src="/icons/Vector.svg" 
//                     alt="Gallery Icon" 
//                     width={12}
//                     height={12}
//                   />
//                   48+
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <nav className={styles["tabs"]}>
//         <ul className={styles["tabs__list"]}>
//           <li className={`${styles["tabs__item"]} ${styles["tabs__item--active"]}`}>Overview</li>
//           <li className={styles["tabs__item"]}>Amenities</li>
//           <li className={styles["tabs__item"]}>Rooms</li>
//           <li className={styles["tabs__item"]}>Policies</li>
//         </ul>
//       </nav>

//       <section className={styles["overview"]}>
//         <h2 className={styles["overview__title"]}>Overview</h2>
//         <h3 className={styles["overview__hotel-name"]}>
//           <Link href="#">Rixos Premium Dubai</Link>
//         </h3>
//         <p className={styles["overview__description"]}>
//           Luxury family-friendly hotel near Sanjay Gandhi National Park Located close to R City Mall, The Westin
//           Mumbai Powai Lake provides a terrace, shopping on-site and a coffee shop/cafe. Treat yourself to a body
//           treatment, reflexology or a massage at Heavenly Spa by Westin, the on-site spa. At the 3 on-site
//           restaurants, enjoy breakfast, brunch, lunch, dinner and Asian cuisine. Stay connected with free WiFi in
//           public areas, and guests can find other amenities, such as a garden and a playground.
//         </p>
//         <Link href="#" className={styles["overview__read-more"]}>Read More</Link>
//         <div className={styles["overview__languages"]}>
//           <strong>Languages</strong><br />
//           English, Hindi
//         </div>
//       </section>

//       <section className={styles["amenities"]}>
//         <h2 className={styles["amenities__title"]}>Amenities</h2>
//         <div className={styles["amenities__list"]}>
//           <div className={styles["amenities__item"]}>
//             <Image src="/images/details/housekeeping.svg" alt="Housekeeping" width={20} height={20} />
//             <span> Housekeeping</span>
//           </div>
//           <div className={styles["amenities__item"]}>
//             <Image src="/images/details/free wifi.svg" alt="Free Wi-Fi" width={20} height={20} />
//             <span>Free Wi-Fi</span>
//           </div>
//           <div className={styles["amenities__item"]}>
//             <Image src="/images/details/swiming pool.svg" alt="Swimming Pool" width={20} height={20} />
//             <span>Swimming Pool</span>
//           </div>
//           <div className={styles["amenities__item"]}>
//             <Image src="/images/details/smooking rooms.svg" alt="Smoking Rooms" width={20} height={20} />
//             <span>Smoking Rooms</span>
//           </div>
//           <div className={styles["amenities__item"]}>
//             <Image src="/images/details/parking.svg" alt="Parking" width={20} height={20} />
//             <span>Parking</span>
//           </div>
//           <div className={styles["amenities__item"]}>
//             <Image src="/images/details/air conditionar.svg" alt="Air Conditioning" width={20} height={20} />
//             <span>Air Conditioning</span>
//           </div>
//           <div className={styles["amenities__item"]}>
//             <Image src="/images/details/room services.svg" alt="Room Service" width={20} height={20} />
//             <span>Room Service</span>
//           </div>
//           <div className={styles["amenities__item"]}>
//             <Image src="/images/details/security guard.svg" alt="Security Guard" width={20} height={20} />
//             <span>Security Guard</span>
//           </div>
//           <div className={styles["amenities__item"]}>
//             <Image src="/images/details/elevator Lift.svg" alt="Elevator/Lift" width={20} height={20} />
//             <span>Elevator/Lift</span>
//           </div>
//           <div className={styles["amenities__item"]}>
//             <Image src="/images/details/ironing.svg" alt="Ironing Service" width={20} height={20} />
//             <span>Ironing Service</span>
//           </div>
//         </div>
//         <Link href="#" className={styles["amenities__view-all"]}>View all Amenities</Link>
//       </section>

//       <section className={styles["room-filter"]}>
//         <div className={styles["room-filter__header"]}>
//           <h2 className={styles["room-filter__title"]}>Choose your room</h2>
//           <div className={styles["room-filter__toggles"]}>
//             <div className={styles["room-filter__toggle"]}>
//               <label>Show Prices As</label>
//               <div className={styles["room-filter__toggle-group"]}>
//                 <button className={`${styles["room-filter__toggle-btn"]} ${styles["room-filter__toggle-btn--selected"]}`}>
//                   Per Night
//                 </button>
//                 <button className={styles["room-filter__toggle-btn"]}>Total Stay</button>
//               </div>
//             </div>
//             <div className={styles["room-filter__toggle"]}>
//               <label>Earnings</label>
//               <div className={styles["room-filter__toggle-group"]}>
//                 <button className={`${styles["room-filter__toggle-btn"]} ${styles["room-filter__toggle-btn--selected"]}`}>
//                   Show
//                 </button>
//                 <button className={styles["room-filter__toggle-btn"]}>Hide</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={styles["room-filter__controls"]}>
//           <div className={styles["room-filter__group"]}>
//             <label>Check-In / Check-Out</label>
//             <div className={`${styles["room-filter__box"]} ${styles["border"]}`}>
//               <span className={styles["room-filter__icon"]}>📅</span>
//               <input type="text" placeholder="May 10 - May 10" />
//             </div>
//           </div>
//           <div className={styles["room-filter__group"]}>
//             <label>Rooms & Guests</label>
//             <div className={`${styles["room-filter__box"]} ${styles["border"]}`}>
//               <span className={styles["room-filter__icon"]}>👤</span>
//               <input type="text" placeholder="1 Room, 2 Guests" />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className={styles["room-tabs"]}>
//         <div className={styles["room-tabs__list"]}>
//           <span className={`${styles["room-tabs__tab"]} ${styles["room-tabs__tab--active"]}`}>Superior Room</span>
//           <span className={styles["room-tabs__tab"]}>Luxury Room</span>
//           <span className={styles["room-tabs__tab"]}>Deluxe Room</span>
//           <span className={styles["room-tabs__tab"]}>Standard Room</span>
//         </div>
//         <div className={styles["room-tabs__filters"]}>
//           <label className={`${styles["room-tabs__chip"]} ${styles["room-tabs__chip--active"]}`}>
//             <input type="checkbox" checked />
//             <span>All Rooms</span>
//           </label>
//           <label className={`${styles["room-tabs__chip"]} ${styles["border"]}`}>
//             <input type="checkbox" />
//             <span>1 Bed</span>
//           </label>
//           <label className={`${styles["room-tabs__chip"]} ${styles["border"]}`}>
//             <input type="checkbox" />
//             <span>2 Beds</span>
//           </label>
//           <label className={`${styles["room-tabs__chip"]} ${styles["border"]}`}>
//             <input type="checkbox" />
//             <span>Free Cancellation</span>
//           </label>
//           <label className={`${styles["room-tabs__chip"]} ${styles["border"]}`}>
//             <input type="checkbox" />
//             <span>Breakfast Included</span>
//           </label>
//           <label className={`${styles["room-tabs__chip"]} ${styles["border"]}`}>
//             <input type="checkbox" />
//             <span>Half Board</span>
//           </label>
//           <label className={`${styles["room-tabs__chip"]} ${styles["border"]}`}>
//             <input type="checkbox" />
//             <span>Full Board</span>
//           </label>
//         </div>
//       </section>

//       <section className={styles["room-card"]}>
//         <div className={styles["room-card__banner"]}>
//           <Image 
//             src="/images/details/Frame 1801286061.png" 
//             alt="Room banner" 
//             width={400}
//             height={200}
//           />
//         </div>
//         <div className={styles["room-card__content"]}>
//           <h3>Superior Room</h3>
//           <p>5 Twin Bunk Bed · Beach view </p>
//           <div className={styles["room-card__content-facalitys"]}>
//             <span>
//               <Image src="/icons/details/User_dark.svg" alt="Sleep" width={16} height={16} />
//               Sleep 10
//             </span>
//             <span>
//               <Image src="/icons/details/sqft.svg" alt="Size" width={16} height={16} />
//               55 m2 / 592 sq.ft
//             </span>
//             <span>
//               <Image src="/icons/details/houseKiping.svg" alt="Housekeeping" width={16} height={16} />
//               Housekeeping
//             </span>
//             <span>
//               <Image src="/icons/details/parking.svg" alt="Parking" width={16} height={16} />
//               Parking
//             </span>
//             <span>
//               <Image src="/icons/details/bed-room 1.svg" alt="Room Only" width={16} height={16} />
//               Room Only
//             </span>
//             <span>
//               <Image src="/icons/details/wifi.svg" alt="Wi-Fi" width={16} height={16} />
//               Free Wi-Fi
//             </span>
//             <span>
//               <Image src="/icons/details/multilingual.svg" alt="Staff" width={16} height={16} />
//               Multilingual Staff
//             </span>
//             <span>
//               <Image src="/icons/details/fire_extinguisher.svg" alt="Fire" width={16} height={16} />
//               Fire Extinguisher
//             </span>
//             <span>
//               <Image src="/icons/details/air_conditioning.svg" alt="AC" width={16} height={16} />
//               Air Conditioning
//             </span>
//             <span>
//               <Image src="/icons/details/ironing_Service.svg" alt="Ironing" width={16} height={16} />
//               Ironing Service
//             </span>
//           </div>
//           <Link href="">View All</Link>
//         </div>
//       </section>

//       <div className={styles["booking-container"]}>
//         {[1, 2, 3, 4, 5].map((roomNum) => (
//           <div key={roomNum} className={styles["room-item"]}>
//             <div className={styles["room-info"]}>
//               <h3 className={styles["room-title"]}>Room Type {roomNum}</h3>
//               <Link href="#" className={styles["room-amenities-link"]}>View Room Amenities</Link>
//               {roomNum === 1 && <div className={styles["package-rate"]}>Package Rate</div>}
//             </div>

//             <div className={styles["room-details"]}>
//               <div className={`${styles["cancellation-policy"]} ${
//                 roomNum === 2 ? styles["cancellation-non-refundable"] : styles["cancellation-free"]
//               }`}>
//                 <span>
//                   <Image src="/icons/right.svg" alt="Check" width={16} height={16} />
//                 </span>
//                 {roomNum === 2 ? "Non Refundable" : 
//                  `Free Cancellation till ${roomNum === 1 ? "24 Dec 2024" : 
//                   roomNum === 3 ? "10 Dec 2024" : 
//                   roomNum === 4 ? "24 Dec 2024" : "10 Feb 2025"}, 02:00 hr`}
//               </div>

//               <div className={styles["meal-plan"]}>
//                 <span>
//                   <Image src="/icons/right.svg" alt="Check" width={16} height={16} />
//                 </span>
//                 {roomNum === 1 ? "Half Board (Includes breakfast and lunch)" :
//                  roomNum === 2 ? "Full Board (Includes breakfast, lunch, and dinner)" :
//                  roomNum === 3 ? "All-Inclusive (Includes all meals and drinks)" :
//                  roomNum === 4 ? "Standard Room (Room only)" : 
//                  "Deluxe Suite (Includes breakfast and dinner)"}
//               </div>

//               <div className={styles["accommodation-info"]}>
//                 <span>
//                   <Image src="/icons/user.svg" alt="Guests" width={16} height={16} />
//                   Accommodates 8
//                 </span>
//               </div>

//               <Link href="#" className={styles["cancellation-link"]}>View Cancellation Policy</Link>
//             </div>

//             <div className={styles["pricing-section"]}>
//               <div className={styles["pricing-content"]}>
//                 <div className={styles["price"]}>
//                   {roomNum === 1 ? "₹ 12000" : 
//                    roomNum === 2 ? "₹ 11880" : 
//                    roomNum === 3 ? "₹ 8977" : "₹ 8000"}
//                 </div>
//                 <div className={styles["taxes-info"]}>
//                   + {roomNum === 2 ? "₹ 60" : roomNum === 5 ? "₹ 90" : "₹ 800"} taxes / per night
//                 </div>
//                 <div className={styles["earnings"]}>
//                   Your Earnings : INR {roomNum === 2 ? "100" : roomNum === 5 ? "200" : "80"}
//                 </div>
//               </div>

//               <div className={styles["action-buttons"]}>
//                 <button className={styles["select-btn"]}>Select</button>
//                 <div className={styles["compare-section"]}>
//                   <input type="checkbox" id={`compare${roomNum}`} className={styles["compare-checkbox"]} />
//                   <label htmlFor={`compare${roomNum}`} className={styles["compare-label"]}>Compare</label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <section className={styles["policies"]}>
//         <div className={styles["policies__container"]}>
//           <h2 className={styles["policies__title"]}>Policies</h2>
//           <div className={styles["policies__content"]}>
//             <div className={styles["policies__section"]}>
//               <h3 className={styles["policies__section-title"]}>Check-in</h3>
//               <ul className={styles["policies__list"]}>
//                 <li className={styles["policies__item"]}>Check-in start time: 3:00 PM; check-in end time: anytime</li>
//                 <li className={styles["policies__item"]}>Early check-in subject to availability</li>
//                 <li className={styles["policies__item"]}>Early check-in is available for a fee</li>
//                 <li className={styles["policies__item"]}>Contactless check-in and check-out are available</li>
//                 <li className={styles["policies__item"]}>Express check-in available</li>
//                 <li className={styles["policies__item"]}>Minimum check-in age - 18</li>
//               </ul>
//             </div>
//             <div className={styles["policies__section"]}>
//               <h3 className={styles["policies__section-title"]}>Check-out</h3>
//               <ul className={styles["policies__list"]}>
//                 <li className={styles["policies__item"]}>Check-out before noon</li>
//                 <li className={styles["policies__item"]}>Contactless check-out</li>
//                 <li className={styles["policies__item"]}>Late check-out subject to availability</li>
//                 <li className={styles["policies__item"]}>Express check-out available</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className={styles["info"]}>
//         <div className={styles["info__container"]}>
//           <h2 className={styles["info__title"]}>Important information</h2>
//           <div className={styles["info__content"]}>
//             <h3 className={styles["info__section-title"]}>Optional extras</h3>
//             <ul className={styles["info__list"]}>
//               <li className={styles["info__item"]}>Fee for buffet breakfast: from approximately INR 1400 per person</li>
//               <li className={styles["info__item"]}>Airport shuttle fee: INR 2156 per person (one-way)</li>
//               <li className={styles["info__item"]}>Airport shuttle fee per child: INR 2156 (one-way), (up to 18 years old)</li>
//               <li className={styles["info__item"]}>Early check-in is available for a fee (subject to availability)</li>
//               <li className={styles["info__item"]}>Rollaway bed fee: INR 1500.0 per day</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       <section className={styles["reviews"]}>
//         <div className={styles["reviews__container"]}>
//           <h2 className={styles["reviews__title"]}>Customer Reviews</h2>
//           <div className={styles["reviews__header"]}>
//             <div className={styles["reviews__rating"]}>
//               <div className={styles["reviews__rating-number"]}>9.2/10</div>
//               <div className={styles["reviews__rating-text"]}>Excellent</div>
//               <div className={styles["reviews__verified"]}>
//                 287 <Link href="#" className={styles["reviews__verified-link"]}>verified reviews</Link>
//               </div>
//             </div>
//           </div>
//           <div className={styles["reviews__content"]}>
//             {[1, 2, 3].map((review) => (
//               <div key={review} className={styles["reviews__card"]}>
//                 <div className={styles["reviews__card-rating"]}>10/10 Excellent</div>
//                 <p className={styles["reviews__card-text"]}>
//                   Buffet spread is good Swimming pool is good Overall good property but they should work on providing more in house sports/ activities for kids.
//                 </p>
//                 <Link href="#" className={styles["reviews__card-link"]}>See more</Link>
//                 <div className={styles["reviews__card-author"]}>Sophia</div>
//                 <div className={styles["reviews__card-date"]}>May 7, 2024</div>
//               </div>
//             ))}
//           </div>
//           <div className={styles["reviews__footer"]}>
//             <Link href="#" className={styles["reviews__all-link"]}>See all 570 reviews</Link>
//           </div>
//         </div>
//       </section>

//       <Footer/>
//       {/* <footer className={styles["footer"]}>
//         <p className={styles["footer__text"]}>@2025 Vernost. All rights reserved. Privacy Policy | Terms & Conditions</p>
//       </footer> */}
//     </div>
//   );
// };

// export default HotelBooking;