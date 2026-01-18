'use client'

import { motion } from 'framer-motion'

export default function FeedbackSection() {
  const scrollToFooter = () => {
    const footer = document.getElementById('footer')
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="feedback" className="py-16 md:py-24 bg-[#fff7ed] relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-red mb-4">
            Tell us what you love<sup className="text-[0.6em]">♥</sup>
          </h2>
          <p className="text-black/70 text-base sm:text-lg mb-8">
            We&apos;d love to know which designs speak to you. Share your favorites and be the first to know when they&apos;re available.
          </p>
          <motion.button
            onClick={scrollToFooter}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-red text-white font-medium rounded-full hover:bg-brand-red/90 transition-colors shadow-lg"
          >
            <span>Share your favorites</span>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
