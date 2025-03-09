import React from "react";

interface TypeData {
  username: string;
  containt: string;
  date: string;
}

export default function DataPosted({ username, containt, date }: TypeData) {
  return (
    <div className="bg-gray-800 my-1 w-full max-w-3xl p-4 rounded-lg shadow-md mx-auto">
      <p className="text-white font-semibold text-sm sm:text-base">{username}</p>
      <hr className="my-2 border-gray-600" />

      <div>
        <p className="text-white break-words text-sm sm:text-base">{containt}</p>
      </div>

      <div className="mt-2 flex justify-end">
        <p className="text-gray-400 text-xs sm:text-sm">
          {new Date(date).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}
