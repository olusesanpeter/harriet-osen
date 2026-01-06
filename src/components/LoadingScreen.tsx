"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const productImages = [
  "/images/products/blue-rotterdam.png",
  "/images/products/brown-zebra.png",
  "/images/products/robyn-zebra.png",
  "/images/products/white-rotterdam.png",
  "/images/products/yellow-brown.png",
];

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    // Cycle through images
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 500);

    return () => clearInterval(imageInterval);
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
      <div className="w-full max-w-[420px] px-6 mb-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative h-6 w-32">
            <Image
              src="/images/logo/logo.png"
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

      {/* Image container */}
      <div className="relative w-full max-w-[420px] aspect-[3/4] px-6">
        <div className="relative w-full h-full overflow-hidden">
          {productImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-200 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`Product ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[420px] px-6 mt-8">
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
