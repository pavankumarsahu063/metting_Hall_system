import React, { useContext, useEffect } from 'react'
import NotificationContext from '../context/NotificationContext'

function Notifications() {
  const {reset}=useContext(NotificationContext);
  return (
    <>
   {
    useEffect(
     ()=>{
      reset()
     }
   ,[reset] )
   }
    
    </>
  )
}

export default Notifications