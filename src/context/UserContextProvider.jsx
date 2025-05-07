import React, { useEffect, useState } from 'react'
import UserContext from './UserContext';

function UserContextProvider({children}) {


    const [user, setUser] = useState(null);
  
    const getUser = async () => {
      try {
        const token=localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/user/getuser",{
          method:"GET",
          headers:{
             'Authorization': `Bearer ${token}`
          }
        });
        const data=await response.json();
  
        console.log(data)
       setUser(data)
       
      
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    };
  
    useEffect(() => {
      getUser();
     
    }, []);
//   console.log()
  return (
   <UserContext.Provider value={{user,setUser}}>
    {children}
   </UserContext.Provider>
  )
}

export default UserContextProvider