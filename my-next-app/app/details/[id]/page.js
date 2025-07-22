"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import HotelBooking from "@/components/details/hotelDetails";
import { useParams } from 'next/navigation';
import { fetchHotelDetails } from "@/lib/hotel";

export default function SrpPage() {

    const { id } = useParams();
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        if (id) {
            fetchHotelDetails(id).then(setHotel);
        }
    }, [id]);

    if (!hotel) return <div>Loading hotel details...</div>;


    return (
        <>
            <HotelBooking hotel={hotel} />
        </>
    );
}