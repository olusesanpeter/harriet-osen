"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const loaderVideo = "/images/loader/blue-rotterdam-sketch.mp4";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onLoadingComplete();
    }, 800);
  }, [onLoadingComplete]);

  useEffect(() => {
    // Count from 0 to 100 - slower timing
    const duration = 4000; // Total duration in ms (increased from 2500)
    const steps = 100;
    const stepDuration = duration / steps;

    const countInterval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(countInterval);
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(countInterval);
  }, []);

  useEffect(() => {
    // Trigger exit when count reaches 100
    if (count === 100) {
      const exitTimer = setTimeout(() => {
        handleComplete();
      }, 600);
      return () => clearTimeout(exitTimer);
    }
  }, [count, handleComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF8F5] transition-all duration-700 ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Header with logo and counter */}
      <div className="w-full max-w-[600px] px-6 mb-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative h-6 w-32">
            <Image
              src="/images/logo/logo.svg"
              alt="Harriet Osen"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          
          {/* Counter - smaller text */}
          <span className="font-sans-tight text-sm tracking-tight text-neutral-900 tabular-nums">
            {count.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Video container */}
      <div className="relative w-full max-w-[600px] px-6">
        <div className="relative w-full">
          <video
            src={loaderVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[600px] px-6 mt-4">
        <div className="h-[2px] w-full bg-neutral-200 overflow-hidden">
          <div
            className="h-full bg-brand-red transition-all duration-75 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}
