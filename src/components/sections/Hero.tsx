import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-dvh min-h-[100vh] w-full overflow-hidden z-0">
      {/* Mobile background image */}
      <Image
        src="/images/products/robyn-zebra-alt-3.png"
        alt="Harriet Osen Boots"
        fill
        priority
        quality={90}
        className="object-cover object-center md:hidden"
      />
      {/* Desktop background image */}
      <Image
        src="/images/hero/hero-boots.png"
        alt="Harriet Osen Boots"
        fill
        priority
        quality={90}
        className="hidden object-cover object-center md:block"
      />

      {/* Logo overlay - center */}
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] -mb-8 md:-mb-12">
          <Image
            src="/images/logo/logo.svg"
            alt="Harriet Osen"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
