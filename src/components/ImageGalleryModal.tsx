'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[95vw] max-h-[90vh] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 text-black hover:text-black/60 transition-colors z-20"
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

              {/* Product Name */}
              <div className="absolute -top-12 left-0 text-black">
                <h2 className="font-display text-2xl md:text-3xl text-brand-red">
                  {productName}
                </h2>
              </div>

              {/* All Images Side by Side */}
              <div className="relative w-full bg-white rounded-lg overflow-x-auto overflow-y-hidden">
                <div className="flex gap-4 h-[85vh] items-center py-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative flex-shrink-0 h-full"
                      style={{ aspectRatio: image.width && image.height ? `${image.width}/${image.height}` : '2/3' }}
                    >
                      {image.type === 'video' ? (
                        <video
                          src={image.src}
                          className="w-full h-full object-contain"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width || 1200}
                          height={image.height || 1800}
                          className="w-full h-full object-contain"
                          priority={index === initialIndex}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
