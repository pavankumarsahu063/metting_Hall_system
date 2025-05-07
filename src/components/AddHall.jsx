import React, { useState } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddHall() {
  const [halldata, setHallData] = useState({
    name: "",
    location: "",
    capacity: "",
    description: ""
  });



  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setHallData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminJwt");

    const response = await fetch("http://localhost:8080/meettinghall/addhall", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify(halldata)
    });

    const data = await response.text();

    if (response.ok) {
      toast.success(data);
     
      setHallData({
        name: "",
        location: "",
        capacity: "",
        description: ""
      });
    } else {
      toast.error("Failed to add hall");
    
    }
  };

  return (
    <div className="add-form">
      <h4 style={{color:"brown",fontWeight:"900"}}>Add Hall</h4>
      <form onSubmit={handelOnSubmit}>
        <input type="text" placeholder='Enter Hallname' name='name' value={halldata.name} onChange={handelOnChange} required />
        <input type="text" placeholder='Enter Location' name='location' value={halldata.location} onChange={handelOnChange} required />
        <input type="text" placeholder='Enter Capacity' name='capacity' value={halldata.capacity} onChange={handelOnChange} required />
        <input type="text" placeholder='Description About Hall' name='description' value={halldata.description} onChange={handelOnChange} required />
        <button type='submit'>Add</button>
      
      </form>


    </div>
  );
}

export default AddHall;
