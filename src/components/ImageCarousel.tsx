'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const maxSpeed = speed;
    const isMobile = window.innerWidth < 768;
    const itemWidth = (isMobile ? 300 : 450) + 20; // gap of 20px
    const totalItems = images.length;
    const resetPoint = itemWidth * totalItems;

    scrollPositionRef.current = container.scrollLeft;

    const scroll = () => {
      if (container) {
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
  }, [images.length, speed]);

  const renderItems = () => {
    return (
      <>
        {/* First set */}
        {images.map((image, index) => (
          <motion.div
            key={`first-${index}`}
            className="flex-shrink-0 w-[300px] md:w-[450px]"
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
                sizes="(max-width: 768px) 300px, 450px"
              />
            </div>
          </motion.div>
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <motion.div
            key={`second-${index}`}
            className="flex-shrink-0 w-[300px] md:w-[450px]"
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
                sizes="(max-width: 768px) 300px, 450px"
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
      className="w-full overflow-x-auto scrollbar-hide"
    >
      <motion.div 
        className="flex gap-5" 
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
