"use server"
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dieezy",
};


export default async function Home() {
  await redirect("/login")
}
