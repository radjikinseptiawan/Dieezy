/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import DataPosted from "@/component/dataPosted";
import SkeletonDataPosted from "@/component/dataPosted/skeleton";
import SkeletonNavbar from "@/component/Navigation/Skeleton";
import PostingBox from "@/component/postingBox";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  username: string;
  post: string;
  date: string;
}



export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<Post[]>([]);
  const [post, setPost] = useState<string>("");

  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const makePost = async () => {
    if (!post) {
      console.error("Post content is empty");
      return;
    }
    const newPost = { post };
    const response = await axios.post("http://localhost:3000/api/post", newPost).catch(err => console.error("Error", err));
    fetchData();
    setPost("");
    return response?.data;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post");
      if (response?.data?.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return( 
    <>
    <SkeletonNavbar></SkeletonNavbar>
    <div className="mt-12">
    <SkeletonDataPosted></SkeletonDataPosted>
    <SkeletonDataPosted></SkeletonDataPosted>
    <SkeletonDataPosted></SkeletonDataPosted>
    <SkeletonDataPosted></SkeletonDataPosted>
    <SkeletonDataPosted></SkeletonDataPosted>
    <SkeletonDataPosted></SkeletonDataPosted>
    <SkeletonDataPosted></SkeletonDataPosted>
    </div>
    </>  
  );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-800 p-3 sm:p-2 text-gray-200 shadow-md fixed flex justify-between w-full z-50 top-0">
        <h1 className=" text-md sm:text-md">{session?.user?.username}</h1>
        <button className="bg-red-600 p-1 rounded" onClick={()=>signOut()}>Logout</button>
      </div>

      <div className="container mx-auto max-w-3xl mt-12 px-4 sm:px-6 flex flex-col items-center">
        {sortedData.map((item, index) => (
          <DataPosted key={index} username={item.username} date={item.date} containt={item.post} />
        ))}

        <PostingBox onChanged={(e) => setPost(e.target.value)} valued={post} onClicked={makePost} />
      </div>
    </>
  );
}
