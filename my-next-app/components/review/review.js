import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/review.module.css';

const ReviewPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles['header__logo']}>
          <Image src="/icons/Menu Container.svg" alt="Hotel banner" width={150} height={50} />
        </div>
        <div className={styles['header__user-dropdown']}>
          <select className={styles['user-dropdown__select']}>
            <option>Hello, Rajeev Rai</option>
            <option>My Profile</option>
            <option>Logout</option>
          </select>
        </div>
      </header>

      <div className={styles.booking}>
        <section>
          <div className={styles['booking-nav']}>
            <ul>
              <li>Home</li> |<li>Search</li> |<li>Details</li> |<li>Checklist</li>
            </ul>
          </div>
        </section>

        <div className={styles['booking__timer']}>
          <span className={styles['booking__timer-icon']}>
            <Image src="/icons/clock.svg" alt="Clock" width={20} height={20} />
          </span>
          <div className={styles['booking__timer-text']}>
            Please complete your transaction in <span className={styles['booking__timer-time']}>15:00</span> time else price and availability may vary.
          </div>
        </div>

        <div className={styles['booking__content']}>
          <div className={styles['booking__main']}>
            <section className={styles.review}>
              <div className={styles['review__header']}>
                <span><Image src="/icons/review-page/greaterthan.svg" alt="Greater Than" width={12} height={12} /></span>
                <h2 className={styles['review__title']}>Review your booking</h2>
              </div>
              <div className={styles['review__refund']}>
                Fully refundable before May 13 2024, 11:59pm <span className={styles['review__refund-time']}>(property local time)</span>
              </div>
              <div className={styles['review__hotel']}>
                <div className={styles.fix}>
                  <Image src="/images/review-page/Hotel image.svg" alt="Rixos Premium Dubai" className={styles['review__image']} width={250} height={266} />
                  <div className={styles['review__rating']}>
                    <div className={styles['review__score']}>8.0</div>
                    <div className={styles['review__rating-text']}>Excellent<br />4 Reviews</div>
                  </div>
                </div>
                <div className={styles['review__details']}>
                  <h3 className={styles['review__hotel-name']}>Rixos Premium Dubai</h3>
                  <div className={styles['review__stars']}>★★★★</div>
                  <div className={styles['review__address']}>East Crescent Road, Palm Jumeirah, P.O.B. 566737, Dubai</div>
                  <div className={styles['review__room-type']}>1 Room: Classic Room, 1 King Bed</div>
                  <div className={styles['review__view']}>(Chapultepec Park View)</div>
                  <div className={styles['review__features']}>
                    <div className={styles['review__feature']}>Free Cancellation till 24 Dec 2024, 02:00 hr</div>
                    <div className={styles['review__feature']}>Breakfast included</div>
                  </div>
                  <div className={styles['review__cancellation']}>Review cancellation</div>
                  <div className={styles['review__dates']}>
                    <div className={styles['review__date']}>Check-in: May 10 2024</div>
                    <div className={styles['review__date']}>Check-Out: May 13 2024</div>
                  </div>
                  <div className={styles['review__stay']}>3-Nights stay,</div>
                  <div className={styles['review__guests']}>2 Rooms, 5 Adults, 2 Childs (Age 2, 5)</div>
                  <div className={styles['review__room-specs']}>
                    <div className={styles['review__spec']}>📐 33 sq m</div>
                    <div className={styles['review__spec']}>🛏️ 3 King Beds and 1 Queen Sofa Bed</div>
                  </div>
                  <div className={styles['review__amenities']}>View Room Amenities</div>
                </div>
              </div>
            </section>

            <section className={styles['guest-details']}>
              <div className={styles['guest-details__header']}>
                <span><Image src="/icons/review-page/greaterthan.svg" alt="Greater Than" width={12} height={12} /></span>
                <h2 className={styles['guest-details__title']}>Who's checking in?</h2>
              </div>
              <div className={styles['guest-details__warning']}>
                <span className={styles['guest-details__warning-icon']}><Image src="/images/review-page/error.svg" alt="Error" width={16} height={16} /></span>
                <div className={styles['guest-details__warning-text']}>
                  To prevent boarding issues or extra fees, ensure that names match exactly with government-issued IDs.
                </div>
              </div>
              <div className={styles['guest-details__rooms']}>2/2 Rooms</div>
              {[1, 2].map((room) => (
                <div className={styles['guest-details__room']} key={room}>
                  <h3 className={styles['guest-details__room-title']}>Room {room}: 3 Adults, 1 Child</h3>
                  <div className={styles['guest-details__form']}>
                    <select className={styles['guest-details__select']}>
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                    </select>
                    <input type="text" className={styles['guest-details__input']} placeholder="First name *" defaultValue="John" />
                    <input type="text" className={styles['guest-details__input']} placeholder="Last name *" defaultValue="Doe" />
                  </div>
                  {room === 1 && (
                    <>
                      <div className={styles['guest-details__email-phone']}>
                        <input type="email" className={styles['guest-details__input']} placeholder="Enter email address *" />
                        <select className={styles['guest-details__phone-prefix']}>
                          <option>+91</option>
                        </select>
                        <input type="tel" className={styles['guest-details__input']} placeholder="Enter Mobile number *" />
                      </div>
                      <div className={styles['guest-details__pan']}>
                        <input type="text" className={styles['guest-details__input']} placeholder="PAN card number" />
                      </div>
                    </>
                  )}
                  <div className={styles['guest-details__checkbox']}>
                    <input type="checkbox" id={`save-details-${room}`} />
                    <label htmlFor={`save-details-${room}`} className={styles['guest-details__checkbox-label']}>Save adult details</label>
                  </div>
                </div>
              ))}

              <div className={styles['special-requests']}>
                <h3 className={styles['special-requests__title']}>Special Requests (Options)</h3>
                <div className={styles['special-requests__options']}>
                  {['Early Check In', 'Late Check-Out', 'Additional Bed', 'Anniversary / Birthday support'].map((text, i) => (
                    <div className={styles['special-requests__option']} key={i}>
                      <input type="checkbox" id={`option-${i}`} />
                      <label htmlFor={`option-${i}`} className={styles['special-requests__option-label']}>{text}</label>
                    </div>
                  ))}
                </div>
                <textarea className={styles['special-requests__textarea']} placeholder="Type your request here, we will share them with the property."></textarea>
                <div className={styles['special-requests__note']}>
                  <strong>*Please Note:</strong> All Special Requests are subject to availability.*
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button className={styles['special-requests__continue']}>Continue</button>
                </div>
              </div>
            </section>

            <section className={styles['important-info']}>
              <div className={styles['important-info__header']}>
                <span><Image src="/icons/review-page/greaterthan.svg" alt="Greater Than" width={12} height={12} /></span>
                <h2 className={styles['important-info__title']}>Important information</h2>
              </div>
              <div className={styles['important-info__text']}>
                An adult over the age of 18 must take responsibility for the booking.<br />
                Guests will be greeted by the front desk staff upon arrival.
              </div>
              <div className={styles['important-info__times']}>
                <div className={styles['important-info__time']}>
                  <div className={styles['important-info__time-label']}>Check-in:</div>
                  <div className={styles['important-info__time-value']}>May 10 2024 | 4:00 PM</div>
                </div>
                <div className={styles['important-info__time']}>
                  <div className={styles['important-info__time-label']}>Check-out:</div>
                  <div className={styles['important-info__time-value']}>May 13 2024 | 11:00 AM</div>
                </div>
              </div>
              <div className={styles['important-info__duration']}>(3-nights stay)</div>
            </section>
          </div>

          <div className={styles['booking__sidebar']}>
            <section className={styles['price-summary']}>
              <h2 className={styles['price-summary__title']}>Price summary</h2>
              <div className={styles['price-summary__item']}>
                <div className={styles['price-summary__label']}>Base Fare</div>
                <div className={styles['price-summary__value']}>₹ 8000</div>
              </div>
              <div className={styles['price-summary__item']}>
                <div className={styles['price-summary__label']}>Taxes & fees</div>
                <div className={styles['price-summary__value']}>₹ 750</div>
              </div>
              <div className={styles['price-summary__item']}>
                <div className={styles['price-summary__label']}>Local Taxes (if applicable)</div>
                <div className={styles['price-summary__value']}>₹ 00</div>
              </div>
              <div className={`${styles['price-summary__item']} ${styles['price-summary__total']}`}>
                <div className={styles['price-summary__label']}>Total amount</div>
                <div className={styles['price-summary__value']}>₹ 8750</div>
              </div>
              <div className={styles['price-summary__note']}>Rates are quoted in ₹</div>
              <div className={styles['price-summary__tax-notice']}>
                This property will collect any additional mandatory tax at check-in or check out
              </div>
              <div className={styles['price-summary__terms']}>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms" className={styles['price-summary__terms-text']}>
                  By clicking you acknowledge that you have read and agreed to the
                  <Link href="#" className={styles['price-summary__terms-link']}> Terms & Conditions </Link>
                  and
                  <Link href="#" className={styles['price-summary__terms-link']}> Privacy Policy</Link>
                </label>
              </div>
              <Link href="../booking/booking.html">
                <button className={styles['price-summary__book']}>Book</button>
              </Link>
              <section className={styles.assistance}>
                <h3 className={styles['assistance__title']}>Need Assistance ?</h3>
                <div className={styles['assistance__contact']}>info@vernost.com</div>
                <div className={styles['assistance__phone']}>9999999998</div>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
