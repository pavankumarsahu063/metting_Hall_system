import React, { useContext, useEffect, useState } from "react";
import "../styles/DisplayHalls.css";
import UserContext from "../context/UserContext";
import NotificationContext from "../context/NotificationContext";
import { toast } from "react-toastify";


function DisplayAllHalls() {


  const { user } = useContext(UserContext);
 
  const [data, setData] = useState([]);
  const [bookingPopUp, setBookingPopUp] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);
  const [filterdHalls,setFilterdHalls]=useState([]);
  



  const [bookingDetails, setBookingDetails] = useState({
    bookingdate: "",
    startTime: "",
    endTime: "",
    status: "PENDING",
  });

  const fetchData = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(
      "http://localhost:8080/meettinghall/allhalls",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const allMeetingHalls = await response.json();
    setData(allMeetingHalls);
    setFilterdHalls(allMeetingHalls);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectedHall = (hall) => {
    setSelectedHall(hall);
    setBookingPopUp(true);

    setBookingDetails({
      bookingdate: "",
      startTime: "",
      endTime: "",
      status: "PENDING",
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      bookingdate: bookingDetails.bookingdate,
      startTime: bookingDetails.startTime,
      endTime: bookingDetails.endTime,
      status: bookingDetails.status,
      user: {
        id: user.id,
      },
      meetingHalls: {
        id: selectedHall.id,
      },
    };

    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch("http://localhost:8080/bookings/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        console.log("Booked Successfully");
       
        setBookingPopUp(false);

        toast.success("Booked Sucessfully")
        
      } else {
        const errorText = await response.text();
       
        setBookingPopUp(false);
        toast.error(errorText);
        console.error("Booking failed:", errorText);
      }
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error("Something Went Wrong");
    }
  };

  //Seaarch Functionality :

  const handelSearchOnChange=(e)=>{
      const searchKey=e.target.value;
      console.log(searchKey);

      const filterdData=data.filter(hall=>(
        hall.name.toLowerCase().includes(searchKey) || 
        hall.capacity.toString().includes(searchKey.toString())
      ));

      setFilterdHalls(filterdData);
  }



  return (
    <>
      <div className="allhall-search-bar">
        <input type="text" placeholder="Enter Capacity or name" name="searchkey" onChange={handelSearchOnChange} />
      </div>
      <div className="all-halls">
        { filterdHalls && filterdHalls.length>0 ?( filterdHalls.map((hall) => (
          <div className="hall" key={hall.id}>
            <h2>{hall.name}</h2>
            <h3>Capacity: {hall.capacity}</h3>
            <h4>Location: {hall.location}</h4>
            <p>{hall.description}</p>
            <button onClick={() => handleSelectedHall(hall)}>
              Book Now
            </button>
           
          </div>
        ))) : <h1 className="no-found">No Data Found</h1>}

        {bookingPopUp && selectedHall && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Book Hall: {selectedHall.name}</h2>
              <form onSubmit={handleOnSubmit}>
                <label>Date:</label>
                <input
                  type="date"
                  name="bookingdate"
                  value={bookingDetails.bookingdate}
                  onChange={handleOnChange}
                  required
                />

                <label>Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={bookingDetails.startTime}
                  onChange={handleOnChange}
                  required
                />

                <label>End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={bookingDetails.endTime}
                  onChange={handleOnChange}
                  required
                />

                <button type="submit">Confirm Booking</button>
              </form>
              <button onClick={() => setBookingPopUp(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DisplayAllHalls;
