/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function page() {
const {data:session,status} = useSession()
const router = useRouter()
  
  useEffect(()=>{
    if(status === "unauthenticated"){
      router.push("/login")
    }
  },[status,router])

  if(status === "loading"){
    return <div>Loding the page...</div>
  }

  if(!session){
    return null
  }
return (
    <div>
 
       <h1 className="text-white">Welcome back {(session.user as {username : string})?.username}</h1>
      <button onClick={()=>signOut({callbackUrl : "/login"})} className="bg-purple-700 p-1 text-white rounded">Signout</button>
    </div>
  )
}
