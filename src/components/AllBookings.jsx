import React, { useEffect, useState } from "react";
import '../styles/AllBookings.css';

function AllBookings() {
  const [bookingsData, setBookingsData] = useState([]);
  const [filteredData,setFilteredData]=useState('');
  const [searchKey, setSearchKey] = useState('');



  const fetchBookingsData = async () => {
    try {
      const jwtToken = localStorage.getItem("adminJwt");
      const response = await fetch("http://localhost:8080/bookings/getallbookings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      setBookingsData(data);
      setFilteredData(bookingsData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBookingsData();
  }, []);

useEffect(()=>{
  
    const filterData = bookingsData.filter((ele) => {
      return (
        ele.bookingId.toString().includes(searchKey.toLowerCase()) ||
        ele.booking?.status.toLowerCase().includes(searchKey.toLowerCase()) ||
        ele.meetingHalls?.capacity.toString().includes(searchKey) ||
        ele.user?.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        ele.user?.mobile.includes(searchKey)
      );
    });
    console.log(filterData)
    setFilteredData(filterData); 

},[searchKey,bookingsData])


const handelSearch=(e)=>{
  setSearchKey(e.target.value);
}
const handelDateChange=(e)=>{
  console.log()
  const query=e.target.value;
  const filteredDate=bookingsData.filter((hall)=>(
    hall.bookingdate===query
  ))
  setFilteredData(filteredDate)
}

const handelSelectOnChange=(e)=>{
  const query=e.target.value;
  console.log()

if(query==='ALL'){
  setFilteredData(bookingsData);
  return;
}
  const selectedHallByStatus=bookingsData.filter((hall) => 
    hall.status === query
  );
  setFilteredData(selectedHallByStatus)


  
  console.log("Filter data")
  
  console.log(filteredData)
}

  return (
    <>
      <div className="all-booking-search">
       
        <input
          type="text"
          placeholder="Enter Username or email or hallname"
          name="searchKey"
          value={searchKey}
          onChange={handelSearch}
        />
        <input type="date" onChange={handelDateChange}/>
        <select onChange={handelSelectOnChange}>
          <option value="ALL">ALL</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="BOOKED">Booked</option>
        </select>
      </div>
      <div className="bookings-container">
        {filteredData.length > 0 ? (
          filteredData.map((booking) => (
            <div key={booking.bookingId} className="booking-card">
              <h3>Booking Details</h3>
              <p><strong>Booking Date </strong>{booking.bookingdate}</p>
              <p><strong>Time:</strong> {booking.startTime} to {booking.endTime}</p>
              <p><strong>Status: </strong>{booking.status}</p>
              <p><strong>Location </strong>{booking.meetingHalls.location}</p>
              <p><strong>Capacity</strong>{booking.meetingHalls.capacity}</p>
              <p><strong>User Name:</strong> {booking.user?.name}</p>
              <p><strong>User Email:</strong> {booking.user?.email}</p>
              <p><strong>Mobile:</strong> {booking.user?.mobile}</p>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </>
  );
}

export default AllBookings;
