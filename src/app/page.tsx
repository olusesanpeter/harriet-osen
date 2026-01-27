"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import Shoes from "@/components/sections/Shoes";
import FeedbackSection from "@/components/sections/FeedbackSection";
import OurStory from "@/components/sections/OurStory";
import Footer from "@/components/sections/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    setIsLoading(!hasSeenLoader);
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasSeenLoader', 'true');
    setIsLoading(false);
  };

  // Don't render anything until we've checked sessionStorage
  if (isLoading === null) {
    return null;
  }

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      <main
        className={`min-h-screen m-0 p-0 transition-opacity duration-1000 ease-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <Hero />
        <BrandStory />
        <Shoes />
        <FeedbackSection />
        <OurStory />
        <Footer />
      </main>
    </>
  );
}
