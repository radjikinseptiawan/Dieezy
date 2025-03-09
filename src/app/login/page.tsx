/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Button1 from "../../component/Button";
import LoginBox from "../../component/Box";
import Input from "../../component/Input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";


export default function page() {
  const {data : session,status} = useSession()
  const [username,setUsername] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [error,setError] = useState<string | null>(null)
  
  useEffect(()=>{
    if(status === "authenticated"){
      window.location.href = "/dashboard"
    }
  },[status])
  
  const useLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    const result = await signIn("credentials",{
      redirect : false,
      username,
      password
    })

    if(result?.error){
      setError(result.error)
    }else{
      window.location.href = "/dashboard"
    }
  }
  return (
    <div className="flex justify-center min-h-screen w-full p-4 items-center">
    <LoginBox>
        <h1 className="font-bold text-slate-300 text-xl underline underline-offset-6">Login</h1>
        <form className="text-center" onSubmit={useLogin}>
        <Input autoComplete="username" type="text" placeHolder="Username" value={username} onChange={(e : React.ChangeEvent<HTMLInputElement> )=>setUsername(e.target.value)}/>
        <Input type="password" placeHolder="Password" autoComplete="current-password" value={password} onChange={(e : React.ChangeEvent<HTMLInputElement> ) =>setPassword(e.target.value)}/>
        <Button1 set="submit" text={"Login"}></Button1>
    </form>
    {error && <p className="text-red-500">{error}</p>}
    <p>Dont have an account ?<Link href={"/register"}> Here</Link></p>
    </LoginBox>
    </div>
  )
}
