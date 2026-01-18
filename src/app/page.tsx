"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import Shoes from "@/components/sections/Shoes";
import FeedbackSection from "@/components/sections/FeedbackSection";
import OurStory from "@/components/sections/OurStory";
import Footer from "@/components/sections/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
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
