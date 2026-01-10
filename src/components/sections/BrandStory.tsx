'use client'

import { motion } from 'framer-motion'

export default function BrandStory() {
  return (
    <section className="relative bg-brand-red"
    >
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 mx-auto py-24 md:py-32">
        <div className="space-y-12">
          <motion.h2
            className="font-display text-[180px] leading-[1.1] tracking-tight text-white w-full text-left font-bold"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            Shoes for Strutting
          </motion.h2>

          <div
            className="font-[Inter,sans-serif] font-normal [word-spacing:0.05em] text-xl leading-relaxed text-white/95 space-y-4 max-w-6xl text-left"
            style={{ fontFeatureSettings: "'liga' 1, 'calt' 1" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              Shoes for the woman who loves the art of getting dressed.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            >
              Made with quality and craft and a sprinkle of whimsy
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            >
              Shoes to elevate jeans and a cute top, and complete that dress you&apos;ve been waiting for a special occasion to wear.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
            >
              Shoes that speak volumes even when you&apos;re quiet
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
            >
              Shoes with identity.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
            >
              Shoes for Owambe, for dinner with the girls, for the solo museum date
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.6 }}
            >
              Harriet Osen - shoes for strutting.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
