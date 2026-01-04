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
    <section className="pt-20 md:pt-32 pb-20 md:pb-32 bg-white">
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column - Text */}
          <motion.div
            className="flex flex-col md:sticky md:top-0 md:self-start md:pt-20 md:pb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              className="font-display text-display-md text-brand-red mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Crafting the unexpected
            </motion.h2>
            <motion.p
              className="font-sans-tight text-body-lg text-black/95"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              Each pair begins with a question: what happens when comfort, craft,
              and curiosity are allowed to wander together?
            </motion.p>
          </motion.div>

          {/* Right Column - Images */}
          <div className="flex flex-col gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product.name} className="relative w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={product.width}
                  height={product.height}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
