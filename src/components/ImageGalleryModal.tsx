'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageItem {
  src: string
  type: 'image' | 'video'
  alt: string
  width?: number
  height?: number
}

interface ImageGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  images: ImageItem[]
  initialIndex?: number
}

export default function ImageGalleryModal({
  isOpen,
  onClose,
  productName,
  images,
  initialIndex = 0,
}: ImageGalleryModalProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  // Reset loaded images when modal opens/closes or images change
  useEffect(() => {
    if (isOpen) {
      setLoadedImages(new Set())
    }
  }, [isOpen, images])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!images.length) return null

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="absolute inset-0 bg-[#EFE5D8] overflow-hidden">
      <div className="w-full h-full bg-gradient-to-r from-[#EFE5D8] via-[#F5EDE3] to-[#EFE5D8] animate-shimmer bg-[length:200%_100%]" />
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white"
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[98vw] sm:max-w-[95vw] max-h-[95vh] sm:max-h-[90vh] pointer-events-auto pt-14 sm:pt-16"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Product Name and Close Button */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 sm:px-0">
                {/* Product Name */}
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-brand-red truncate pr-4">
                  {productName}
                </h2>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="text-black hover:text-black/60 transition-colors z-20 p-2 -mr-2"
                  aria-label="Close gallery"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* All Images Side by Side */}
              <div className="relative w-full bg-white rounded-lg overflow-x-auto overflow-y-hidden scrollbar-hide">
                <div className="flex gap-3 sm:gap-4 h-[75vh] sm:h-[80vh] md:h-[85vh] items-center py-2 sm:py-4">
                  {images.map((image, index) => {
                    const isLoaded = loadedImages.has(index)
                    return (
                      <div
                        key={index}
                        className="relative flex-shrink-0 h-full"
                        style={{ aspectRatio: image.width && image.height ? `${image.width}/${image.height}` : '2/3' }}
                      >
                        {!isLoaded && <SkeletonLoader />}
                        {image.type === 'video' ? (
                          <video
                            src={image.src}
                            className={`w-full h-full object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
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
                            width={image.width || 1200}
                            height={image.height || 1800}
                            className={`w-full h-full object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                            priority={index === initialIndex}
                            onLoad={() => handleImageLoad(index)}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
