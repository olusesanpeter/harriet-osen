'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CarouselImage {
  name: string;
  image: string;
  width: number;
  height: number;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  speed?: number;
}

export default function ImageCarousel({ images, speed = 0.6 }: ImageCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const velocityRef = useRef(speed);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll only on desktop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isMobile) return; // Skip auto-scroll on mobile

    const maxSpeed = speed;
    const itemWidth = 450 + 20; // gap of 20px
    const totalItems = images.length;
    const resetPoint = itemWidth * totalItems;

    scrollPositionRef.current = container.scrollLeft;

    const scroll = () => {
      if (container && !isDragging) {
        velocityRef.current = maxSpeed;

        if (velocityRef.current > 0.01) {
          scrollPositionRef.current += velocityRef.current;
          container.scrollLeft = scrollPositionRef.current;

          if (scrollPositionRef.current >= resetPoint) {
            scrollPositionRef.current = 0;
            container.scrollLeft = 0;
          }
        } else {
          scrollPositionRef.current = container.scrollLeft;
        }
      }
    };

    const animationFrame = setInterval(scroll, 16);

    return () => clearInterval(animationFrame);
  }, [images.length, speed, isDragging, isMobile]);

  // Handle document-level mouse events for smooth dragging (desktop only)
  useEffect(() => {
    if (!isDragging || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      const x = e.pageX - container.offsetLeft;
      const walk = (x - dragStartRef.current.x) * 2; // Multiply by 2 for faster scrolling
      container.scrollLeft = dragStartRef.current.scrollLeft - walk;
      scrollPositionRef.current = container.scrollLeft;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      const container = scrollContainerRef.current;
      if (container) {
        container.style.cursor = 'grab';
        container.style.userSelect = '';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMobile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return; // Don't handle mouse events on mobile
    
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft
    };
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
  };

  const handleMouseLeave = () => {
    if (isMobile || isDragging) return;
    
    const container = scrollContainerRef.current;
    if (container) {
      container.style.cursor = 'grab';
    }
  };

  const renderItems = () => {
    // On mobile, render single set with snap points (like MobileImageCarousel)
    // On desktop, render duplicate set for seamless auto-scroll loop
    if (isMobile) {
      return (
        <>
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[85%] snap-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <div className="relative w-full aspect-[2/3] overflow-hidden">
                <Image
                  src={image.image}
                  alt={image.name}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 768px) 85vw, 450px"
                />
              </div>
            </motion.div>
          ))}
        </>
      );
    }

    // Desktop: duplicate set for seamless loop
    return (
      <>
        {/* First set */}
        {images.map((image, index) => (
          <motion.div
            key={`first-${index}`}
            className="flex-shrink-0 w-[450px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <div className="relative w-full aspect-[2/3] overflow-hidden">
              <Image
                src={image.image}
                alt={image.name}
                fill
                className="object-cover pointer-events-none"
                sizes="450px"
              />
            </div>
          </motion.div>
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <motion.div
            key={`second-${index}`}
            className="flex-shrink-0 w-[450px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: (images.length + index) * 0.1,
              ease: "easeOut"
            }}
          >
            <div className="relative w-full aspect-[2/3] overflow-hidden">
              <Image
                src={image.image}
                alt={image.name}
                fill
                className="object-cover pointer-events-none"
                sizes="450px"
              />
            </div>
          </motion.div>
        ))}
      </>
    );
  };

  return (
    <div 
      ref={scrollContainerRef}
      className={`w-full overflow-x-auto scrollbar-hide ${
        isMobile 
          ? 'snap-x snap-mandatory' // Native CSS scroll snapping on mobile
          : 'cursor-grab active:cursor-grabbing select-none' // Mouse drag on desktop
      }`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className={`flex ${isMobile ? 'gap-3' : 'gap-5'}`}
        style={{ minWidth: 'max-content' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {renderItems()}
      </motion.div>
    </div>
  );
}
