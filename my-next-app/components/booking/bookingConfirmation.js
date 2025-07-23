import React from 'react';
import '../../styles/booking.module.css';
import '../../styles/global.css';

const BookingConfirmation = () => {
  return (
    <>
        {/* Header */}
        <header className="header">
          <div className="header__logo">
            <img src="../../icons/Menu Container.svg" alt="Hotel banner" />
          </div>
          <div className="header__user-dropdown">
            <select className="user-dropdown__select">
              <option>Hello, Rajeev Rai</option>
              <option>My Profile</option>
              <option>Logout</option>
            </select>
          </div>
        </header>
        <header className="header">
          <div className="container">
            <div className="breadcrumb">Home | Booking Confirmed</div>
          </div>
        </header>
        {/* Main Content */}
        <main className="main">
          <div className="container">
            <div className="content-grid">
              {/* Left Column */}
              <div className="main-content">
                {/* Booking Confirmed */}
                <div className="card">
                  <div className="booking-confirmed">
                    <div className="header-content">
                      <h1 className="page-title">Hotel booking details</h1>
                      <div className="action-buttons">
                        <button className="btn btn-outline">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <polyline points="6,9 6,2 18,2 18,9" />
                            <path d="M6,18H4a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2H20a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H18"></path>
                            <rect x={6} y={14} width={12} height={8} />
                          </svg>
                          Print
                        </button>
                        <button className="btn btn-outline">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7,10 12,15 17,10" />
                            <line x1={12} y1={15} x2={12} y2={3} />
                          </svg>
                          Download
                        </button>
                        <button className="btn btn-outline">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                          Email
                        </button>
                      </div>
                    </div>
                    <div className="success-header">
                      <svg
                        className="check-icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22,4 12,14.01 9,11.01" />
                      </svg>
                      <h2>Booking Confirmed!</h2>
                    </div>
                    <p className="voucher-text">
                      Your voucher will be sent to you via email and SMS shortly.
                    </p>
                    <div className="booking-details">
                      <div className="detail-item">
                        <div className="detail-label">Booking ID</div>
                        <div className="detail-value">NFYNRMEMGLHRS31117</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Confirmation ID</div>
                        <div className="detail-value">ABCDLHRS31117</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Booking Date</div>
                        <div className="detail-value">May 28 2024</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hotel Details */}
                <div className="card">
                  <h3 className="section-title">Hotel Details</h3>
                  <div className="hotel-info">
                    <h4 className="hotel-name">The Taj hotel dubai</h4>
                    <div className="star-rating">
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                    </div>
                    <p className="hotel-address">
                      East Crescent Road, Palm Jumeirah, P.O.B. 566737, Dubai
                    </p>
                  </div>
                  <div className="checkin-checkout">
                    <div className="checkin">
                      <div className="date-label">Check - In</div>
                      <div className="date-value">May 10</div>
                      <div className="year">2024</div>
                      <div className="time">3:00 PM</div>
                    </div>
                    <div className="nights-indicator">
                      <div className="nights-text">3 nights</div>
                      <div className="timeline">
                        <div className="timeline-line" />
                        <div className="timeline-dot start" />
                        <div className="timeline-dot end" />
                      </div>
                    </div>
                    <div className="checkout">
                      <div className="date-label">Check - Out</div>
                      <div className="date-value">May 13</div>
                      <div className="year">2024</div>
                      <div className="time">11:00 AM</div>
                    </div>
                  </div>
                  <div className="room-guest-info">
                    <div className="room-info">
                      <div className="info-label">Room &amp; Guest</div>
                      <div className="info-value">
                        Classic Room, 1 King Bed x 2 Rooms,
                      </div>
                    </div>
                    <div className="guest-count">
                      <div className="info-value">4 Guests</div>
                    </div>
                  </div>
                  <div className="refundable-badge">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22,4 12,14.01 9,11.01" />
                    </svg>
                    Refundable
                  </div>
                </div>
                {/* Apartment Details */}
                <div className="card">
                  <h3 className="section-title">Apartment, 3 Bedrooms, City View</h3>
                  <div className="amenities-list">
                    <div className="amenity-item">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                        <line x1={12} y1={20} x2="12.01" y2={20} />
                      </svg>
                      Free WiFi
                    </div>
                    <div className="amenity-item">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx={9} cy={7} r={4} />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Sleeps 3
                    </div>
                    <div className="amenity-item">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                      </svg>
                      33 sq m
                    </div>
                    <div className="amenity-item">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M2 4v16" />
                        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                        <path d="M2 17h20" />
                        <path d="M6 8v9" />
                      </svg>
                      1 King Bed
                    </div>
                  </div>
                  <button className="view-all-btn">View All</button>
                </div>
                {/* Cancellation Policy */}
                <div className="card">
                  <h3 className="section-title">Cancellation Policy</h3>
                  <div className="cancellation-content">
                    <div className="policy-header">
                      <div className="policy-label">Cancellation Policy</div>
                      <div className="refund-label">Refund:</div>
                    </div>
                    <div className="refund-timeline">
                      <div className="refund-amounts">
                        <span className="amount">₹ 500</span>
                        <span className="amount">₹ 800</span>
                        <span className="amount">₹ 1,000</span>
                        <span className="amount">₹ 0</span>
                      </div>
                      <div className="timeline-container">
                        <div className="timeline-track" />
                        <div className="timeline-progress" />
                        <div className="timeline-point" style={{ left: "0%" }} />
                        <div className="timeline-point" style={{ left: "33%" }} />
                        <div className="timeline-point" style={{ left: "66%" }} />
                        <div className="timeline-point" style={{ left: "100%" }} />
                      </div>
                      <div className="timeline-dates">
                        <div className="date-item">
                          <div className="date">Now</div>
                        </div>
                        <div className="date-item">
                          <div className="date">May 24 2024</div>
                          <div className="hours">24 hrs</div>
                        </div>
                        <div className="date-item">
                          <div className="date">May 26 2024</div>
                          <div className="hours">48 hrs</div>
                        </div>
                        <div className="date-item">
                          <div className="date">May 28 2024</div>
                          <div className="hours">72 hrs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Guest Details */}
                <div className="card">
                  <h3 className="section-title">Guest Details</h3>
                  <div className="guest-rooms">
                    <div className="guest-room">
                      <div className="room-label">Room 1</div>
                      <div className="guest-name">Ms. Manish Rai</div>
                      <div className="guest-info">
                        <div className="guest-label">Guest(s)</div>
                        <div className="guest-count">Adults: 2</div>
                      </div>
                    </div>
                    <div className="guest-room">
                      <div className="room-label">Room 2</div>
                      <div className="guest-name">Mr. Mahesh Khare</div>
                      <div className="guest-info">
                        <div className="guest-label">Guest(s)</div>
                        <div className="guest-count">Adults: 2</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Contact Details */}
                <div className="card">
                  <h3 className="section-title">Contact Details</h3>
                  <div className="contact-info">
                    <div className="contact-item">
                      <div className="contact-label">Email Id.</div>
                      <div className="contact-value">johnsmith@gmail.com</div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-label">Mobile No.</div>
                      <div className="contact-value">9988776655</div>
                    </div>
                  </div>
                </div>
                {/* Additional Information */}
                <div className="card">
                  <h3 className="section-title">Additional Information</h3>
                  <div className="info-list">
                    <div className="info-item">
                      <div className="bullet" />
                      <p>
                        According to government regulations, a valid Photo ID has to
                        be carried by every person above the age of 18 staying at the
                        hotel. The identification proofs accepted are Drivers License,
                        Voters Card, Passport, Ration Card. Without valid ID the guest
                        will not be allowed to check in.
                      </p>
                    </div>
                    <div className="info-item">
                      <div className="bullet" />
                      <p>Children accompanying adults must be between 1-12 years.</p>
                    </div>
                  </div>
                </div>
                {/* Rules and Penalties */}
                <div className="card">
                  <h3 className="section-title">Rules and Penalties</h3>
                  <div className="info-list">
                    <div className="info-item">
                      <div className="bullet" />
                      <p>Lorem ipsum dummy text lorem ipsum dummylo</p>
                    </div>
                    <div className="info-item">
                      <div className="bullet" />
                      <p>Lorem ipsum dummy text lorem ipsum dummylo</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Sidebar */}
              <div className="sidebar">
                <div className="card price-summary">
                  <h3 className="section-title">Price summary</h3>
                  <div className="price-items">
                    <div className="price-item">
                      <span className="price-label">Base Fare</span>
                      <span className="price-value">₹ 8000</span>
                    </div>
                    <div className="price-item">
                      <div className="price-label-with-icon">
                        <span>Taxes &amp; fees</span>
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <circle cx={12} cy={12} r={10} />
                          <path d="M9,9h0a3,3,0,0,1,3-3h0a3,3,0,0,1,3,3v1a3,3,0,0,1-3,3h0" />
                          <line x1={12} y1={17} x2="12.01" y2={17} />
                        </svg>
                      </div>
                      <span className="price-value">₹ 750</span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Local Taxes (if applicable)</span>
                      <span className="price-value">₹ 00</span>
                    </div>
                  </div>
                  <div className="price-divider" />
                  <div className="total-amount">
                    <span className="total-label">Total amount</span>
                    <span className="total-value">₹ 8750</span>
                  </div>
                  <p className="payment-note">Guests are required to pay ₹</p>
                  <div className="tax-notice">
                    <p>
                      This property will collect any additional mandatory tax at
                      check-in or check out
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p>
              ©2025 Vernost. All rights reserved. Privacy Policy | Terms &amp;
              Conditions
            </p>
          </div>
        </footer>
    </>
  );
};

export default BookingConfirmation;
