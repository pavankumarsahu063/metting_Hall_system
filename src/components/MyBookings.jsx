import React, { useEffect, useState } from "react";
import "../styles/MyBookingCss.css";
import { toast } from "react-toastify";

function MyBookings() {
  const [myBookingDetails, setMyBookingDetails] = useState(null);
  const [filterdata,setFilterData]=useState([]);

  const fetchBookingDetails = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        "http://localhost:8080/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Failed To Fetch Details. Please Try Again");
        return;
      }

      const data = await response.json();
      setMyBookingDetails(data);
      setFilterData(data);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const cancelBookingRequest = async (booking) => {
    try {
      console.log(booking);
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(
        "http://localhost:8080/bookings/cancel-booking",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(booking),
        }
      );

      if (response.ok) {
        console.log("Booking cancelled");
        toast.success("Booking Cancelled");
        await fetchBookingDetails();
      } else {
        toast.error("Something Went Wrong");
        console.log("Something went wrong");
      }
    } catch (e) {
      console.log("Error:", e);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const searchOnChange=(e)=>{
      const query=e.target.value;

      console.log(query)
      console.log(myBookingDetails)

      const filterBookedHalls=myBookingDetails.filter((hall)=>
    
        hall.meetingHalls.name.toLowerCase().includes(query.toLowerCase())  ||  
        hall.meetingHalls.capacity.toString().includes(query.toString())  ||
        hall.meetingHalls.location.toLowerCase().includes(query.toLowerCase())

      );
      setFilterData(filterBookedHalls)
  }

  const handelDateClick = (e) => {
    const query = e.target.value;  
    console.log(query);
    const filterByDate = myBookingDetails.filter((hall) => {
      return hall.bookingdate === query || query === ""; 
    });
  
    setFilterData(filterByDate); 
    console.log(filterByDate);
  };

  const handelSelectChange=(e)=>{
    const query=e.target.value;
    console.log(query)
    if(query==='CANCELLED'){
    const filterBySelect=myBookingDetails.filter((hall)=>(
      hall.status==='CANCELLED'
    ));
    setFilterData(filterBySelect);
    }
    else{
      const filterBySelect=myBookingDetails.filter((hall)=>(
        hall.status==="BOOKED"
      ));
      setFilterData(filterBySelect);
    }

    // console.log(filterdata)
  }


  


  if (myBookingDetails === null) {
    return <h1>Loading.....</h1>;
  }

  return (
    <>
      <div className="top-nav-bar">
        <input type="text" placeholder="Search ... " onChange={searchOnChange}/>
        <input type="date" placeholder="Date" onChange={handelDateClick}/>

        <select onChange={handelSelectChange}>
          <option value="">All Status</option>
          
          <option value="CANCELLED">Cancelled</option>
          <option value="BOOKED">Booked</option>
        </select>
      </div>
      <div className="my-booking-container">
        {filterdata.length === 0
          ? "No Booking Yet"
          : filterdata.map((ele) => (
              <div className="my-bookings" key={ele.bookingId}>
                <h4>Booking Details</h4>
                <p>
                  <strong>Name:</strong> {ele.meetingHalls.name}
                </p>
                <p>
                  <strong>Location:</strong> {ele.meetingHalls.location}
                </p>
                <p>
                  <strong>Date:</strong> {ele.bookingdate}
                </p>
                <p>
                  <strong>Time:</strong> {ele.startTime} - {ele.endTime}
                </p>
                <p>
                  <strong>Capacity:</strong> {ele.meetingHalls.capacity}
                </p>
                <p>
                  <strong>Description:</strong> {ele.meetingHalls.description}
                </p>

                {ele.status !== "CANCELLED" ? (
                  <button onClick={() => cancelBookingRequest(ele)}>
                    Cancel Booking
                  </button>
                ) : (
                  <button>Canceled</button>
                )}
                {/* <button onClick={()=>handelEdit(ele)}>Edit</button> */}
              </div>
            ))}
      </div>
    </>
  );
}

export default MyBookings;
