"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const loaderImages = [
  "/images/loader/loader.png",
  "/images/loader/loader-1.png",
  "/images/loader/loader-2.png",
  "/images/loader/loader-3.png",
  "/images/loader/loader-4.png",
];

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);

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
    // Rotate through images during loading with smooth crossfade
    const fadeDuration = 200; // Crossfade transition duration
    const imageInterval = 1000; // Slower rotation - 1000ms (1 second) per image

    let intervalId: NodeJS.Timeout;

    const rotateImage = () => {
      // Start crossfade: fade out current, fade in next
      setImageOpacity(0);
      
      // After fade completes, swap images and reset opacity
      setTimeout(() => {
        setCurrentImageIndex((prev) => {
          const next = (prev + 1) % loaderImages.length;
          setNextImageIndex((next + 1) % loaderImages.length);
          return next;
        });
        setImageOpacity(1);
      }, fadeDuration);
    };

    // Start rotation after initial delay (show first image for a bit)
    const initialTimeout = setTimeout(() => {
      rotateImage();
      intervalId = setInterval(rotateImage, imageInterval);
    }, imageInterval);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalId) clearInterval(intervalId);
    };
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

      {/* Image container */}
      <div className="relative w-full max-w-[600px] px-6">
        <div className="relative w-full aspect-square">
          {/* Current image */}
          <Image
            src={loaderImages[currentImageIndex]}
            alt="Loading"
            fill
            className="object-cover transition-opacity duration-200"
            style={{ opacity: imageOpacity }}
            priority
          />
          {/* Next image (for smooth crossfade) */}
          <Image
            src={loaderImages[nextImageIndex]}
            alt="Loading"
            fill
            className="object-cover transition-opacity duration-200 absolute inset-0"
            style={{ opacity: 1 - imageOpacity }}
            priority
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
