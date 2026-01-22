'use client'

import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import Input from '@/components/ui/Input'

const products = [
  {
    name: "Rotterdam Blue",
    image: "/images/products/blue-rotterdam.png",
  },
  {
    name: "Rotterdam Pump - Benni Pump",
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
    name: "Yellow/Brown Stiletto - Arua Sandal",
    image: "/images/products/yellow-brown.png",
  },
];

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Italy", "Spain",
  "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway", "Denmark", "Finland",
  "Ireland", "Portugal", "Greece", "Poland", "Czech Republic", "Hungary", "Romania", "Bulgaria",
  "Croatia", "Slovenia", "Slovakia", "Estonia", "Latvia", "Lithuania", "Luxembourg", "Malta",
  "Cyprus", "Japan", "South Korea", "China", "India", "Singapore", "Hong Kong", "Taiwan",
  "Thailand", "Malaysia", "Indonesia", "Philippines", "Vietnam", "New Zealand", "South Africa",
  "Nigeria", "Kenya", "Ghana", "Egypt", "Morocco", "Tunisia", "Brazil", "Mexico", "Argentina",
  "Chile", "Colombia", "Peru", "Uruguay", "Venezuela", "Ecuador", "Panama", "Costa Rica",
  "Israel", "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman",
  "Turkey", "Russia", "Ukraine", "Belarus", "Georgia", "Armenia", "Azerbaijan", "Kazakhstan",
  "Other"
];

export default function Footer() {
  const [selectedShoes, setSelectedShoes] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const toggleShoe = (shoeName: string) => {
    setSelectedShoes(prev => {
      if (prev.includes(shoeName)) {
        return prev.filter(name => name !== shoeName);
      }
      // Limit selection to 2 shoes
      if (prev.length >= 2) {
        return prev;
      }
      return [...prev, shoeName];
    });
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
          country,
          newsletter
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Reset form
        setSelectedShoes([]);
        setName('');
        setEmail('');
        setCountry('');
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
    <footer id="footer" className="bg-[#fff7ed] pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12">
      <Container size="lg">
        {/* Feedback Form */}
        <motion.div
          className="mb-16 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] leading-[1.1] tracking-tight text-brand-red pt-8 md:pt-12 mb-6 text-left">
            Tell us what you love<sup className="text-[0.6em]">♥</sup>
          </h2>
          <p className="font-sans font-normal [word-spacing:0.05em] text-base sm:text-lg md:text-xl leading-relaxed text-black/90 mb-6 sm:mb-8 text-left">
            We&apos;d love to know which designs speak to you. Share your favorites and be the first to know when they&apos;re available.
          </p>
          
          <form onSubmit={handleSubmit}>
            {/* Name, Email, and Country */}
            <div className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
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
              <div className="mt-4 sm:mt-6 w-full max-w-2xl">
                <label htmlFor="country" className="mb-2 block text-sm font-medium text-black">
                  Where do you live?
                </label>
                <div className="relative">
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    style={{
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      appearance: 'none',
                      backgroundImage: 'none',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right',
                    }}
                    className="flex w-full rounded-md border border-foreground/20 bg-white px-4 py-3 pr-10 text-base text-black placeholder:text-black/50 focus:border-brand-red focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&::-ms-expand]:hidden"
                  >
                    <option value="">Select a country</option>
                    {countries.map((countryName) => (
                      <option key={countryName} value={countryName}>
                        {countryName}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="h-5 w-5 text-black/50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Shoes Grid */}
            <div className="mb-8">
              <p className="text-lg mb-4 text-black/80">Select your favorite shoes (up to 2):</p>
              <div className="flex flex-nowrap gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
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
                      <span className={`text-sm md:text-base text-left w-40 md:w-48 ${isSelected ? 'text-brand-red font-medium' : 'text-black/80'}`}>
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
              <motion.button
                type="submit"
                disabled={selectedShoes.length === 0 || !name || !email || !country || isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand-red text-white font-medium rounded-full hover:bg-brand-red/90 transition-colors shadow-lg disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </motion.button>
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
        <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
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
