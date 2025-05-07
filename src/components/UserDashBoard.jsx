import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/DashBoard.css';
 import Profile from './Profile';
// import DisplayAllHalls from './DisplayAllHalls';
import UserContext from '../context/UserContext';
import DisplayAllHalls from './DisplayAllHalls';
import MyBookings from './MyBookings';
import Settings from './Settings';
import Notification from './Notifications'
import NotificationContext from '../context/NotificationContext';
import TheamContext from '../context/TheamContext';


function UserDashboard() {
  const { user } = useContext(UserContext);
  // const {theam,setTheam} =useContext(TheamContext);
 
  const navigator=useNavigate();
  const [activeSection,setActiveSection]=useState('AllHalls');

  
  useEffect(()=>{
      if(localStorage.getItem("jwtToken")==null){
      navigator("/")}
    },[])
    


 const currentPage=()=>{

  switch(activeSection){
    case 'Profile':
      return <Profile/>;
    case 'mybookings' :
      return <MyBookings/>;
    case 'settings':
   return <Settings/>
   case 'notifications':
    
    return <Notification/>
    default :
     return <DisplayAllHalls/>;
  }

 }
  
  const handelLogOut=()=>{

    localStorage.removeItem("jwtToken");
    navigator("/")

  }


  // if (!user) {
  //   return <div>Loading...</div>; 
  // }

  return (
    <div className="dashboard-wrapper" >
      <aside className="sidebar">
        <div className="heading">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="img"
          />
          <h3>{user?.name}</h3>
        </div>
        <div className="nav-bar">
          <button className={activeSection==='AllHalls' ? 'active':''} onClick={()=>{setActiveSection('AllHalls')}}>All Halls</button>
          <button onClick={()=>{setActiveSection('Profile')}}>Profile</button>
          <button className={activeSection==='mybookings'? 'active' : ''} onClick={()=>{setActiveSection('mybookings')}}>My Bookings</button>
         
          <button onClick={handelLogOut}>Logout</button>
        </div>
      </aside>

      <main className="main-content">

       
        {
          currentPage()
        }

       
      </main>
    </div>
  );
}

export default UserDashboard;
