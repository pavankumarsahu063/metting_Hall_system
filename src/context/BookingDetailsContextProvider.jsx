import React, { useEffect, useState } from 'react'
import BookingDetailsContext from './BookingDetailsContext';

function BookingDetailsContextProvider({childern}) {
    const [bookingData,setBookingData]=useState(null);


    const fetchBookingData=async ()=>{
        //const token=localStorage.getItem("jtwToken");
      const response=await fetch("http://localhost:8080/bookings/getallbookings",{
        method:"GET",
        // headers:{
        //     "Authorization":`Bearer ${token}`
        // }
      });
      const data=await response.json();
      setBookingData(data)

    }

    useEffect(()=>{
      fetchBookingData()
    },[])
  return (
   <BookingDetailsContext.Provider value={{bookingData,setBookingData}}>
   {childern}
   </BookingDetailsContext.Provider>
  )
}

export default BookingDetailsContextProvider