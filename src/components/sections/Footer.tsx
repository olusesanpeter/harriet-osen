'use client'

import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const products = [
  {
    name: "Rotterdam Blue",
    image: "/images/products/blue-rotterdam.png",
  },
  {
    name: "Rotterdam Pump",
    image: "/images/products/white-rotterdam.png",
  },
  {
    name: "Robyn Zebra",
    image: "/images/products/robyn-zebra.png",
  },
  {
    name: "Robyn Brown",
    image: "/images/products/brown-zebra.png",
  },
  {
    name: "Yellow Brown Stiletto",
    image: "/images/products/yellow-brown.png",
  },
];

export default function Footer() {
  const [selectedShoes, setSelectedShoes] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleShoe = (shoeName: string) => {
    setSelectedShoes(prev => 
      prev.includes(shoeName) 
        ? prev.filter(name => name !== shoeName)
        : [...prev, shoeName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedShoes,
          name,
          email,
          newsletter
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Reset form
        setSelectedShoes([]);
        setName('');
        setEmail('');
        setNewsletter(false);
        alert('Thank you for your feedback!');
      } else {
        alert(data.message || 'Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#fff7ed] pt-20 pb-12">
      <Container size="lg">
        {/* Feedback Form */}
        <motion.div
          className="mb-16 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-[80px] md:text-[100px] lg:text-[120px] leading-[1.1] tracking-tight text-brand-red pt-8 md:pt-12 mb-6 text-left">
            Tell us what you like
          </h2>
          <p className="font-sans font-normal [word-spacing:0.05em] text-xl leading-relaxed text-black/90 mb-8 text-left">
            We're beginning production soon and would love to hear which designs resonate with you.
          </p>
          
          <form onSubmit={handleSubmit}>
            {/* Name and Email */}
            <div className="mb-8">
              <div className="grid md:grid-cols-2 gap-6 w-[calc(5*10rem+4*1rem)] md:w-[calc(5*12rem+4*1.5rem)]">
                <Input
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Shoes Grid */}
            <div className="mb-8">
              <p className="text-lg mb-4 text-black/80">Select your favorite shoes:</p>
              <div className="flex flex-nowrap gap-4 md:gap-6 overflow-x-auto w-[calc(5*10rem+4*1rem)] md:w-[calc(5*12rem+4*1.5rem)]">
                {products.map((product) => {
                  const isSelected = selectedShoes.includes(product.name);
                  return (
                    <button
                      key={product.name}
                      type="button"
                      onClick={() => toggleShoe(product.name)}
                      className="flex flex-col items-start"
                    >
                      <div
                        className={`
                          relative w-40 h-56 md:w-48 md:h-72 overflow-hidden transition-all mb-2
                          ${isSelected 
                            ? 'border-2 border-brand-red rounded-none' 
                            : 'rounded-lg border-2 border-transparent'
                          }
                        `}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-brand-red/10" />
                        )}
                      </div>
                      <span className={`text-sm md:text-base text-left ${isSelected ? 'text-brand-red font-medium' : 'text-black/80'}`}>
                        {product.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Checkbox */}
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="w-5 h-5 rounded border-black/20 text-brand-red focus:ring-brand-red focus:ring-offset-2"
                />
                <span className="text-black/80">Subscribe to our newsletter for updates</span>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                disabled={selectedShoes.length === 0 || !name || !email}
                className="bg-brand-red hover:bg-brand-red/90 text-white rounded-none w-full"
              >
                Submit
              </Button>
            </div>
          </form>
        </motion.div>
      </Container>

      {/* Logo - Full Width */}
      <motion.div
        className="w-full mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <Image
            src="/images/logo/logo.svg"
            alt={siteConfig.name}
            fill
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* Copyright */}
      <Container size="lg">
        <motion.div
          className="mt-8 pb-12 text-center text-sm text-black/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </motion.div>
      </Container>
    </footer>
  );
}
