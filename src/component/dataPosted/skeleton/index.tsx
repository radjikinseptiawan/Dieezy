import React from "react";

export default function SkeletonDataPosted() {
  return (
    <div className="bg-gray-800 my-1 w-full max-w-3xl p-4 rounded-lg shadow-md mx-auto animate-pulse">
      {/* Username Skeleton */}
      <div className="h-4 w-24 bg-gray-700 rounded-md"></div>
      <hr className="my-2 border-gray-600" />

      {/* Content Skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-700 rounded-md"></div>
        <div className="h-3 w-4/5 bg-gray-700 rounded-md"></div>
      </div>

      {/* Date Skeleton */}
      <div className="mt-2 flex justify-end">
        <div className="h-3 w-16 bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
}
