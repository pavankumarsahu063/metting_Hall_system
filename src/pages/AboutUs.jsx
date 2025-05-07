import React from 'react';
import '../styles/AboutUs.css'; 
import NavBar from '../components/NavBar';

function AboutUs() {
  return (
    <>
    <NavBar/>
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to the Company Hall Booking System — a platform developed to simplify how our employees reserve internal meeting rooms, conference halls, and collaboration spaces.
      </p>
      <p>
        Our mission is to streamline the scheduling process, reduce booking conflicts, and empower teams to focus on what truly matters: productive meetings and seamless collaboration.
      </p>
      <p>
        Designed exclusively for internal use, this system ensures:
      </p>
      <ul>
        <li> Real-time room availability</li>
        <li> Secure, role-based access</li>
        <li> Calendar integration for scheduling ease</li>
        <li> Quick and intuitive room bookings</li>
      </ul>
      <p>
        Built with reliability and ease-of-use in mind, our system is part of the company's ongoing digital transformation to foster smarter work environments.
      </p>
      <p>
        If you have suggestions or face any issues, feel free to reach out to our IT support team.
      </p>
    </div>
    </>

  );
}

export default AboutUs;
