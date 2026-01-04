import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden z-0">
      {/* Full-screen background image */}
      <Image
        src="/images/hero/hero-boots.png"
        alt="Harriet Osen Boots"
        fill
        priority
        quality={90}
        className="object-cover object-center"
      />

      {/* Logo overlay - top center */}
      <div className="absolute inset-x-0 top-0 flex justify-center pt-8 md:pt-10">
        <div className="relative w-[157px] h-[32px]">
          <Image
            src="/images/logo/logo.png"
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
