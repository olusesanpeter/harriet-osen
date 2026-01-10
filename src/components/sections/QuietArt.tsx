'use client';

import ImageCarousel from '../ImageCarousel';

const lifestyleImages = [
  {
    name: "HO_RobinBoots_012",
    image: "/images/products/lifestyle/HO_RobinBoots_012.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "HO_RobinBoots_018",
    image: "/images/products/lifestyle/HO_RobinBoots_018.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "HO_RobinBoots_020",
    image: "/images/products/lifestyle/HO_RobinBoots_020.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "HO_RobinBoots_031",
    image: "/images/products/lifestyle/HO_RobinBoots_031.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "HO_RobinBoots_036",
    image: "/images/products/lifestyle/HO_RobinBoots_036.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "HO_RobinBoots_038",
    image: "/images/products/lifestyle/HO_RobinBoots_038.jpg",
    width: 882,
    height: 1322,
  },
  {
    name: "HO_RobinBoots_041",
    image: "/images/products/lifestyle/HO_RobinBoots_041.jpg",
    width: 882,
    height: 1322,
  },
]

export default function QuietArt() {
  return (
    <section className="relative bg-[#054dc1] flex flex-col py-24 md:py-32 overflow-hidden">
      {/* Header Section */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 pb-24 md:pb-32">
        <h2 className="font-display text-[180px] leading-[1.1] tracking-tight text-white w-full text-left font-bold">
          Born in Lagos. Designed in London.
        </h2>
      </div>

      {/* Full-width scrolling image carousel */}
      <ImageCarousel images={lifestyleImages} speed={0.5} />

      {/* Description Section */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 pt-24 md:pt-32">
        <div className="flex flex-col text-left space-y-4">
          <p
            className="font-[Inter,sans-serif] font-normal [word-spacing:0.05em] text-xl leading-relaxed text-white/95 max-w-[657px]"
            style={{ fontFeatureSettings: "'liga' 1, 'calt' 1" }}
          >
            At Harriet Osen, we create beautiful pieces that encapsulate the ideas of identity, craft and joy.
          </p>
          <p
            className="font-[Inter,sans-serif] font-normal [word-spacing:0.05em] text-xl leading-relaxed text-white/95 max-w-[657px]"
            style={{ fontFeatureSettings: "'liga' 1, 'calt' 1" }}
          >
            The brand was born on a warm summer evening in 2019, out of a desire to access shoes that are crafted with the best materials available, with hands that knew the work of shoemaking.
          </p>
        </div>
      </div>
    </section>
  )
}
