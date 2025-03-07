"use client"
import React, {  ReactNode, useEffect, useState } from 'react'
interface buttonType{
    text : ReactNode,
    set : "reset" | "submit" | "button"
}
export default function Button1({text,set} : buttonType) {
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
    <button className={`
    border 
    border-2
    p-1 
    border-b-indigo-400 
    border-t-indigo-300 
    border-r-indigo-400 
    border-l-indigo-300 
    text-white
    rounded-xl 
    font-medium 
    hover : bg-gradient-to-b
    hover : from-indigo-500 hover:to-indigo-400
    hover:text-white 
    hover:cursor-pointer
    active : bg-indigo-600
    ${width < 600 ? "w-16 text-sm" : "w-32 text-md"}
    `}
    type={set}
    >{text}</button>
    </>
  )
}
