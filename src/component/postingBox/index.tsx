import React, { useEffect, useState, useCallback } from "react";

interface PostingBoxProps {
  onClicked: (event: React.MouseEvent<HTMLButtonElement>) => void;
  valued: string;
  onChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PostingBox({ onClicked, valued, onChanged }: PostingBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const handleSize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [handleSize]);

  return (
    <>
      {/* Tombol Buka Drawer */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        Tulis Pesan
      </button>

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl border rounded-t-lg border-gray-600 shadow-lg bg-gray-900 transition-transform duration-300 
        ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex flex-col sm:flex-row items-center bg-gray-800 p-3 w-full space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            className="text-white border-b-2 p-2 w-full bg-gray-700 shadow-md outline-none"
            placeholder="Type something..."
            value={valued}
            onChange={onChanged}
          />

          {width < 800 ? (
            <span>
              <button onClick={() => setIsOpen(false)} className="bg-red-600 p-2 rounded-md text-white hover:bg-red-700">
                Tutup
              </button>
              <button onClick={onClicked} className="bg-blue-600 mx-1 p-2 rounded-md text-white hover:bg-blue-700">
                Kirim
              </button>
            </span>
          ) : (
            <>
              <button onClick={() => setIsOpen(false)} className="bg-red-600 p-2 rounded-md text-white hover:bg-red-700">
                Tutup
              </button>
              <button onClick={onClicked} className="bg-blue-600 mx-1 p-2 rounded-md text-white hover:bg-blue-700">
                Kirim
              </button>
            </>
          )}
        </div>

        <div className="bg-gray-700 flex flex-wrap justify-center gap-2 p-3 rounded-b-lg">
          <button className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700"><img src="image.svg"/></button>
          <button className="bg-blue-600 text-white rounded-md p-2 py-1 hover:bg-blue-700"><img src="camera.svg"/></button>
          <button className="bg-blue-600 text-white rounded-md p-2 py-1 hover:bg-blue-700"><img src="video.svg"/></button>
        </div>
      </div>
    </>
  );
}
