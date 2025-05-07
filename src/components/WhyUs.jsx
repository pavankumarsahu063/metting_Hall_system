import React from 'react'
import '../styles/whyus.css'
function WhyUs() {
  return (

    <>


    <div className="heading">
        <h1>Why Use Our System</h1>
    </div>
    
    <div className="why-us-container">
        <div className="why-us">
            <h1>Seamless Booking Experience</h1>
            <p>Our intuitive platform allows employees to book meeting rooms and halls in just a few clicks — no emails, no back-and-forth.</p>
        </div>
        <div className="why-us">
            <h1> Real-Time Availability</h1>
            <p>Check room availability instantly and avoid scheduling conflicts with real-time updates and calendar integration.</p>
        </div>
        <div className="why-us">
            <h1>Time & Resource Efficient</h1>
            <p>Reduces time wasted in manual coordination and improves utilization of available spaces.</p>
        </div>
        <div className="why-us">
            <h1> Designed for Your Workplace</h1>
            <p>Built specifically for internal use, the system is customized to match your company's structure, room capacity, and policies.</p>
        </div>
    </div>

    </>
  )
}

export default WhyUs