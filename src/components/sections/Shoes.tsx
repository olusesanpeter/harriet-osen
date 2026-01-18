'use client'

import Image from "next/image";
import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import ImageGalleryModal from '@/components/ImageGalleryModal'

const products = [
  {
    name: "Rotterdam Blue",
    image: "/images/products/blue-rotterdam.png",
    width: 629,
    height: 943,
    description: "The moulded heel on this stiletto was inspired by modern architecture seen on the founder’s travels to Rotterdam. Featuring a satin upper and and Italian leather lining in a striking cobalt, these shoes are bold and statement making. ",
    galleryImages: [
      { src: "/images/products/blue-rotterdam/blue-rotterdam-front.jpg", type: 'image' as const, alt: "Rotterdam Blue front", width: 1200, height: 1800 },
      { src: "/images/products/blue-rotterdam/blue-rotterdam-side.jpg", type: 'image' as const, alt: "Rotterdam Blue side", width: 1200, height: 1800 },
      { src: "/images/products/blue-rotterdam/blue-rotterdam-heel.jpg", type: 'image' as const, alt: "Rotterdam Blue heel", width: 1200, height: 1800 },
      { src: "/images/loader/blue-rotterdam.jpg", type: 'image' as const, alt: "Rotterdam Blue detail", width: 1200, height: 800 },
    ]
  },
  {
    name: "Rotterdam Pump",
    image: "/images/products/white-rotterdam.png",
    width: 415,
    height: 622,
    description: "Carrying the Rotterdam heel, we wanted to make a shoe that was restrained but beautiful. A white leather upper meant to stand out against grey pavement, and a heel that lends it a hint of excitement.",
    galleryImages: [
      { src: "/images/products/white-rotterdam/white-rotterdam-front.jpg", type: 'image' as const, alt: "White Rotterdam front", width: 1200, height: 1800 },
      { src: "/images/products/white-rotterdam/white-rotterdam-side.jpg", type: 'image' as const, alt: "White Rotterdam side", width: 1200, height: 1800 },
      { src: "/images/products/white-rotterdam/white-rotterdam-heel.jpg", type: 'image' as const, alt: "White Rotterdam heel", width: 1200, height: 1800 },
      { src: "/images/loader/white-rotterdam.jpg", type: 'image' as const, alt: "White Rotterdam detail", width: 1200, height: 800 },
    ]
  },
  {
    name: "Robyn Zebra",
    image: "/images/products/robyn-zebra.png",
    width: 415,
    height: 621,
    description: "This boot has two inspiration points, Rihanna, from A$AP Rocky’s Fashion Killa video, and a zebra coat from Dries Van Noten’s FW22 collection. The boot’s name is an ode to its first inspiration. Crafted with pony hair leather, and a contrasting red logo patch, she’s a visual and tactile stunner.",
    galleryImages: [
      { src: "/images/products/brown-zebra/robyn-zebra-front.jpg", type: 'image' as const, alt: "Robyn Zebra front", width: 1200, height: 1800 },
      { src: "/images/products/brown-zebra/robyn-zebra-side.jpg", type: 'image' as const, alt: "Robyn Zebra side", width: 1200, height: 1800 },
      { src: "/images/products/brown-zebra/robyn-zebra-patch.jpg", type: 'image' as const, alt: "Robyn Zebra patch", width: 1200, height: 1800 },
      { src: "/images/products/robyn-zebra-alt-1.png", type: 'image' as const, alt: "Robyn Zebra", width: 1200, height: 1800 },
      { src: "/images/products/lifestyle/robyn-zebra-lifestyle-1.jpg", type: 'image' as const, alt: "Robyn Zebra lifestyle", width: 1200, height: 1800 },
      { src: "/images/loader/robyn-boot-sketch.mp4", type: 'video' as const, alt: "Robyn boot sketch process" },
    ]
  },
  {
    name: "Robyn Brown",
    image: "/images/products/brown-zebra.png",
    width: 629,
    height: 943,
    description: "A quieter version of its zebra twin, the silky-smooth brown leather iteration retains the red logo patch, and communicates a classic, yet exciting look.",
    galleryImages: [
      { src: "/images/products/robyn-brown/robyn-brown-front.jpg", type: 'image' as const, alt: "Robyn Brown front", width: 1200, height: 1800 },
      { src: "/images/products/robyn-brown/robyn-brown-side.jpg", type: 'image' as const, alt: "Robyn Brown side", width: 1200, height: 1800 },
      { src: "/images/products/robyn-brown/robyn-brown-patch.jpg", type: 'image' as const, alt: "Robyn Brown patch", width: 1200, height: 1800 },
      { src: "/images/products/lifestyle/robyn-zebra-lifestyle-2.jpg", type: 'image' as const, alt: "Robyn Brown lifestyle", width: 1200, height: 1800 },
    ]
  },
  {
    name: "Yellow Brown Stiletto",
    image: "/images/products/yellow-brown.png",
    width: 415,
    height: 623,
    description: "Shoes made for the soft life, she’s crafted with a brown suede lining for easy stepping, and grained leather straps in a beautiful yellow.",
    galleryImages: [
      { src: "/images/products/yellow-brown/yellow-brown-front.jpg", type: 'image' as const, alt: "Yellow Brown front", width: 1200, height: 1800 },
      { src: "/images/products/yellow-brown/yellow-brown-side.jpg", type: 'image' as const, alt: "Yellow Brown side", width: 1200, height: 1800 },
      { src: "/images/loader/yellow-brown.jpg", type: 'image' as const, alt: "Yellow Brown detail", width: 1200, height: 800 },
      { src: "/images/loader/yellow-brown-sketch.mp4", type: 'video' as const, alt: "Yellow Brown sketch process" },
    ]
  },
];

export default function Shoes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Use IntersectionObserver to track which text section is most centered in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const intersectionStates = new Map<number, number>();

    const updateActiveIndex = () => {
      let maxRatio = 0;
      let maxIndex = 0;
      
      intersectionStates.forEach((ratio, index) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxIndex = index;
        }
      });

      if (maxRatio > 0.3) {
        setActiveIndex(maxIndex);
      }
    };

    textRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            intersectionStates.set(index, entry.intersectionRatio);
            updateActiveIndex();
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

  const activeProduct = products[activeIndex];

  return (
    <section id="shoes" className="py-12 md:py-32 bg-[#fff7ed]">
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
          {/* Sticky Image Container */}
          <div className="w-full md:w-1/2 md:sticky md:top-0 md:self-start h-[50vh] md:h-screen py-4 md:py-8">
            <div className="relative w-full h-full flex items-center md:items-start justify-center">
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
                  className="absolute inset-0 flex items-start justify-center"
                  initial={false}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-full h-full max-w-[600px] max-h-[90vh] flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={product.width}
                        height={product.height}
                        className="w-full h-full object-contain"
                      />
                      {/* Clickable button overlay - positioned within the image */}
                      {index === activeIndex && (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/80 backdrop-blur-sm rounded-full px-4 py-3 z-10 hover:bg-black/90 transition-colors shadow-lg"
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
              ))}
            </div>
          </div>

          {/* Scrollable Text Sections */}
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Header */}
            <div className="flex flex-col text-left mb-12 md:mb-56 pt-8 md:pt-24">
              <h2 className="font-display text-[40px] sm:text-[60px] md:text-[80px] lg:text-display-lg tracking-tight text-brand-red">
                Crafting the unexpected
              </h2>
            </div>

            {products.map((product, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={product.name}
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="flex flex-col gap-3 md:gap-4 min-h-[40vh] md:min-h-[50vh] py-6 md:py-8 first:pt-0 last:pb-0"
                  initial={{ opacity: 0.4 }}
                  animate={{
                    opacity: isActive ? 1 : 0.4,
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={activeProduct.name}
        images={activeProduct.galleryImages}
        initialIndex={0}
      />
    </section>
  );
}
