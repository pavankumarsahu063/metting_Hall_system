import React, { useEffect, useState } from "react";
import "../styles/DisplayHalls.css";
import { toast } from "react-toastify";

function DisplayAllHallss() {
  const [allHalls, setAllHalls] = useState(null);

  const fetchAllHalls = async () => {
    try {
      const token = localStorage.getItem("adminJwt");
      const response = await fetch(
        "http://localhost:8080/meettinghall/allhalls",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setAllHalls(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllHalls();
  }, []);

  const handelOnClick = async (hall) => {
    try {
      const token = localStorage.getItem("adminJwt");
      const response = await fetch(
        "http://localhost:8080/meettinghall/delete-hall",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hall),
        }
      );
      const data = await response.text();
      if (response.ok) {
        toast.success(data);
        setAllHalls((prev) => prev.filter((h) => h.id != hall.id));
      } else {
        toast.error("Something Went Wrong.Try Again",{theme:"dark"});
      }
    } catch (e) {
      console.log(e);
      toast.error("Someting Wrong.Try Again");
    }
  };
  return (
    <div>
      <div className="all-halls">
        {
          // console.log(allHalls)
          allHalls && allHalls.length > 0 ? (
            allHalls.map((hall) => (
              <div className="hall" key={hall.id}>
                <h2>{hall.name}</h2>
                <h3>Capacity: {hall.capacity}</h3>
                <h4>Location: {hall.location}</h4>
                <p>{hall.description}</p>
                <button onClick={() => handelOnClick(hall)}> Remove </button>
              </div>
            ))
          ) : (
            <p>No Hall found</p>
          )
        }
      </div>
    </div>
  );
}

export default DisplayAllHallss;
