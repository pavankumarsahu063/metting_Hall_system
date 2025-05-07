import React, { useState } from 'react'
import TheamContext from './TheamContext';

function TheamContextProvider({childern}) {
    const {theam,setTheam}=useState(false);

    
  return (
   <TheamContext.Provider value={{theam,setTheam}}>
   {childern}
   
   </TheamContext.Provider>
  )
}

export default TheamContextProvider;