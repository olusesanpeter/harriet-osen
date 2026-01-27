import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/data/products';
import { notFound } from 'next/navigation';
import NotifyForm from '@/components/forms/NotifyForm';

const product = getProductBySlug('robyn-zebra');

export const metadata: Metadata = {
  title: `${product?.name} - Harriet Osen`,
  description: product?.description,
  openGraph: {
    title: `${product?.name} - Harriet Osen`,
    description: product?.description,
    images: [{ url: product?.galleryImages[0].src || '' }],
  },
};

export default function RobynZebraPage() {
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

      {/* Main Content */}
      <section className="pt-20 md:pt-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12">
            {/* Left - Scrollable Images */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {product.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden bg-[#EFE5D8] aspect-[4/5]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Right - Sticky Info */}
            <div className="w-full md:w-1/2">
              <div className="md:sticky md:top-24">
                <h1 className="font-display text-[40px] sm:text-[56px] md:text-[64px] lg:text-[80px] leading-[1.1] tracking-tight text-brand-red mb-6">
                  {product.name}
                </h1>
                <p className="font-sans text-lg md:text-xl leading-relaxed text-black/80 mb-8">
                  {product.description}
                </p>
                {/* Notify form - desktop only */}
                <div className="hidden md:block">
                  <NotifyForm productName={product.name} productSlug={product.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notify form - mobile only */}
        <div className="md:hidden mt-8">
          <NotifyForm productName={product.name} productSlug={product.slug} />
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-24"></div>
    </main>
  );
}
