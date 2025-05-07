import React, { useState } from 'react'
import NotificationContext from './NotificationContext'
function NotificationContextProvider({children}) {
    const[ count,setCount]=useState(0);

    const incresCount=()=>{
      setCount(prev=>prev+1);
    }

    const decresCount=()=>{
      setCount(prev=>prev-1)
    }

    const reset=()=>{
      setCount(0);
    }
  return (
    <NotificationContext.Provider value={{count,incresCount,decresCount,reset}}>
        {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider