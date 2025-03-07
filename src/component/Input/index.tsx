'use client'
import React, { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, ReactEventHandler, useEffect, useState } from 'react'
interface typeType{
    type : string,
    onChange : ReactEventHandler,
    value : HTMLInputTypeAttribute,
    placeHolder : string,
    autoComplete : HTMLInputAutoCompleteAttribute
}
export default function Input({autoComplete,type,onChange,value,placeHolder}:typeType) {
 const [width,setWidth] = useState<number>(0)
 
   useEffect(()=>{
     const setWindow = ()=>setWidth(window.innerWidth)
 
     window.addEventListener("resize",setWindow)
 
     return ()=>{
         window.removeEventListener("resize",setWindow)
     }
   },[])
   
    return (
    <>
        <input autoComplete={autoComplete} type={type} placeholder={placeHolder} className={`bg-gray-800 text-white rounded-md ${width < 800 ? "p-2 min-w-full w-28 text-sm" : "p-1 max-w-5xl text-sm"} m-2 border-b-2`} value={value} onChange={onChange}/>
    </>
  )
}
