"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

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

      // Determine which section is currently active
      const sections = [
        { id: "shoes", element: document.getElementById("shoes") },
        { id: "our-story", element: document.getElementById("our-story") },
        { id: "footer", element: document.getElementById("footer") },
      ];

      // Find the section that is currently most visible
      // A section is active if its top is above a threshold (150px from top)
      // and it's the section with the top closest to that threshold
      const threshold = 150;
      let activeId: string | null = null;
      let closestDistance = Infinity;

      sections.forEach(({ id, element }) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top;
        
        // Check if section top is above or near the threshold
        if (sectionTop <= threshold + 100) {
          const distance = Math.abs(sectionTop - threshold);
          if (distance < closestDistance) {
            closestDistance = distance;
            activeId = id;
          }
        }
      });

      setActiveSection(activeId);
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
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="#shoes"
              className="relative text-[13px] md:text-[14px] text-black/70 hover:text-black transition-colors duration-200 whitespace-nowrap"
              style={{ letterSpacing: "-0.3px" }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("shoes");
              }}
            >
              Shoes
              {activeSection === "shoes" && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-brand-red">—</span>
              )}
            </a>
            <a
              href="#our-story"
              className="relative text-[13px] md:text-[14px] text-black/70 hover:text-black transition-colors duration-200 whitespace-nowrap"
              style={{ letterSpacing: "-0.3px" }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("our-story");
              }}
            >
              <span className="md:hidden">Story</span>
              <span className="hidden md:inline">Our Story</span>
              {activeSection === "our-story" && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-brand-red">—</span>
              )}
            </a>
            <a
              href="#footer"
              className="relative text-[13px] md:text-[14px] text-black/70 hover:text-black transition-colors duration-200 whitespace-nowrap"
              style={{ letterSpacing: "-0.3px" }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("footer");
              }}
            >
              <span className="md:hidden">Love ♥</span>
              <span className="hidden md:inline">Tell us what you love<sup className="text-[0.6em]">♥</sup></span>
              {activeSection === "footer" && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-brand-red">—</span>
              )}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
