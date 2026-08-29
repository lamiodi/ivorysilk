export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  featured?: boolean;
}

export const collections: Collection[] = [
  {
    slug: "silk-essentials",
    name: "Silk Essentials",
    tagline: "Timeless Foundations in 22-Momme Mulberry Silk",
    description: "Versatile, luminous wardrobe anchors designed for everyday luxury and effortless layering.",
    image: "/images/collection-essentials.png",
    featured: true,
  },
  {
    slug: "atelier-couture",
    name: "Atelier Couture",
    tagline: "Handcrafted Evening Wear & Sculptural Silhouettes",
    description: "Hand-cut bias dresses, organza trench coats, and floor-length draped gowns for twilight galas.",
    image: "/images/collection-couture.png",
    featured: true,
  },
  {
    slug: "nightfall-silk",
    name: "Nightfall Silk",
    tagline: "Plush Silk Velvet & Sanctuary Nightwear",
    description: "Silk velvet robes and piped 2-piece pyjama sets engineered for high-comfort rest and evening lounge.",
    image: "/images/collection-nightfall.png",
    featured: true,
  },
  {
    slug: "resort-riviera",
    name: "Resort & Riviera",
    tagline: "Breathable Silk-Linen for Coastal Living",
    description: "Fluid wrap maxi dresses, Cuban collar menswear resort shirts, and relaxed tailoring for warm retreats.",
    image: "/images/collection-resort.png",
    featured: true,
  },
  {
    slug: "bespoke-tailoring",
    name: "Bespoke Tailoring",
    tagline: "Architectural Suiting & Tailored Trousers",
    description: "Raw silk-linen blazers, wide-leg pleated trousers, and full-canvas double-breasted suits.",
    image: "/images/craft-silk.png",
  },
];
