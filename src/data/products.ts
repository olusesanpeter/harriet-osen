export interface GalleryImage {
  src: string;
  type: 'image' | 'video';
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  name: string;
  slug: string;
  image: string;
  width: number;
  height: number;
  description: string;
  galleryImages: GalleryImage[];
}

export const products: Product[] = [
  {
    name: "Rotterdam Blue",
    slug: "rotterdam-blue",
    image: "/images/products/blue-rotterdam.png",
    width: 629,
    height: 943,
    description: "The moulded heel on this sandal was inspired by modern architecture seen on the founder's travels to Rotterdam. Featuring a satin upper and an Italian leather lining in a striking cobalt, these shoes are bold and statement making.",
    galleryImages: [
      { src: "/images/products/blue-rotterdam/blue-rotterdam-front.jpg", type: 'image', alt: "Rotterdam Blue front", width: 1200, height: 1800 },
      { src: "/images/products/blue-rotterdam/blue-rotterdam-side.jpg", type: 'image', alt: "Rotterdam Blue side", width: 1200, height: 1800 },
      { src: "/images/products/blue-rotterdam/blue-rotterdam-heel.jpg", type: 'image', alt: "Rotterdam Blue heel", width: 1200, height: 1800 },
      { src: "/images/products/blue-rotterdam/blue-rotterdam-sketch.png", type: 'image', alt: "Rotterdam Blue sketch process", width: 1200, height: 1800 },
    ]
  },
  {
    name: "Benni Pump",
    slug: "benni-pump",
    image: "/images/products/white-rotterdam.png",
    width: 415,
    height: 622,
    description: "Carrying the Rotterdam heel, we wanted to make a shoe that was restrained but beautiful. A white leather upper meant to stand out against grey pavement, and a heel that lends it a hint of excitement.",
    galleryImages: [
      { src: "/images/products/white-rotterdam/white-rotterdam-front.jpg", type: 'image', alt: "White Rotterdam front", width: 1200, height: 1800 },
      { src: "/images/products/white-rotterdam/white-rotterdam-side.jpg", type: 'image', alt: "White Rotterdam side", width: 1200, height: 1800 },
      { src: "/images/products/white-rotterdam/white-rotterdam-heel.jpg", type: 'image', alt: "White Rotterdam heel", width: 1200, height: 1800 },
      { src: "/images/products/white-rotterdam/white-rotterdam-sketch.jpg", type: 'image', alt: "White Rotterdam sketch process", width: 1200, height: 1800 },
    ]
  },
  {
    name: "Robyn Zebra",
    slug: "robyn-zebra",
    image: "/images/products/robyn-zebra.png",
    width: 415,
    height: 621,
    description: "This boot has two inspiration points, Rihanna, from A$AP Rocky's Fashion Killa video, and a zebra coat from Dries Van Noten's FW22 collection. The boot's name is an ode to its first inspiration. Crafted with pony hair leather, and a contrasting red logo patch, she's a visual and tactile stunner.",
    galleryImages: [
      { src: "/images/products/brown-zebra/robyn-zebra-front.jpg", type: 'image', alt: "Robyn Zebra front", width: 1200, height: 1800 },
      { src: "/images/products/brown-zebra/robyn-zebra-side.jpg", type: 'image', alt: "Robyn Zebra side", width: 1200, height: 1800 },
      { src: "/images/products/brown-zebra/robyn-zebra-patch.jpg", type: 'image', alt: "Robyn Zebra patch", width: 1200, height: 1800 },
      { src: "/images/products/robyn-zebra-alt-1.png", type: 'image', alt: "Robyn Zebra", width: 1200, height: 1800 },
      { src: "/images/products/lifestyle/robyn-zebra-lifestyle-1.jpg", type: 'image', alt: "Robyn Zebra lifestyle", width: 1200, height: 1800 },
    ]
  },
  {
    name: "Robyn Brown",
    slug: "robyn-brown",
    image: "/images/products/brown-zebra.png",
    width: 629,
    height: 943,
    description: "A quieter version of its zebra twin, the silky-smooth brown leather iteration retains the red logo patch, and communicates a classic, yet exciting look.",
    galleryImages: [
      { src: "/images/products/robyn-brown/robyn-brown-front.jpg", type: 'image', alt: "Robyn Brown front", width: 1200, height: 1800 },
      { src: "/images/products/robyn-brown/robyn-brown-side.jpg", type: 'image', alt: "Robyn Brown side", width: 1200, height: 1800 },
      { src: "/images/products/robyn-brown/robyn-brown-patch.jpg", type: 'image', alt: "Robyn Brown patch", width: 1200, height: 1800 },
      { src: "/images/products/lifestyle/robyn-zebra-lifestyle-2.jpg", type: 'image', alt: "Robyn Brown lifestyle", width: 1200, height: 1800 },
      { src: "/images/products/robyn-brown/robyn-brown-sketch.jpg", type: 'image', alt: "Robyn Brown sketch process", width: 1200, height: 1800 },
    ]
  },
  {
    name: "Arua Sandal",
    slug: "arua-sandal",
    image: "/images/products/yellow-brown.png",
    width: 415,
    height: 623,
    description: "Shoes made for the soft life, she's crafted with a brown suede lining for easy stepping, and grained leather straps in a beautiful yellow.",
    galleryImages: [
      { src: "/images/products/yellow-brown/yellow-brown-front.jpg", type: 'image', alt: "Yellow Brown front", width: 1200, height: 1800 },
      { src: "/images/products/yellow-brown/yellow-brown-side.jpg", type: 'image', alt: "Yellow Brown side", width: 1200, height: 1800 },
      { src: "/images/products/yellow-brown/yellow-brown-sketch.png", type: 'image', alt: "Yellow Brown sketch process", width: 1200, height: 1800 },
    ]
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
