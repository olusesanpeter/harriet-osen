'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageItem {
  src: string
  type: 'image' | 'video'
  alt: string
  width?: number
  height?: number
}

interface MobileImageCarouselProps {
  images: ImageItem[]
  productName: string
}

export default function MobileImageCarousel({ images, productName }: MobileImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  const handleScroll = () => {
    if (!containerRef.current) return
    const scrollLeft = containerRef.current.scrollLeft
    const itemWidth = containerRef.current.offsetWidth
    const newIndex = Math.round(scrollLeft / itemWidth)
    setCurrentIndex(newIndex)
  }

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return
    const itemWidth = containerRef.current.offsetWidth
    containerRef.current.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth'
    })
  }

  if (!images.length) return null

  const SkeletonLoader = () => (
    <div className="absolute inset-0 bg-[#EFE5D8] overflow-hidden rounded-lg">
      <div className="w-full h-full bg-gradient-to-r from-[#EFE5D8] via-[#F5EDE3] to-[#EFE5D8] animate-shimmer bg-[length:200%_100%]" />
    </div>
  )

  return (
    <div className="w-full mt-4">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, index) => {
          const isLoaded = loadedImages.has(index)
          return (
            <div
              key={index}
              className="flex-shrink-0 w-[85%] snap-center"
            >
              <div
                className="relative w-full rounded-lg overflow-hidden bg-[#EFE5D8]"
                style={{ aspectRatio: '2/3' }}
              >
                {!isLoaded && <SkeletonLoader />}
                {image.type === 'video' ? (
                  <video
                    src={image.src}
                    className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => handleImageLoad(index)}
                  />
                ) : (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    onLoad={() => handleImageLoad(index)}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-black' : 'bg-black/30'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
