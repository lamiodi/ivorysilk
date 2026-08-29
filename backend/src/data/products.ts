export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  creator: string;
  category: string;
  collection: string;
  fabric: string;
  sizes: string[];
  colors: ProductColor[];
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  featured?: boolean;
  shortDescription: string;
  description: string;
  features: string[];
  includes?: string[];
  care?: string[];
  fit?: string;
  modelInfo?: string;
  image: string;
  hoverImage: string;
  gallery: string[];
  createdAt: string;
}

const P = {
  slipDress: "/images/products/slip-dress.png",
  silkShirt: "/images/products/silk-shirt.png",
  velvetRobe: "/images/products/velvet-robe.png",
  silkBlazer: "/images/products/silk-blazer.png",
  eveningGown: "/images/products/evening-gown.png",
  hero: "/images/hero-silk.png",
  craft: "/images/craft-silk.png",
  essentials: "/images/collection-essentials.png",
  couture: "/images/collection-couture.png",
  nightfall: "/images/collection-nightfall.png",
  resort: "/images/collection-resort.png",
};

export const products: Product[] = [
  {
    id: "p-aurelle-mulberry-slip-dress",
    slug: "aurelle-mulberry-silk-slip-dress",
    name: "The Aurelle Mulberry Silk Slip Dress",
    creator: "Atelier Ivory Silk",
    category: "Dresses",
    collection: "Atelier Couture",
    fabric: "100% Grade 6A 22-Momme Mulberry Silk",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory Cream", hex: "#F9F6F2" },
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Midnight Black", hex: "#171717" },
    ],
    price: 380,
    compareAtPrice: 450,
    rating: 4.9,
    reviewCount: 142,
    isBestseller: true,
    featured: true,
    shortDescription:
      "A fluid bias-cut midi slip dress crafted from 22-momme pure Mulberry silk. Cut to drape effortlessly across the silhouette with adjustable minimalist shoulder straps.",
    description:
      "The Aurelle Slip Dress embodies timeless sartorial luxury. Hand-cut on the bias from heavyweight 22-momme Mulberry silk, it glides across the skin with a luminous luster. Featuring a delicate cowl neckline and a subtle side slit, Aurelle transfers effortlessly from sunlit afternoons to twilight galas.",
    features: [
      "Cut on the bias for a natural body-conforming drape",
      "100% Grade 6A Mulberry Silk (22-Momme weight)",
      "Adjustable ultra-fine French silk spaghetti straps",
      "Hand-finished French seams and French hem detail",
    ],
    includes: [
      "The Aurelle Silk Slip Dress",
      "Signature Ivory Silk breathable cotton garment bag",
      "Silk care & laundering guidebook",
    ],
    care: [
      "Dry clean recommended for optimal luster longevity",
      "Or hand wash cold gently with organic PH-neutral silk detergent",
      "Do not tumble dry; dry flat in shade",
      "Cool iron inside out or steam on low heat",
    ],
    fit: "Tailored Bias Fit — true to size with fluid ease",
    modelInfo: "Model is 178cm / 5'10\" and wearing size S (Bust 33\", Waist 24\", Hips 35\")",
    image: P.slipDress,
    hoverImage: P.couture,
    gallery: [P.slipDress, P.couture, P.craft],
    createdAt: "2026-06-01",
  },
  {
    id: "p-maison-silk-crepe-shirt",
    slug: "maison-silk-crepe-button-down-shirt",
    name: "Maison Silk Crepe Button-Down Shirt",
    creator: "Atelier Ivory Silk",
    category: "Blouses & Tops",
    collection: "Silk Essentials",
    fabric: "100% Silk Crepe de Chine",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Ivory Cream", hex: "#F9F6F2" },
      { name: "Obsidian Navy", hex: "#1A2530" },
      { name: "Rose Quartz", hex: "#E7A1B0" },
    ],
    price: 240,
    rating: 4.8,
    reviewCount: 98,
    isBestseller: true,
    featured: true,
    shortDescription:
      "An impeccably tailored silk crepe shirt with Mother-of-Pearl buttons and extended cuffs. The ultimate refined wardrobe anchor.",
    description:
      "The Maison Button-Down Shirt balances relaxed menswear architecture with feminine fluidity. Crafted from matte-finish Silk Crepe de Chine, it features a crisp pointed collar, concealed placket, and genuine Australian Mother-of-Pearl buttons. Tuck into high-waisted tailoring or drape casually over silk trousers.",
    features: [
      "100% Premium Silk Crepe de Chine",
      "Genuine Australian Mother-of-Pearl buttons",
      "Extended French cuffs with dual-button fastening",
      "Concealed front button placket for a clean aesthetic",
    ],
    includes: [
      "Maison Silk Button-Down Shirt",
      "Spare Mother-of-Pearl buttons in silk pouch",
      "Ivory Silk hanger & garment dust cover",
    ],
    care: [
      "Dry clean or hand wash cold with gentle silk cleanser",
      "Steam on low heat",
      "Store on padded hanger",
    ],
    fit: "Relaxed Oversized Fit — take your normal size for loose drape, or one size down for a slim silhouette",
    modelInfo: "Model is 175cm / 5'9\" and wearing size S",
    image: P.silkShirt,
    hoverImage: P.essentials,
    gallery: [P.silkShirt, P.essentials, P.craft],
    createdAt: "2026-05-15",
  },
  {
    id: "p-noir-midnight-velvet-robe",
    slug: "noir-midnight-silk-velvet-robe",
    name: "Noir Midnight Silk Velvet Robe",
    creator: "Atelier Ivory Silk",
    category: "Nightwear & Loungewear",
    collection: "Nightfall Silk",
    fabric: "Silk Velvet & 100% Mulberry Silk Lining",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Black", hex: "#171717" },
      { name: "Bordeaux Red", hex: "#6B1D2F" },
      { name: "Emerald Silk", hex: "#046A38" },
    ],
    price: 490,
    compareAtPrice: 580,
    rating: 5.0,
    reviewCount: 76,
    isNew: true,
    featured: true,
    shortDescription:
      "A plush silk-velvet kimono robe lined entirely with liquid 100% Mulberry silk. Features wide kimono sleeves and a wide belted sash.",
    description:
      "Indulge in sanctuary elegance with the Noir Robe. Combining the deep luster of high-density silk velvet with the cool softness of a pure Mulberry silk lining, this ankle-length gown delivers cozy extravagance. Designed with traditional Japanese kimono sleeves and deep side pockets.",
    features: [
      "Exterior: High-pile Silk Velvet plush",
      "Lining: 100% Mulberry Silk interior touch",
      "Deep practical side-seam pockets",
      "Wide double-stitched self-tie sash belt",
    ],
    includes: [
      "Noir Midnight Silk Velvet Robe",
      "Matching Velvet Sash Belt",
      "Luxury hardtop presentation gift box",
    ],
    care: ["Specialist dry clean only", "Do not iron directly; steam from distance on reverse"],
    fit: "Loose Kimono Wrap Fit",
    modelInfo: "Model is 180cm / 5'11\" wearing size M/L",
    image: P.velvetRobe,
    hoverImage: P.nightfall,
    gallery: [P.velvetRobe, P.nightfall, P.craft],
    createdAt: "2026-07-02",
  },
  {
    id: "p-marais-tailored-blazer",
    slug: "marais-tailored-silk-blazer",
    name: "Marais Tailored Silk Blazer",
    creator: "Atelier Ivory Silk",
    category: "Suits & Tailoring",
    collection: "Bespoke Tailoring",
    fabric: "100% Raw Silk & Linen Weave",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Ivory Cream", hex: "#F9F6F2" },
      { name: "Midnight Black", hex: "#171717" },
    ],
    price: 540,
    compareAtPrice: 620,
    rating: 5.0,
    reviewCount: 88,
    isNew: true,
    featured: true,
    shortDescription:
      "A relaxed double-breasted jacket crafted from textured raw silk-linen. Features peak lapels and padded structured shoulders.",
    description:
      "The Marais Blazer brings nonchalant Parisian tailor craftsmanship to warm-weather dressing. Constructed from slubbed raw silk woven with organic flax linen, it holds structure while breathing effortlessly. Styled with contrast tortoiseshell buttons and silk pocket square lining.",
    features: [
      "Double-breasted front with 4-button closure",
      "Sharp peak lapels with boutonnière eyelet",
      "Fully lined in 100% breathable silk habotai",
      "Functional sleeve cuffs with surgeon's buttons",
    ],
    includes: ["Marais Silk Blazer", "Hardwood branded coat hanger", "Garment suit bag"],
    care: ["Dry clean only", "Do not steam directly on raw silk slub fibers"],
    fit: "Tailored Oversized Boxy Cut",
    modelInfo: "Model is 178cm / 5'10\" wearing size S",
    image: P.silkBlazer,
    hoverImage: P.craft,
    gallery: [P.silkBlazer, P.craft, P.essentials],
    createdAt: "2026-06-25",
  },
  {
    id: "p-elysian-draped-evening-gown",
    slug: "elysian-draped-silk-evening-gown",
    name: "Elysian Draped Silk Evening Gown",
    creator: "Atelier Ivory Silk",
    category: "Dresses",
    collection: "Atelier Couture",
    fabric: "100% Heavy Silk Crepe Back Satin",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ivory Cream", hex: "#F9F6F2" },
      { name: "Bordeaux Red", hex: "#6B1D2F" },
      { name: "Midnight Black", hex: "#171717" },
    ],
    price: 750,
    compareAtPrice: 880,
    rating: 5.0,
    reviewCount: 38,
    isNew: true,
    featured: true,
    shortDescription:
      "A floor-sweeping asymmetric draped evening gown with a high neck halter, low open back, and sweeping chapel train.",
    description:
      "Sculpted for unforgettable galas. The Elysian Gown cascades gracefully from a high draped neckline down into an asymmetrical back cowl and floor-grazing train. Hand-crafted in heavy silk crepe-back satin for substantial, non-clinging weight.",
    features: [
      "High draped cowl halter neck with hook-and-eye closure",
      "Dramatic low open cowl back",
      "Discreet side invisible zip closure",
      "Sweeping rear chapel train hem",
    ],
    includes: ["Elysian Draped Evening Gown", "Atelier garment suit bag"],
    care: ["Specialist couture dry clean only"],
    fit: "Sculpted Couture Fit — true to waist and hip measurements",
    modelInfo: "Model is 181cm / 5'11.5\" wearing size S",
    image: P.eveningGown,
    hoverImage: P.couture,
    gallery: [P.eveningGown, P.couture, P.hero],
    createdAt: "2026-07-22",
  },
];
