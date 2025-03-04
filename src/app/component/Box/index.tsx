"use client"

import { ReactNode, useEffect, useState } from "react"

interface ReactType{
    children : ReactNode
}

export default function LoginBox({children} : ReactType){
    const [width, setWidth] = useState<number>(0)

    useEffect(()=>{
        const setWindow = ()=> setWidth(window.innerWidth)

        window.addEventListener("resize",setWindow)
        return ()=>{
            window.removeEventListener("resize",setWindow)
        }
    },[])
    return(
        <>
        <div className={`
        rounded 
        flex
        bg-gradient-to-l
        from-gray-600
        to-gray-800
        justify-center
        flex-col
        items-center
        align-center
        shadow 
        shadow-2xl 
        ${width < 800 ? "min-w-[400px] p-8" : "p-8 min-w-[400px] "} 
        `}>{children}</div>
        </>
    )
}