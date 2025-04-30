import { createContext, useState } from "react";
import React from 'react'



export const isListening=createContext<any>(false)


const SpeechContext = ({childern}:any) => {
    const [voice,setVoice]=useState(false)
  return (
    <isListening.Provider value={{voice,setVoice}}>
        {childern}
    </isListening.Provider>
  )
}

export default SpeechContext
