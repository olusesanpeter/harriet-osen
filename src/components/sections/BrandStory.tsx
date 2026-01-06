'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function BrandStory() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Transform the section to slide up over the hero as you scroll
  // Start at 0vh (below hero) and slide to -50vh (overlapping hero)
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '-50vh'])

  return (
    <motion.section
      ref={ref}
      style={{ y }}
      className="relative bg-brand-red z-10 -mt-4"
    >
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 max-w-5xl mx-auto py-24 md:py-32">
        <div className="space-y-12">
          <motion.h2
            className="font-display text-display-lg tracking-tight text-white max-w-2xl mx-auto text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            For the Bold.
          </motion.h2>

          <div 
            className="font-[Inter,sans-serif] font-normal [word-spacing:0.05em] text-xl leading-relaxed text-white/95 space-y-4 max-w-2xl mx-auto text-left"
            style={{ fontFeatureSettings: "'liga' 1, 'calt' 1" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              Shoes for people who move with intention.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            >
              Every step says something: who you are, what you value, how you
              choose to enter the world.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            >
              Shoes crafted with precision because form matters and details hold
              stories.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
            >
              Crafted with emotion because objects carry feelings.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
            >
              Crafted with a little risk because boldness belongs in the
              everyday.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
            >
              This is Harriet Osen — shoes for people who don&apos;t rush, but
              move with purpose.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
