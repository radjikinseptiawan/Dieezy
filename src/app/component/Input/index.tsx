'use client'
import React, { ReactEventHandler, useEffect, useState } from 'react'
interface typeType{
    type : string,
    onChange : ReactEventHandler,
    value : string,
    placeHolder : string
}
export default function Input({type,onChange,value,placeHolder}:typeType) {
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
        <input type={type} placeholder={placeHolder} className={`bg-gray-800 rounded-md ${width < 800 ? "p-1 min-w-full w-28 text-sm" : "p-2 max-w-5xl text-sm"} m-2 border-b-2`} value={value} onChange={onChange}/>
    </>
  )
}
