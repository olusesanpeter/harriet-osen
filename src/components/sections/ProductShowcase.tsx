'use client'

import Image from "next/image";
import { motion } from 'framer-motion'

const products = [
  {
    name: "Blue Rotterdam",
    image: "/images/products/blue-rotterdam.png",
    width: 629,
    height: 943,
  },
  {
    name: "White Rotterdam",
    image: "/images/products/white-rotterdam.png",
    width: 415,
    height: 622,
  },
  {
    name: "Robyn Zebra",
    image: "/images/products/robyn-zebra.png",
    width: 415,
    height: 621,
  },
  {
    name: "Brown Zebra",
    image: "/images/products/brown-zebra.png",
    width: 629,
    height: 943,
  },
  {
    name: "Yellow Brown",
    image: "/images/products/yellow-brown.png",
    width: 415,
    height: 623,
  },
];

export default function ProductShowcase() {
  return (
    <section className="pt-20 md:pt-32 pb-20 md:pb-32 bg-[#FFF7ED] overflow-visible">
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
          {/* Left Column - Text */}
          <div className="w-full md:w-1/2">
            <div className="md:sticky md:top-24">
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
              <motion.h2
                className="font-display text-display-md text-brand-red mb-3 tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Crafting the unexpected
              </motion.h2>
              <motion.p
                className="font-[Inter,sans-serif] font-normal [word-spacing:0.05em] text-xl leading-relaxed text-black/95"
                style={{ fontFeatureSettings: "'liga' 1, 'calt' 1" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Each pair begins with a question: what happens when comfort, craft,
                and curiosity are allowed to wander together?
              </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product.name} className="relative w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={product.width}
                  height={product.height}
                  className="w-full h-auto object-cover"
                />
                {/* Clickable button overlay */}
                <button
                  onClick={() => {
                    // Handle click to show more image previews
                    console.log(`View more images for ${product.name}`)
                    // TODO: Implement image preview modal/gallery
                  }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/80 backdrop-blur-sm rounded-full px-4 py-3"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
