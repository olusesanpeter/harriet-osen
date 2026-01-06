"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import ProductShowcase from "@/components/sections/ProductShowcase";
import QuietArt from "@/components/sections/QuietArt";
import Footer from "@/components/sections/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="overflow-x-hidden">
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}
      <main
        className={`min-h-screen m-0 p-0 transition-opacity duration-1000 ease-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Hero />
        <BrandStory />
        <ProductShowcase />
        <QuietArt />
        <Footer />
      </main>
    </div>
  );
}
