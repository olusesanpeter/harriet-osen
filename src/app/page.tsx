import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen m-0 p-0">
      <Hero />
      <BrandStory />
      <ProductShowcase />
      <Footer />
    </main>
  );
}
