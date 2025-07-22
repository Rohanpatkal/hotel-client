"use client";

import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/globals.css';

export default function DateSelector({ startDate, endDate, setStartDate, setEndDate }) {
  const searchParams = useSearchParams();

  // Read query params on first load (e.g., in SRP page)
  useEffect(() => {
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (start && end) {
      const s = new Date(start);
      const e = new Date(end);
      if (!isNaN(s) && !isNaN(e)) {
        setStartDate(s);
        setEndDate(e);
      }
    }
  }, []);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="explore-check-in-out">
      <Image src="/icons/calendar.svg" alt="calendar" width={20} height={20} />
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        isClearable
        monthsShown={2}
        placeholderText="Select Check-In - Check-Out"
        dateFormat="dd/MM/yyyy"
        customInput={
          <input
            type="text"
            value={
              startDate && endDate
                ? `${format(startDate, 'dd/MM/yyyy')} - ${format(endDate, 'dd/MM/yyyy')}`
                : ''
            }
            readOnly
            placeholder="Select Check-In - Check-Out"
            className="custom-input"
          />
        }
      />
    </div>
  );
}
