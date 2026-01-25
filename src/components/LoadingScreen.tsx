"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [videoWidth, setVideoWidth] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    // Measure video width when it loads and renders
    const video = videoRef.current;
    if (video) {
      const updateWidth = () => {
        // Use requestAnimationFrame to ensure measurement happens after render
        requestAnimationFrame(() => {
          // Get the actual rendered dimensions of the video
          const videoRect = video.getBoundingClientRect();
          const width = videoRect.width;
          
          // Also check the video's natural dimensions to calculate proper width
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            const aspectRatio = video.videoWidth / video.videoHeight;
            const maxHeight = Math.min(window.innerHeight * 0.6, video.videoHeight);
            const calculatedWidth = maxHeight * aspectRatio;
            const containerWidth = video.parentElement?.clientWidth || 0;
            
            // Use the smaller of: calculated width based on max-height, or container width
            const finalWidth = Math.min(calculatedWidth, containerWidth);
            
            if (finalWidth > 0) {
              setVideoWidth(finalWidth);
            } else if (width > 0) {
              setVideoWidth(width);
            }
          } else if (width > 0) {
            setVideoWidth(width);
          }
        });
      };
      
      // Use multiple events to catch video loading at different stages
      video.addEventListener('loadedmetadata', updateWidth);
      video.addEventListener('loadeddata', updateWidth);
      video.addEventListener('canplay', updateWidth);
      
      // Use ResizeObserver to track size changes
      const resizeObserver = new ResizeObserver(() => {
        updateWidth();
      });
      resizeObserver.observe(video);
      
      // Initial measurement - try immediately and with small delays
      updateWidth(); // Try immediately
      const timeout1 = setTimeout(updateWidth, 50);
      const timeout2 = setTimeout(updateWidth, 200);
      
      // Also update on window resize
      window.addEventListener('resize', updateWidth);
      
      return () => {
        video.removeEventListener('loadedmetadata', updateWidth);
        video.removeEventListener('loadeddata', updateWidth);
        video.removeEventListener('canplay', updateWidth);
        resizeObserver.disconnect();
        window.removeEventListener('resize', updateWidth);
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
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
      {/* Centered container for all content */}
      <div className="w-full max-w-[600px] px-6 flex flex-col items-center">
        {/* Header with logo and counter - matches video width */}
        <div 
          className="flex items-center justify-between mb-4 transition-all duration-200"
          style={{ 
            width: videoWidth ? `${videoWidth}px` : '100%', 
            maxWidth: '100%',
            opacity: videoWidth ? 1 : 0,
            transition: videoWidth ? 'width 200ms ease-out, opacity 200ms ease-out' : 'opacity 200ms ease-out'
          }}
        >
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

        {/* Video container - defines the width for all elements */}
        <div className="relative w-full max-h-[60vh] flex items-center justify-center">
          <video
            ref={videoRef}
            src="/images/loader/loader.mp4"
            className="w-full h-auto max-h-[60vh] object-contain"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Progress bar - matches video width */}
        <div 
          className="mt-4 transition-all duration-200"
          style={{ 
            width: videoWidth ? `${videoWidth}px` : '100%', 
            maxWidth: '100%',
            opacity: videoWidth ? 1 : 0,
            transition: videoWidth ? 'width 200ms ease-out, opacity 200ms ease-out' : 'opacity 200ms ease-out'
          }}
        >
          <div className="h-[2px] w-full bg-neutral-200 overflow-hidden">
            <div
              className="h-full bg-brand-red transition-all duration-75 ease-linear"
              style={{ width: `${count}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
