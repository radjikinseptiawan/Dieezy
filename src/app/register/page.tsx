/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useState } from 'react'
import LoginBox from '../../component/Box'
import Input from '../../component/Input'
import Button1 from '../../component/Button'
import Link from 'next/link'
import axios from 'axios'

export default function page() {
  const [username,setUsername] = useState<string>("") 
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [confirmPassword,setConfirmPassword] = useState<string>("")
  const [message,setMessage] = useState<string | null>(null)
  const setSignUpAccount = async (event : React.ChangeEvent<HTMLFormElement>)=>{
    event.preventDefault()

    if(password !== confirmPassword){
      setMessage("Passwords do not match!")
    }

    const newUser = {username,email,password}
    const response = await axios.post("http://localhost:3000/api/register",newUser)  
    setUsername("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    window.location.href = "/login"
    return response.data
  }

  return (
        <div className="flex justify-center min-h-screen w-full p-4 items-center">
        <LoginBox>
            <h1 className="font-bold text-slate-300 text-xl underline underline-offset-6">Register</h1>
          <form onSubmit={setSignUpAccount}>
            <Input autoComplete='' type="text" placeHolder="Username" value={username} onChange={(e : React.ChangeEvent<HTMLInputElement>)=> setUsername(e.target.value)}/>
            <Input autoComplete='' type="email" placeHolder="email@example.com" value={email} onChange={(e : React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}/>
            <Input autoComplete='' type="password" placeHolder="Password" value={password} onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}/>
            <Input autoComplete=''type="password" placeHolder="Confirm password" value={confirmPassword} onChange={(e : React.ChangeEvent<HTMLInputElement>)=> setConfirmPassword(e.target.value)}/>
        <Button1 set='submit' text={"Register"}/>
        </form>
        <p>{message !== null}</p>
        <p>Already have an account ?<Link href={"/login"}> Here</Link></p>
        </LoginBox>
        </div>
  )
}
