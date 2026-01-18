'use client';

import ImageCarousel from '../ImageCarousel';

const lifestyleImages = [
  {
    name: "Robyn Zebra Lifestyle 1",
    image: "/images/products/lifestyle/robyn-zebra-lifestyle-1.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "Robyn Zebra Lifestyle 2",
    image: "/images/products/lifestyle/robyn-zebra-lifestyle-2.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "Robyn Zebra Lifestyle 3",
    image: "/images/products/lifestyle/robyn-zebra-lifestyle-3.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "Robyn Zebra Lifestyle 4",
    image: "/images/products/lifestyle/robyn-zebra-lifestyle-4.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "Robyn Zebra Lifestyle 5",
    image: "/images/products/lifestyle/robyn-zebra-lifestyle-5.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "Robyn Zebra Lifestyle 6",
    image: "/images/products/lifestyle/robyn-zebra-lifestyle-6.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "Robyn Zebra Lifestyle 7",
    image: "/images/products/lifestyle/robyn-zebra-lifestyle-7.jpg",
    width: 882,
    height: 1322,
  },
]

export default function QuietArt() {
  return (
    <section className="relative bg-[#054dc1] flex flex-col py-24 md:py-32 overflow-hidden">
      {/* Header Section */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 pb-24 md:pb-32">
        <h2 className="font-display text-[80px] md:text-[100px] lg:text-[120px] leading-[1.1] tracking-tight text-white w-full text-left mb-8">
          Born in Lagos.<br />Designed in London.
        </h2>
        
        {/* Description Section */}
        <div className="flex flex-col text-left space-y-4">
          <p
            className="font-sans font-normal [word-spacing:0.05em] text-xl leading-relaxed text-white/95 max-w-[657px]"
            style={{ fontFeatureSettings: "'liga' 1, 'calt' 1" }}
          >
            At Harriet Osen, we create beautiful pieces that encapsulate the ideas of identity, craft and joy.
          </p>
          <p
            className="font-sans font-normal [word-spacing:0.05em] text-xl leading-relaxed text-white/95 max-w-[657px]"
            style={{ fontFeatureSettings: "'liga' 1, 'calt' 1" }}
          >
            The brand was born on a warm summer evening in 2019, out of a desire to access shoes that are crafted with the best materials available, with hands that knew the work of shoemaking.
          </p>
        </div>
      </div>

      {/* Full-width scrolling image carousel */}
      <ImageCarousel images={lifestyleImages} speed={0.5} />
    </section>
  )
}
