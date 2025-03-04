"use client"
import Button1 from "../component/Button";
import LoginBox from "../component/Box";
import Input from "../component/Input";

export default function page() {
    return (
    <div className="flex justify-center min-h-screen w-full p-4 items-center">
    <LoginBox>
        <h1 className="font-bold text-slate-300 text-xl underline underline-offset-6">Login</h1>
        <Input type="text" placeHolder="Username" value="" onChange={()=>{}}/>
        <Input type="password" placeHolder="Password" value="" onChange={()=>{}}/>
    <Button1 onClick={()=>{}} text={"login"}/>
    </LoginBox>
    </div>
  )
}
