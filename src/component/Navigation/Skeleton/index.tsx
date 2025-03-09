import React from "react";

export default function SkeletonNavbar() {
  return (
    <div className="bg-gray-800 p-3 sm:p-2 text-gray-200 shadow-md fixed flex justify-between w-full z-50 top-0 animate-pulse">
    <div className="h-5 w-24 bg-gray-700 rounded-md"></div>

    <div className="h-7 w-16 bg-gray-700 rounded-md"></div>
    </div>
  );
}
