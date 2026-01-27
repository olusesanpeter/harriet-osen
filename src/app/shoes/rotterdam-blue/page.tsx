import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/data/products';
import { notFound } from 'next/navigation';

const product = getProductBySlug('rotterdam-blue');

export const metadata: Metadata = {
  title: `${product?.name} - Harriet Osen`,
  description: product?.description,
  openGraph: {
    title: `${product?.name} - Harriet Osen`,
    description: product?.description,
    images: [{ url: product?.galleryImages[0].src || '' }],
  },
};

export default function RotterdamBluePage() {
  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fff7ed]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fff7ed]/80 backdrop-blur-sm">
        <div className="px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo/logo.svg"
              alt="Harriet Osen"
              width={120}
              height={24}
              className="h-6 w-auto"
            />
          </Link>
          <Link
            href="/#shoes"
            className="text-sm text-black/70 hover:text-black transition-colors"
          >
            Back to all shoes
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[1.1] tracking-tight text-brand-red mb-6">
            {product.name}
          </h1>
          <p className="font-sans text-lg md:text-xl leading-relaxed text-black/80 max-w-2xl">
            {product.description}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {product.galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden bg-[#EFE5D8] ${
                  index === 0 ? 'md:col-span-2 aspect-[4/3]' : 'aspect-[2/3]'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 100vw, 40vw"}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/#shoes"
            className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            View all shoes
          </Link>
        </div>
      </section>
    </main>
  );
}
