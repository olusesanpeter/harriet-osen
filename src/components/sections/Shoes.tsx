'use client'

import Image from "next/image";
import { motion } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import ImageGalleryModal from '@/components/ImageGalleryModal'
import MobileImageCarousel from '@/components/MobileImageCarousel'
import { products } from '@/data/products'

export default function Shoes() {
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set([0]));
  const [mostRecentActiveIndex, setMostRecentActiveIndex] = useState(0);
  const [modalProductIndex, setModalProductIndex] = useState<number | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathname = usePathname();

  // Sync modal state with URL hash
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.slice(1);
      const productIndex = products.findIndex(p => p.slug === hash);
      setModalProductIndex(productIndex >= 0 ? productIndex : null);
    };

    checkHash();
    window.addEventListener('popstate', checkHash);
    return () => window.removeEventListener('popstate', checkHash);
  }, []);

  // Update page title and og:image when modal opens/closes
  useEffect(() => {
    const defaultTitle = 'Harriet Osen';
    const defaultImage = '/images/og-image.jpg';

    if (modalProductIndex !== null) {
      const product = products[modalProductIndex];
      document.title = `${product.name} - Harriet Osen`;

      // Update og:image meta tag
      let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
      if (ogImage) {
        ogImage.content = product.galleryImages[0].src;
      }
    } else {
      document.title = defaultTitle;

      // Reset og:image
      let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
      if (ogImage) {
        ogImage.content = defaultImage;
      }
    }

    return () => {
      document.title = defaultTitle;
    };
  }, [modalProductIndex]);

  const openModal = useCallback((index: number) => {
    setModalProductIndex(index);
    window.history.pushState(null, '', `${pathname}#${products[index].slug}`);
  }, [pathname]);

  const closeModal = useCallback(() => {
    setModalProductIndex(null);
    window.history.pushState(null, '', pathname);
  }, [pathname]);

  // Use IntersectionObserver to track which text sections are in view and add them to selection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const intersectionStates = new Map<number, number>();

    const updateSelectedIndices = () => {
      const newSelectedIndices = new Set<number>();
      let maxRatio = 0;
      let maxIndex = 0;
      
      intersectionStates.forEach((ratio, index) => {
        // Add to selection if intersection ratio is above threshold
        if (ratio > 0.3) {
          newSelectedIndices.add(index);
        }
        // Track the most recent active index for modal display
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxIndex = index;
        }
      });

      // Update selected indices
      setSelectedIndices((prev) => {
        const updated = new Set(prev);
        newSelectedIndices.forEach((index) => updated.add(index));
        return updated;
      });

      // Update most recent active index for modal
      if (maxRatio > 0.3) {
        setMostRecentActiveIndex(maxIndex);
      }
    };

    textRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            intersectionStates.set(index, entry.intersectionRatio);
            updateSelectedIndices();
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '-30% 0px -30% 0px'
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section id="shoes" className="py-12 md:py-32 bg-[#fff7ed]">
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
          {/* Sticky Image Container (desktop only) */}
          <div className="hidden md:block md:w-1/2 md:sticky md:top-0 md:self-start md:h-screen py-4 md:py-8">
            <div className="relative w-full h-full flex items-center md:items-start justify-center">
              {products.map((product, index) => {
                const isSelected = selectedIndices.has(index);
                const isMostRecent = index === mostRecentActiveIndex;
                return (
                  <motion.div
                    key={product.name}
                    className="absolute inset-0 flex items-start justify-center"
                    initial={false}
                    animate={{
                      opacity: isSelected ? (isMostRecent ? 1 : 0.6) : 0,
                      scale: isSelected ? (isMostRecent ? 1 : 0.9) : 0.8,
                      zIndex: isMostRecent ? 10 : (isSelected ? 5 : 1),
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <div className="relative w-full h-full flex items-end justify-center pb-8">
                      <div className="relative h-[85vh] w-full flex items-end justify-center">
                        <Image
                          src={product.galleryImages[0].src}
                          alt={product.galleryImages[0].alt}
                          width={product.galleryImages[0].width}
                          height={product.galleryImages[0].height}
                          className="max-h-full w-auto object-contain"
                        />
                        {/* Clickable button overlay - positioned within the image (desktop only) */}
                        {isMostRecent && (
                          <button
                            onClick={() => openModal(index)}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 bg-black/80 backdrop-blur-sm rounded-full px-4 py-3 z-10 hover:bg-black/90 transition-colors shadow-lg"
                          >
                            <span className="text-white text-sm font-medium">
                              View more images
                            </span>
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Scrollable Text Sections */}
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Header */}
            <div className="flex flex-col text-left mb-4 md:mb-56 pt-4 md:pt-24">
              <h2 className="font-display text-[40px] sm:text-[60px] md:text-[80px] lg:text-display-lg tracking-tight text-brand-red">
                Crafting the Unexpected
              </h2>
            </div>

            {products.map((product, index) => {
              const isSelected = selectedIndices.has(index);
              const isMostRecent = index === mostRecentActiveIndex;
              return (
                <motion.div
                  key={product.name}
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="flex flex-col gap-3 md:gap-4 min-h-[40vh] md:min-h-[50vh] py-6 md:py-8 first:pt-0 last:pb-0"
                  initial={{ opacity: 0.4 }}
                  animate={{
                    opacity: isSelected ? (isMostRecent ? 1 : 0.7) : 0.4,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black tracking-tight">
                    {product.name}
                  </h3>
                  <p className="font-sans font-normal [word-spacing:0.05em] text-base md:text-lg leading-relaxed text-black/90">
                    {product.description}
                  </p>
                  {/* Mobile Image Carousel */}
                  <div className="md:hidden">
                    <MobileImageCarousel
                      images={product.galleryImages}
                      productName={product.name}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={modalProductIndex !== null}
        onClose={closeModal}
        productName={modalProductIndex !== null ? products[modalProductIndex].name : ''}
        images={modalProductIndex !== null ? products[modalProductIndex].galleryImages : []}
        initialIndex={0}
      />
    </section>
  );
}
