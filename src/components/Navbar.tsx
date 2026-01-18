"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the Brand Story section
      const brandStorySection = document.getElementById("brand-story");
      if (!brandStorySection) return;

      const brandStoryRect = brandStorySection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Show navbar when Brand Story section is halfway scrolled into view
      // This means the top of the section has passed the middle of the viewport
      setIsVisible(brandStoryRect.top <= viewportHeight / 2);
    };

    // Check on mount and on scroll
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <nav className="bg-white/80 backdrop-blur-md rounded-full pl-4 pr-4 md:pl-6 md:pr-6 py-3 shadow-custom">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex-shrink-0 hover:opacity-80 transition-opacity duration-200"
            aria-label="Scroll to top"
          >
            <div className="relative w-[60px] h-[20px] md:w-[80px] md:h-[26px]">
              <Image
                src="/images/logo/logo.svg"
                alt="Harriet Osen"
                fill
                className="object-contain"
              />
            </div>
          </button>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-3 md:gap-6">
            <a
              href="#brand-story"
              className="text-[12px] md:text-[14px] text-black/70 hover:text-black transition-colors duration-200"
              style={{ letterSpacing: "-0.3px" }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("brand-story");
              }}
            >
              Brand Story
            </a>
            <a
              href="#products"
              className="text-[12px] md:text-[14px] text-black/70 hover:text-black transition-colors duration-200"
              style={{ letterSpacing: "-0.3px" }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("products");
              }}
            >
              Products
            </a>
            <a
              href="#feedback"
              className="text-[12px] md:text-[14px] text-black/70 hover:text-black transition-colors duration-200"
              style={{ letterSpacing: "-0.3px" }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("feedback");
              }}
            >
              Feedback
            </a>
            <a
              href="#quiet-art"
              className="text-[12px] md:text-[14px] text-black/70 hover:text-black transition-colors duration-200"
              style={{ letterSpacing: "-0.3px" }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("quiet-art");
              }}
            >
              Quiet Art
            </a>
            <a
              href="#footer"
              className="text-[12px] md:text-[14px] text-black/70 hover:text-black transition-colors duration-200"
              style={{ letterSpacing: "-0.3px" }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("footer");
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
