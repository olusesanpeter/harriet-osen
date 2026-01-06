import Image from 'next/image'

const lifestyleImages = [
  {
    name: "HO_RobinBoots_022",
    image: "/images/products/HO_RobinBoots_022.png",
    width: 882,
    height: 1322,
  },
  {
    name: "HO_RobinBoots_015",
    image: "/images/products/HO_RobinBoots_015.png",
    width: 882,
    height: 1321,
  },
  {
    name: "HO_RobinBoots_009",
    image: "/images/products/HO_RobinBoots_009 1.png",
    width: 877,
    height: 1313,
  },
]

export default function QuietArt() {
  return (
    <section className="relative bg-[#054dc1] py-24 md:py-32">
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="flex flex-col items-center">
          {/* Text Section */}
          <div className="flex flex-col text-center space-y-4 mb-8 md:mb-12">
            <h2 className="font-display text-display-md tracking-tight text-white">
              The quiet art of bold things
            </h2>
            
            <p
              className="font-[Inter,sans-serif] font-normal [word-spacing:0.05em] text-xl leading-relaxed text-white/95 max-w-[657px] mx-auto"
              style={{ fontFeatureSettings: "'liga' 1, 'calt' 1" }}
            >
              Designed with restraint. Finished with risk.
            </p>
          </div>

          {/* Image Gallery */}
          <div className="flex flex-col items-center gap-8 md:gap-12">
            {lifestyleImages.map((image) => (
              <div
                key={image.name}
                className="relative w-full max-w-[1000px]"
              >
                <Image
                  src={image.image}
                  alt={image.name}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
