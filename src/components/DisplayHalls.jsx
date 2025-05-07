import React, { useEffect, useState } from 'react'


function DisplayHalls() {
    const [allHalls,setAllHalls]=useState(null);


   const fetchData= async ()=>{
    const response=await fetch("http://localhost:8080/meettinghall/allhalls");
    const data=await response.json();

    console.log(data)
    setAllHalls(data)
   }

   useEffect(()=>{
    fetchData()
   },[])
  return (
   <div className='all-halls'>
{
     allHalls && (
        allHalls.map((hall)=>(

            <div className="hall" key={hall.id}>
            <h2>{hall.name}</h2>
            <h3>Capacity: {hall.capacity}</h3>
            <h4>Location: {hall.location}</h4>
            <p>{hall.description}</p>
            <button> Delete Hall  </button>
             
          
          </div>
        ))
     )
}

   </div>
  )
}

export default DisplayHalls