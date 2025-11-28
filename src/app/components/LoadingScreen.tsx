"use client";

import { useState } from "react";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [isFading, setIsFading] = useState(false);

  const handleVideoEnd = () => {
    setIsFading(true);

    setTimeout(() => {
      onFinish();
    }, 100);
  };

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        bg-black
        flex justify-center items-center
        transition-opacity duration-500 ease-out
        ${isFading ? "opacity-0" : "opacity-100"}
      `}
    >
      <video
        src="/WEB_ELEMENT/Animation_LOADING_SCREEN.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={handleVideoEnd}
      />
    </div>
  );
}
